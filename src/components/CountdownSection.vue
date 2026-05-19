<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

const targetDate = new Date('2026-05-29T10:00:00')

const now = ref(new Date())

let timer = null

const difference = computed(() => {
  const diff = targetDate.getTime() - now.value.getTime()
  return diff > 0 ? diff : 0
})

const days = computed(() => Math.floor(difference.value / (1000 * 60 * 60 * 24)))
const hours = computed(() => Math.floor((difference.value / (1000 * 60 * 60)) % 24))
const minutes = computed(() => Math.floor((difference.value / (1000 * 60)) % 60))
const seconds = computed(() => Math.floor((difference.value / 1000) % 60))

const formatNumber = (value) => String(value).padStart(2, '0')

const units = computed(() => [
  { value: days.value, label: 'дней' },
  { value: hours.value, label: 'часов' },
  { value: minutes.value, label: 'минут' },
  { value: seconds.value, label: 'секунд' },
])

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <section class="countdown-section" aria-labelledby="countdown-heading">
    <div class="countdown-container">
      <p id="countdown-heading" class="countdown-meta">до начала мероприятия</p>

      <div class="countdown-grid" role="timer" aria-live="polite">
        <div
          v-for="(unit, index) in units"
          :key="unit.label"
          class="countdown-item"
          :class="{ 'countdown-item--divided': index > 0 }"
        >
          <span class="countdown-number">{{ formatNumber(unit.value) }}</span>
          <span class="countdown-label">{{ unit.label }}</span>
        </div>
      </div>
      <p class="countdown-registration">регистрация в 9:30</p>
    </div>
  </section>
</template>

<style scoped>
.countdown-section {
  --countdown-number-max: clamp(60px, 10.5vw, 120px);
  --countdown-fit-divisor: 4.9;
  --countdown-divider: rgba(var(--palette-cream-rgb), 0.24);

  width: 100%;
  max-width: 100%;
  padding: clamp(56px, 7vh, 84px) var(--layout-gutter-wide, 40px);
  background: var(--color-countdown-bg);
  color: var(--color-countdown-text);
  transition: background-color 0.35s ease;
}

.countdown-container {
  container-type: inline-size;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(24px, 3.2vh, 34px);
  width: min(1040px, 100%);
  margin: 0 auto;
}

.countdown-meta {
  margin: 0;
  color: var(--palette-white);
  font-size: clamp(20px, 2.6vw, 30px);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
}

.countdown-registration {
  margin: clamp(8px, 1.2vh, 14px) 0 0;
  color: var(--palette-white);
  font-size: clamp(16px, 2vw, 22px);
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
}

.countdown-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  width: 100%;
}

.countdown-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 1.5vh, 14px);
  padding: clamp(20px, 3vw, 36px) clamp(12px, 2vw, 24px);
  text-align: center;
}

.countdown-item--divided {
  box-shadow: inset 1px 0 0 var(--countdown-divider);
}

.countdown-number {
  display: block;
  color: var(--color-countdown-number);
  font-size: min(
    var(--countdown-number-max),
    max(44px, calc(100cqi / var(--countdown-fit-divisor)))
  );
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  font-variant-numeric: tabular-nums;
}

.countdown-label {
  color: var(--palette-white);
  font-size: clamp(18px, 2.1vw, 26px);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.04em;
  text-transform: lowercase;
}

@media (min-width: 1025px) and (max-width: 1439px) {
  .countdown-section {
    --countdown-number-max: clamp(58px, 5.6vw, 92px);
    --countdown-fit-divisor: 5;
    padding-block: clamp(60px, 7vh, 80px);
  }

  .countdown-container {
    width: min(960px, 100%);
    gap: clamp(22px, 3vh, 30px);
  }

  .countdown-meta {
    font-size: clamp(20px, 1.8vw, 28px);
  }

  .countdown-registration {
    font-size: clamp(17px, 1.4vw, 21px);
  }

  .countdown-label {
    font-size: clamp(17px, 1.5vw, 24px);
  }
}

