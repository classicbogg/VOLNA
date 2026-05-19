<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const AUTOPLAY_MS = 5000
const CAROUSEL_GAP_PX = 16
const MIN_CARD_WIDTH_DESKTOP_PX = 260
const MIN_CARD_WIDTH_TABLET_PX = 240
const SINGLE_COLUMN_MAX_WIDTH = 560
const TWO_COLUMN_MAX_WIDTH = 920
const THREE_COLUMN_MAX_WIDTH = 1200
const MAX_COLUMNS_DESKTOP = 3

const getMinCardWidth = (layoutWidth) => {
  if (layoutWidth <= SINGLE_COLUMN_MAX_WIDTH) {
    return layoutWidth
  }

  if (layoutWidth <= TWO_COLUMN_MAX_WIDTH) {
    return MIN_CARD_WIDTH_TABLET_PX
  }

  return MIN_CARD_WIDTH_DESKTOP_PX
}

const theme = ref('light')
const activePage = ref(0)
const slidesPerView = ref(1)
const slideWidthPx = ref(0)
const viewportRef = ref(null)
let htmlObserver = null
let bodyObserver = null
let autoplayTimer = null
let viewportResizeObserver = null
let scrollRaf = null

const speakers = [
  {
    image: '/speaker_1.png',
    name: 'Ирина Каск',
    role: 'Уполномоченный по защите прав предпринимателей в ХМАО — Югре',
  },
  {
    image: '/speaker_2.png',
    name: 'Дмитрий Суханов',
    role: '',
  },
  {
    image: '/speaker_3.png',
    name: 'Эльмира Ибрагимова',
    role: '',
  },
]

const totalSpeakers = speakers.length

const pageCount = computed(() => Math.max(1, Math.ceil(totalSpeakers / slidesPerView.value)))

const pageIndices = computed(() => Array.from({ length: pageCount.value }, (_, index) => index))

const visibleSpeakers = computed(() => {
  const start = activePage.value * slidesPerView.value
  return speakers.slice(start, start + slidesPerView.value)
})

const visibleSpeakerLabel = computed(() => visibleSpeakers.value.map((speaker) => speaker.name).join(', '))

const trackStyle = computed(() => {
  const width = measureLayoutWidth()
  const gap = getCarouselGap(width)

  return {
    '--slides-per-view': slidesPerView.value,
    '--carousel-gap': `${gap}px`,
    '--slide-width': slideWidthPx.value > 0 ? `${slideWidthPx.value}px` : '100%',
  }
})

const isSpeakerVisible = (index) => {
  const start = activePage.value * slidesPerView.value
  const end = start + slidesPerView.value
  return index >= start && index < end
}

const getCarouselGap = (layoutWidth) => (layoutWidth <= SINGLE_COLUMN_MAX_WIDTH ? 12 : CAROUSEL_GAP_PX)

const measureLayoutWidth = () => {
  const viewportWidth = viewportRef.value?.clientWidth ?? 0
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : viewportWidth

  if (!viewportWidth && !screenWidth) {
    return 0
  }

  if (!viewportWidth) {
    return screenWidth
  }

  if (!screenWidth) {
    return viewportWidth
  }

  return Math.min(viewportWidth, screenWidth)
}

const computeSlidesPerView = (layoutWidth) => {
  if (!layoutWidth) {
    return 1
  }

  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : layoutWidth

  if (screenWidth <= SINGLE_COLUMN_MAX_WIDTH) {
    return 1
  }

  const gap = getCarouselGap(layoutWidth)
  const minCardWidth = getMinCardWidth(layoutWidth)
  let perView = Math.max(1, Math.floor((layoutWidth + gap) / (minCardWidth + gap)))

  if (screenWidth <= TWO_COLUMN_MAX_WIDTH) {
    perView = Math.min(perView, 2)
  } else if (screenWidth <= THREE_COLUMN_MAX_WIDTH) {
    perView = Math.min(perView, 3)
  } else {
    perView = Math.min(perView, MAX_COLUMNS_DESKTOP)
  }

  return Math.min(totalSpeakers, perView)
}

const getPageScrollLeft = (page) => {
  const gap = getCarouselGap(measureLayoutWidth())
  const stride = slidesPerView.value * (slideWidthPx.value + gap)

  if (!stride) {
    return 0
  }

  return page * stride
}

const syncPageFromScroll = () => {
  const viewport = viewportRef.value

  if (!viewport || !slideWidthPx.value) {
    return
  }

  const gap = getCarouselGap(viewport.clientWidth)
  const stride = slidesPerView.value * (slideWidthPx.value + gap)

  if (!stride) {
    return
  }

  const page = Math.round(viewport.scrollLeft / stride)
  activePage.value = Math.min(Math.max(0, page), pageCount.value - 1)
}

