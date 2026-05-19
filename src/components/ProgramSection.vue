<template>
  <section class="directions" id="directions">
    <WaveDecor placement="left" size="md" />
    <WaveDecor placement="right" size="lg" />
    <WaveDecor placement="top" size="sm" />

    <div ref="sectionRef" class="directions__inner">
      <header class="directions__header">
        <h2>
          <span class="phrase-marker directions-heading">
            <span class="phrase-marker__text">направления</span>
            <svg
              class="phrase-marker__svg"
              viewBox="0 0 760 190"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M70 112C65 63 126 31 230 20C356 7 580 1 674 39C750 70 711 128 609 150C490 176 262 174 128 150C47 136 15 96 51 64"
                stroke="currentColor"
                stroke-width="8"
                stroke-linecap="round"
              />
            </svg>
          </span>
        </h2>
        <p class="directions__lead">
          Семь направлений форума — выбери тему, которая тебе откликается
        </p>
      </header>

      <ul
        class="directions-list"
        :class="{ 'directions-list--visible': sectionVisible }"
      >
        <li
          v-for="(direction, index) in directions"
          :key="direction.key"
          class="directions-list__item"
          :style="{ '--enter-delay': `${index * 60}ms` }"
        >
          <article
            class="directions-row"
            :class="{ 'directions-row--active': activeKey === direction.key }"
            :style="{
              '--row-accent': direction.accent,
              '--row-accent-rgb': direction.accentRgb,
            }"
            tabindex="0"
            @mouseenter="setActive(direction.key)"
            @mouseleave="clearActive"
            @focusin="setActive(direction.key)"
            @focusout="clearActive"
          >
            <span
              class="directions-row__icon"
              role="img"
              :aria-label="direction.shortName"
            >
              <component :is="direction.icon" />
            </span>

            <div class="directions-row__main">
              <h3 class="directions-row__name">{{ direction.shortName }}</h3>
              <p class="directions-row__lead">{{ direction.points[0] }}</p>
            </div>

            <div
              class="directions-row__tags-wrap"
              :data-direction-key="direction.key"
            >
              <ul
                class="directions-row__tags directions-row__tags--measure"
                aria-hidden="true"
              >
                <li v-for="tag in direction.tags" :key="`measure-${direction.key}-${tag}`">
                  {{ tag }}
                </li>
              </ul>
              <ul
                class="directions-row__tags"
                :aria-label="`Темы: ${direction.shortName}`"
              >
                <li v-for="tag in visibleTagsFor(direction)" :key="tag">{{ tag }}</li>
              </ul>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import WaveDecor from './WaveDecor.vue'
import { directions } from '../data/directions.js'

const TAGS_COMPACT_MQ = '(max-width: 1024px)'
const TAG_GAP_PX = 9

const sectionRef = ref(null)
const sectionVisible = ref(false)
const activeKey = ref(null)
const tagFitCounts = ref({})
let observer = null
let tagsMq = null
let tagsResizeObserver = null

const setActive = (key) => {
  activeKey.value = key
}

const clearActive = () => {
  activeKey.value = null
}

const visibleTagsFor = (direction) => {
  if (!tagsMq?.matches) {
    return direction.tags
  }

  const count = tagFitCounts.value[direction.key] ?? direction.tags.length
  return direction.tags.slice(0, count)
}

const remeasureDirectionTags = () => {
  if (!sectionRef.value) {
    return
  }

  if (!tagsMq?.matches) {
    tagFitCounts.value = {}
    return
  }

  const wraps = sectionRef.value.querySelectorAll('.directions-row__tags-wrap[data-direction-key]')
  const next = {}

  wraps.forEach((wrap) => {
    const key = wrap.dataset.directionKey
    const direction = directions.find((item) => item.key === key)

    if (!direction?.tags.length) {
      return
    }

    const measureList = wrap.querySelector('.directions-row__tags--measure')
    const items = measureList ? [...measureList.children] : []
    const width = wrap.clientWidth

    if (!width || !items.length) {
      next[key] = direction.tags.length
      return
    }

    let used = 0
    let count = 0

    for (const item of items) {
      const chipWidth = item.offsetWidth

      if (count === 0) {
        count = 1
        used = chipWidth
        continue
      }

      if (used + TAG_GAP_PX + chipWidth <= width + 1) {
        used += TAG_GAP_PX + chipWidth
        count += 1
      } else {
        break
      }
    }

    next[key] = Math.min(direction.tags.length, Math.max(1, count))
  })

  tagFitCounts.value = next
}

