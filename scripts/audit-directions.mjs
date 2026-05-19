import { chromium } from 'playwright'

const BASE_URL = process.env.AUDIT_URL ?? 'http://localhost:5174/'
const WIDTHS = [320, 375, 390, 480, 556, 640, 768, 1024, 1280]

async function auditDirections(page) {
  return page.evaluate(() => {
    const section = document.querySelector('#directions')
    if (!section) return { error: 'no #directions' }

    const viewport = document.documentElement.clientWidth
    const scrollWidth = document.documentElement.scrollWidth
    const rows = [...section.querySelectorAll('.directions-row')]
    const rowData = rows.map((row) => {
      const name = row.querySelector('.directions-row__name')
      const lead = row.querySelector('.directions-row__lead')
      const tagList = row.querySelector('.directions-row__tags')
      const tags = tagList ? [...tagList.children] : []
      const tagsClip = tagList ? tagList.scrollWidth > tagList.clientWidth + 1 : false
      const measureTags = tags.length
      const tagListStyle = tagList ? getComputedStyle(tagList) : null
      const tagTops = tags.map((t) => Math.round(t.getBoundingClientRect().top))
      const tagTopsUnique = [...new Set(tagTops)]
      const nameStyle = name ? getComputedStyle(name) : null
      const leadStyle = lead ? getComputedStyle(lead) : null
      const firstTag = tags[0]
      const tagStyle = firstTag ? getComputedStyle(firstTag) : null

      return {
        name: name?.textContent?.trim(),
        nameRendered: nameStyle?.textTransform,
        lead: lead?.textContent?.trim().slice(0, 60),
        leadFontPx: leadStyle ? parseFloat(leadStyle.fontSize) : null,
        leadLines: lead ? Math.round(lead.getBoundingClientRect().height / parseFloat(leadStyle.lineHeight || leadStyle.fontSize)) : 0,
        tagsVisible: tags.map((t) => t.textContent.trim()),
        tagsTotal: measureTags,
        tagsFlexDirection: tagListStyle?.flexDirection,
        tagsSingleRow: tagTopsUnique.length <= 1,
        tagsClip,
        tagFontPx: tagStyle ? parseFloat(tagStyle.fontSize) : null,
        tagHeightPx: firstTag ? Math.round(firstTag.getBoundingClientRect().height) : null,
        rowOverflow: row.scrollWidth > row.clientWidth + 1,
        rowRight: Math.round(row.getBoundingClientRect().right),
      }
    })

    const offenders = []
    for (const el of section.querySelectorAll('*')) {
      const rect = el.getBoundingClientRect()
      if (rect.width < 2 || rect.height < 2) continue
      if (rect.right > viewport + 2) {
        offenders.push({
          cls: el.className?.toString?.().slice(0, 60),
          right: Math.round(rect.right),
        })
        if (offenders.length >= 4) break
      }
    }

    return {
      viewport,
      hasOverflow: scrollWidth > viewport + 1,
      offenders,
      rows: rowData,
    }
  })
}

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || undefined,
  args: ['--no-sandbox'],
})
const page = await browser.newPage()
const problems = []

for (const width of WIDTHS) {
  await page.setViewportSize({ width, height: 900 })
  await page.goto(BASE_URL, { waitUntil: 'networkidle' })
  await page.waitForTimeout(400)
  const el = await page.$('#directions')
  if (el) await el.scrollIntoViewIfNeeded()
  await page.waitForTimeout(300)

  const data = await auditDirections(page)

  if (width === 480) {
    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'))
    const el480 = await page.$('#directions')
    if (el480) await el480.scrollIntoViewIfNeeded()
    await page.waitForTimeout(80)
    const early = await auditDirections(page)
    for (const row of early.rows) {
      if (row.tagsClip) {
        problems.push({ width: 480, type: 'tags-clip-early', name: row.name, visible: row.tagsVisible })
      }
    }
  }
  if (data.error) {
    problems.push({ width, error: data.error })
    continue
  }

  if (data.hasOverflow) {
    problems.push({ width, type: 'overflow', offenders: data.offenders })
  }

  for (const row of data.rows) {
    if (row.rowOverflow) {
      problems.push({ width, type: 'row-overflow', name: row.name })
    }
    if (row.leadFontPx && row.leadFontPx < 13.5) {
      problems.push({ width, type: 'small-lead', name: row.name, px: row.leadFontPx })
    }
    if (width <= 1024 && row.tagFontPx && row.tagFontPx < 11) {
      problems.push({ width, type: 'small-tag', name: row.name, px: row.tagFontPx })
    }
    if (width <= 1024 && row.tagHeightPx && row.tagHeightPx < 24) {
      problems.push({ width, type: 'small-tag-hit', name: row.name, height: row.tagHeightPx })
    }
    const expectedTags = width <= 559 ? 2 : width <= 1024 ? 3 : 3
    if (width <= 1024 && row.tagsVisible.length > expectedTags) {
      problems.push({
        width,
        type: 'tags-too-many',
        name: row.name,
        visible: row.tagsVisible,
        expected: expectedTags,
      })
    }

    if (width <= 1024 && row.tagsVisible.length && !row.tagsSingleRow) {
      problems.push({
        width,
        type: 'tags-multiline',
        name: row.name,
        visible: row.tagsVisible,
      })
    }

    if (width <= 1024 && row.tagsClip) {
      problems.push({
        width,
        type: 'tags-clip',
        name: row.name,
        visible: row.tagsVisible,
      })
    }

    if (width <= 1024 && row.tagsFlexDirection !== 'row') {
      problems.push({
        width,
        type: 'tags-not-row',
        name: row.name,
        direction: row.tagsFlexDirection,
      })
    }
    if (row.name === 'своя волна' || row.nameRendered === 'lowercase' && row.name?.includes('СВО')) {
      problems.push({ width, type: 'name-case', name: row.name, transform: row.nameRendered })
    }
  }
}

await browser.close()

if (!problems.length) {
  console.log('OK: directions readability checks passed')
} else {
  console.log(JSON.stringify(problems, null, 2))
}
