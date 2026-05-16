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
        <h2>Для кого форум?</h2>

        <svg
          class="heading-marker"
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
          <path
            d="M420 166C487 165 551 158 596 146"
            stroke="currentColor"
            stroke-width="8"
            stroke-linecap="round"
          />
        </svg>
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
        <article class="audience-card audience-card--start" data-word="идея">
          <span class="audience-card__number">01</span>
          <span class="audience-card__icon audience-card__icon--rocket" aria-hidden="true"></span>
          <span class="audience-card__blob" aria-hidden="true"></span>

          <h3>старт</h3>
          <p>
            Если ты только думаешь о собственном бизнесе, поможем сделать первый шаг.
            Присоединяйся и узнай, как начать бизнес без опыта, собрать команду,
            проверить идею и запустить свое дело.
          </p>
        </article>

        <article class="audience-card audience-card--scale" data-word="рост">
          <span class="audience-card__number">02</span>
          <span class="audience-card__icon audience-card__icon--scale" aria-hidden="true">⤢</span>
          <span class="audience-card__blob" aria-hidden="true"></span>

          <h3 class="scale-title">
            <span>масштабирование</span>
          </h3>
          <p>
            Если проект уже есть, здесь ты найдешь новые идеи, мотивацию и полезные
            знакомства. В программе — лекции, сессии с экспертами, нетворкинг,
            а также кейсы реальных предпринимателей и финалистов конкурса «Создай НАШЕ».
          </p>
        </article>

        <article class="audience-card audience-card--opportunities" data-word="шанс">
          <span class="audience-card__number">03</span>
          <span class="audience-card__icon audience-card__icon--star" aria-hidden="true">✦</span>
          <span class="audience-card__blob" aria-hidden="true"></span>

          <h3>возможности</h3>
          <p>
            Форум откроет доступ к инструментам, которые помогают расти быстрее:
            гранты для молодых предпринимателей, акселерационные программы,
            обучение ключевым предпринимательским навыкам — от продуктового подхода
            до управления финансами.
          </p>
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
  background: var(--color-audience-section-bg, var(--color-bg, #ffffff));
  color: var(--color-audience-section-text, var(--color-purple, #1e1739));
  overflow: hidden;
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
}

:global(html[data-theme='light']) .audience-section {
  --color-audience-section-bg: #ffffff;
  --color-audience-section-text: #1e1739;
  --color-audience-marker: #1e1739;
}

:global(html[data-theme='dark']) .audience-section {
  --color-audience-section-bg: var(--color-bg, #0b0814);
  --color-audience-section-text: #ffffff;
  --color-audience-marker: var(--color-yellow, #f2f55e);
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
  background: rgba(30, 23, 57, 0.10);
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

.heading-marker {
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  width: 122%;
  height: 158%;
  color: var(--color-audience-marker, var(--color-purple, #1e1739));
  transform: translate(-50%, -50%) rotate(-3deg);
  pointer-events: none;
  transition: color 0.35s ease;
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
  gap: 22px;
  align-items: stretch;
  perspective: 1200px;
}

.audience-card {
  --card-bg: #f4d35e;
  --card-bg-soft: rgba(255, 255, 255, 0.20);
  --card-text: #1e1739;
  --card-muted: rgba(30, 23, 57, 0.88);
  --card-border: rgba(30, 23, 57, 0.86);
  --card-accent: #1e1739;
  --card-word: rgba(30, 23, 57, 0.12);
  --card-shine: rgba(255, 255, 255, 0.52);
  --card-sheen: rgba(255, 255, 255, 0.18);
  --card-panel-bg: rgba(255, 255, 255, 0.26);
  --card-panel-border: rgba(30, 23, 57, 0.10);
  --card-panel-shadow: rgba(255, 255, 255, 0.22);
  --card-rotate: 0deg;
  --card-y: 0px;
  --hover-x: -4deg;
  --text-lift: 0px;
  --enter-delay: 0ms;

  position: relative;
  min-height: 382px;
  padding: 36px 38px 38px;
  border: 2px solid var(--card-border);
  border-radius: 34px;
  color: var(--card-text);
  background:
    radial-gradient(circle at 86% 15%, var(--card-shine), transparent 30%),
    linear-gradient(145deg, var(--card-sheen), transparent 44%),
    var(--card-bg);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
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
    10px 10px 0 rgba(30, 23, 57, 0.13),
    0 22px 36px rgba(30, 23, 57, 0.13);
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
    16px 16px 0 rgba(30, 23, 57, 0.17),
    0 34px 54px rgba(30, 23, 57, 0.22);
}

.audience-card::after {
  content: attr(data-word);
  position: absolute;
  right: 22px;
  bottom: 14px;
  z-index: 1;
  font-size: clamp(78px, 7vw, 116px);
  line-height: 0.78;
  font-weight: 900;
  letter-spacing: -0.08em;
  text-transform: lowercase;
  color: var(--card-word);
  transform: translateZ(8px) rotate(-5deg);
  pointer-events: none;
  user-select: none;
  transition:
    opacity 360ms ease,
    transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
}

.audience-card:hover::after {
  opacity: 0.95;
  transform: translateZ(34px) translateX(-4px) rotate(-3deg);
}

.audience-card__number {
  position: absolute;
  left: 26px;
  top: 24px;
  z-index: 4;
  min-width: 58px;
  height: 38px;
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
  transform: translateZ(56px);
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

.audience-card h3,
.audience-card p {
  position: relative;
  z-index: 5;
  opacity: 0;
  translate: 0 16px;
  transform: translateZ(48px) translateY(var(--text-lift));
  transition: transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
}

.audience-layout--visible .audience-card h3,
.audience-layout--visible .audience-card p {
  animation: audienceContentEnter 760ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.audience-layout--visible .audience-card h3 {
  animation-delay: calc(var(--enter-delay) + 220ms);
}

.audience-layout--visible .audience-card p {
  animation-delay: calc(var(--enter-delay) + 330ms);
}

.audience-card:hover h3 {
  transform: translateZ(84px) translateY(calc(var(--text-lift) - 3px));
}

.audience-card:hover p {
  transform: translateZ(66px) translateY(calc(var(--text-lift) - 2px));
}

.audience-card h3 {
  width: 100%;
  margin: 0 0 18px;
  color: var(--card-text);
  font-size: clamp(34px, 2.9vw, 50px);
  line-height: 0.9;
  font-weight: 900;
  text-align: left;
  text-transform: lowercase;
  letter-spacing: -0.07em;
}

.audience-card p {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 16px 18px 17px;
  border: 1px solid var(--card-panel-border);
  border-radius: 20px;
  color: var(--card-muted);
  background: var(--card-panel-bg);
  font-size: clamp(16px, 1.12vw, 19px);
  line-height: 1.32;
  font-weight: 650;
  text-align: left;
  letter-spacing: -0.025em;
  box-shadow: inset 0 1px 0 var(--card-panel-shadow);
}

.audience-card--start {
  --card-bg: #f4d35e;
  --card-bg-soft: rgba(255, 255, 255, 0.18);
  --card-text: #1e1739;
  --card-muted: rgba(30, 23, 57, 0.88);
  --card-border: rgba(30, 23, 57, 0.86);
  --card-accent: #1e1739;
  --card-word: rgba(30, 23, 57, 0.12);
  --card-shine: rgba(255, 255, 255, 0.40);
  --card-panel-bg: rgba(255, 255, 255, 0.28);
  --card-panel-border: rgba(30, 23, 57, 0.12);
  --card-rotate: -1.6deg;
  --card-y: 0px;
  --hover-x: -4deg;
  --text-lift: -30px;
}

.audience-card--scale {
  --card-bg: #1e1739;
  --card-text: #ffffff;
  --card-muted: rgba(255, 255, 255, 0.84);
  --card-border: rgba(219, 175, 255, 0.74);
  --card-accent: #dbafff;
  --card-bg-soft: rgba(219, 175, 255, 0.12);
  --card-word: rgba(219, 175, 255, 0.12);
  --card-shine: rgba(219, 175, 255, 0.18);
  --card-sheen: rgba(255, 255, 255, 0.07);
  --card-panel-bg: rgba(255, 255, 255, 0.09);
  --card-panel-border: rgba(219, 175, 255, 0.18);
  --card-panel-shadow: rgba(255, 255, 255, 0.10);
  --card-rotate: 0.8deg;
  --card-y: 16px;
  --hover-x: 0deg;
  --text-lift: -26px;
}

.audience-card--opportunities {
  --card-bg: #dbafff;
  --card-text: #1e1739;
  --card-muted: rgba(30, 23, 57, 0.88);
  --card-border: rgba(30, 23, 57, 0.86);
  --card-accent: #1e1739;
  --card-bg-soft: rgba(255, 255, 255, 0.20);
  --card-word: rgba(30, 23, 57, 0.12);
  --card-shine: rgba(255, 255, 255, 0.38);
  --card-panel-bg: rgba(255, 255, 255, 0.24);
  --card-panel-border: rgba(30, 23, 57, 0.12);
  --card-rotate: 1.4deg;
  --card-y: 0px;
  --hover-x: 4deg;
}

.audience-card--opportunities h3 {
  max-width: calc(100% - 82px);
  font-size: clamp(32px, 2.52vw, 44px);
  letter-spacing: -0.052em;
  white-space: nowrap;
}

.audience-card--opportunities .audience-card__icon--star {
  right: 18px;
  top: 18px;
}

.audience-layout--visible .audience-card--opportunities .audience-card__icon--star {
  opacity: 0.16;
}

.audience-card--opportunities p {
  max-width: 100%;
}

.audience-card--opportunities p {
  background: var(--card-panel-bg);
}

:global(html[data-theme='dark']) .audience-bg--left {
  background: rgba(242, 245, 94, 0.08);
}

:global(html[data-theme='dark']) .audience-bg--right {
  background: rgba(219, 175, 255, 0.10);
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

  .audience-card {
    min-height: 320px;
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

  .heading-marker {
    width: 136%;
    height: 168%;
  }

  .audience-intro {
    margin-bottom: 44px;
  }

  .audience-intro,
  .audience-bottom {
    font-size: 20px;
  }

  .audience-card {
    min-height: 306px;
    padding: 88px 22px 28px;
    border-radius: 26px;
  }

  .audience-card--start,
  .audience-card--scale {
    --text-lift: -16px;
  }

  .audience-card h3 {
    font-size: 40px;
  }

  .audience-card--opportunities h3 {
    max-width: calc(100% - 64px);
    font-size: clamp(31px, 9.1vw, 38px);
    letter-spacing: -0.045em;
  }

  .scale-title span {
    font-size: clamp(27px, 8.5vw, 34px);
  }

  .audience-card p {
    padding: 14px 15px 15px;
    font-size: 16px;
    line-height: 1.3;
  }

  .audience-card__number {
    left: 20px;
    top: 20px;
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
  .audience-card--opportunities h3 {
    white-space: normal;
    max-width: 100%;
    font-size: clamp(26px, 8vw, 32px);
  }

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

  .audience-card:hover h3,
  .audience-card:hover p {
    transform: translateZ(48px) translateY(var(--text-lift));
  }
}

@media (prefers-reduced-motion: reduce) {
  .audience-layout--visible .audience-card,
  .audience-layout--visible .audience-card h3,
  .audience-layout--visible .audience-card p,
  .audience-layout--visible .audience-card__number,
  .audience-layout--visible .audience-card__icon,
  .audience-card__blob,
  .audience-bg {
    animation: none;
  }

  .audience-card,
  .audience-card h3,
  .audience-card p,
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