const onViewportScroll = () => {
  if (scrollRaf) {
    return
  }

  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = null
    syncPageFromScroll()
  })
}

const updateSlidesPerView = () => {
  const width = measureLayoutWidth()
  if (!width) {
    return
  }

  const perView = computeSlidesPerView(width)
  const gap = getCarouselGap(width)
  const previousPerView = slidesPerView.value
  const firstVisibleIndex = activePage.value * previousPerView
  slidesPerView.value = perView
  slideWidthPx.value = (width - gap * (perView - 1)) / perView

  const newPageCount = Math.max(1, Math.ceil(totalSpeakers / perView))
  activePage.value = Math.min(Math.floor(firstVisibleIndex / perView), newPageCount - 1)

  const viewport = viewportRef.value

  if (viewport) {
    viewport.scrollLeft = getPageScrollLeft(activePage.value)
  }
}

const handleLayoutChange = () => {
  updateSlidesPerView()
}

watch(pageCount, (count) => {
  if (activePage.value > count - 1) {
    activePage.value = count - 1
  }
})

const resolveTheme = () => {
  if (typeof document === 'undefined') {
    return 'light'
  }

  const html = document.documentElement
  const body = document.body
  const htmlTheme = html?.getAttribute('data-theme')
  const bodyTheme = body?.getAttribute('data-theme')

  if (htmlTheme === 'dark' || bodyTheme === 'dark') {
    return 'dark'
  }

  if (html?.classList.contains('dark') || html?.classList.contains('theme-dark')) {
    return 'dark'
  }

  if (body?.classList.contains('dark') || body?.classList.contains('theme-dark')) {
    return 'dark'
  }

  return 'light'
}

const updateTheme = () => {
  theme.value = resolveTheme()
}

const normalizePage = (page) => {
  const count = pageCount.value
  return ((page % count) + count) % count
}

const goToPage = (page) => {
  const normalized = normalizePage(page)
  activePage.value = normalized

  const viewport = viewportRef.value

  if (!viewport) {
    return
  }

  viewport.scrollTo({
    left: getPageScrollLeft(normalized),
    behavior: 'smooth',
  })
}

const next = () => {
  goToPage(activePage.value + 1)
}

const prev = () => {
  goToPage(activePage.value - 1)
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const startAutoplay = () => {
  stopAutoplay()

  if (pageCount.value <= 1) {
    return
  }

  if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }

  autoplayTimer = setInterval(next, AUTOPLAY_MS)
}

const restartAutoplay = () => {
  stopAutoplay()
  startAutoplay()
}

const onManualNav = (direction) => {
  if (direction === 'next') {
    next()
  } else {
    prev()
  }

  restartAutoplay()
}

onMounted(async () => {
  updateTheme()
  await nextTick()
  updateSlidesPerView()
  requestAnimationFrame(() => updateSlidesPerView())
  startAutoplay()

  if (viewportRef.value && typeof ResizeObserver !== 'undefined') {
    viewportResizeObserver = new ResizeObserver(handleLayoutChange)
    viewportResizeObserver.observe(viewportRef.value)
  }

  window.addEventListener('resize', handleLayoutChange)
  window.addEventListener('orientationchange', handleLayoutChange)

  htmlObserver = new MutationObserver(updateTheme)
  htmlObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'class'],
  })

  if (document.body) {
    bodyObserver = new MutationObserver(updateTheme)
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    })
  }
})

onUnmounted(() => {
  stopAutoplay()
  viewportResizeObserver?.disconnect()
  window.removeEventListener('resize', handleLayoutChange)
  window.removeEventListener('orientationchange', handleLayoutChange)
  htmlObserver?.disconnect()
  bodyObserver?.disconnect()

  if (scrollRaf) {
    cancelAnimationFrame(scrollRaf)
  }
})
</script>

