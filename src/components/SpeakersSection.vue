<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const AUTOPLAY_MS = 5000
const CAROUSEL_GAP_PX = 16
const MIN_CARD_WIDTH_DESKTOP_PX = 260
const MIN_CARD_WIDTH_TABLET_PX = 220
const MIN_CARD_WIDTH_MOBILE_PX = 200

const getMinCardWidth = (viewportWidth) => {
  if (viewportWidth <= 480) {
    return MIN_CARD_WIDTH_MOBILE_PX
  }

  if (viewportWidth <= 900) {
    return MIN_CARD_WIDTH_TABLET_PX
  }

  return MIN_CARD_WIDTH_DESKTOP_PX
}

const theme = ref('light')
const activePage = ref(0)
const slidesPerView = ref(1)
const viewportRef = ref(null)
let htmlObserver = null
let bodyObserver = null
let autoplayTimer = null
let viewportResizeObserver = null

const speakers = [
  {
    image: '/speaker_1.png',
    name: 'Максим Орешкин',
    role: 'Заместитель Руководителя Администрации Президента Российской Федерации',
  },
  {
    image: '/speaker_3.png',
    name: 'Алексей Репик',
    role: 'Основатель фонда «Молодежная предпринимательская инициатива», председатель Общероссийской общественной организации «Деловая Россия»',
  },
  {
    image: '/speaker_4.png',
    name: 'Светлана Чупшева',
    role: 'Генеральный директор АНО «Агентство стратегических инициатив по продвижению новых проектов»',
  },
  {
    image: '/speaker_5.png',
    name: 'Александр Исаевич',
    role: 'Генеральный директор АО «Корпорация «МСП»',
  },
  {
    image: '/speaker_7.png',
    name: 'Кристина Кострома',
    role: 'Руководитель Департамента предпринимательства и инновационного развития города Москвы',
  },
  {
    image: '/speaker_6.png',
    name: 'Юрий Максимов',
    role: 'Основатель фонда Сайберус и компании Positive Technologies',
  },
  {
    image: '/speaker_8.png',
    name: 'Мария Папук',
    role: 'Основатель коммуникационной группы Vinci Agency с международной экспертизой, совладелец журнала Инк',
  },
  {
    image: '/speaker_9.png',
    name: 'Михаил Каптюг',
    role: 'Основатель проекта Sciencely, эксперт в сфере научно-просветительских и образовательных продуктов для детей',
  },
  {
    image: '/speaker_10.png',
    name: 'Анна Давыдова',
    role: 'Основатель и сооснователь компании 5YES! — производителя растительного молока для бариста и ритейла',
  },
  {
    image: '/speaker_11.png',
    name: 'Александр Мутовин',
    role: 'Основатель сервиса доставки еды «Много Лосося»',
  },
  {
    image: '/speaker_12.png',
    name: 'Кирилл Токарев',
    role: 'Телеведущий, шеф-редактор телеканала РБК-ТВ по экономической аналитике',
  },
  {
    image: '/speaker_14.png',
    name: 'Самира Мустафаева',
    role: 'Основатель сети студий растяжки и фитнеса SM Stretching; мастер спорта международного класса по художественной гимнастике; многократный призер чемпионатов России и Европы',
  },
  {
    image: '/speaker_15.png',
    name: 'Глеб Белявский',
    role: 'Руководитель направления инвестиций акселераторов Сбера и сообщества инвесторов SberUnity',
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
  const width = viewportRef.value?.clientWidth ?? 0
  const gap = getCarouselGap(width)

  return {
    '--slides-per-view': slidesPerView.value,
    '--page-index': activePage.value,
    '--carousel-gap': `${gap}px`,
  }
})

const isSpeakerVisible = (index) => {
  const start = activePage.value * slidesPerView.value
  const end = start + slidesPerView.value
  return index >= start && index < end
}

const getCarouselGap = (viewportWidth) => (viewportWidth <= 380 ? 12 : CAROUSEL_GAP_PX)

const updateSlidesPerView = () => {
  const width = viewportRef.value?.clientWidth ?? 0
  if (!width) {
    return
  }

  const gap = getCarouselGap(width)
  const minCardWidth = getMinCardWidth(width)
  const perView = Math.min(
    totalSpeakers,
    Math.max(1, Math.floor((width + gap) / (minCardWidth + gap))),
  )

  const previousPerView = slidesPerView.value
  const firstVisibleIndex = activePage.value * previousPerView
  slidesPerView.value = perView
  const newPageCount = Math.max(1, Math.ceil(totalSpeakers / perView))
  activePage.value = Math.min(Math.floor(firstVisibleIndex / perView), newPageCount - 1)
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
  activePage.value = normalizePage(page)
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
  startAutoplay()

  if (viewportRef.value && typeof ResizeObserver !== 'undefined') {
    viewportResizeObserver = new ResizeObserver(updateSlidesPerView)
    viewportResizeObserver.observe(viewportRef.value)
  } else {
    window.addEventListener('resize', updateSlidesPerView)
  }

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
  window.removeEventListener('resize', updateSlidesPerView)
  htmlObserver?.disconnect()
  bodyObserver?.disconnect()
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
            <span class="phrase-marker__text">кто выступит?</span>
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

        <div ref="viewportRef" class="speakers-carousel__viewport">
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
                <p>{{ speaker.role }}</p>
              </div>
            </article>
          </div>
        </div>

        <button
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

      <div class="speakers-carousel__dots" role="tablist" aria-label="Страницы спикеров">
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
  --speakers-nav-text: var(--color-speakers-more-text);

  position: relative;
  isolation: isolate;
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: 104px 40px 120px;
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
  width: fit-content;
  margin: 0 auto 48px;
  padding: 34px 86px 42px;
  isolation: isolate;
}