@media (min-width: 1440px) {
  .countdown-section {
    --countdown-number-max: clamp(64px, 5vw, 112px);
    padding-block: clamp(64px, 7.5vh, 88px);
  }

  .countdown-container {
    width: min(1080px, 100%);
  }

  .countdown-meta {
    font-size: clamp(22px, 1.6vw, 30px);
  }
}

@media (max-width: 1024px) {
  .countdown-section {
    --countdown-number-max: clamp(54px, 8vw, 92px);
    --countdown-fit-divisor: 5.2;
    padding-block: clamp(48px, 6.5vh, 68px);
    padding-inline: var(--layout-gutter-wide);
  }

  .countdown-container {
    gap: clamp(18px, 2.8vh, 26px);
    width: min(720px, 100%);
  }

  .countdown-meta {
    font-size: clamp(18px, 2.4vw, 26px);
    letter-spacing: 0.045em;
    text-wrap: balance;
  }

  .countdown-registration {
    font-size: clamp(15px, 1.8vw, 20px);
  }

  .countdown-label {
    font-size: clamp(16px, 2vw, 22px);
  }

  .countdown-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .countdown-item--divided {
    box-shadow: none;
  }

  .countdown-item:nth-child(even) {
    box-shadow: inset 1px 0 0 var(--countdown-divider);
  }

  .countdown-item:nth-child(3) {
    box-shadow: inset 0 1px 0 var(--countdown-divider);
  }

  .countdown-item:nth-child(4) {
    box-shadow:
      inset 1px 0 0 var(--countdown-divider),
      inset 0 1px 0 var(--countdown-divider);
  }
}

@media (max-width: 768px) {
  .countdown-section {
    --countdown-number-max: clamp(50px, 14vw, 80px);
    --countdown-fit-divisor: 5.4;
    padding-block: clamp(40px, 6vh, 56px);
    padding-inline: var(--layout-gutter);
  }

  .countdown-container {
    gap: clamp(16px, 2.8vh, 22px);
    width: min(1040px, 100%);
  }

  .countdown-meta {
    font-size: clamp(17px, 4.8vw, 22px);
    letter-spacing: 0.04em;
  }

  .countdown-registration {
    font-size: clamp(14px, 3.8vw, 18px);
  }

  .countdown-label {
    font-size: clamp(15px, 3.8vw, 20px);
  }
}

@media (max-width: 420px) {
  .countdown-section {
    --countdown-number-max: clamp(38px, 13vw, 60px);
    --countdown-fit-divisor: 5.8;
    padding-block: 36px;
  }

  .countdown-container {
    gap: 14px;
  }

  .countdown-meta {
    font-size: clamp(15px, 4.6vw, 18px);
  }

  .countdown-registration {
    font-size: clamp(13px, 3.6vw, 16px);
  }

  .countdown-number {
    font-size: min(
      var(--countdown-number-max),
      max(34px, calc(100cqi / var(--countdown-fit-divisor)))
    );
  }

  .countdown-label {
    font-size: clamp(13px, 3.5vw, 16px);
  }

  .countdown-item {
    gap: 6px;
    padding: 12px 8px;
  }
}

@media (max-width: 480px) {
  .countdown-section {
    --countdown-number-max: clamp(40px, 12.5vw, 56px);
    padding-block: 40px;
  }

  .countdown-meta {
    font-size: clamp(14px, 4.2vw, 17px);
    letter-spacing: 0.035em;
  }
}

@media (max-width: 360px) {
  .countdown-section {
    padding-block: 32px;
  }

  .countdown-number {
    font-size: min(
      var(--countdown-number-max),
      max(30px, calc(100cqi / 6.2))
    );
  }

  .countdown-item {
    padding: 10px 6px;
  }
}

@media (max-width: 320px) {
  .countdown-label {
    font-size: 12px;
  }

  .countdown-registration {
    font-size: 12px;
    letter-spacing: 0.03em;
  }
}
</style>
