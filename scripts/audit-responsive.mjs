import { chromium } from 'playwright'

const BASE_URL = process.env.AUDIT_URL ?? 'http://localhost:5174/'
const WIDTHS = [320, 375, 390, 480, 556, 640, 768, 820, 1024, 1280, 1440]

async function measure(page) {
  return page.evaluate(() => {
    const viewport = document.documentElement.clientWidth
    const scrollWidth = Math.max(
      document.documentElement.scrollWidth,
      document.body.scrollWidth,
    )
    const offenders = []

    if (scrollWidth > viewport + 1) {
      for (const el of document.querySelectorAll('*')) {
        const rect = el.getBoundingClientRect()
        if (rect.width < 2 || rect.height < 2) continue
        if (rect.right > viewport + 2 || rect.left < -2) {
          const tag = el.tagName.toLowerCase()
          const cls =
            typeof el.className === 'string' && el.className
              ? `.${el.className.trim().split(/\s+/).slice(0, 2).join('.')}`
              : ''
          offenders.push({ tag, cls, right: Math.round(rect.right), left: Math.round(rect.left) })
        }
      }
    }

    return {
      viewport,
      scrollWidth,
      hasOverflow: scrollWidth > viewport + 1,
      offenders: offenders.slice(0, 6),
    }
  })
}

async function audit() {
  const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined,
  args: ['--no-sandbox'],
})
  const page = await browser.newPage()
  const issues = []

  const scenarios = [
    { name: 'default', setup: async () => {} },
    {
      name: 'modal-open',
      setup: async () => {
        const btn = page.getByRole('button', { name: /зарегистрироваться/i }).first()
        if (await btn.isVisible()) await btn.click()
        await page.waitForTimeout(350)
      },
    },
    {
      name: 'dark-theme',
      setup: async () => {
        await page.evaluate(() => {
          document.documentElement.setAttribute('data-theme', 'dark')
        })
        await page.waitForTimeout(200)
      },
    },
  ]

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 })

    for (const scenario of scenarios) {
      await page.goto(BASE_URL, { waitUntil: 'networkidle' })
      await page.waitForTimeout(300)
      await scenario.setup()

      const top = await measure(page)
      if (top.hasOverflow) {
        issues.push({ width, scenario: scenario.name, position: 'top', ...top })
      }

      const ids = ['#audience', '#program', '#speakers', '#directions', '#contacts']
      for (const id of ids) {
        const el = await page.$(id)
        if (!el) continue
        await el.scrollIntoViewIfNeeded()
        await page.waitForTimeout(150)
        const section = await measure(page)
        if (section.hasOverflow) {
          issues.push({ width, scenario: scenario.name, position: id, ...section })
        }
      }
    }
  }

  await browser.close()

  if (!issues.length) {
    console.log('OK: no horizontal overflow (default, modal, dark, per-section)')
    return
  }

  console.log('Overflow issues:')
  for (const item of issues) {
    console.log(
      `\n--- ${item.width}px | ${item.scenario} | ${item.position} (${item.scrollWidth}/${item.viewport}) ---`,
    )
    for (const o of item.offenders) {
      console.log(`  ${o.tag}${o.cls} left=${o.left} right=${o.right}`)
    }
  }
  process.exitCode = 1
}

audit().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
