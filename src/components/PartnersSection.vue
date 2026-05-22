<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const partners = [
  { name: 'Мой бизнес', image: '/partners_1.png' },
  { name: 'Я в деле', image: '/partners_2.png' },
  { name: 'Академия', image: '/partners_3.png' },
]

const isDarkTheme = ref(false)

let themeObserver = null

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
          v-for="partner in partners"
          :key="partner.name"
          class="partner-card"
          :class="{ 'partner-card--large-logo': partner.largeLogo }"
        >
          <img
            class="partner-logo"
            :src="partner.image"
            :alt="partner.name"
            loading="lazy"
          />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners-section {
  --partners-section-bg: var(--color-partners-section-bg);
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
  transition: background-color 0.35s ease, color 0.35s ease;
}

.partners-container {
  position: relative;
  z-index: 1;
  width: min(100%, 1440px);
  margin: 0 auto;
  padding-inline: var(--layout-gutter-wide);
}

.partners-heading {
  position: relative;
  margin: 0 auto clamp(36px, 5vw, 56px);
  padding: 32px clamp(16px, 5vw, 72px);
  color: var(--partners-heading);
  text-align: center;
  isolation: isolate;
}

.partners-heading h2 {
  position: relative;
  z-index: 2;
  margin: 0;
  line-height: 0.9;
  font-weight: 900;
  letter-spacing: -0.07em;
  text-transform: lowercase;
}

.partners-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: clamp(20px, 3vw, 36px);
}

.partner-card {
  flex: 0 0 auto;
  width: clamp(220px, 22vw, 280px);
  min-height: clamp(150px, 15vw, 180px);
  padding: clamp(22px, 2.5vw, 30px) clamp(18px, 2vw, 28px);
  border: 2px solid var(--partners-card-border);
  border-radius: 26px;
  background: var(--partners-card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
}

.partner-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.partner-logo {
  display: block;
  width: 100%;
  max-width: 100%;
  height: clamp(90px, 10vw, 120px);
  object-fit: contain;
  object-position: center;
}

.partner-card--large-logo .partner-logo {
  height: clamp(100px, 11vw, 132px);
}

@media (min-width: 1025px) and (max-width: 1439px) {
  .partners-container {
    width: min(1280px, 100%);
  }

  .partners-heading {
    padding: 30px 60px;
  }

  .partner-card {
    width: clamp(200px, 20vw, 260px);
    min-height: clamp(140px, 14vw, 170px);
  }

  .partner-logo {
    height: clamp(84px, 9vw, 110px);
  }
}

@media (min-width: 1440px) and (max-width: 1919px) {
  .partners-container {
    width: min(1440px, 100%);
  }
}

@media (min-width: 1920px) {
  .partners-container {
    width: min(1560px, 100%);
  }

  .partner-card {
    width: 300px;
    min-height: 190px;
  }

  .partner-logo {
    height: 130px;
  }
}

@media (max-width: 1024px) and (min-width: 761px) {
  .partners-heading {
    padding: 28px 48px;
    margin-bottom: 30px;
  }

  .partner-card {
    width: clamp(180px, 26vw, 240px);
    min-height: clamp(130px, 13vw, 160px);
  }

  .partner-logo {
    height: clamp(80px, 10vw, 100px);
  }
}

@media (max-width: 900px) {
  .partners-grid {
    gap: clamp(16px, 3vw, 24px);
  }

  .partner-card {
    width: clamp(180px, 34vw, 240px);
    min-height: clamp(130px, 14vw, 160px);
    border-radius: 22px;
    padding: clamp(18px, 2vw, 24px) clamp(16px, 1.5vw, 22px);
  }

  .partner-logo {
    height: clamp(80px, 14vw, 100px);
  }
}

@media (max-width: 600px) {
  .partners-section {
    padding-bottom: 72px;
  }

  .partners-container {
    padding-inline: var(--layout-gutter);
  }

  .partners-heading {
    padding: 24px 38px;
    margin-bottom: 28px;
  }

  .partners-grid {
    flex-direction: column;
    gap: 20px;
  }

  .partner-card {
    width: min(100%, 320px);
    min-height: 140px;
  }

  .partner-logo {
    height: clamp(76px, 16vw, 96px);
  }
}

@media (max-width: 480px) {
  .partners-heading {
    padding: 20px var(--layout-gutter) 26px;
    margin-bottom: 24px;
  }

  .partner-card {
    width: min(100%, 300px);
    min-height: 130px;
    border-radius: 20px;
  }

  .partner-logo {
    height: clamp(72px, 18vw, 88px);
  }
}

@media (max-width: 360px) {
  .partners-container {
    padding-inline: var(--layout-gutter);
  }

  .partners-heading {
    padding: 18px 20px;
    margin-bottom: 24px;
  }

  .partner-card {
    width: min(100%, 280px);
    min-height: 120px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .partner-card {
    transition: none;
  }
}
</style>