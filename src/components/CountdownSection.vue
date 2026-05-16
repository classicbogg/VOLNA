<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const targetDate = new Date('2026-05-27T00:00:00')

const now = ref(new Date())
const sparks = ref([])

let timer = null
let sparkTimer = null
let sparkId = 0

const difference = computed(() => {
  const diff = targetDate.getTime() - now.value.getTime()
  return diff > 0 ? diff : 0
})

const days = computed(() => {
  return Math.floor(difference.value / (1000 * 60 * 60 * 24))
})

const hours = computed(() => {
  return Math.floor((difference.value / (1000 * 60 * 60)) % 24)
})

const minutes = computed(() => {
  return Math.floor((difference.value / (1000 * 60)) % 60)
})

const seconds = computed(() => {
  return Math.floor((difference.value / 1000) % 60)
})

const formatNumber = (value) => {
  return String(value).padStart(2, '0')
}

const canPlaySparks = () => {
  if (typeof window === 'undefined') {
    return false
  }

  const isMobile = window.innerWidth <= 520
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return !isMobile && !reducedMotion
}

const createSpark = (side) => {
  return {
    id: sparkId++,
    side,
    x: Math.round(34 + Math.random() * 150),
    y: Math.round(48 + Math.random() * 130),
    size: Math.round(4 + Math.random() * 5),
    duration: (0.75 + Math.random() * 0.65).toFixed(2),
    moveX: Math.round(-12 + Math.random() * 24),
    tone: Math.random() > 0.45 ? 'yellow' : 'purple',
  }
}

const getSparkStyle = (spark) => {
  const style = {
    top: `calc(50% - 110px + ${spark.y}px)`,
    width: `${spark.size}px`,
    height: `${spark.size}px`,
    '--duration': `${spark.duration}s`,
    '--move-x': `${spark.moveX}px`,
  }

  if (spark.side === 'left') {
    style.left = `${48 + spark.x}px`
  } else {
    style.right = `${48 + spark.x}px`
  }

  return style
}

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)

  if (canPlaySparks()) {
    sparkTimer = setInterval(() => {
      sparks.value.push(createSpark('left'))
      sparks.value.push(createSpark('right'))

      if (sparks.value.length > 28) {
        sparks.value = sparks.value.slice(-28)
      }
    }, 200)
  }
})

onUnmounted(() => {
  clearInterval(timer)
  clearInterval(sparkTimer)
})
</script>

<template>
  <section class="countdown-section">
    <div class="countdown-decor countdown-decor--left" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 16h2v4h2v2H7v-2h2v-4h2v-2h2v2Zm-6 4H5v-2h2v2Zm12 0h-2v-2h2v2ZM5 18H3v-8h2v8Zm16 0h-2v-6h2v6Zm-6-6h-2v-2h2v2Zm4 0h-2v-2h2v2ZM7 10H5V8h2v2Zm6 0h-2V6h2v4Zm4 0h-2V8h2v2ZM9 8H7V6h2v2Zm2-2H9V2h2v4Z" />
      </svg>
    </div>

    <div class="countdown-decor countdown-decor--right" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 16h2v4h2v2H7v-2h2v-4h2v-2h2v2Zm-6 4H5v-2h2v2Zm12 0h-2v-2h2v2ZM5 18H3v-8h2v8Zm16 0h-2v-6h2v6Zm-6-6h-2v-2h2v2Zm4 0h-2v-2h2v2ZM7 10H5V8h2v2Zm6 0h-2V6h2v4Zm4 0h-2V8h2v2ZM9 8H7V6h2v2Zm2-2H9V2h2v4Z" />
      </svg>
    </div>

    <div class="countdown-fire-layer" aria-hidden="true">
      <span
        v-for="spark in sparks"
        :key="spark.id"
        class="countdown-spark"
        :class="`countdown-spark--${spark.tone}`"
        :style="getSparkStyle(spark)"
      ></span>
    </div>

    <div class="countdown-container">
      <div class="countdown-label">
        До начала форума
      </div>

      <div class="countdown-grid">
        <div class="countdown-item">
          <span class="countdown-number">{{ formatNumber(days) }}</span>
          <span class="countdown-text">дней</span>
        </div>

        <div class="countdown-separator">:</div>

        <div class="countdown-item">
          <span class="countdown-number">{{ formatNumber(hours) }}</span>
          <span class="countdown-text">часов</span>
        </div>

        <div class="countdown-separator">:</div>

        <div class="countdown-item">
          <span class="countdown-number">{{ formatNumber(minutes) }}</span>
          <span class="countdown-text">минут</span>
        </div>

        <div class="countdown-separator">:</div>

        <div class="countdown-item">
          <span class="countdown-number">{{ formatNumber(seconds) }}</span>
          <span class="countdown-text">секунд</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.countdown-section {
  position: relative;
  width: 100%;
  padding: 96px 40px 104px;
  background: var(--color-countdown-bg);
  color: var(--color-countdown-text);
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
  overflow: hidden;
}

