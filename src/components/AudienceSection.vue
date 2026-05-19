<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const cardsRef = ref(null)
const cardsVisible = ref(false)
let observer = null

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    cardsVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]

      if (entry?.isIntersecting) {
        cardsVisible.value = true
        observer?.disconnect()
      }
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -120px 0px',
    },
  )

  if (cardsRef.value) {
    observer.observe(cardsRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section class="audience-section" id="audience">
    <div class="audience-bg audience-bg--left" aria-hidden="true"></div>
    <div class="audience-bg audience-bg--right" aria-hidden="true"></div>
    <div class="audience-bg audience-bg--top" aria-hidden="true"></div>
    <div class="audience-bg audience-bg--mid" aria-hidden="true"></div>
    <div class="audience-bg audience-bg--bottom" aria-hidden="true"></div>

    <div class="audience-container">
      <div class="audience-heading">
        <h2>
          <span class="phrase-marker">
            <span class="phrase-marker__text">Для кого форум?</span>
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

      <p class="audience-intro">
        ВОЛНА — площадка для молодёжи, которая мечтает о запуске собственного дела,
        стремится развивать свои проекты и превращать смелые идеи в успешный бизнес.
      </p>

      <div
        ref="cardsRef"
        class="audience-layout"
        :class="{ 'audience-layout--visible': cardsVisible }"
      >
        <article class="audience-card audience-card--start">
          <span class="audience-card__number">01</span>
          <div class="audience-card__content">
            <h3>Начало пути</h3>
            <p>
              Только задумываешься о своём деле? Мы поможем сделать первый шаг!
              Присоединяйся, чтобы узнать, как начать бизнес с нуля, собрать команду,
              протестировать свою идею и запустить проект.
            </p>
          </div>
        </article>

        <article class="audience-card audience-card--scale">
          <span class="audience-card__number">02</span>
          <div class="audience-card__content">
            <h3>Рост и развитие</h3>
            <p>
              Уже есть проект? Здесь ты найдёшь новые идеи для развития, получишь заряд
              мотивации и заведёшь полезные знакомства. Встречи с экспертами, практические
              задания, нетворкинг и многое другое.
            </p>
          </div>
        </article>

        <article class="audience-card audience-card--opportunities">
          <span class="audience-card__number">03</span>
          <div class="audience-card__content">
            <h3>Новые горизонты</h3>
            <p>
              Форум поможет тебе узнать больше о новых инструментах, мерах поддержки,
              обучении ключевым бизнес-навыкам — от разработки продукта до финансового
              управления.
            </p>
          </div>
        </article>
      </div>

      <p class="audience-bottom">
        Здесь ты получишь не только мотивацию, но и конкретные инструменты для запуска
        и развития бизнеса. Это возможность посмотреть на бизнес через игру и реальные
        истории действующих предпринимателей.
      </p>
    </div>
  </section>
</template>

<style scoped>
.audience-section {
  position: relative;
  width: 100%;
  padding: 92px var(--layout-gutter-wide, 40px) 112px;
  background: var(--color-audience-section-bg, var(--color-bg));
  color: var(--color-audience-section-text, var(--color-purple));
  overflow: hidden;
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
}

:global(html[data-theme='light']) .audience-section {
  --color-audience-section-bg: var(--palette-cream);
  --color-audience-section-text: var(--palette-navy);
  --color-audience-marker: var(--palette-navy);
}

:global(html[data-theme='dark']) .audience-section {
  --color-audience-section-bg: var(--color-bg);
  --color-audience-section-text: var(--palette-cream);
  --color-audience-marker: var(--color-yellow);
}

.audience-bg {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  opacity: 0.58;
}

.audience-bg--left {
  left: -90px;
  top: 210px;
  width: 210px;
  height: 210px;
  border-radius: 48% 52% 58% 42% / 46% 36% 64% 54%;
  background: rgba(var(--palette-purple-rgb), 0.18);
  filter: blur(1px);
  animation: audienceFloatLeft 10s ease-in-out infinite;
}

.audience-bg--right {
  right: -110px;
  bottom: 150px;
  width: 260px;
  height: 260px;
  border-radius: 63% 37% 42% 58% / 44% 58% 42% 56%;
  background: rgba(var(--palette-pink-rgb), 0.16);
  filter: blur(1px);
  animation: audienceFloatRight 12s ease-in-out infinite;
}

.audience-bg--top {
  right: -48px;
  top: 72px;
  width: 168px;
  height: 168px;
  border-radius: 54% 46% 60% 40% / 44% 56% 42% 58%;
  background: rgba(var(--palette-pink-rgb), 0.14);
  filter: blur(1px);
  animation: audienceFloatTop 11s ease-in-out infinite;
}

.audience-bg--mid {
  right: clamp(2%, 4vw, 6%);
  top: 54%;
  width: 128px;
  height: 128px;
  border-radius: 44% 56% 50% 50% / 58% 42% 56% 44%;
  background: rgba(var(--palette-purple-rgb), 0.12);
  filter: blur(1px);
  animation: audienceFloatMid 13s ease-in-out infinite;
}

.audience-bg--bottom {
  left: -64px;
  bottom: 96px;
  width: 190px;
  height: 190px;
  border-radius: 56% 44% 46% 54% / 50% 48% 58% 42%;
  background: rgba(var(--palette-orange-rgb), 0.14);
  filter: blur(1px);
  animation: audienceFloatBottom 14s ease-in-out infinite;
}

.audience-container {
  position: relative;
  z-index: 2;
  width: min(1580px, 100%);
  margin: 0 auto;
}

.audience-heading {
  position: relative;
  margin: 0 auto 44px;
  padding: 45px clamp(16px, 5vw, 80px) 48px;
}

.audience-heading h2 {
  position: relative;
  z-index: 2;
  margin: 0;
  line-height: 1;
  font-weight: 900;
  text-align: center;
  text-transform: lowercase;
  letter-spacing: -0.08em;
}

/* Одна строка: овал по ширине фразы, без лишней высоты */
.audience-heading .phrase-marker {
  --phrase-marker-pad-x: 0.76em;
  --phrase-marker-pad-y-top: 0.5em;
  --phrase-marker-pad-y-bottom: 0.54em;
  --phrase-marker-ring-x: 1.52em;
  --phrase-marker-ring-y: 1.24em;
}

@container (max-width: 680px) {
  .audience-heading .phrase-marker {
    --phrase-marker-pad-x: 0.7em;
    --phrase-marker-pad-y-top: 0.48em;
    --phrase-marker-pad-y-bottom: 0.52em;
    --phrase-marker-ring-x: 1.42em;
    --phrase-marker-ring-y: 1.2em;
  }
}

@container (max-width: 420px) {
  .audience-heading .phrase-marker {
    --phrase-marker-pad-x: 0.74em;
    --phrase-marker-pad-y-top: 0.46em;
    --phrase-marker-pad-y-bottom: 0.5em;
    --phrase-marker-ring-x: 1.48em;
    --phrase-marker-ring-y: 1.22em;
  }
}

.audience-heading .phrase-marker__svg {
  transform: translate(-50%, -50%) rotate(-2.5deg);
}

.audience-heading .phrase-marker__svg path {
  stroke-width: 4.5px;
  vector-effect: non-scaling-stroke;
}

.audience-intro {
  max-width: 820px;
  margin: 0 auto 72px;
  font-size: clamp(21px, 2vw, 31px);
  line-height: 1.35;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.02em;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}

.audience-layout {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
  align-items: stretch;
}

.audience-card {
  --card-bg: var(--palette-orange);
  --card-text: var(--palette-navy);
  --card-border: rgba(var(--palette-navy-rgb), 0.86);
  --card-accent: var(--palette-navy);
  --card-rotate: 0deg;
  --card-y: 0px;
  --hover-x: -4deg;
  --enter-delay: 0ms;

  position: relative;
  min-height: 100%;
  padding: 28px 32px 32px;
  border: 2px solid var(--card-border);
  border-radius: 34px;
  color: var(--card-text);
  background: var(--card-bg);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0;
  overflow: hidden;
  opacity: 0;
  transform:
    translateY(var(--card-y))
    rotate(var(--card-rotate));
  translate: 0 54px;
  scale: 0.96;
  will-change: transform, opacity;
  transition:
    transform 360ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 360ms cubic-bezier(0.16, 1, 0.3, 1),
    background-color 360ms ease,
    border-color 360ms ease;
  box-shadow:
    10px 10px 0 rgba(var(--palette-navy-rgb), 0.13),
    0 22px 36px rgba(var(--palette-navy-rgb), 0.13);
}

.audience-layout--visible .audience-card {
  animation: audienceCardEnterSoft 980ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--enter-delay);
}

.audience-layout--visible .audience-card:nth-child(1) {
  --enter-delay: 0ms;
}

.audience-layout--visible .audience-card:nth-child(2) {
  --enter-delay: 150ms;
}

.audience-layout--visible .audience-card:nth-child(3) {
  --enter-delay: 300ms;
}

.audience-card:hover {
  transform:
    translateY(calc(var(--card-y) - 12px))
    rotate(var(--card-rotate))
    scale(1.02);
  box-shadow:
    16px 16px 0 rgba(var(--palette-navy-rgb), 0.17),
    0 34px 54px rgba(var(--palette-navy-rgb), 0.22);
}

.audience-card__number {
  flex-shrink: 0;
  width: fit-content;
  min-width: 58px;
  height: 38px;
  margin: 0 0 22px;
  padding: 0 14px;
  border: 2px solid currentColor;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--card-accent);
  background: rgba(255, 255, 255, 0.12);
  font-size: 18px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.02em;
  opacity: 0;
  translate: 0 -10px;
}