<template>
  <section
    class="speakers-section"
    :class="theme === 'dark' ? 'speakers-section--dark' : 'speakers-section--light'"
    id="speakers"
  >
    <div class="speakers-container">
      <div class="speakers-heading">
        <h2>
          <span class="phrase-marker">
            <span class="phrase-marker__text">эксперты</span>
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
      </div>

      <div
        class="speakers-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Спикеры форума"
        @mouseenter="stopAutoplay"
        @mouseleave="startAutoplay"
        @focusin="stopAutoplay"
        @focusout="startAutoplay"
      >
        <button
          v-if="pageCount > 1"
          class="speakers-carousel__nav speakers-carousel__nav--prev"
          type="button"
          aria-label="Предыдущий спикер"
          @click="onManualNav('prev')"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M14 6L8 12L14 18"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div ref="viewportRef" class="speakers-carousel__viewport" @scroll.passive="onViewportScroll">
          <div class="speakers-carousel__track" :style="trackStyle">
            <article
              v-for="(speaker, index) in speakers"
              :key="speaker.name"
              class="speaker-card"
              :aria-hidden="!isSpeakerVisible(index)"
            >
              <div class="speaker-card__photo-wrap">
                <img
                  class="speaker-card__photo"
                  :src="speaker.image"
                  :alt="speaker.name"
                  :loading="isSpeakerVisible(index) ? 'eager' : 'lazy'"
                />
              </div>

              <div class="speaker-card__info">
                <h3>{{ speaker.name }}</h3>
                <p v-if="speaker.role">{{ speaker.role }}</p>
              </div>
            </article>
          </div>
        </div>

        <button
          v-if="pageCount > 1"
          class="speakers-carousel__nav speakers-carousel__nav--next"
          type="button"
          aria-label="Следующий спикер"
          @click="onManualNav('next')"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M10 6L16 12L10 18"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>

      <p class="visually-hidden" aria-live="polite" aria-atomic="true">
        {{ visibleSpeakerLabel }}
      </p>

      <div
        v-if="pageCount > 1"
        class="speakers-carousel__dots"
        role="tablist"
        aria-label="Страницы спикеров"
      >
        <button
          v-for="page in pageIndices"
          :key="`page-${page}`"
          class="speakers-carousel__dot"
          type="button"
          role="tab"
          :aria-selected="page === activePage"
          :aria-label="`Страница ${page + 1} из ${pageCount}`"
          @click="goToPage(page); restartAutoplay()"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.speakers-section {
  --speakers-section-bg: var(--color-speakers-section-bg);
  --speakers-heading: var(--color-speakers-heading);
  --speakers-marker: var(--color-speakers-marker);
  --speakers-card-surface: #fff;
  --speakers-card-media-bg: #e6e9ef;
  --speakers-card-name: #1a2b6d;
  --speakers-card-role: #171717;
  --speakers-card-radius: 22px;
  --speakers-card-media-radius: 16px;
  --speakers-card-shadow: 0 10px 28px rgba(26, 43, 90, 0.1);
  --speakers-nav-bg: var(--palette-cream);
  --speakers-nav-icon: var(--palette-navy);
  --speakers-nav-border: rgba(var(--palette-navy-rgb), 0.1);
  --speakers-nav-shadow: 0 6px 20px rgba(var(--palette-navy-rgb), 0.12);

  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 100%;
  padding: 104px var(--layout-gutter-wide, 40px) 120px;
  background: var(--speakers-section-bg);
  color: var(--speakers-heading);
  overflow-x: clip;
  overflow-y: visible;
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
}

.speakers-container {
  width: min(100%, 1360px);
  margin: 0 auto;
}

.speakers-heading {
  position: relative;
  margin: 0 auto 48px;
  padding: 34px clamp(16px, 5vw, 86px) 42px;
  isolation: isolate;
}

.speakers-heading h2 {
  position: relative;
  z-index: 3;
  margin: 0;
  color: var(--speakers-heading);
  line-height: 0.9;
  font-weight: 950;
  text-align: center;
  text-transform: lowercase;
  letter-spacing: -0.075em;
}

.speakers-heading .phrase-marker {
  --phrase-marker-pad-x: 0.64em;
  --phrase-marker-pad-y-top: 0.4em;
  --phrase-marker-pad-y-bottom: 0.44em;
  --phrase-marker-ring-x: 1.34em;
  --phrase-marker-ring-y: 1.12em;
}

@container (max-width: 420px) {
  .speakers-heading .phrase-marker {
    --phrase-marker-ring-x: 1.1em;
    --phrase-marker-ring-y: 1.02em;
    --phrase-marker-pad-x: 0.58em;
  }
}

.speakers-carousel {
  position: relative;
  width: 100%;
  max-width: 100%;
  padding-inline: clamp(40px, 5vw, 52px);
  box-sizing: border-box;
}

.speakers-carousel__viewport {
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  border-radius: clamp(22px, 4vw, 30px);
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
}

.speakers-carousel__viewport::-webkit-scrollbar {
  display: none;
}

