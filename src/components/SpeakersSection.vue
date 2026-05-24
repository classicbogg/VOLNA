<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const AUTOPLAY_MS = 5000
const CAROUSEL_GAP_PX = 18
const MIN_CARD_WIDTH_DESKTOP_PX = 300
const MIN_CARD_WIDTH_TABLET_PX = 270
const SINGLE_COLUMN_MAX_WIDTH = 640
const TWO_COLUMN_MAX_WIDTH = 960
const THREE_COLUMN_MAX_WIDTH = 1280
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
    role: 'Менеджер компетенции «Предпринимательство» движения «Профессионалы»',
  },
  {
    image: '/speaker_11.png',
    name: 'Дарья Гаврикова',
    role: 'Начальник управления потребительского рынка и защиты прав потребителей Администрации г. Сургута',
  },
  {
    image: '/speaker_10.png',
    name: 'Алёна Соловьева',
    role: 'Руководитель галереи текстиля «Антураж»',
  },
  {
    image: '/speaker_3.png',
    name: 'Эльмира Ибрагимова',
    role: 'Предприниматель, владелец салона красоты «Dipael», главный врач стоматологии «Salve»',
  },
  {
    image: '/speaker_4.png',
    name: 'Александра Таранова',
    role: 'Владелец студии эстетики лица и тела «Философия»',
  },
  {
    image: '/speaker_8.png',
    name: 'Сергей Проворов',
    role: 'Коммерческий директор компании ИП Гринкевич А.В.',
  },
  {
    image: '/speaker_9.png',
    name: 'Ирина Токарева',
    role: 'Руководитель группы компаний АНОДО «Счастье» и ООО ЦДОК «Логоритм»',
  },
  {
    image: '/speaker_5.png',
    name: 'Светлана Гоппова',
    role: 'Создатель студии десертов «Без сахара» и руководитель фитнес-бара  «Без сахара»',
  },
  {
    image: '/speaker_6.png',
    name: 'Зоя Куюмчян',
    role: 'Директор центра нейроразвития детей «Развитория»',
  },
  {
    image: '/speaker_7.png',
    name: 'Евгения Черенкова',
    role: 'Основатель бренда «Северный берег. Эксперт в сфере креативных индустрий, предприниматель',
  },
  {
    image: '/speaker_12.webp',
    name: 'Олейник София Владимировна',
    role: 'Владелец Центра йоги «Дыши», преподаватель йоги, звукотерапевт. Социальный предприниматель.',
  },
  {
    image: '/speaker_13.webp',
    name: 'Васильева Екатерина Александровна',
    role: 'Основатель бренда «TWO KEI»',
  },
  {
    image: '/speaker_14.webp',
    name: 'Суровцева Екатерина Юрьевна',
    role: 'Основатель бренда «TWO KEI»',
  },
  ...Array.from({ length: 11 }, () => ({
    image: '/speaker_0.png',
    name: 'Анонс',
    role: 'Имя эксперта появится позже',
    isPlaceholder: true,
  })),
]

const totalSpeakers = speakers.length

const pageCount = computed(() => Math.max(1, Math.ceil(totalSpeakers / slidesPerView.value)))

const pageIndices = computed(() => Array.from({ length: pageCount.value }, (_, index) => index))

const visibleSpeakers = computed(() => {
  const start = activePage.value * slidesPerView.value
  return speakers.slice(start, start + slidesPerView.value)
})

const visibleSpeakerLabel = computed(() => visibleSpeakers.value.map((speaker) => speaker.name).join(', '))