const setupTagsLayout = () => {
  tagsMq = window.matchMedia(TAGS_COMPACT_MQ)
  const onTagsLayoutChange = () => {
    nextTick(() => remeasureDirectionTags())
  }

  tagsMq.addEventListener('change', onTagsLayoutChange)
  onTagsLayoutChange()

  const attachResizeObserver = () => {
    if (!sectionRef.value) {
      return
    }

    if ('ResizeObserver' in window) {
      tagsResizeObserver = new ResizeObserver(() => {
        remeasureDirectionTags()
      })
      tagsResizeObserver.observe(sectionRef.value)
    } else {
      window.addEventListener('resize', remeasureDirectionTags)
    }
  }

  nextTick(attachResizeObserver)

  return () => {
    tagsMq?.removeEventListener('change', onTagsLayoutChange)
    tagsResizeObserver?.disconnect()
    window.removeEventListener('resize', remeasureDirectionTags)
  }
}

let teardownTagsLayout = null

onMounted(() => {
  teardownTagsLayout = setupTagsLayout()

  if (!('IntersectionObserver' in window)) {
    sectionVisible.value = true
    nextTick(() => remeasureDirectionTags())
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        sectionVisible.value = true
        nextTick(() => remeasureDirectionTags())
        observer?.disconnect()
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -60px 0px' },
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

watch(sectionVisible, (visible) => {
  if (visible) {
    nextTick(() => remeasureDirectionTags())
  }
})

onUnmounted(() => {
  observer?.disconnect()
  teardownTagsLayout?.()
})
</script>

<style scoped>
.directions {
  position: relative;
  width: 100%;
  padding: clamp(80px, 9vw, 112px) var(--layout-gutter-wide, 40px) clamp(96px, 11vw, 128px);
  overflow: hidden;
}

.directions__inner {
  position: relative;
  z-index: 2;
  width: min(1540px, 100%);
  margin: 0 auto;
}

.directions__header {
  position: relative;
  width: 100%;
  max-width: 100%;
  margin: 0 auto clamp(40px, 5vw, 56px);
  padding: 0 clamp(20px, 4vw, 80px);
  text-align: center;
}

.directions__header h2 {
  margin: 0;
  color: var(--color-directions-heading, var(--palette-cream));
  font-weight: 950;
  line-height: 0.9;
  letter-spacing: -0.08em;
  text-transform: lowercase;
}

.directions__lead {
  position: relative;
  z-index: 2;
  max-width: 780px;
  margin: clamp(18px, 2.5vw, 28px) auto 0;
  color: var(--color-directions-muted, rgba(var(--palette-cream-rgb), 0.8));
  font-size: clamp(18px, 1.85vw, 28px);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.directions-list {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  width: min(100%, 720px);
  margin: 0 auto;
  padding: 0;
  list-style: none;
}

.directions-list__item {
  width: 100%;
}

.directions-row {
  --row-border: var(--color-directions-row-border, rgba(var(--palette-navy-rgb), 0.14));

  width: 100%;
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  grid-template-rows: auto auto;
  align-items: start;
  gap: 10px 16px;
  padding: clamp(16px, 1.8vw, 20px) clamp(18px, 2vw, 24px);
  border: 2px solid var(--row-border);
  border-left: 4px solid var(--row-accent);
  border-radius: 20px;
  color: var(--color-directions-row-text, var(--palette-navy));
  background: var(--color-directions-row-bg, var(--palette-cream));
  opacity: 0;
  translate: 0 16px;
  box-shadow: 0 10px 28px var(--color-directions-row-shadow, rgba(var(--palette-navy-rgb), 0.12));
  transition:
    border-color 220ms ease,
    box-shadow 220ms ease,
    translate 220ms ease;
  outline: none;
}

.directions-list--visible .directions-row {
  animation: directionsRowEnter 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--enter-delay, 0ms);
}

.directions-row:hover,
.directions-row--active,
.directions-row:focus-visible {
  --row-border: rgba(var(--row-accent-rgb), 0.35);
  border-left-color: var(--row-accent);
  box-shadow: 0 14px 32px rgba(var(--row-accent-rgb), 0.16);
  translate: 0 0;
}

.directions-row__icon {
  grid-column: 1;
  grid-row: 1 / -1;
  align-self: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 2px solid rgba(var(--row-accent-rgb), 0.55);
  background: var(--color-directions-row-badge-bg, var(--palette-white));
  color: var(--color-directions-row-badge-fg, var(--row-accent));
  width: 56px;
  height: 56px;
  border-radius: 16px;
}

.directions-row__icon :deep(svg) {
  display: block;
  width: 34px;
  height: 34px;
}

.directions-row__main {
  grid-column: 2;
  grid-row: 1;
  min-width: 0;
}

.directions-row__name {
  margin: 0;
  color: var(--color-directions-row-text, var(--palette-navy));
  font-size: clamp(20px, 1.8vw, 28px);
  font-weight: 950;
  line-height: 1;
  letter-spacing: -0.05em;
  text-transform: lowercase;
}

.directions-row__lead {
  margin: 8px 0 0;
  color: var(--color-directions-row-lead, rgba(var(--palette-navy-rgb), 0.78));
  font-size: clamp(13px, 1.05vw, 15px);
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.02em;
}

.directions-row__tags-wrap {
  grid-column: 2;
  grid-row: 2;
  min-width: 0;
  max-width: 100%;
  margin: 2px 0 0;
}

.directions-row__tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;
  gap: 9px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.directions-row__tags--measure {
  position: absolute;
  width: 100%;
  visibility: hidden;
  pointer-events: none;
  flex-wrap: nowrap;
  overflow: hidden;
  height: 0;
  margin: 0;
}

.directions-row__tags li {
  flex-shrink: 0;
  padding: 6px 13px;
  border-radius: 999px;
  color: var(--color-directions-row-text, var(--palette-navy));
  background: rgba(var(--row-accent-rgb), 0.08);
  border: none;
  box-shadow: none;
  outline: none;
  font-size: clamp(12px, 1.15vw, 14px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.03em;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
}

.directions-row:hover .directions-row__tags li,
.directions-row--active .directions-row__tags li {
  background: rgba(var(--row-accent-rgb), 0.16);
}

@keyframes directionsRowEnter {
  0% {
    opacity: 0;
    translate: 0 20px;
  }
  100% {
    opacity: 1;
    translate: 0 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .directions-row,
  .directions-list--visible .directions-row {
    opacity: 1;
    translate: 0;
  }

  .directions-row:hover,
  .directions-row--active {
    translate: 0;
  }
}

@media (min-width: 1025px) {
  .directions-row__tags--measure {
    display: none;
  }
}

@media (min-width: 1025px) and (max-width: 1439px) {
  .directions__inner {
    width: min(1200px, 100%);
  }

  .directions__lead {
    font-size: clamp(18px, 1.5vw, 24px);
  }

  .directions-list {
    width: min(100%, 680px);
  }
}

@media (min-width: 1440px) and (max-width: 1919px) {
  .directions__inner {
    width: min(1400px, 100%);
  }

  .directions-list {
    width: min(100%, 720px);
  }
}

@media (min-width: 1920px) {
  .directions {
    padding-inline: var(--layout-gutter-wide, 80px);
  }

  .directions__inner {
    width: min(1540px, 100%);
  }

}

@media (max-width: 1024px) {
  .directions {
    padding:
      clamp(72px, 8vw, 88px)
      var(--layout-gutter-wide)
      clamp(80px, 9vw, 96px);
  }

  .directions__header {
    padding-inline: clamp(12px, 3vw, 40px);
    margin-bottom: clamp(32px, 4vw, 44px);
  }

  .directions__lead {
    font-size: clamp(17px, 1.8vw, 21px);
    max-width: 36em;
    margin-inline: auto;
  }

  .directions-row__tags-wrap {
    position: relative;
  }

  .directions-row__tags:not(.directions-row__tags--measure) {
    flex-wrap: nowrap;
    overflow: hidden;
  }

  .directions-row__tags li {
    font-size: clamp(12px, 1.35vw, 14px);
    padding: 6px 12px;
  }
}

@media (max-width: 900px) {
  .directions {
    padding-inline: var(--layout-gutter);
  }
}

@media (max-width: 680px) {
  .directions-list__item,
  .directions-row {
    width: 100%;
    max-width: 100%;
  }

  .directions-row__main {
    min-width: 0;
    max-width: none;
  }

  .directions__header {
    padding-inline: 8px;
  }

  .directions-row__icon {
    width: 52px;
    height: 52px;
  }

  .directions-row__icon :deep(svg) {
    width: 30px;
    height: 30px;
  }

  .directions-row__name {
    font-size: clamp(18px, 5.2vw, 24px);
    line-height: 1.05;
  }

  .directions-row__tags li {
    font-size: clamp(12px, 3.4vw, 14px);
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .directions {
    padding:
      clamp(56px, 10vw, 72px)
      var(--layout-gutter)
      clamp(64px, 12vw, 80px);
  }

  .directions__header {
    margin-bottom: 28px;
    padding-inline: 0;
  }

  .directions__lead {
    font-size: clamp(16px, 4.2vw, 20px);
  }

  .directions-row {
    padding: 16px 14px;
    gap: 12px;
  }

  .directions-row__icon {
    width: 46px;
    height: 46px;
    flex-shrink: 0;
  }

  .directions-row__tags li {
    font-size: clamp(13px, 3.6vw, 14px);
    padding: 6px 11px;
  }
}

@media (max-width: 360px) {
  .directions-row__name {
    font-size: clamp(16px, 4.8vw, 20px);
  }

  .directions-row__lead {
    font-size: 14px;
  }

  .directions-row__tags li {
    font-size: 12px;
    padding: 5px 10px;
  }
}
</style>