.speakers-carousel__track {
  display: flex;
  align-items: stretch;
  gap: var(--carousel-gap, 16px);
  width: max-content;
}

.speakers-carousel__nav {
  position: absolute;
  top: 50%;
  z-index: 4;
  transform: translateY(-50%);
  width: clamp(44px, 10vw, 56px);
  height: clamp(44px, 10vw, 56px);
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--speakers-nav-border);
  border-radius: 50%;
  background: var(--speakers-nav-bg);
  color: var(--speakers-nav-icon);
  cursor: pointer;
  box-shadow: var(--speakers-nav-shadow);
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.speakers-carousel__nav--prev {
  left: 0;
}

.speakers-carousel__nav--next {
  right: 0;
}

.speakers-carousel__nav:hover {
  transform: translateY(-50%) scale(1.05);
  background: var(--palette-white);
  border-color: rgba(var(--palette-purple-rgb), 0.35);
  box-shadow: 0 8px 24px rgba(var(--palette-navy-rgb), 0.16);
}

.speakers-carousel__nav:active {
  transform: translateY(-50%) scale(0.98);
}

.speakers-carousel__nav:focus-visible {
  outline: 3px solid var(--palette-purple);
  outline-offset: 3px;
}

.speakers-carousel__dots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: clamp(6px, 1.2vw, 10px);
  width: 100%;
  margin-top: clamp(14px, 2.5vw, 20px);
  padding-inline: clamp(4px, 2vw, 12px);
}

.speakers-carousel__dot {
  width: 10px;
  height: 10px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(var(--palette-navy-rgb), 0.22);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

.speakers-section--dark .speakers-carousel__dot {
  background: rgba(var(--palette-cream-rgb), 0.28);
}

.speakers-carousel__dot[aria-selected='true'] {
  background: var(--palette-orange);
  transform: scale(1.2);
}

.speakers-section--dark .speakers-carousel__dot[aria-selected='true'] {
  background: var(--palette-pink);
}

.speakers-carousel__dot:focus-visible {
  outline: 2px solid var(--palette-purple);
  outline-offset: 2px;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.speaker-card {
  position: relative;
  flex: 0 0 var(--slide-width, 280px);
  width: var(--slide-width, 280px);
  max-width: 100%;
  min-width: 0;
  height: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  border: none;
  border-radius: var(--speakers-card-radius);
  background: var(--speakers-card-surface);
  box-shadow: var(--speakers-card-shadow);
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

.speakers-section--dark {
  --speakers-card-surface: var(--color-speakers-card-bg);
  --speakers-card-media-bg: rgba(var(--palette-cream-rgb), 0.1);
  --speakers-card-name: var(--palette-cream);
  --speakers-card-role: rgba(var(--palette-cream-rgb), 0.82);
  --speakers-card-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);
  --speakers-nav-bg: var(--palette-cream);
  --speakers-nav-icon: var(--palette-navy);
  --speakers-nav-border: rgba(var(--palette-navy-rgb), 0.14);
  --speakers-nav-shadow: 0 8px 26px rgba(0, 0, 0, 0.32);
}

.speaker-card__photo-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  flex-shrink: 0;
  border-radius: var(--speakers-card-media-radius);
  background: var(--speakers-card-media-bg);
  overflow: hidden;
}

.speaker-card__photo {
  position: absolute;
  left: 50%;
  bottom: 0;
  z-index: 1;
  width: 94%;
  height: 100%;
  max-width: none;
  display: block;
  transform: translateX(-50%);
  transform-origin: center bottom;
  object-fit: contain;
  object-position: center bottom;
}

.speaker-card__info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 4px 4px;
  text-align: left;
  min-width: 0;
}