const getCarouselGap = (layoutWidth) => {
  if (layoutWidth <= 360) {
    return 10
  }

  if (layoutWidth <= SINGLE_COLUMN_MAX_WIDTH) {
    return 12
  }

  return CAROUSEL_GAP_PX
}

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
  slideWidthPx.value = Math.max(0, (width - gap * (perView - 1)) / perView)

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

        <p class="speakers-lead">
          Спикеры форума, которые поделятся опытом, практикой и реальными историями развития.
        </p>
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
              :key="`${speaker.name}-${index}`"
              class="speaker-card"
              :class="{ 'speaker-card--placeholder': speaker.isPlaceholder }"
              :aria-hidden="!isSpeakerVisible(index)"
            >
              <div class="speaker-card__photo-wrap">
                <img
                  class="speaker-card__photo"
                  :class="{ 'speaker-card__photo--blurred': speaker.isPlaceholder }"
                  :src="speaker.image"
                  :alt="speaker.name"
                  :loading="isSpeakerVisible(index) ? 'eager' : 'lazy'"
                />

                <div v-if="speaker.isPlaceholder" class="speaker-card__veil">
                  <span>скоро</span>
                </div>
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
  --speakers-card-surface: rgba(255, 255, 255, 0.92);
  --speakers-card-media-bg: rgba(var(--palette-cream-rgb), 0.82);
  --speakers-card-name: var(--palette-navy);
  --speakers-card-role: rgba(var(--palette-navy-rgb), 0.74);
  --speakers-card-border: rgba(var(--palette-purple-rgb), 0.14);
  --speakers-card-radius: 30px;
  --speakers-card-media-radius: 22px;
  --speakers-card-shadow: 0 24px 56px rgba(var(--palette-navy-rgb), 0.14);
  --speakers-card-shadow-hover: 0 34px 76px rgba(var(--palette-navy-rgb), 0.2);
  --speakers-nav-bg: var(--palette-cream);
  --speakers-nav-icon: var(--palette-navy);
  --speakers-nav-border: rgba(var(--palette-navy-rgb), 0.12);
  --speakers-nav-shadow: 0 14px 34px rgba(var(--palette-navy-rgb), 0.16);

  position: relative;
  isolation: isolate;
  width: 100%;
  max-width: 100%;
  padding: 108px var(--layout-gutter-wide, 40px) 122px;
  background: var(--speakers-section-bg);
  color: var(--speakers-heading);
  overflow-x: clip;
  overflow-y: visible;
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
}

.speakers-section--dark {
  --speakers-card-surface: rgba(var(--palette-navy-rgb), 0.72);
  --speakers-card-media-bg: rgba(var(--palette-cream-rgb), 0.1);
  --speakers-card-name: var(--palette-cream);
  --speakers-card-role: rgba(var(--palette-cream-rgb), 0.78);
  --speakers-card-border: rgba(var(--palette-peach-rgb), 0.16);
  --speakers-card-shadow: 0 26px 64px rgba(0, 0, 0, 0.32);
  --speakers-card-shadow-hover: 0 36px 82px rgba(0, 0, 0, 0.46);
  --speakers-nav-bg: var(--palette-cream);
  --speakers-nav-icon: var(--palette-navy);
  --speakers-nav-border: rgba(var(--palette-navy-rgb), 0.16);
  --speakers-nav-shadow: 0 18px 42px rgba(0, 0, 0, 0.36);
}

.speakers-container {
  position: relative;
  z-index: 2;
  width: min(100%, 1400px);
  margin: 0 auto;
}

.speakers-heading {
  position: relative;
  max-width: 980px;
  margin: 0 auto 54px;
  padding: 0 clamp(12px, 4vw, 48px);
  text-align: center;
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
  --phrase-marker-ring-x: 2.1em;
  --phrase-marker-ring-y: 1.76em;
}

.speakers-lead {
  max-width: 720px;
  margin: clamp(20px, 2.2vw, 28px) auto 0;
  color: var(--speakers-card-role);
  font-size: clamp(17px, 1.65vw, 23px);
  line-height: 1.32;
  font-weight: 750;
  letter-spacing: -0.035em;
}

.speakers-carousel {
  position: relative;
  width: 100%;
  max-width: 100%;
  padding-inline: clamp(52px, 5vw, 70px);
  box-sizing: border-box;
}

.speakers-carousel__viewport {
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 6px;
  border-radius: clamp(28px, 3vw, 42px);
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
  gap: var(--carousel-gap, 18px);
  width: max-content;
}

