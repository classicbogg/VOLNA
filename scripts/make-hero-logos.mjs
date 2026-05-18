import fs from 'node:fs'

const taglineRe =
  /<path d="M25\.9632 202\.248[\s\S]*?fill="url\(#paint0_linear[^"]*\)"\/>\s*/

function makeHero(src, dest) {
  let svg = fs.readFileSync(src, 'utf8')
  svg = svg.replace(taglineRe, '')
  svg = svg.replace(
    'width="605" height="219" viewBox="0 0 605 219"',
    'width="605" height="172" viewBox="0 0 605 172"',
  )
  fs.writeFileSync(dest, svg)
  console.log(`Created ${dest}`)
}

makeHero('public/volna-logo-color.svg', 'public/volna-logo-color-hero.svg')
makeHero('public/volna-logo-white.svg', 'public/volna-logo-white-hero.svg')