.countdown-decor {
  position: absolute;
  top: 50%;
  color: var(--color-countdown-decor);
  pointer-events: none;
  user-select: none;
  z-index: 1;
}

.countdown-decor svg {
  display: block;
  width: 220px;
  height: 220px;
  filter: drop-shadow(0 12px 20px rgba(var(--color-accent-rgb), 0.12));
}

.countdown-decor--left {
  left: 48px;
  transform: translateY(-50%) rotate(-8deg);
}

.countdown-decor--right {
  right: 48px;
  transform: translateY(-50%) rotate(8deg) scaleX(-1);
}

.countdown-fire-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.countdown-spark {
  position: absolute;
  display: block;
  opacity: 0;
  image-rendering: pixelated;
  animation: pixelBurn var(--duration) steps(5, end) forwards;
}

.countdown-spark--yellow {
  background: rgba(var(--color-accent-rgb), 0.72);
  box-shadow: 0 0 8px rgba(var(--color-accent-rgb), 0.28);
}

.countdown-spark--purple {
  background: rgba(var(--color-accent-rgb), 0.62);
  box-shadow: 0 0 8px rgba(var(--color-accent-rgb), 0.24);
}

.countdown-container {
  position: relative;
  z-index: 2;
  width: min(1440px, 100%);
  margin: 0 auto;
}

.countdown-label {
  width: fit-content;
  margin: 0 0 52px;
  padding: 16px 30px 14px;
  border-radius: 999px;
  background: var(--color-countdown-label-bg, var(--color-yellow));
  color: var(--color-countdown-label-text, var(--color-purple));
  font-size: clamp(22px, 3vw, 44px);
  line-height: 0.9;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.06em;
}

.countdown-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  align-items: start;
  gap: 18px;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.countdown-number {
  display: block;
  color: var(--color-countdown-text);
  font-size: clamp(72px, 14vw, 210px);
  line-height: 0.78;
  font-weight: 900;
  letter-spacing: -0.1em;
}

.countdown-text {
  margin-top: 22px;
  color: var(--color-countdown-text);
  font-size: clamp(18px, 2vw, 34px);
  line-height: 1;
  font-weight: 900;
  text-transform: lowercase;
  letter-spacing: -0.04em;
}

.countdown-separator {
  color: var(--color-countdown-separator, var(--color-yellow));
  opacity: 0.85;
  font-size: clamp(58px, 11vw, 165px);
  line-height: 0.72;
  font-weight: 900;
  transform: translateY(-6px);
}

@keyframes pixelBurn {
  0% {
    opacity: 0;
    transform: translate(0, 12px) scale(0.7);
  }

  18% {
    opacity: 1;
    transform: translate(0, 0) scale(1);
  }

  55% {
    opacity: 0.8;
    transform: translate(var(--move-x), -28px) scale(1);
  }

  100% {
    opacity: 0;
    transform: translate(calc(var(--move-x) * 1.4), -58px) scale(0.25);
  }
}

@media (max-width: 900px) {
  .countdown-section {
    padding: 72px 24px 82px;
  }

  .countdown-decor svg {
    width: 150px;
    height: 150px;
  }

  .countdown-decor--left {
    left: 18px;
  }

  .countdown-decor--right {
    right: 18px;
  }

  .countdown-label {
    margin-bottom: 42px;
  }

  .countdown-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 44px 24px;
  }

  .countdown-separator {
    display: none;
  }
}

@media (max-width: 520px) {
  .countdown-section {
    padding: 58px 16px 66px;
  }

  .countdown-decor,
  .countdown-fire-layer {
    display: none;
  }

  .countdown-label {
    padding: 14px 22px 12px;
    margin-bottom: 34px;
  }

  .countdown-grid {
    gap: 34px 16px;
  }

  .countdown-number {
    font-size: clamp(58px, 22vw, 92px);
  }

  .countdown-text {
    margin-top: 14px;
    font-size: 16px;
  }
}

@media (max-width: 360px) {
  .countdown-section {
    padding: 48px 12px 56px;
  }

  .countdown-label {
    width: 100%;
    max-width: 100%;
    padding: 12px 16px 10px;
    font-size: clamp(18px, 5.5vw, 24px);
    text-align: center;
  }

  .countdown-number {
    font-size: clamp(48px, 20vw, 72px);
  }

  .countdown-text {
    font-size: 14px;
  }
}
</style>