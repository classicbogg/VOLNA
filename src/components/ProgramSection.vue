<template>
  <section class="directions" id="directions">
    <WaveDecor placement="left" size="md" />
    <WaveDecor placement="right" size="lg" />
    <WaveDecor placement="top" size="sm" />

    <div ref="sectionRef" class="directions__inner">
      <header class="directions__header">
        <h2>
          <span class="phrase-marker directions-heading">
            <span class="phrase-marker__text">направления</span>
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
        <p class="directions__lead">
          Семь островов на одной карте — выбери свой маршрут и погрузись в тему, которая тебе
          откликается
        </p>
      </header>

      <div class="directions-route" aria-label="Как выбрать маршрут">
        <p class="directions-route__title">твой маршрут — твой выбор</p>
        <ol class="directions-route__steps">
          <li v-for="(step, index) in routeSteps" :key="step.label">
            <span class="directions-route__num" aria-hidden="true">{{ index + 1 }}</span>
            <span class="directions-route__copy">
              <span class="directions-route__label">{{ step.label }}</span>
              <span class="directions-route__hint">{{ step.hint }}</span>
            </span>
          </li>
        </ol>
      </div>

      <div class="directions-map" role="group" aria-label="Карта семи островов">
        <svg
          class="directions-map__sea"
          viewBox="0 0 1200 280"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M40 180 C160 80 280 220 420 140 C560 60 700 200 860 120 C980 60 1080 140 1160 100"
            stroke="currentColor"
            stroke-width="2"
            stroke-dasharray="8 16"
            stroke-linecap="round"
            opacity="0.4"
          />
        </svg>
        <button
          v-for="direction in directions"
          :key="`spot-${direction.key}`"
          type="button"
          class="directions-map__spot"
          :class="{ 'directions-map__spot--active': activeKey === direction.key }"
          :style="{
            '--spot-x': `${direction.map.x}%`,
            '--spot-y': `${direction.map.y}%`,
            '--spot-color': direction.accent,
            '--spot-rgb': direction.accentRgb,
          }"
          :aria-label="`${direction.num} — ${direction.shortName}`"
          :aria-pressed="activeKey === direction.key"
          @mouseenter="setActive(direction.key)"
          @mouseleave="clearActive"
          @focus="setActive(direction.key)"
          @blur="clearActive"
        >
          <span class="directions-map__spot-ring" aria-hidden="true" />
          <span class="directions-map__spot-num">{{ direction.num }}</span>
        </button>
      </div>

      <ul
        class="directions-grid"
        :class="{ 'directions-grid--visible': sectionVisible }"
      >
        <li
          v-for="(direction, index) in directions"
          :key="direction.key"
          class="directions-grid__item"
          :class="[
            `directions-grid__item--${direction.key}`,
            { 'directions-grid__item--featured': direction.featured },
          ]"
          :style="{ '--enter-delay': `${index * 90}ms` }"
        >
          <article
            class="directions-card"
            :class="[
              `directions-card--${direction.key}`,
              {
                'directions-card--featured': direction.featured,
                'directions-card--active': activeKey === direction.key,
              },
            ]"
            :style="{
              '--card-accent': direction.accent,
              '--card-accent-rgb': direction.accentRgb,
              '--card-bg': direction.cardBg,
              '--card-bg-soft': direction.cardBgSoft,
              '--card-rotate': direction.cardRotate,
              '--hover-tilt': direction.hoverTilt,
            }"
            @mouseenter="setActive(direction.key)"
            @mouseleave="clearActive"
            @focusin="setActive(direction.key)"
            @focusout="clearActive"
          >
            <div class="directions-card__texture" aria-hidden="true" />

            <span class="directions-card__pill">{{ direction.num }}</span>

            <span
              class="directions-card__icon"
              role="img"
              :aria-label="direction.shortName"
            >
              <component :is="direction.icon" />
            </span>

            <div class="directions-card__body">
              <p class="directions-card__eyebrow">{{ direction.title }}</p>
              <h3 class="directions-card__name">{{ direction.shortName }}</h3>
              <p class="directions-card__lead">{{ direction.points[0] }}</p>
              <ul
                class="directions-card__tags"
                :aria-label="`Темы: ${direction.shortName}`"
              >
                <li v-for="tag in direction.tags" :key="tag">{{ tag }}</li>
              </ul>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import WaveDecor from './WaveDecor.vue'
import { directions, routeSteps } from '../data/directions.js'

const sectionRef = ref(null)
const sectionVisible = ref(false)
const activeKey = ref(null)
let observer = null

