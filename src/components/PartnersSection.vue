<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const partners = [
  { name: 'Высшая школа экономики', image: '/partners_1.png' },
  { name: 'Таврида.Арт', image: '/partners_2.png' },
  { name: 'Ростелеком', image: '/partners_3.png' },
  { name: 'Авито Услуги', image: '/partners_4.png' },
  { name: 'ИЦР', image: '/partners_5.png' },
  { name: 'Знай наших', image: '/partners_6.png' },
  { name: 'РВБ', image: '/partners_7.png' },
  { name: 'SPLAT', image: '/partners_8.png' },
  { name: 'Я Бизнес', image: '/partners_9.png' },
  { name: 'Ozon', image: '/partners_10.png', largeLogo: true },
  { name: 'NeTouch', image: '/partners_11.png' },
  { name: 'Нейрофонд', image: '/partners_12.png' },
  { name: 'hh.ru', image: '/partners_13.png' },
  { name: 'Открытые инновации', image: '/partners_14.png' },
  { name: 'Росмолодёжь', image: '/partners_15.png' },
  { name: 'Кампус', image: '/partners_16.png' },
]

const MOBILE_MAX_WIDTH = 900
const DESKTOP_AUTOPLAY_MS = 2800
const GAP_PX = 18

const isDarkTheme = ref(false)
const isMobile = ref(false)
const activeIndex = ref(0)
const viewportRef = ref(null)
const cardRefs = ref([])
const isDragging = ref(false)
const prefersReducedMotion = ref(false)

let themeObserver = null
let mobileMedia = null
let reducedMotionMedia = null
let autoplayTimer = null
let scrollRaf = null
let dragStartX = 0
let dragScrollLeft = 0

const partnerIndices = computed(() => partners.map((_, index) => index))

const activePartnerName = computed(() => partners[activeIndex.value]?.name ?? '')

const setCardRef = (element, index) => {
  if (element) {
    cardRefs.value[index] = element
  }
}

const detectTheme = () => {
  if (typeof document === 'undefined') return

  const html = document.documentElement
  const body = document.body

  const theme = html.getAttribute('data-theme') || body.getAttribute('data-theme')
  const hasDarkClass =
    html.classList.contains('dark') ||
    html.classList.contains('theme-dark') ||
    body.classList.contains('dark') ||
    body.classList.contains('theme-dark')

  isDarkTheme.value = theme === 'dark' || hasDarkClass
}

const updateActiveFromScroll = () => {
  const viewport = viewportRef.value
  const cards = cardRefs.value.filter(Boolean)

  if (!viewport || !cards.length) return

  const center = viewport.scrollLeft + viewport.clientWidth / 2
  let closestIndex = 0
  let closestDistance = Number.POSITIVE_INFINITY

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2
    const distance = Math.abs(center - cardCenter)

    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })

  activeIndex.value = closestIndex
}

const onScroll = () => {
  if (scrollRaf) return

  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = null
    updateActiveFromScroll()
  })
}

const getScrollLeftForIndex = (index) => {
  const viewport = viewportRef.value
  const card = cardRefs.value[index]

  if (!viewport || !card) return 0

  return card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2
}

const goToPartner = (index, behavior = 'smooth') => {
  const viewport = viewportRef.value

  if (!viewport) return

  const safeIndex = Math.max(0, Math.min(index, partners.length - 1))

  viewport.scrollTo({
    left: getScrollLeftForIndex(safeIndex),
    behavior,
  })

  activeIndex.value = safeIndex
}

const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

const startAutoplay = () => {
  stopAutoplay()

  if (isMobile.value || prefersReducedMotion.value) return

  autoplayTimer = setInterval(() => {
    const nextIndex = (activeIndex.value + 1) % partners.length
    goToPartner(nextIndex)
  }, DESKTOP_AUTOPLAY_MS)
}

const onPointerDown = (event) => {
  if (event.button !== 0) return

  const viewport = viewportRef.value
  if (!viewport) return

  isDragging.value = true
  dragStartX = event.clientX
  dragScrollLeft = viewport.scrollLeft
  viewport.setPointerCapture(event.pointerId)
  stopAutoplay()
}

const onPointerMove = (event) => {
  if (!isDragging.value) return

  const viewport = viewportRef.value
  if (!viewport) return

  viewport.scrollLeft = dragScrollLeft - (event.clientX - dragStartX)
}

