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

const isDarkTheme = ref(false)
const isMobile = ref(false)
const isExpanded = ref(false)

let themeObserver = null
let mediaQuery = null

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

const updateMobileState = () => {
  if (!mediaQuery) return

  isMobile.value = mediaQuery.matches

  if (!isMobile.value) {
    isExpanded.value = true
  } else {
    isExpanded.value = false
  }
}

const visiblePartners = computed(() => {
  if (!isMobile.value || isExpanded.value) return partners
  return partners.slice(0, 6)
})

const shouldShowToggle = computed(() => isMobile.value && partners.length > 6)

const togglePartners = () => {
  isExpanded.value = !isExpanded.value
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

  mediaQuery = window.matchMedia('(max-width: 600px)')
  updateMobileState()
  mediaQuery.addEventListener('change', updateMobileState)
})

onUnmounted(() => {
  themeObserver?.disconnect()
  mediaQuery?.removeEventListener('change', updateMobileState)
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
        <h2>партнёры</h2>
        <svg
          class="partners-marker"
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
          <path
            d="M455 182C515 177 586 168 642 152"
            stroke="currentColor"
            stroke-width="12"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <div class="partners-grid" :class="{ 'partners-grid--collapsed': shouldShowToggle && !isExpanded }">
        <article
          v-for="partner in visiblePartners"
          :key="partner.name"
          class="partner-card"
          :class="{ 'partner-card--large-logo': partner.largeLogo }"
        >
          <img class="partner-logo" :src="partner.image" :alt="partner.name" loading="lazy" />
        </article>
      </div>

      <button
        v-if="shouldShowToggle"
        class="partners-toggle"
        type="button"
        :aria-expanded="isExpanded"
        @click="togglePartners"
      >
        {{ isExpanded ? 'скрыть' : 'показать ещё' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.partners-section {
  --partners-section-bg: #ffffff;
  --partners-heading: #1e1739;
  --partners-marker: #1e1739;
  --partners-card-bg: #f1edf8;
  --partners-card-bg-soft: rgba(219, 175, 255, 0.2);
  --partners-card-border: rgba(219, 175, 255, 0.82);
  --partners-card-shadow: rgba(30, 23, 57, 0.11);
  --partners-button-bg: #f4d35e;
  --partners-button-text: #1e1739;
  --partners-button-shadow: rgba(30, 23, 57, 0.16);

  position: relative;
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: clamp(72px, 7vw, 112px) 24px clamp(80px, 8vw, 128px);
  background: var(--partners-section-bg);
  color: var(--partners-heading);
  overflow: hidden;
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
}

.partners-section--dark {
  --partners-section-bg: #0b0814;
  --partners-heading: #ffffff;
  --partners-marker: #f2f55e;
  --partners-card-bg: #f4efff;
  --partners-card-bg-soft: rgba(242, 245, 94, 0.08);
  --partners-card-border: rgba(219, 175, 255, 0.9);
  --partners-card-shadow: rgba(0, 0, 0, 0.34);
  --partners-button-bg: #dbafff;
  --partners-button-text: #1e1739;
  --partners-button-shadow: rgba(219, 175, 255, 0.18);
}

.partners-container {
  position: relative;
  z-index: 1;
  width: min(100%, 1280px);
  margin: 0 auto;
}

.partners-heading {
  position: relative;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto clamp(44px, 5vw, 72px);
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

.partners-marker {
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  width: 128%;
  min-width: 340px;
  height: 150%;
  color: var(--partners-marker);
  pointer-events: none;
  transform: translate(-50%, -50%) rotate(-2deg);
  transition: color 0.35s ease;
}

.partners-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(18px, 2vw, 26px);
}

.partner-card {
  --cut-left: 38px;
  --cut-right: 58px;
  --cut-width-a: 92px;
  --cut-width-b: 72px;
  --cut-height-a: 28px;
  --cut-height-b: 24px;

  position: relative;
  min-height: 162px;
  border: 2px solid var(--partners-card-border);
  border-radius: 24px;
  background:
    radial-gradient(circle at 16% 10%, rgba(255, 255, 255, 0.72), transparent 28%),
    linear-gradient(145deg, var(--partners-card-bg-soft), transparent 58%),
    var(--partners-card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 44px;
  overflow: hidden;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    0 20px 44px var(--partners-card-shadow);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    background-color 0.25s ease;
}

.partner-card::before,
.partner-card::after {
  content: '';
  position: absolute;
  top: -2px;
  border-radius: 0 0 999px 999px;
  background: var(--partners-section-bg);
  transition: background-color 0.35s ease;
}

.partner-card::before {
  left: var(--cut-left);
  width: var(--cut-width-a);
  height: var(--cut-height-a);
}

.partner-card::after {
  right: var(--cut-right);
  width: var(--cut-width-b);
  height: var(--cut-height-b);
}

.partner-card:nth-child(3n + 1) {
  --cut-left: 32px;
  --cut-right: 66px;
  --cut-width-a: 96px;
  --cut-width-b: 64px;
  --cut-height-a: 30px;
  --cut-height-b: 24px;
}

.partner-card:nth-child(3n + 2) {
  --cut-left: 74px;
  --cut-right: 32px;
  --cut-width-a: 74px;
  --cut-width-b: 104px;
  --cut-height-a: 24px;
  --cut-height-b: 30px;
}

.partner-card:nth-child(3n) {
  --cut-left: 46px;
  --cut-right: 92px;
  --cut-width-a: 112px;
  --cut-width-b: 78px;
  --cut-height-a: 28px;
  --cut-height-b: 25px;
}

.partner-card:nth-child(4n) {
  --cut-left: 118px;
  --cut-right: 46px;
}

.partner-card:hover {
  transform: translateY(-5px);
  border-color: #dbafff;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.82),
    0 28px 56px var(--partners-card-shadow);
}

.partner-logo {
  position: relative;
  z-index: 1;
  display: block;
  width: min(92%, 340px);
  max-width: 340px;
  height: 96px;
  object-fit: contain;
  filter: saturate(1.04) contrast(1.04);
}

.partner-card--large-logo .partner-logo {
  width: min(100%, 440px);
  max-width: 440px;
  height: 122px;
}

.partners-toggle {
  display: none;
  width: fit-content;
  min-height: 54px;
  margin: 34px auto 0;
  padding: 0 34px;
  border: 2px solid var(--partners-button-bg);
  border-radius: 999px;
  background: var(--partners-button-bg);
  color: var(--partners-button-text);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.04em;
  text-transform: lowercase;
  box-shadow: 0 16px 34px var(--partners-button-shadow);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.partners-toggle:hover {
  transform: translateY(-3px);
  box-shadow: 0 22px 42px var(--partners-button-shadow);
}

.partners-toggle:active {
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .partners-container {
    width: min(100%, 900px);
  }

  .partners-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .partners-section {
    padding: 64px 16px 78px;
  }

  .partners-heading {
    padding: 24px 38px;
    margin-bottom: 38px;
  }

  .partners-heading h2 {
    font-size: clamp(42px, 15vw, 64px);
    letter-spacing: -0.075em;
  }

  .partners-marker {
    width: 122%;
    min-width: 290px;
    height: 140%;
  }

  .partners-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .partner-card {
    min-height: 138px;
    border-radius: 22px;
    padding: 26px 32px;
  }

  .partner-card::before {
    left: max(22px, calc(var(--cut-left) * 0.65));
    width: calc(var(--cut-width-a) * 0.82);
    height: calc(var(--cut-height-a) * 0.86);
  }

  .partner-card::after {
    right: max(24px, calc(var(--cut-right) * 0.65));
    width: calc(var(--cut-width-b) * 0.82);
    height: calc(var(--cut-height-b) * 0.86);
  }

  .partner-logo {
    width: min(92%, 300px);
    max-width: 300px;
    height: 82px;
  }

  .partner-card--large-logo .partner-logo {
    width: min(100%, 340px);
    max-width: 340px;
    height: 104px;
  }

  .partners-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 380px) {
  .partners-section {
    padding-left: 12px;
    padding-right: 12px;
  }

  .partners-heading {
    padding-left: 24px;
    padding-right: 24px;
  }

  .partners-heading h2 {
    font-size: 40px;
  }

  .partners-marker {
    min-width: 250px;
  }

  .partner-card {
    min-height: 126px;
    padding: 24px 24px;
  }

  .partner-logo {
    height: 74px;
  }

  .partner-card--large-logo .partner-logo {
    height: 94px;
  }
}
</style>