.speakers-heading h2 {
  position: relative;
  z-index: 3;
  margin: 0;
  color: var(--speakers-heading);
  font-size: clamp(44px, 6.6vw, 92px);
  line-height: 0.9;
  font-weight: 950;
  text-align: center;
  text-transform: lowercase;
  letter-spacing: -0.075em;
}

.speakers-carousel {
  position: relative;
  width: 100%;
  max-width: 100%;
  padding-inline: clamp(40px, 5vw, 52px);
  box-sizing: border-box;
}

.speakers-carousel__viewport {
  container-type: inline-size;
  container-name: speakers-carousel;
  width: 100%;
  overflow: hidden;
  border-radius: clamp(22px, 4vw, 30px);
  contain: inline-size layout style;
}

.speakers-carousel__track {
  display: flex;
  align-items: stretch;
  gap: var(--carousel-gap, 16px);
  transform: translate3d(calc(-100cqw * var(--page-index, 0)), 0, 0);
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
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
  border: none;
  border-radius: 50%;
  background: #fff;
  color: var(--speakers-nav-text);
  cursor: pointer;
  box-shadow: none;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

.speakers-carousel__nav--prev {
  left: 0;
}

.speakers-carousel__nav--next {
  right: 0;
}

.speakers-carousel__nav:hover {
  transform: translateY(-50%) scale(1.05);
  background: #fff;
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
  container-type: inline-size;
  container-name: speaker-card;
  flex: 0 0
    calc(
      (100cqw - (var(--slides-per-view, 1) - 1) * var(--carousel-gap, 16px)) / var(--slides-per-view, 1)
    );
  min-width: 0;
  height: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 2.5cqw, 16px);
  padding: clamp(10px, 2.5cqw, 16px);
  border: none;
  border-radius: var(--speakers-card-radius);
  background: var(--speakers-card-surface);
  box-shadow: var(--speakers-card-shadow);
}

.speakers-section--dark {
  --speakers-card-surface: var(--color-speakers-card-bg);
  --speakers-card-media-bg: rgba(var(--palette-cream-rgb), 0.1);
  --speakers-card-name: var(--palette-cream);
  --speakers-card-role: rgba(var(--palette-cream-rgb), 0.82);
  --speakers-card-shadow: 0 12px 32px rgba(0, 0, 0, 0.28);
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
  gap: clamp(6px, 1vw, 8px);
  padding: 0 clamp(2px, 0.6vw, 6px) clamp(2px, 0.6vw, 8px);
  text-align: left;
}

.speaker-card__info h3 {
  margin: 0;
  color: var(--speakers-card-name);
  font-size: clamp(15px, 7.5cqw, 22px);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.03em;
  overflow-wrap: anywhere;
  hyphens: auto;
}

.speaker-card__info p {
  margin: 0;
  color: var(--speakers-card-role);
  font-size: clamp(12px, 5.2cqw, 15px);
  line-height: 1.38;
  font-weight: 500;
  letter-spacing: -0.01em;
  overflow-wrap: anywhere;
  hyphens: auto;
}

@container speaker-card (max-width: 240px) {
  .speaker-card__info p {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }
}

@media (max-width: 900px) {
  .speakers-section {
    padding: 80px 24px 92px;
  }

  .speakers-heading {
    margin-bottom: 36px;
    padding: 26px 56px 32px;
  }

}

@media (max-width: 600px) {
  .speakers-section {
    padding: 70px 12px 84px;
  }

  .speakers-heading {
    margin-bottom: 28px;
    padding: 26px clamp(20px, 6vw, 44px) 32px;
    max-width: 100%;
  }

  .speakers-carousel {
    padding-inline: 36px;
  }

  .speakers-heading h2 {
    font-size: clamp(38px, 13vw, 58px);
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

@media (max-width: 380px) {
  .speakers-section {
    padding-left: 10px;
    padding-right: 10px;
  }

  .speakers-heading {
    padding-left: clamp(16px, 5vw, 34px);
    padding-right: clamp(16px, 5vw, 34px);
  }

  .speakers-carousel {
    padding-inline: 32px;
    --carousel-gap: 12px;
  }

  .speakers-heading h2 {
    font-size: clamp(34px, 13vw, 46px);
  }

  .speakers-carousel__nav {
    width: 36px;
    height: 36px;
  }

  .speakers-carousel__nav :deep(svg) {
    width: 18px;
    height: 18px;
  }

  .speaker-card__info h3 {
    font-size: clamp(17px, 5.2vw, 20px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .speakers-carousel__track {
    transition-duration: 0.01ms;
  }

  .speakers-carousel__nav,
  .speakers-carousel__dot {
    transition-duration: 0.01ms;
  }
}
</style>