.audience-card__content {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  min-height: 0;
  opacity: 0;
  translate: 0 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: geometricPrecision;
}

.audience-layout--visible .audience-card__content {
  animation: audienceContentEnter 760ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--enter-delay) + 200ms);
}

.audience-layout--visible .audience-card__number {
  animation: audienceSmallEnter 620ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--enter-delay) + 120ms);
}

.audience-card__icon {
  position: absolute;
  right: 26px;
  top: 24px;
  z-index: 4;
  width: 76px;
  height: 76px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--card-accent);
  font-size: 72px;
  line-height: 1;
  font-weight: 900;
  opacity: 0;
  translate: 10px -10px;
  transform: translateZ(50px);
  pointer-events: none;
  transition:
    opacity 360ms ease,
    transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
}

.audience-layout--visible .audience-card__icon {
  animation: audienceIconEnter 760ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--enter-delay) + 250ms);
}

.audience-card:hover .audience-card__icon {
  opacity: 0.38;
  transform: translateZ(86px) translateY(-5px) scale(1.06);
}

.audience-card__icon--rocket {
  background: currentColor;
  mask-image: url('/planet-rocket.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-image: url('/planet-rocket.svg');
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
}

.audience-card__icon--scale {
  transform: translateZ(50px) rotate(2deg);
}

.audience-card:hover .audience-card__icon--scale {
  transform: translateZ(86px) translateY(-5px) rotate(-2deg) scale(1.08);
}

.audience-card__icon--star {
  top: 16px;
  font-size: 76px;
  transform: translateZ(50px) rotate(-8deg);
}

.audience-card:hover .audience-card__icon--star {
  transform: translateZ(86px) translateY(-5px) rotate(-2deg) scale(1.08);
}

.audience-card__blob {
  position: absolute;
  right: -34px;
  top: -40px;
  z-index: 1;
  width: 216px;
  height: 216px;
  border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
  background: var(--card-bg-soft);
  transform: translateZ(14px);
  animation: audienceBlob 8s linear infinite;
  pointer-events: none;
}

.audience-card h3 {
  width: 100%;
  max-width: 100%;
  margin: 0;
  color: var(--card-text);
  font-size: clamp(30px, 2.35vw, 44px);
  line-height: 1.05;
  font-weight: 800;
  text-align: left;
  text-transform: lowercase;
  letter-spacing: -0.03em;
  overflow-wrap: normal;
  word-break: normal;
  hyphens: none;
}

.audience-card p {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  border-radius: 0;
  color: var(--card-muted);
  background: none;
  font-size: clamp(16px, 1.12vw, 19px);
  line-height: 1.45;
  font-weight: 600;
  text-align: left;
  letter-spacing: -0.01em;
  box-shadow: none;
}

.audience-card--start {
  --card-bg: var(--color-audience-card-start-bg, #ffe6ef);
  --card-bg-soft: rgba(var(--palette-pink-rgb), 0.14);
  --card-text: var(--palette-navy);
  --card-muted: rgba(var(--palette-navy-rgb), 0.82);
  --card-border: rgba(var(--palette-purple-rgb), 0.22);
  --card-accent: var(--palette-purple);
  --card-word: rgba(var(--palette-pink-rgb), 0.14);
  --card-shine: rgba(255, 255, 255, 0.55);
  --card-panel-bg: rgba(255, 255, 255, 0.42);
  --card-panel-border: rgba(var(--palette-purple-rgb), 0.1);
  --card-rotate: -1.6deg;
  --card-y: 0px;
  --hover-x: -4deg;
}

.audience-card--scale {
  --card-bg: var(--palette-navy-mid);
  --card-text: var(--palette-white);
  --card-muted: var(--palette-white);
  --card-border: rgba(var(--palette-purple-rgb), 0.74);
  --card-accent: var(--palette-white);
  --card-bg-soft: rgba(var(--palette-purple-rgb), 0.12);
  --card-word: rgba(var(--palette-purple-rgb), 0.12);
  --card-shine: rgba(var(--palette-purple-rgb), 0.18);
  --card-sheen: rgba(var(--palette-cream-rgb), 0.07);
  --card-panel-bg: rgba(var(--palette-cream-rgb), 0.09);
  --card-panel-border: rgba(var(--palette-peach-rgb), 0.22);
  --card-panel-shadow: rgba(var(--palette-cream-rgb), 0.1);
  --card-rotate: 0.8deg;
  --card-y: 0px;
  --hover-x: 0deg;
}

.audience-card--opportunities {
  --card-bg: var(--color-audience-card-opportunities-bg, var(--palette-peach));
  --card-text: var(--color-audience-card-opportunities-text, var(--palette-navy));
  --card-muted: var(--color-audience-card-opportunities-body, rgba(var(--palette-navy-rgb), 0.88));
  --card-border: rgba(var(--palette-navy-rgb), 0.86);
  --card-accent: var(--color-audience-card-opportunities-accent, var(--palette-navy));
  --card-rotate: 1.4deg;
  --card-y: 0px;
  --hover-x: 4deg;
}

:global(html[data-theme='dark']) .audience-bg--left {
  background: rgba(var(--palette-orange-rgb), 0.08);
}

:global(html[data-theme='dark']) .audience-bg--right {
  background: rgba(var(--palette-purple-rgb), 0.1);
}

:global(html[data-theme='dark']) .audience-bg--top {
  background: rgba(var(--palette-pink-rgb), 0.12);
}

:global(html[data-theme='dark']) .audience-bg--mid {
  background: rgba(var(--palette-purple-rgb), 0.14);
}

:global(html[data-theme='dark']) .audience-bg--bottom {
  background: rgba(var(--palette-orange-rgb), 0.1);
}

.audience-card--opportunities p {
  color: var(--color-audience-card-opportunities-body, var(--card-muted));
}

.audience-card--opportunities h3 {
  white-space: nowrap;
  overflow-wrap: normal;
  word-break: keep-all;
  hyphens: none;
}

.scale-title {
  width: 100%;
  max-width: 100%;
  overflow: visible;
}

.scale-title span {
  display: block;
  width: fit-content;
  max-width: 100%;
  font-size: clamp(30px, 2.22vw, 40px);
  line-height: 0.9;
  font-weight: 900;
  letter-spacing: -0.062em;
  white-space: nowrap;
}

.audience-bottom {
  max-width: 860px;
  margin: 78px auto 0;
  font-size: clamp(21px, 2vw, 31px);
  line-height: 1.35;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.02em;
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}

@keyframes audienceCardEnterSoft {
  0% {
    opacity: 0;
    translate: 0 54px;
    scale: 0.98;
  }

  58% {
    opacity: 1;
  }

  78% {
    translate: 0 -6px;
    scale: 1.008;
  }

  100% {
    opacity: 1;
    translate: 0 0;
    scale: 1;
  }
}

@keyframes audienceContentEnter {
  0% {
    opacity: 0;
    translate: 0 16px;
  }

  100% {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes audienceSmallEnter {
  0% {
    opacity: 0;
    translate: 0 -10px;
  }

  100% {
    opacity: 1;
    translate: 0 0;
  }
}

@keyframes audienceIconEnter {
  0% {
    opacity: 0;
    translate: 10px -10px;
  }

  100% {
    opacity: 0.20;
    translate: 0 0;
  }
}

@keyframes audienceBlob {
  0%, 100% {
    border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
    transform: translateZ(14px) rotate(0deg);
  }

  25% {
    border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
  }

  50% {
    border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%;
    transform: translateZ(14px) rotate(9deg);
  }

  75% {
    border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%;
  }
}

@keyframes audienceFloatLeft {
  0%, 100% {
    transform: translateY(0) rotate(-8deg);
  }

  50% {
    transform: translateY(-22px) rotate(-3deg);
  }
}

@keyframes audienceFloatRight {
  0%, 100% {
    transform: translateY(0) rotate(7deg);
  }

  50% {
    transform: translateY(18px) rotate(2deg);
  }
}

@keyframes audienceFloatTop {
  0%, 100% {
    transform: translateY(0) rotate(6deg);
  }

  50% {
    transform: translateY(-14px) rotate(10deg);
  }
}

@keyframes audienceFloatMid {
  0%, 100% {
    transform: translateY(0) rotate(-5deg);
  }

  50% {
    transform: translateY(12px) rotate(-9deg);
  }
}

@keyframes audienceFloatBottom {
  0%, 100% {
    transform: translateY(0) rotate(-6deg);
  }

  50% {
    transform: translateY(-16px) rotate(-2deg);
  }
}


@media (max-width: 1320px) {
  .audience-section {
    padding: 82px var(--layout-gutter-wide) 96px;
  }

  .audience-container {
    width: min(1180px, 100%);
  }

  .audience-layout {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 30px;
  }

  .audience-card--start {
    grid-column: 1;
    grid-row: 1;
  }

  .audience-card--opportunities {
    grid-column: 2;
    grid-row: 1;
  }

  .audience-card--scale {
    grid-column: 1 / -1;
    grid-row: 2;
    width: min(640px, 100%);
    justify-self: center;
    --card-rotate: -1deg;
    --card-y: 0px;
  }
}

@media (max-width: 1024px) and (min-width: 761px) {
  .audience-section {
    padding: 76px var(--layout-gutter-wide) 88px;
  }

  .audience-heading {
    margin-bottom: 38px;
    padding: 32px 52px 36px;
  }

  .audience-intro {
    margin-bottom: 52px;
    font-size: clamp(19px, 2.1vw, 26px);
  }

  .audience-layout {
    gap: 24px;
  }

  .audience-card {
    padding: 24px 26px 28px;
    border-radius: 28px;
  }

  .audience-card h3 {
    font-size: clamp(26px, 3vw, 34px);
  }

  .audience-card p {
    font-size: clamp(16px, 1.6vw, 18px);
  }

  .audience-card--scale {
    width: min(560px, 100%);
  }

  .audience-bottom {
    margin-top: 52px;
    font-size: clamp(19px, 2.1vw, 26px);
  }
}

@media (min-width: 1025px) and (max-width: 1439px) {
  .audience-section {
    padding: 88px var(--layout-gutter-wide) 100px;
  }

  .audience-container {
    width: min(1220px, 100%);
  }

  .audience-heading {
    padding: 36px 60px 40px;
    margin-bottom: 40px;
  }

  .audience-intro,
  .audience-bottom {
    font-size: clamp(20px, 1.6vw, 28px);
  }

  .audience-card h3 {
    font-size: clamp(28px, 2.2vw, 40px);
  }
}

@media (min-width: 1440px) and (max-width: 1919px) {
  .audience-container {
    width: min(1480px, 100%);
  }

}

@media (min-width: 1920px) {
  .audience-section {
    padding: 108px var(--layout-gutter-wide, 80px) 124px;
  }

  .audience-container {
    width: min(1580px, 100%);
  }

}

@media (max-width: 768px) {
  .audience-bg--top,
  .audience-bg--mid {
    display: none;
  }

  .audience-bg--bottom {
    width: 150px;
    height: 150px;
    left: -72px;
    bottom: 48px;
    opacity: 0.36;
  }

  .audience-section {
    padding: 68px var(--layout-gutter, 18px) 76px;
  }

  .audience-heading {
    margin-bottom: 36px;
    padding: 28px 32px 32px;
  }

  .audience-layout {
    grid-template-columns: 1fr;
    perspective: none;
  }

  .audience-card--start,
  .audience-card--scale,
  .audience-card--opportunities {
    grid-column: auto;
    grid-row: auto;
    width: 100%;
    --card-rotate: 0deg;
    --card-y: 0px;
    --hover-x: 0deg;
  }

}

@media (max-width: 480px) {
  .audience-section {
    padding: 56px var(--layout-gutter) 68px;
  }

  .audience-heading {
    margin-bottom: 28px;
    padding: 20px var(--layout-gutter) 24px;
  }

  .audience-heading .phrase-marker {
    --phrase-marker-pad-x: 0.72em;
    --phrase-marker-ring-x: 1.46em;
    --phrase-marker-ring-y: 1.2em;
  }

  .audience-intro {
    margin-bottom: 36px;
    font-size: 18px;
  }

  .audience-bottom {
    margin-top: 40px;
    font-size: 18px;
  }
}

@media (max-width: 560px) {
  .audience-section {
    padding: 62px var(--layout-gutter) 76px;
  }

  .audience-bg {
    opacity: 0.42;
  }

  .audience-heading {
    margin-bottom: 34px;
    padding: 24px 26px 30px;
  }

  .audience-intro {
    margin-bottom: 44px;
  }

  .audience-intro,
  .audience-bottom {
    font-size: 20px;
  }

  .audience-card {
    padding: 24px 22px 26px;
    border-radius: 26px;
  }

  .audience-card__number {
    margin-bottom: 18px;
  }

  .audience-card__content {
    gap: 14px;
  }

  .audience-card h3 {
    font-size: clamp(28px, 8vw, 36px);
  }

  .scale-title span {
    font-size: clamp(27px, 8.5vw, 34px);
  }

  .audience-card p {
    font-size: 17px;
    line-height: 1.45;
  }

  .audience-card--scale h3 {
    font-size: clamp(26px, 7vw, 34px);
    letter-spacing: -0.04em;
  }

  .audience-card {
    box-shadow:
      8px 8px 0 rgba(var(--palette-navy-rgb), 0.1),
      0 16px 28px rgba(var(--palette-navy-rgb), 0.1);
  }

  .audience-card__number {
    min-width: 52px;
    height: 34px;
    font-size: 16px;
  }

  .audience-card__icon {
    right: 18px;
    top: 16px;
    width: 62px;
    height: 62px;
    font-size: 58px;
  }

  .audience-card__icon--star {
    top: 12px;
    font-size: 60px;
  }

  .audience-card__blob {
    width: 170px;
    height: 170px;
  }

  .audience-card::after {
    right: 16px;
    bottom: 12px;
    font-size: 68px;
  }

  .audience-bottom {
    margin-top: 48px;
  }
}

@media (max-width: 390px) {
  .audience-section {
    padding: 52px var(--layout-gutter) 60px;
  }

  .audience-heading {
    width: 100%;
    max-width: 100%;
    padding: 18px 14px 22px;
    box-sizing: border-box;
  }

  .audience-heading .phrase-marker {
    --phrase-marker-pad-x: 0.68em;
    --phrase-marker-pad-y-top: 0.44em;
    --phrase-marker-pad-y-bottom: 0.48em;
    --phrase-marker-ring-x: 1.44em;
    --phrase-marker-ring-y: 1.18em;
  }

  .audience-intro,
  .audience-bottom {
    font-size: 17px;
    line-height: 1.35;
  }

  .audience-card {
    padding: 20px 18px 22px;
  }

  .audience-card h3 {
    font-size: clamp(26px, 8.5vw, 34px);
    overflow-wrap: normal;
    word-break: normal;
    hyphens: none;
  }

  .audience-card--opportunities h3 {
    font-size: clamp(22px, 6.4vw, 34px);
    white-space: nowrap;
    overflow-wrap: normal;
  }

  .scale-title span {
    white-space: normal;
    overflow-wrap: normal;
    word-break: normal;
    hyphens: none;
    font-size: clamp(25px, 8vw, 32px);
  }

  .audience-card p {
    font-size: 16px;
  }
}

@media (max-width: 320px) {
  .audience-heading .phrase-marker {
    --phrase-marker-pad-x: 0.62em;
    --phrase-marker-ring-x: 1.36em;
    --phrase-marker-ring-y: 1.14em;
  }

  .audience-card__icon {
    width: 52px;
    height: 52px;
    font-size: 48px;
  }
}

@media (hover: none) {
  .audience-card:hover {
    transform: translateY(var(--card-y)) rotate(var(--card-rotate));
  }

}

@media (prefers-reduced-motion: reduce) {
  .audience-layout--visible .audience-card,
  .audience-layout--visible .audience-card__content,
  .audience-layout--visible .audience-card__number,
  .audience-layout--visible .audience-card__icon,
  .audience-card__blob,
  .audience-bg {
    animation: none;
  }

  .audience-card,
  .audience-card__content,
  .audience-card__number,
  .audience-card__icon {
    opacity: 1;
    translate: 0 0;
    scale: 1;
  }

  .audience-card {
    will-change: auto;
  }

  .audience-card {
    transform: translateY(var(--card-y)) rotate(var(--card-rotate));
  }
}
</style>

<style>
/* Без scoped: :global(html) + дочерние классы в одном селекторе ломают компилятор Vue */
html[data-theme='light'] #audience .audience-bg {
  opacity: 0.88;
  filter: blur(2px);
}

html[data-theme='light'] #audience .audience-bg--left {
  background: rgba(var(--palette-purple-rgb), 0.34);
}

html[data-theme='light'] #audience .audience-bg--right {
  background: rgba(var(--palette-pink-rgb), 0.28);
}

html[data-theme='light'] #audience .audience-bg--top {
  background: rgba(var(--palette-pink-rgb), 0.26);
}

html[data-theme='light'] #audience .audience-bg--mid {
  background: rgba(var(--palette-purple-rgb), 0.22);
}

html[data-theme='light'] #audience .audience-bg--bottom {
  background: rgba(var(--palette-orange-rgb), 0.3);
}

html[data-theme='light'] #audience .audience-card--start .audience-card__number {
  color: var(--palette-navy);
  border-color: var(--palette-navy);
  background: transparent;
}

html[data-theme='dark'] #audience .audience-card--start {
  --card-text: var(--palette-white);
  --card-muted: rgba(255, 255, 255, 0.86);
  --card-border: rgba(var(--palette-pink-rgb), 0.38);
  --card-accent: var(--palette-white);
}

html[data-theme='dark'] #audience .audience-card--start .audience-card__number {
  color: var(--palette-white);
  border-color: var(--palette-white);
  background: transparent;
}
</style>
