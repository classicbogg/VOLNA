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

    <div class="audience-container">
      <div class="audience-heading">
        <h2>
          <span class="phrase-marker">
            <span class="phrase-marker__text">
              <span class="phrase-marker__line">Для кого</span>
              <span class="phrase-marker__line">форум?</span>
            </span>
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
        Создай НАШЕ — форум для молодых предпринимателей, которые хотят запустить
        свой проект, найти точки роста и превратить идею в реальный бизнес.
      </p>

      <div
        ref="cardsRef"
        class="audience-layout"
        :class="{ 'audience-layout--visible': cardsVisible }"
      >
        <article class="audience-card audience-card--start">
          <span class="audience-card__number">01</span>
          <div class="audience-card__content">
            <h3>старт</h3>
            <p>
              Если ты только думаешь о собственном бизнесе, поможем сделать первый шаг.
              Присоединяйся и узнай, как начать бизнес без опыта, собрать команду,
              проверить идею и запустить свое дело.
            </p>
          </div>
        </article>

        <article class="audience-card audience-card--scale">
          <span class="audience-card__number">02</span>
          <div class="audience-card__content">
            <h3>масштабирование</h3>
            <p>
              Если проект уже есть, здесь ты найдешь новые идеи, мотивацию и полезные
              знакомства. В программе — лекции, сессии с экспертами, нетворкинг,
              а также кейсы реальных предпринимателей и финалистов конкурса «Создай НАШЕ».
            </p>
          </div>
        </article>

        <article class="audience-card audience-card--opportunities">
          <span class="audience-card__number">03</span>
          <div class="audience-card__content">
            <h3>возможности</h3>
            <p>
              Форум откроет доступ к инструментам, которые помогают расти быстрее:
              гранты для молодых предпринимателей, акселерационные программы,
              обучение ключевым предпринимательским навыкам — от продуктового подхода
              до управления финансами.
            </p>
          </div>
        </article>
      </div>

      <p class="audience-bottom">
        Здесь ты получишь не только вдохновение, но и практические инструменты для
        старта и развития своего дела. Это возможность посмотреть на бизнес через
        реальные истории и практику опытных предпринимателей.
      </p>
    </div>
  </section>
</template>

<style scoped>
.audience-section {
  position: relative;
  width: 100%;
  padding: 92px 40px 112px;
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
  background: rgba(var(--palette-purple-rgb), 0.12);
  filter: blur(1px);
  animation: audienceFloatLeft 10s ease-in-out infinite;
}

.audience-bg--right {
  right: -110px;
  bottom: 150px;
  width: 260px;
  height: 260px;
  border-radius: 63% 37% 42% 58% / 44% 58% 42% 56%;
  background: rgba(255, 255, 255, 0.18);
  filter: blur(1px);
  animation: audienceFloatRight 12s ease-in-out infinite;
}

.audience-container {
  position: relative;
  z-index: 2;
  width: min(1580px, 100%);
  margin: 0 auto;
}

.audience-heading {
  position: relative;
  width: fit-content;
  margin: 0 auto 44px;
  padding: 45px 80px 48px;
}

.audience-heading h2 {
  position: relative;
  z-index: 2;
  margin: 0;
  font-size: clamp(48px, 6.8vw, 92px);
  line-height: 0.9;
  font-weight: 900;
  text-align: center;
  text-transform: lowercase;
  letter-spacing: -0.08em;
}

.audience-heading .phrase-marker__line + .phrase-marker__line {
  margin-top: 0.02em;
}

.audience-intro {
  max-width: 820px;
  margin: 0 auto 72px;
  font-size: clamp(21px, 2vw, 31px);
  line-height: 1.18;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.04em;
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
  transform-style: preserve-3d;
  will-change: transform, opacity, filter, translate, scale;
  filter: blur(10px);
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
    rotateX(4deg)
    rotateY(var(--hover-x))
    scale(1.025);
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
  line-height: 0.96;
  font-weight: 900;
  text-align: left;
  text-transform: lowercase;
  letter-spacing: -0.05em;
  overflow-wrap: anywhere;
  hyphens: auto;
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
  line-height: 1.32;
  font-weight: 650;
  text-align: left;
  letter-spacing: -0.025em;
  box-shadow: none;
}

.audience-card--start {
  --card-bg: var(--color-audience-card-start-bg, var(--palette-orange));
  --card-bg-soft: rgba(255, 255, 255, 0.18);
  --card-text: var(--palette-navy);
  --card-muted: rgba(var(--palette-navy-rgb), 0.88);
  --card-border: rgba(var(--palette-navy-rgb), 0.86);
  --card-accent: var(--palette-navy);
  --card-word: rgba(var(--palette-navy-rgb), 0.12);
  --card-shine: rgba(255, 255, 255, 0.4);
  --card-panel-bg: rgba(var(--palette-cream-rgb), 0.28);
  --card-panel-border: rgba(var(--palette-navy-rgb), 0.12);
  --card-rotate: -1.6deg;
  --card-y: 0px;
  --hover-x: -4deg;
}

.audience-card--scale {
  --card-bg: var(--palette-navy-mid);
  --card-text: var(--palette-cream);
  --card-muted: rgba(var(--palette-cream-rgb), 0.84);
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

.audience-card--opportunities p {
  color: var(--color-audience-card-opportunities-body, var(--card-muted));
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
  line-height: 1.18;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.04em;
}

@keyframes audienceCardEnterSoft {
  0% {
    opacity: 0;
    translate: 0 54px;
    scale: 0.96;
    filter: blur(10px);
  }

  58% {
    opacity: 1;
    filter: blur(0);
  }

  78% {
    translate: 0 -6px;
    scale: 1.012;
  }

  100% {
    opacity: 1;
    translate: 0 0;
    scale: 1;
    filter: blur(0);
  }
}

@keyframes audienceContentEnter {
  0% {
    opacity: 0;
    translate: 0 16px;
    filter: blur(5px);
  }

  100% {
    opacity: 1;
    translate: 0 0;
    filter: blur(0);
  }
}

@keyframes audienceSmallEnter {
  0% {
    opacity: 0;
    translate: 0 -10px;
    filter: blur(4px);
  }

  100% {
    opacity: 1;
    translate: 0 0;
    filter: blur(0);
  }
}

@keyframes audienceIconEnter {
  0% {
    opacity: 0;
    translate: 10px -10px;
    filter: blur(5px);
  }

  100% {
    opacity: 0.20;
    translate: 0 0;
    filter: blur(0);
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


@media (max-width: 1320px) {
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

@media (max-width: 1100px) {
  .audience-section {
    padding: 82px 28px 96px;
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

@media (max-width: 760px) {
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

@media (max-width: 560px) {
  .audience-section {
    padding: 62px 16px 76px;
  }

  .audience-bg {
    opacity: 0.42;
  }

  .audience-heading {
    margin-bottom: 34px;
    padding: 24px 26px 30px;
  }

  .audience-heading h2 {
    font-size: clamp(42px, 16vw, 66px);
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
    line-height: 1.38;
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
  .audience-intro,
  .audience-bottom {
    font-size: 17px;
    line-height: 1.35;
  }

  .audience-card h3 {
    font-size: clamp(32px, 10vw, 38px);
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
    filter: none;
  }

  .audience-card {
    transform: translateY(var(--card-y)) rotate(var(--card-rotate));
  }
}
</style>