const setActive = (key) => {
  activeKey.value = key
}

const clearActive = () => {
  activeKey.value = null
}

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    sectionVisible.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) {
        sectionVisible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -60px 0px' },
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.directions {
  --dir-text: var(--palette-cream);
  --dir-muted: rgba(var(--palette-cream-rgb), 0.8);
  --dir-heading: var(--palette-cream);
  --dir-atlas: rgba(var(--palette-peach-rgb), 0.35);
  --dir-journey-line: rgba(var(--palette-peach-rgb), 0.55);
  --dir-card-text: var(--palette-navy);
  --dir-card-muted: rgba(var(--palette-navy-rgb), 0.82);
  --dir-card-border: rgba(var(--palette-navy-rgb), 0.88);

  position: relative;
  width: 100%;
  padding: clamp(80px, 9vw, 112px) var(--layout-gutter-wide, 40px) clamp(96px, 11vw, 128px);
  color: var(--dir-text);
  background: linear-gradient(
    168deg,
    var(--palette-navy-mid) 0%,
    var(--palette-navy) 42%,
    var(--palette-navy) 100%
  );
  overflow: hidden;
}

:global(html[data-theme='light']) .directions,
:global([data-theme='light']) .directions {
  --dir-text: var(--palette-navy);
  --dir-muted: rgba(var(--palette-navy-rgb), 0.72);
  --dir-heading: var(--palette-navy);
  --dir-atlas: rgba(var(--palette-purple-rgb), 0.2);
  --dir-journey-line: rgba(var(--palette-purple-rgb), 0.35);

  background: linear-gradient(
    168deg,
    var(--palette-white) 0%,
    var(--palette-cream) 55%,
    var(--palette-cream) 100%
  );
}

.directions__inner {
  position: relative;
  z-index: 2;
  width: min(1540px, 100%);
  margin: 0 auto;
}

.directions__header {
  position: relative;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto clamp(40px, 5vw, 56px);
  padding: 0 clamp(20px, 4vw, 80px);
  text-align: center;
}

.directions__header h2 {
  margin: 0;
  color: var(--dir-heading);
  font-size: clamp(48px, 6.8vw, 92px);
  font-weight: 950;
  line-height: 0.9;
  letter-spacing: -0.08em;
  text-transform: lowercase;
}

.directions__lead {
  position: relative;
  z-index: 2;
  max-width: 780px;
  margin: clamp(18px, 2.5vw, 28px) auto 0;
  color: var(--dir-muted);
  font-size: clamp(18px, 1.85vw, 28px);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.04em;
}

.directions-route {
  margin: 0 auto clamp(28px, 4vw, 40px);
  padding: 0 clamp(8px, 2vw, 20px);
}

.directions-route__title {
  margin: 0 0 clamp(14px, 2vw, 18px);
  color: var(--dir-heading);
  font-size: clamp(17px, 1.6vw, 22px);
  font-weight: 900;
  letter-spacing: -0.05em;
  text-align: center;
  text-transform: lowercase;
}

.directions-route__steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(10px, 2vw, 18px) clamp(16px, 3vw, 32px);
  margin: 0;
  padding: 0;
  list-style: none;
}

.directions-route__steps li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 220px;
}

.directions-route__num {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 2px solid var(--palette-navy);
  border-radius: 50%;
  background: var(--palette-peach);
  color: var(--palette-navy);
  font-size: 14px;
  font-weight: 900;
  line-height: 1;
  box-shadow: 3px 3px 0 rgba(var(--palette-navy-rgb), 0.12);
}

:global(html[data-theme='dark']) .directions-route__num {
  border-color: var(--palette-peach);
  color: var(--palette-peach);
  background: rgba(var(--palette-navy-rgb), 0.5);
}

.directions-route__label {
  display: block;
  color: var(--dir-heading);
  font-size: clamp(14px, 1.2vw, 16px);
  font-weight: 900;
  line-height: 1.2;
  letter-spacing: -0.04em;
  text-transform: lowercase;
}

.directions-route__hint {
  display: block;
  margin-top: 2px;
  color: var(--dir-muted);
  font-size: clamp(11px, 0.95vw, 13px);
  font-weight: 700;
  line-height: 1.3;
}

.directions-map {
  position: relative;
  z-index: 1;
  height: clamp(120px, 18vw, 200px);
  margin: 0 auto clamp(32px, 4vw, 48px);
  border-radius: 28px;
  background: rgba(var(--palette-navy-rgb), 0.22);
  border: 2px dashed rgba(var(--palette-peach-rgb), 0.28);
  overflow: hidden;
}

