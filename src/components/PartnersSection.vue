<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

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
const showAllPartners = ref(false)

let themeObserver = null

const togglePartners = () => {
  showAllPartners.value = !showAllPartners.value
}

const isPartnerHidden = (index) => !showAllPartners.value && index >= 4

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

})

onUnmounted(() => {
  themeObserver?.disconnect()
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

      <div class="partners-grid">
        <article
          v-for="(partner, index) in partners"
          :key="partner.name"
          class="partner-card"
          :class="{
            'partner-card--large-logo': partner.largeLogo,
            'partner-card--collapsed': isPartnerHidden(index),
          }"
        >
          <img class="partner-logo" :src="partner.image" :alt="partner.name" loading="lazy" />
        </article>
      </div>

      <button
        v-if="partners.length > 4"
        class="partners-toggle"
        type="button"
        :aria-expanded="showAllPartners"
        @click="togglePartners"
      >
        {{ showAllPartners ? 'скрыть' : 'показать ещё' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.partners-section {
  --partners-section-bg: var(--color-partners-section-bg);
  --partners-heading: var(--color-partners-heading);
  --partners-marker: var(--color-partners-marker);
  --partners-card-bg: var(--color-partners-card-bg);
  --partners-card-bg-soft: var(--color-partners-card-bg-soft);
  --partners-card-border: var(--color-partners-card-border);
  --partners-card-shadow: var(--color-partners-card-shadow);
  --partners-button-bg: var(--color-partners-button-bg);
  --partners-button-text: var(--color-partners-button-text);
  --partners-button-shadow: var(--color-partners-button-shadow);

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

.partners-container {
  position: relative;
  z-index: 1;
  width: min(100%, 1440px);
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

.partners-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(16px, 1.6vw, 24px);
  align-items: stretch;
}

.partner-card {
  --cut-left: 38px;
  --cut-right: 58px;
  --cut-width-a: 92px;
  --cut-width-b: 72px;
  --cut-height-a: 28px;
  --cut-height-b: 24px;

  position: relative;
  min-height: clamp(168px, 14vw, 196px);
  border: 2px solid var(--partners-card-border);
  border-radius: 24px;
  background: var(--partners-card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(22px, 2.2vw, 32px) clamp(20px, 2vw, 28px);
  overflow: hidden;
  box-shadow: 8px 8px 0 rgba(var(--palette-navy-rgb), 0.1);
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

.partner-card:nth-child(4n + 1) {
  --cut-left: 32px;
  --cut-right: 66px;
  --cut-width-a: 96px;
  --cut-width-b: 64px;
  --cut-height-a: 30px;
  --cut-height-b: 24px;
}

.partner-card:nth-child(4n + 2) {
  --cut-left: 74px;
  --cut-right: 32px;
  --cut-width-a: 74px;
  --cut-width-b: 104px;
  --cut-height-a: 24px;
  --cut-height-b: 30px;
}

.partner-card:nth-child(4n + 3) {
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
  --cut-width-a: 88px;
  --cut-width-b: 92px;
}

.partner-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-partners-card-hover-border);
  box-shadow: 10px 10px 0 rgba(var(--palette-navy-rgb), 0.14);
}

.partner-logo {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  max-width: 100%;
  height: clamp(92px, 8.5vw, 118px);
  object-fit: contain;
  object-position: center;
}

.partner-card--large-logo .partner-logo {
  height: clamp(104px, 9.5vw, 132px);
}

.partners-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

.partner-card--collapsed {
  display: none;
}

@media (min-width: 901px) {
  .partner-card--collapsed {
    display: flex;
  }

  .partners-toggle {
    display: none;
  }
}

@media (max-width: 1200px) {
  .partners-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .partner-logo {
    height: clamp(88px, 10vw, 110px);
  }

  .partner-card--large-logo .partner-logo {
    height: clamp(98px, 11vw, 124px);
  }
}

@media (max-width: 900px) {
  .partners-container {
    width: min(100%, 960px);
  }

  .partners-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .partner-card {
    min-height: 156px;
  }

  .partner-logo {
    height: clamp(84px, 12vw, 104px);
  }

  .partner-card--large-logo .partner-logo {
    height: clamp(94px, 13vw, 118px);
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

  .partners-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .partner-card {
    min-height: 148px;
    border-radius: 22px;
    padding: 22px 20px;
    box-shadow: 6px 6px 0 rgba(var(--palette-navy-rgb), 0.1);
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
    height: clamp(78px, 22vw, 96px);
  }

  .partner-card--large-logo .partner-logo {
    height: clamp(88px, 24vw, 108px);
  }
}

@media (max-width: 480px) {
  .partners-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .partner-card {
    min-height: 140px;
    padding: 24px 28px;
  }

  .partner-logo {
    height: clamp(82px, 24vw, 100px);
  }

  .partner-card--large-logo .partner-logo {
    height: clamp(92px, 26vw, 112px);
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

  .partner-card {
    min-height: 132px;
    padding: 20px 18px;
  }

  .partner-logo {
    height: 76px;
  }

  .partner-card--large-logo .partner-logo {
    height: 88px;
  }
}
</style>
