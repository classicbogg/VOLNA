import { h } from 'vue'

/** Общие параметры иконок островов (48×48, контур) */
export const directionIconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  'stroke-width': '2.25',
  'stroke-linecap': 'round',
  'stroke-linejoin': 'round',
}

const icon = (children) => () => h('svg', directionIconProps, children)

/** Остров технологий — микросхема */
export const IconTech = icon([
  h('rect', { x: '15', y: '15', width: '18', height: '18', rx: '2.5' }),
  h('circle', { cx: '24', cy: '24', r: '2.5' }),
  h('path', { d: 'M24 15V10M24 33V38M15 24H10M33 24H38' }),
  h('path', { d: 'M19 15V12M29 15V12M19 33V36M29 33V36' }),
  h('path', { d: 'M15 19H12M15 29H12M33 19H36M33 29H36' }),
])

/** Остров социального дела — сердце в ладонях */
export const IconSocial = icon([
  h('path', {
    d: 'M24 18c-3-4-9-2.5-9 3c0 4 4 7.5 9 10.5c5-3 9-6.5 9-10.5c0-5.5-6-7-9-3z',
  }),
  h('path', { d: 'M15 30v-3a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1.5' }),
  h('path', { d: 'M21 30v-4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2.5' }),
  h('path', { d: 'M27 30v-5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v3.5' }),
  h('path', { d: 'M13 33c2 4 6.5 6 11 6s9-2 11-6' }),
])

/** Остров красоты и здоровья — лист / баланс */
export const IconWellness = icon([
  h('path', {
    d: 'M24 11c-7 7-11 14-11 20a11 11 0 0 0 22 0c0-6-4-13-11-20z',
  }),
  h('path', { d: 'M24 31v7' }),
])

/** Остров малого бизнеса — портфель */
export const IconBusiness = icon([
  h('rect', { x: '12', y: '19', width: '24', height: '17', rx: '2' }),
  h('path', { d: 'M20 19v-3a4 4 0 0 1 8 0v3' }),
  h('path', { d: 'M12 25h24' }),
  h('circle', { cx: '24', cy: '25', r: '1.75', fill: 'currentColor', stroke: 'none' }),
])

/** Остров моды — платье на вешалке */
export const IconFashion = icon([
  h('path', { d: 'M17 14h14' }),
  h('path', { d: 'M24 14v-2' }),
  h('path', { d: 'M20 16l4-2.5 4 2.5' }),
  h('path', { d: 'M19 16l-2 20h14l-2-20' }),
  h('path', { d: 'M22 16h4l1 5h-6l1-5z' }),
])

/** Остров мастеров — руки лепят чашу */
export const IconCraft = icon([
  h('path', { d: 'M15 33c0-2.5 3-4.5 9-4.5s9 2 9 4.5' }),
  h('path', { d: 'M15 33h18' }),
  h('path', { d: 'M12 31c3-4 7-7 12-7.5' }),
  h('path', { d: 'M36 31c-3-4-7-7-12-7.5' }),
])

/** Остров медиа — экран и play по центру */
export const IconMedia = icon([
  h('rect', { x: '11', y: '14', width: '26', height: '20', rx: '3' }),
  h('path', {
    d: 'M22 21.5 30 24 22 26.5z',
    fill: 'currentColor',
    stroke: 'none',
  }),
])