.speakers-carousel__nav {
  position: absolute;
  top: 50%;
  z-index: 4;
  transform: translateY(-50%);
  width: clamp(46px, 4.2vw, 60px);
  height: clamp(46px, 4.2vw, 60px);
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
    transform 0.22s ease,
    background-color 0.22s ease,
    border-color 0.22s ease,
    box-shadow 0.22s ease;
}

.speakers-carousel__nav--prev {
  left: 0;
}

.speakers-carousel__nav--next {
  right: 0;
}

.speakers-carousel__nav:hover {
  transform: translateY(-50%) scale(1.06);
  background: var(--palette-white);
  border-color: rgba(var(--palette-purple-rgb), 0.36);
  box-shadow: 0 18px 42px rgba(var(--palette-navy-rgb), 0.22);
}

.speakers-carousel__nav:active {
  transform: translateY(-50%) scale(0.98);
}

.speakers-carousel__nav:focus-visible {
  outline: 3px solid var(--palette-purple);
  outline-offset: 4px;
}

.speakers-carousel__dots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: clamp(7px, 1vw, 10px);
  width: 100%;
  margin-top: clamp(18px, 2.6vw, 26px);
  padding-inline: clamp(4px, 2vw, 12px);
}

.speakers-carousel__dot {
  width: 9px;
  height: 9px;
  padding: 0;
  border: none;
  border-radius: 999px;
  background: rgba(var(--palette-navy-rgb), 0.22);
  cursor: pointer;
  transition:
    width 0.22s ease,
    transform 0.22s ease,
    background-color 0.22s ease;
}

.speakers-section--dark .speakers-carousel__dot {
  background: rgba(var(--palette-cream-rgb), 0.28);
}

.speakers-carousel__dot[aria-selected='true'] {
  width: 30px;
  background: var(--palette-orange);
}

.speakers-section--dark .speakers-carousel__dot[aria-selected='true'] {
  background: var(--palette-pink);
}

.speakers-carousel__dot:focus-visible {
  outline: 2px solid var(--palette-purple);
  outline-offset: 3px;
}

.speaker-card {
  position: relative;
  flex: 0 0 var(--slide-width, 300px);
  width: var(--slide-width, 300px);
  max-width: 100%;
  min-width: 0;
  height: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: clamp(12px, 1.5vw, 16px);
  border: 1px solid var(--speakers-card-border);
  border-radius: var(--speakers-card-radius);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.46), transparent 42%),
    var(--speakers-card-surface);
  box-shadow: var(--speakers-card-shadow);
  scroll-snap-align: start;
  scroll-snap-stop: always;
  overflow: hidden;
  transform: translateY(0);
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    border-color 0.28s ease;
}

.speaker-card:hover {
  transform: translateY(-8px);
  border-color: rgba(var(--palette-orange-rgb), 0.45);
  box-shadow: var(--speakers-card-shadow-hover);
}

.speaker-card::after {
  content: '';
  position: absolute;
  inset: auto -24% -44% -24%;
  height: 72%;
  pointer-events: none;
  background: radial-gradient(circle, rgba(var(--palette-orange-rgb), 0.16), transparent 68%);
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.speaker-card:hover::after {
  opacity: 1;
  transform: translateY(0);
}

.speaker-card--placeholder {
  border-style: dashed;
}

.speaker-card__photo-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  flex-shrink: 0;
  border-radius: var(--speakers-card-media-radius);
  background:
    radial-gradient(circle at 50% 18%, rgba(var(--palette-orange-rgb), 0.18), transparent 34%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.22), transparent),
    var(--speakers-card-media-bg);
  overflow: hidden;
}

.speaker-card__photo-wrap::before {
  content: '';
  position: absolute;
  inset: 14px;
  z-index: 0;
  border: 1px solid rgba(var(--palette-purple-rgb), 0.1);
  border-radius: calc(var(--speakers-card-media-radius) - 8px);
  pointer-events: none;
}

.speaker-card__photo {
  position: absolute;
  left: 50%;
  bottom: 0;
  z-index: 1;
  width: 96%;
  height: 100%;
  max-width: none;
  display: block;
  transform: translateX(-50%);
  transform-origin: center bottom;
  object-fit: contain;
  object-position: center bottom;
  transition:
    filter 0.28s ease,
    opacity 0.28s ease,
    transform 0.28s ease;
}