:global(html[data-theme='light']) .directions-map {
  background: rgba(var(--palette-purple-rgb), 0.06);
  border-color: rgba(var(--palette-purple-rgb), 0.22);
}

.directions-map__sea {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: var(--dir-atlas);
}

.directions-map__spot {
  position: absolute;
  left: var(--spot-x);
  top: var(--spot-y);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(44px, 5vw, 56px);
  height: clamp(44px, 5vw, 56px);
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transform: translate(-50%, -50%);
  transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1);
}

.directions-map__spot-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(var(--spot-rgb), 0.35);
  border: 2px solid var(--spot-color);
  box-shadow: 0 0 0 6px rgba(var(--spot-rgb), 0.12);
  transition:
    transform 280ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 280ms ease,
    background 280ms ease;
}

.directions-map__spot-num {
  position: relative;
  z-index: 1;
  color: var(--palette-navy);
  font-size: clamp(12px, 1.1vw, 14px);
  font-weight: 900;
  letter-spacing: -0.03em;
  line-height: 1;
}

:global(html[data-theme='dark']) .directions-map__spot-num {
  color: var(--palette-cream);
}

.directions-map__spot:hover .directions-map__spot-ring,
.directions-map__spot--active .directions-map__spot-ring {
  transform: scale(1.12);
  background: var(--spot-color);
  box-shadow:
    0 0 0 8px rgba(var(--spot-rgb), 0.2),
    0 12px 24px rgba(var(--spot-rgb), 0.35);
}

.directions-map__spot--active,
.directions-map__spot:hover {
  transform: translate(-50%, -50%) scale(1.05);
}

.directions-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: clamp(16px, 2vw, 24px);
  margin: 0;
  padding: 0;
  list-style: none;
}

.directions-grid__item--tech {
  grid-column: span 6;
}

.directions-grid__item--social,
.directions-grid__item--wellness {
  grid-column: span 3;
}

.directions-grid__item--business,
.directions-grid__item--fashion,
.directions-grid__item--craft {
  grid-column: span 3;
}

.directions-grid__item--media {
  grid-column: span 6;
}

.directions-card {
  --hover-x: var(--hover-tilt, 0deg);

  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  padding: clamp(22px, 2.4vw, 30px);
  border: 2px solid var(--dir-card-border);
  border-radius: 34px;
  color: var(--dir-card-text);
  background: var(--card-bg);
  overflow: hidden;
  opacity: 0;
  translate: 0 48px;
  scale: 0.96;
  filter: blur(8px);
  transform: rotate(var(--card-rotate));
  transform-style: preserve-3d;
  box-shadow:
    10px 10px 0 rgba(var(--palette-navy-rgb), 0.12),
    0 22px 40px rgba(var(--palette-navy-rgb), 0.14);
  transition:
    transform 360ms cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 360ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 280ms ease;
}

.directions-card--featured {
  min-height: clamp(260px, 28vw, 320px);
}

.directions-card--active {
  border-color: var(--card-accent);
  box-shadow:
    12px 12px 0 rgba(var(--card-accent-rgb), 0.22),
    0 0 0 3px rgba(var(--card-accent-rgb), 0.18),
    0 28px 48px rgba(var(--card-accent-rgb), 0.2);
}

.directions-card__texture {
  position: absolute;
  right: -18%;
  top: -22%;
  z-index: 0;
  width: 58%;
  aspect-ratio: 1;
  background: url('/wave-mark.svg') center / contain no-repeat;
  opacity: 0.1;
  pointer-events: none;
}

.directions-grid--visible .directions-card {
  animation: directionsCardEnter 920ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--enter-delay, 0ms);
}

.directions-card:hover {
  transform:
    translateY(-10px)
    rotate(var(--card-rotate))
    rotateX(4deg)
    rotateY(var(--hover-x))
    scale(1.02);
  box-shadow:
    14px 14px 0 rgba(var(--palette-navy-rgb), 0.16),
    0 32px 52px rgba(var(--card-accent-rgb), 0.22);
}

.directions-card__pill {
  position: relative;
  z-index: 3;
  width: fit-content;
  min-width: 48px;
  height: 34px;
  margin: 0 0 14px;
  padding: 0 12px;
  border: 2px solid rgba(var(--palette-navy-rgb), 0.88);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--palette-navy);
  background: var(--palette-peach);
  font-size: 14px;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
  box-shadow: 3px 3px 0 rgba(var(--palette-navy-rgb), 0.12);
}

