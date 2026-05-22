import { chromium } from 'playwright'

const BASE_URL = process.env.AUDIT_URL ?? 'http://localhost:5177/'
const WIDTHS = [320, 375, 480, 560, 768, 1024, 1280]
const THEMES = ['light', 'dark']

function parseRgb(s) {
  const m = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
  if (!m) return null
  return [+m[1], +m[2], +m[3], m[4] !== undefined ? +m[4] : 1]
}

function relLum([r, g, b]) {
  const f = (c) => {
    c /= 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

function contrastRatio(fg, bg) {
  const L1 = relLum(fg)
  const L2 = relLum(bg)
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
}

const browser = await chromium.launch()
const page = await browser.newPage()
const problems = []
const samples = []

for (const theme of THEMES) {
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto(BASE_URL, { waitUntil: 'networkidle' })
    await page.evaluate((t) => {
      document.documentElement.setAttribute('data-theme', t)
    }, theme)
    const section = page.locator('#directions')
    await section.scrollIntoViewIfNeeded()
    await page.waitForTimeout(200)

    const chips = await page.evaluate(() => {
      return [...document.querySelectorAll('#directions .directions-row__tags li')].map((chip) => {
        const cs = getComputedStyle(chip)
        const row = chip.closest('.directions-row')
        const rowCs = row ? getComputedStyle(row) : null
        const rect = chip.getBoundingClientRect()
        return {
          text: chip.textContent.trim(),
          row: row?.querySelector('.directions-row__name')?.textContent?.trim(),
          fontSizePx: parseFloat(cs.fontSize),
          fontWeight: cs.fontWeight,
          padding: cs.padding,
          color: cs.color,
          cardBg: rowCs?.backgroundColor,
          heightPx: Math.round(rect.height),
          widthPx: Math.round(rect.width),
        }
      })
    })

    const expectedCount = width <= 559 ? 2 : width <= 1024 ? 3 : 3
    const rows = new Set(chips.map((c) => c.row))
    const perRow = chips.length / rows.size

    for (const chip of chips) {
      const fg = parseRgb(chip.color)
      const bg = parseRgb(chip.cardBg)
      const ratio = fg && bg ? contrastRatio(fg, bg) : 0

      if (chip.fontSizePx < 11) {
        problems.push({
          width,
          theme,
          type: 'tag-font-small',
          row: chip.row,
          text: chip.text,
          px: chip.fontSizePx,
        })
      }
      if (chip.heightPx < 24) {
        problems.push({
          width,
          theme,
          type: 'tag-hit-small',
          row: chip.row,
          text: chip.text,
          height: chip.heightPx,
        })
      }
      if (ratio && ratio < 4.5) {
        problems.push({
          width,
          theme,
          type: 'tag-contrast-low',
          row: chip.row,
          text: chip.text,
          ratio: ratio.toFixed(2),
        })
      }
    }

    if (Math.round(perRow) > expectedCount) {
      problems.push({
        width,
        theme,
        type: 'tag-count',
        expected: expectedCount,
        got: Math.round(perRow),
      })
    }

    const first = chips[0]
    if (first) {
      samples.push({
        width,
        theme,
        tagCount: Math.round(perRow),
        fontSizePx: first.fontSizePx,
        heightPx: first.heightPx,
        contrast: first.color && first.cardBg
          ? contrastRatio(parseRgb(first.color), parseRgb(first.cardBg)).toFixed(2)
          : null,
      })
    }
  }
}

await browser.close()

console.log('Samples:', JSON.stringify(samples, null, 2))
if (problems.length) {
  console.log('Problems:', JSON.stringify(problems, null, 2))
  process.exit(1)
}
console.log('OK: tag readability checks passed')