.speaker-card:hover .speaker-card__photo {
  transform: translateX(-50%) scale(1.025);
}

.speaker-card__photo--blurred {
  width: 104%;
  opacity: 0.74;
  filter: blur(10px) brightness(0.72) saturate(0.72);
  transform: translateX(-50%) scale(1.06);
}

.speaker-card:hover .speaker-card__photo--blurred {
  transform: translateX(-50%) scale(1.08);
  filter: blur(12px) brightness(0.68) saturate(0.68);
}

.speaker-card__veil {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 18px;
  background:
    linear-gradient(180deg, transparent 35%, rgba(0, 0, 0, 0.22)),
    rgba(var(--palette-navy-rgb), 0.08);
  pointer-events: none;
}

.speaker-card__veil span {
  padding: 9px 14px 8px;
  border-radius: 999px;
  background: rgba(var(--palette-cream-rgb), 0.92);
  color: var(--palette-navy);
  font-size: 13px;
  line-height: 1;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
}

.speaker-card__info {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding: 0 4px 4px;
  text-align: left;
  min-width: 0;
}

.speaker-card__info h3 {
  margin: 0;
  color: var(--speakers-card-name);
  font-size: clamp(20px, 1.7vw, 25px);
  line-height: 1.08;
  font-weight: 900;
  letter-spacing: -0.045em;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.speaker-card__info p {
  margin: 0;
  color: var(--speakers-card-role);
  font-size: clamp(14px, 1.08vw, 16px);
  line-height: 1.38;
  font-weight: 650;
  letter-spacing: -0.02em;
  overflow-wrap: break-word;
  word-wrap: break-word;
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

@media (min-width: 1920px) {
  .speakers-section {
    padding: 128px var(--layout-gutter-wide, 80px) 142px;
  }

  .speakers-container {
    width: min(1560px, 100%);
  }

  .speakers-heading {
    margin-bottom: 64px;
  }

  .speakers-carousel {
    padding-inline: 78px;
  }

  .speaker-card {
    --speakers-card-radius: 34px;
    --speakers-card-media-radius: 24px;
    gap: 16px;
    padding: 18px;
  }

  .speaker-card__photo-wrap {
    aspect-ratio: 4 / 5.15;
  }

  .speaker-card__info h3 {
    font-size: clamp(23px, 1.35vw, 28px);
  }

  .speaker-card__info p {
    font-size: 16px;
  }
}

@media (max-width: 1280px) {
  .speakers-container {
    width: min(1180px, 100%);
  }

  .speakers-carousel {
    padding-inline: 58px;
  }
}

@media (max-width: 960px) {
  .speakers-section {
    padding: 86px var(--layout-gutter-wide, 32px) 98px;
  }

  .speakers-container {
    width: min(900px, 100%);
  }

  .speakers-heading {
    margin-bottom: 40px;
    padding-inline: clamp(10px, 3vw, 32px);
  }

  .speakers-lead {
    max-width: 620px;
    font-size: clamp(16px, 2.1vw, 20px);
  }

  .speakers-carousel {
    padding-inline: 50px;
  }

  .speaker-card {
    --speakers-card-radius: 26px;
    --speakers-card-media-radius: 20px;
    padding: 13px;
  }

  .speaker-card__info h3 {
    font-size: clamp(19px, 2.5vw, 23px);
  }

  .speaker-card__info p {
    font-size: clamp(14px, 1.8vw, 15px);
  }
}

@media (max-width: 640px) {
  .speakers-section {
    padding: 74px var(--layout-gutter, 20px) 86px;
  }

  .speakers-heading {
    margin-bottom: 30px;
    padding-inline: 0;
  }

  .speakers-heading h2 {
    line-height: 0.92;
    letter-spacing: -0.065em;
  }

  .speakers-heading .phrase-marker {
    --phrase-marker-pad-x: 0.58em;
    --phrase-marker-pad-y-top: 0.38em;
    --phrase-marker-pad-y-bottom: 0.42em;
    --phrase-marker-pad-y-top: 0.5em;
    --phrase-marker-pad-y-bottom: 0.54em;
    --phrase-marker-ring-x: 1.95em;
    --phrase-marker-ring-y: 1.62em;
  }

  .speakers-lead {
    margin-top: 18px;
    font-size: 16px;
    line-height: 1.34;
  }

  .speakers-carousel {
    padding-inline: 0;
    display: grid;
    grid-template-columns: 42px minmax(0, 1fr) 42px;
    grid-template-rows: auto;
    gap: 10px;
    align-items: center;
  }

  .speakers-carousel__nav {
    position: static;
    transform: none;
    width: 42px;
    height: 42px;
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
    transform: scale(1.04);
  }

  .speakers-carousel__viewport {
    grid-column: 2;
    grid-row: 1;
    width: 100%;
    min-width: 0;
    padding: 4px;
    border-radius: 26px;
  }

  .speaker-card {
    --speakers-card-radius: 24px;
    --speakers-card-media-radius: 18px;
    padding: 12px;
    gap: 12px;
  }

  .speaker-card:hover {
    transform: translateY(-4px);
  }

  .speaker-card__photo-wrap {
    aspect-ratio: 4 / 4.85;
  }

  .speaker-card__info {
    gap: 8px;
  }

  .speaker-card__info h3 {
    font-size: clamp(18px, 5.2vw, 22px);
    line-height: 1.1;
  }

  .speaker-card__info p {
    font-size: 14px;
    line-height: 1.36;
  }

  .speakers-carousel__dots {
    gap: 6px;
    margin-top: 16px;
  }

  .speakers-carousel__dot {
    width: 7px;
    height: 7px;
  }

  .speakers-carousel__dot[aria-selected='true'] {
    width: 24px;
  }
}

@media (max-width: 420px) {
  .speakers-section {
    padding: 66px var(--layout-gutter, 16px) 78px;
  }

  .speakers-carousel {
    grid-template-columns: 36px minmax(0, 1fr) 36px;
    gap: 8px;
  }

  .speakers-carousel__nav {
    width: 36px;
    height: 36px;
  }

  .speakers-carousel__nav :deep(svg) {
    width: 18px;
    height: 18px;
  }

  .speakers-carousel__viewport {
    border-radius: 24px;
  }

  .speaker-card {
    padding: 10px;
    gap: 10px;
  }

  .speaker-card__photo-wrap {
    aspect-ratio: 4 / 4.7;
  }

  .speaker-card__info {
    padding-inline: 3px;
  }

  .speaker-card__info h3 {
    font-size: clamp(17px, 5.4vw, 20px);
  }

  .speaker-card__info p {
    font-size: 13px;
  }
}

@media (max-width: 320px) {
  .speakers-section {
    padding: 58px 12px 70px;
  }

  .speakers-heading {
    margin-bottom: 24px;
  }

  .speakers-lead {
    font-size: 14px;
  }

  .speakers-carousel {
    grid-template-columns: 32px minmax(0, 1fr) 32px;
    gap: 6px;
  }

  .speakers-carousel__nav {
    width: 32px;
    height: 32px;
  }

  .speakers-carousel__nav :deep(svg) {
    width: 16px;
    height: 16px;
  }

  .speaker-card {
    --speakers-card-radius: 20px;
    --speakers-card-media-radius: 15px;
    padding: 9px;
  }

  .speaker-card__photo-wrap {
    aspect-ratio: 4 / 4.6;
  }

  .speaker-card__info h3 {
    font-size: 16px;
  }

  .speaker-card__info p {
    font-size: 12px;
    line-height: 1.34;
  }

  .speaker-card__veil span {
    padding: 8px 11px 7px;
    font-size: 11px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .speakers-carousel__viewport {
    scroll-behavior: auto;
  }

  .speakers-carousel__nav,
  .speakers-carousel__dot,
  .speaker-card,
  .speaker-card::after,
  .speaker-card__photo {
    transition-duration: 0.01ms;
  }
}
</style>