.directions-card__icon {
  position: absolute;
  z-index: 4;
  right: clamp(18px, 2vw, 24px);
  top: clamp(18px, 2vw, 24px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: clamp(52px, 5.5vw, 64px);
  height: clamp(52px, 5.5vw, 64px);
  border-radius: 20px;
  color: var(--card-accent);
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid rgba(var(--card-accent-rgb), 0.35);
  box-shadow: 0 8px 20px rgba(var(--card-accent-rgb), 0.18);
  transition: transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
}

.directions-card--featured .directions-card__icon {
  width: clamp(58px, 6vw, 72px);
  height: clamp(58px, 6vw, 72px);
}

.directions-card:hover .directions-card__icon,
.directions-card--active .directions-card__icon {
  transform: translateY(-4px) scale(1.06);
}

.directions-card__icon :deep(svg) {
  display: block;
  width: clamp(28px, 3vw, 34px);
  height: clamp(28px, 3vw, 34px);
}

.directions-card__body {
  position: relative;
  z-index: 3;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 10px;
  padding-right: clamp(56px, 9vw, 76px);
}

.directions-card__eyebrow {
  margin: 0;
  color: var(--dir-card-muted);
  font-size: clamp(12px, 1vw, 14px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.03em;
  text-transform: lowercase;
}

.directions-card__name {
  margin: 0;
  color: var(--dir-card-text);
  font-size: clamp(26px, 2.4vw, 40px);
  font-weight: 950;
  line-height: 0.95;
  letter-spacing: -0.06em;
  text-transform: lowercase;
}

.directions-card--featured .directions-card__name {
  font-size: clamp(30px, 3vw, 48px);
}

.directions-card__lead {
  margin: 0;
  color: var(--dir-card-text);
  font-size: clamp(15px, 1.2vw, 18px);
  font-weight: 800;
  line-height: 1.32;
  letter-spacing: -0.03em;
}

.directions-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
}

.directions-card__tags li {
  padding: 6px 12px;
  border-radius: 999px;
  color: var(--dir-card-text);
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(var(--card-accent-rgb), 0.35);
  font-size: clamp(11px, 0.95vw, 13px);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  text-transform: lowercase;
}

:global(html[data-theme='dark']) .directions-card--business {
  --dir-card-text: var(--palette-cream);
  --dir-card-muted: rgba(var(--palette-cream-rgb), 0.84);
  --dir-card-border: rgba(var(--palette-purple-rgb), 0.7);
}

:global(html[data-theme='dark']) .directions-card--business {
  background: var(--palette-navy-mid);
}

:global(html[data-theme='dark']) .directions-card--business .directions-card__tags li {
  background: rgba(var(--palette-cream-rgb), 0.08);
  border-color: rgba(var(--palette-peach-rgb), 0.2);
}

@keyframes directionsCardEnter {
  0% {
    opacity: 0;
    translate: 0 48px;
    scale: 0.96;
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    translate: 0 0;
    scale: 1;
    filter: blur(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .directions-card,
  .directions-map__spot {
    animation: none !important;
    transition: none;
  }

  .directions-grid--visible .directions-card {
    opacity: 1;
    translate: 0;
    scale: 1;
    filter: none;
  }

  .directions-card:hover {
    transform: rotate(var(--card-rotate));
  }
}

@media (min-width: 1920px) {
  .directions {
    padding-inline: var(--layout-gutter-wide, 80px);
  }
}

@media (max-width: 1024px) {
  .directions-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .directions-grid__item--tech,
  .directions-grid__item--social,
  .directions-grid__item--wellness,
  .directions-grid__item--business,
  .directions-grid__item--fashion,
  .directions-grid__item--craft,
  .directions-grid__item--media {
    grid-column: span 1;
  }

  .directions-grid__item--featured {
    grid-column: 1 / -1;
  }
}

@media (max-width: 900px) {
  .directions {
    padding-inline: var(--layout-gutter, 24px);
  }

  .directions-route__steps {
    flex-direction: column;
    align-items: center;
  }

  .directions-route__steps li {
    max-width: 100%;
    width: min(100%, 320px);
  }
}

@media (max-width: 680px) {
  .directions-grid {
    grid-template-columns: 1fr;
  }

  .directions-grid__item--featured {
    grid-column: auto;
  }

  .directions__header {
    padding-inline: 8px;
  }

  .directions-card__body {
    padding-right: 0;
    padding-top: 4px;
  }

  .directions-card__icon {
    position: relative;
    right: auto;
    top: auto;
    margin: 0 0 12px;
  }
}

@media (max-width: 480px) {
  .directions {
    padding-inline: 16px;
  }
}
</style>
