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
          Восемь направлений форума — выбери тему, которая тебе откликается
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
              <p v-if="direction.points[0]" class="directions-row__lead">{{ direction.points[0] }}</p>
            </div>

            <div
              class="directions-row__tags-wrap"
            >
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
import { onMounted, onUnmounted, ref } from 'vue'
import WaveDecor from './WaveDecor.vue'
import { directions } from '../data/directions.js'

/** До 1024px — компактные плашки; до 560px — 2 шт., от 560px — 3 шт. */
const TAGS_COMPACT_MQ = '(max-width: 1024px)'
const TAGS_TWO_MAX_MQ = '(max-width: 559px)'

const sectionRef = ref(null)
const sectionVisible = ref(false)
const activeKey = ref(null)
/** Сбрасывается при смене брейкпоинта плашек — перерисовка списка тегов */
const tagsLayoutVersion = ref(0)
let observer = null
let tagsCompactMq = null
let tagsTwoMaxMq = null
let teardownTagsLayout = null

const isCompactTagsViewport = () => {
  if (typeof window === 'undefined') {
    return false
  }
  return (tagsCompactMq ?? window.matchMedia(TAGS_COMPACT_MQ)).matches
}

const maxVisibleTags = () => {
  if (!isCompactTagsViewport()) {
    return Number.POSITIVE_INFINITY
  }
  if ((tagsTwoMaxMq ?? window.matchMedia(TAGS_TWO_MAX_MQ)).matches) {
    return 2
  }
  return 3
}

const setActive = (key) => {
  activeKey.value = key
}

const clearActive = () => {
  activeKey.value = null
}

const visibleTagsFor = (direction) => {
  void tagsLayoutVersion.value

  const limit = maxVisibleTags()
  if (!Number.isFinite(limit)) {
    return direction.tags
  }

  return direction.tags.slice(0, Math.min(limit, direction.tags.length))
}

const setupTagsLayout = () => {
  tagsCompactMq = window.matchMedia(TAGS_COMPACT_MQ)
  tagsTwoMaxMq = window.matchMedia(TAGS_TWO_MAX_MQ)

  const onTagsLayoutChange = () => {
    tagsLayoutVersion.value += 1
  }

  tagsCompactMq.addEventListener('change', onTagsLayoutChange)
  tagsTwoMaxMq.addEventListener('change', onTagsLayoutChange)

  return () => {
    tagsCompactMq?.removeEventListener('change', onTagsLayoutChange)
    tagsTwoMaxMq?.removeEventListener('change', onTagsLayoutChange)
  }
}

onMounted(() => {
  teardownTagsLayout = setupTagsLayout()

  if (!('IntersectionObserver' in window)) {
    sectionVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        sectionVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -60px 0px' },
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
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
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: clip;
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
  line-height: 1.08;
  letter-spacing: -0.05em;
  text-transform: none;
  text-wrap: balance;
}

.directions-row__lead {
  margin: 8px 0 0;
  color: var(--color-directions-row-lead, rgba(var(--palette-navy-rgb), 0.78));
  font-size: clamp(14px, 1.2vw, 16px);
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: -0.02em;
  text-wrap: pretty;
}

.directions-row__tags-wrap {
  position: relative;
  grid-column: 2;
  grid-row: 2;
  min-width: 0;
  max-width: 100%;
  margin: 6px 0 0;
  overflow: hidden;
}

.directions-row__tags {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}

.directions-row__tags li {
  flex-shrink: 0;
}

.directions-row__tags li {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: fit-content;
  padding: 6px 16px;
  border-radius: 999px;
  color: var(--color-directions-row-text, var(--palette-navy));
  background: var(--color-directions-row-chip-bg, transparent);
  border: 2px solid rgba(var(--row-accent-rgb), 0.52);
  box-shadow: none;
  outline: none;
  font-size: clamp(12px, 1.15vw, 14px);
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -0.04em;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
}

@media (min-width: 1025px) {
  .directions-row__tags-wrap {
    overflow: visible;
  }

  .directions-row__tags {
    overflow: visible;
  }

  .directions-row__tags {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    align-items: stretch;
    overflow: visible;
  }

  .directions-row__tags li {
    width: 100%;
    padding-inline: 10px;
    text-align: center;
  }
}

.directions-row:hover .directions-row__tags li,
.directions-row--active .directions-row__tags li {
  background: transparent;
  border-color: var(--row-accent);
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

@media (max-width: 559px) {
  .directions-row__tags {
    gap: 6px;
  }

  .directions-row__tags li {
    padding: 6px 10px;
    font-size: clamp(11px, 3.25vw, 12px);
    line-height: 1.2;
    letter-spacing: -0.03em;
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
    grid-column: 1 / -1;
    width: 100%;
    margin-top: 8px;
    padding-top: 2px;
  }

  .directions-row__tags {
    gap: 6px;
    justify-content: flex-end;
  }

  .directions-row__tags li {
    font-size: clamp(11px, 2.1vw, 13px);
    padding: 6px 11px;
  }

  .directions-row__lead {
    font-size: clamp(14px, 1.45vw, 16px);
  }
}

@media (max-width: 900px) {
  .directions {
    padding-inline: var(--layout-gutter);
  }
}

@media (max-width: 720px) and (min-width: 560px) {
  .directions-row__tags {
    gap: 6px;
  }

  .directions-row__tags li {
    padding: 6px 10px;
    font-size: 12px;
    line-height: 1.2;
    letter-spacing: -0.03em;
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
    line-height: 1.1;
  }

  .directions-row__lead {
    font-size: clamp(14px, 3.6vw, 16px);
    line-height: 1.5;
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
    padding: 16px 12px;
    gap: 10px 12px;
  }

  .directions-row__lead {
    margin-top: 6px;
  }

  .directions-row__icon {
    width: 46px;
    height: 46px;
    flex-shrink: 0;
  }

}

@media (max-width: 360px) {
  .directions-row__name {
    font-size: clamp(16px, 4.8vw, 20px);
  }

  .directions-row__lead {
    font-size: 14px;
    line-height: 1.5;
  }

  .directions-row__tags li {
    padding: 6px 9px;
    font-size: 11px;
  }
}
</style>
