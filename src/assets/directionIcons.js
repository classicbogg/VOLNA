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

/** Остров социального дела — сердце (крупное, читается в миниатюре) */
export const IconSocial = icon([
  h('path', {
    d: 'M24 37C14 29 9 24 9 17.5 9 12 13.5 8 24 12c10.5-4 15 0 15 5.5C39 24 34 29 24 37z',
    'stroke-width': '2.5',
  }),
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

/** Остров мастеров — шестерёнка */
export const IconCraft = icon([
  h('circle', { cx: '24', cy: '24', r: '8' }),
  h('circle', { cx: '24', cy: '24', r: '3.5' }),
  h('path', {
    d: 'M24 11v5M24 32v5M11 24h5M32 24h5M15.2 15.2l3.5 3.5M29.3 29.3l3.5 3.5M32.8 15.2l-3.5 3.5M18.7 29.3l-3.5 3.5',
  }),
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