.speaker-card__info h3 {
  margin: 0;
  color: var(--speakers-card-name);
  font-size: clamp(17px, 4.2vw, 22px);
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -0.03em;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.speaker-card__info p {
  margin: 0;
  color: var(--speakers-card-role);
  font-size: clamp(13px, 3.4vw, 15px);
  line-height: 1.4;
  font-weight: 500;
  letter-spacing: -0.01em;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

@media (min-width: 1025px) and (max-width: 1439px) {
  .speakers-section {
    padding: 92px var(--layout-gutter-wide) 104px;
  }

  .speakers-container {
    width: min(1200px, 100%);
  }

  .speakers-heading {
    padding: 30px 64px 38px;
    margin-bottom: 42px;
  }

  .speakers-carousel {
    padding-inline: 48px;
  }

  .speakers-carousel__nav {
    width: 52px;
    height: 52px;
  }
}

@media (min-width: 1440px) and (max-width: 1919px) {
  .speakers-container {
    width: min(1360px, 100%);
  }

}

@media (min-width: 1920px) {
  .speakers-section {
    padding: 120px var(--layout-gutter-wide, 80px) 132px;
  }

  .speakers-container {
    width: min(1480px, 100%);
  }

}

@media (max-width: 1024px) and (min-width: 761px) {
  .speakers-section {
    padding: 84px var(--layout-gutter-wide) 96px;
  }

  .speakers-heading {
    margin-bottom: 32px;
    padding: 28px 44px 34px;
  }

  .speakers-carousel {
    padding-inline: clamp(8px, 2vw, 24px);
  }

  .speaker-card__info h3 {
    font-size: clamp(18px, 2vw, 21px);
  }
}

@media (max-width: 900px) {
  .speakers-section {
    padding: 80px var(--layout-gutter, 24px) 92px;
  }

  .speakers-heading {
    margin-bottom: 36px;
    padding: 26px clamp(20px, 5vw, 56px) 32px;
  }
}

@media (max-width: 560px) {
  .speakers-carousel {
    padding-inline: 0;
    gap: 10px;
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr) 40px;
    grid-template-rows: auto auto;
    align-items: center;
  }

  .speakers-carousel__nav {
    position: static;
    transform: none;
    width: 40px;
    height: 40px;
    grid-row: 1;
  }

  .speakers-carousel__nav--prev {
    grid-column: 1;
    justify-self: center;
  }

  .speakers-carousel__nav--next {
    grid-column: 3;
    justify-self: center;
  }

  .speakers-carousel__nav:hover,
  .speakers-carousel__nav:active {
    transform: scale(1.05);
  }

  .speakers-carousel__nav:active {
    transform: scale(0.98);
  }

  .speakers-carousel__viewport {
    grid-column: 2;
    grid-row: 1;
    width: 100%;
    min-width: 0;
    scroll-snap-type: x mandatory;
  }
}

@media (max-width: 600px) {
  .speakers-section {
    padding: 70px var(--layout-gutter) 84px;
  }

  .speakers-heading {
    margin-bottom: 28px;
    padding: 26px clamp(20px, 6vw, 44px) 32px;
    max-width: 100%;
  }

  .speakers-heading h2 {
    line-height: 0.92;
    letter-spacing: -0.065em;
  }

  .speakers-carousel__nav {
    width: 40px;
    height: 40px;
  }

  .speakers-carousel__nav :deep(svg) {
    width: 20px;
    height: 20px;
  }

  .speakers-carousel__viewport {
    border-radius: 22px;
  }

  .speaker-card {
    --speakers-card-radius: 20px;
    --speakers-card-media-radius: 14px;
    padding: 12px;
    gap: 12px;
  }

  .speaker-card__info h3 {
    line-height: 1.18;
  }

  .speaker-card__info p {
    line-height: 1.4;
  }

  .speakers-carousel__dots {
    gap: 5px;
    margin-top: 12px;
    padding-inline: 2px;
  }

  .speakers-carousel__dot {
    width: 7px;
    height: 7px;
  }
}

@media (max-width: 480px) {
  .speakers-section {
    padding: 64px var(--layout-gutter) 76px;
  }

  .speakers-heading {
    padding: 22px var(--layout-gutter) 28px;
    margin-bottom: 24px;
  }

  .speakers-heading h2 {
    font-size: clamp(36px, 12vw, 50px);
  }
}

@media (max-width: 380px) {
  .speakers-section {
    padding-inline: var(--layout-gutter);
  }

  .speakers-heading {
    padding-inline: var(--layout-gutter);
  }

  .speakers-carousel {
    grid-template-columns: 34px minmax(0, 1fr) 34px;
    gap: 8px;
  }

  .speakers-carousel__nav {
    width: 34px;
    height: 34px;
  }

  .speakers-carousel__nav :deep(svg) {
    width: 17px;
    height: 17px;
  }

  .speaker-card {
    padding: 10px;
    gap: 10px;
  }

  .speaker-card__info h3 {
    font-size: clamp(16px, 5vw, 19px);
  }

  .speaker-card__info p {
    font-size: 14px;
  }
}

@media (max-width: 320px) {
  .speakers-carousel {
    grid-template-columns: 32px minmax(0, 1fr) 32px;
  }

  .speakers-carousel__nav {
    width: 32px;
    height: 32px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .speakers-carousel__viewport {
    scroll-behavior: auto;
  }

  .speakers-carousel__nav,
  .speakers-carousel__dot {
    transition-duration: 0.01ms;
  }
}
</style>