const finishDrag = (event) => {
  if (!isDragging.value) return

  const viewport = viewportRef.value

  isDragging.value = false

  if (viewport?.hasPointerCapture(event.pointerId)) {
    viewport.releasePointerCapture(event.pointerId)
  }

  updateActiveFromScroll()
  goToPartner(activeIndex.value)

  if (!isMobile.value) {
    startAutoplay()
  }
}

const onDotClick = (index) => {
  stopAutoplay()
  goToPartner(index)
  startAutoplay()
}

const onMediaChange = () => {
  isMobile.value = mobileMedia?.matches ?? false
  prefersReducedMotion.value = reducedMotionMedia?.matches ?? false

  stopAutoplay()

  if (!isMobile.value) {
    startAutoplay()
  }
}

onMounted(() => {
  detectTheme()

  themeObserver = new MutationObserver(detectTheme)
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'class'],
  })
  themeObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['data-theme', 'class'],
  })

  if (typeof window !== 'undefined') {
    mobileMedia = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`)
    reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')

    mobileMedia.addEventListener('change', onMediaChange)
    reducedMotionMedia.addEventListener('change', onMediaChange)
    onMediaChange()
  }

  requestAnimationFrame(() => {
    updateActiveFromScroll()
    startAutoplay()
  })
})

onUnmounted(() => {
  themeObserver?.disconnect()
  mobileMedia?.removeEventListener('change', onMediaChange)
  reducedMotionMedia?.removeEventListener('change', onMediaChange)
  stopAutoplay()

  if (scrollRaf) {
    cancelAnimationFrame(scrollRaf)
  }
})
</script>

<template>
  <section
    id="partners"
    class="partners-section"
    :class="{
      'partners-section--dark': isDarkTheme,
      'partners-section--light': !isDarkTheme,
    }"
  >
    <div class="partners-container">
      <div class="partners-heading" aria-label="Партнёры форума">
        <h2>
          <span class="phrase-marker">
            <span class="phrase-marker__text">партнёры</span>
            <svg
              class="phrase-marker__svg"
              viewBox="0 0 760 210"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M28 125C12 89 67 49 151 33C279 8 522 5 660 30C739 44 750 92 713 123C657 170 470 188 283 183C134 179 55 166 30 132"
                stroke="currentColor"
                stroke-width="12"
                stroke-linecap="round"
              />
            </svg>
          </span>
        </h2>
      </div>

      <div
        class="partners-strip"
        role="region"
        aria-roledescription="carousel"
        aria-label="Партнёры форума"
      >
        <div
          ref="viewportRef"
          class="partners-strip__viewport"
          :class="{ 'partners-strip__viewport--dragging': isDragging }"
          @scroll.passive="onScroll"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerup="finishDrag"
          @pointercancel="finishDrag"
        >
          <div class="partners-strip__track" :style="{ '--partners-gap': `${GAP_PX}px` }">
            <article
              v-for="(partner, index) in partners"
              :key="partner.name"
              :ref="(element) => setCardRef(element, index)"
              class="partner-card"
              :class="{ 'partner-card--large-logo': partner.largeLogo }"
            >
              <img class="partner-logo" :src="partner.image" :alt="partner.name" loading="lazy" />
            </article>
          </div>
        </div>

        <p class="visually-hidden" aria-live="polite" aria-atomic="true">
          {{ activePartnerName }}
        </p>

        <div class="partners-strip__dots" role="tablist" aria-label="Партнёры">
          <button
            v-for="index in partnerIndices"
            :key="`partner-dot-${index}`"
            type="button"
            class="partners-strip__dot"
            role="tab"
            :aria-selected="index === activeIndex"
            :aria-label="`${partners[index].name}, ${index + 1} из ${partners.length}`"
            @click="onDotClick(index)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners-section {
  --partners-section-bg: var(--color-partners-section-bg);
  --partners-strip-bg: var(--color-partners-strip-bg, var(--partners-section-bg));
  --partners-heading: var(--color-partners-heading);
  --partners-marker: var(--color-partners-marker);
  --partners-card-bg: var(--color-partners-card-bg);
  --partners-card-border: var(--color-partners-card-border);

  position: relative;
  width: 100%;
  max-width: 100%;
  padding: clamp(72px, 7vw, 112px) 0 clamp(80px, 8vw, 128px);
  background: var(--partners-section-bg);
  color: var(--partners-heading);
  overflow: hidden;
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
}

.partners-container {
  position: relative;
  z-index: 1;
  width: min(100%, 1440px);
  margin: 0 auto;
  padding-inline: 24px;
}

.partners-heading {
  position: relative;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto clamp(36px, 5vw, 56px);
  padding: 32px 72px;
  color: var(--partners-heading);
  text-align: center;
  isolation: isolate;
}

.partners-heading h2 {
  position: relative;
  z-index: 2;
  margin: 0;
  font-size: clamp(44px, 7vw, 96px);
  line-height: 0.9;
  font-weight: 900;
  letter-spacing: -0.07em;
  text-transform: lowercase;
}

.partners-strip {
  width: 100%;
  max-width: 100%;
}

.partners-strip__viewport {
  overflow-x: auto;
  overflow-y: hidden;
  border-block: 2px solid var(--partners-card-border);
  background: var(--partners-strip-bg);
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scroll-padding-inline: max(14px, calc((100% - clamp(168px, 18vw, 220px)) / 2));
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;
  cursor: grab;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}

.partners-strip__viewport::-webkit-scrollbar {
  display: none;
}

.partners-strip__viewport--dragging {
  cursor: grabbing;
  scroll-snap-type: none;
  scroll-behavior: auto;
  user-select: none;
}

.partners-strip__track {
  display: flex;
  align-items: center;
  width: max-content;
  gap: var(--partners-gap, 18px);
  padding: clamp(18px, 2.5vw, 24px) clamp(14px, 2vw, 22px);
}

.partner-card {
  flex: 0 0 auto;
  width: clamp(168px, 18vw, 220px);
  min-height: clamp(120px, 12vw, 148px);
  padding: clamp(16px, 2vw, 22px) clamp(14px, 1.8vw, 20px);
  border: 2px solid var(--partners-card-border);
  border-radius: 22px;
  background: var(--partners-card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  scroll-snap-align: center;
  scroll-snap-stop: always;
}

.partner-logo {
  display: block;
  width: 100%;
  max-width: 100%;
  height: clamp(72px, 8vw, 96px);
  object-fit: contain;
  object-position: center;
  pointer-events: none;
}

.partner-card--large-logo .partner-logo {
  height: clamp(82px, 9vw, 108px);
}

.partners-strip__dots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: clamp(5px, 1vw, 8px);
  width: 100%;
  margin-top: clamp(14px, 2.5vw, 20px);
  padding: 0 clamp(16px, 4vw, 40px) clamp(4px, 1vw, 8px);
}

.partners-strip__dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(var(--palette-navy-rgb), 0.22);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease;
}

.partners-section--dark .partners-strip__dot {
  background: rgba(var(--palette-cream-rgb), 0.28);
}

.partners-strip__dot[aria-selected='true'] {
  background: var(--palette-orange);
  transform: scale(1.25);
}

.partners-section--dark .partners-strip__dot[aria-selected='true'] {
  background: var(--palette-pink);
}

.partners-strip__dot:focus-visible {
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

@media (min-width: 901px) {
  .partners-strip__viewport:not(.partners-strip__viewport--dragging) {
    cursor: default;
  }
}

@media (max-width: 900px) {
  .partners-strip__viewport {
    cursor: grab;
  }

  .partner-card {
    width: clamp(148px, 72vw, 220px);
    min-height: 112px;
    border-radius: 18px;
  }

  .partner-logo {
    height: clamp(64px, 18vw, 80px);
  }
}

@media (max-width: 600px) {
  .partners-section {
    padding-bottom: 72px;
  }

  .partners-container {
    padding-inline: 16px;
  }

  .partners-heading {
    padding: 24px 38px;
    margin-bottom: 28px;
  }

  .partners-heading h2 {
    font-size: clamp(42px, 15vw, 64px);
  }

  .partners-strip__dots {
    gap: 5px;
  }

  .partners-strip__dot {
    width: 7px;
    height: 7px;
  }
}

@media (max-width: 360px) {
  .partners-container {
    padding-inline: 12px;
  }

  .partners-heading {
    padding: 18px 20px;
    margin-bottom: 24px;
  }

  .partners-heading h2 {
    font-size: clamp(36px, 14vw, 52px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .partners-strip__viewport {
    scroll-behavior: auto;
  }
}
</style>
