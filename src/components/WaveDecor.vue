<script setup>
import { computed } from 'vue'
import { useTheme } from '../composables/useTheme'

defineProps({
  placement: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right', 'top', 'bottom'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
})

const { isDark } = useTheme()
const waveIconSrc = computed(() => (isDark.value ? '/Волна.svg' : '/wave-mark.svg'))
</script>

<template>
  <div
    class="wave-decor"
    :class="[`wave-decor--${placement}`, `wave-decor--${size}`, isDark ? 'wave-decor--dark' : 'wave-decor--light']"
    aria-hidden="true"
  >
    <img class="wave-decor__icon" :src="waveIconSrc" alt="" loading="lazy" decoding="async" />
  </div>
</template>

<style scoped>
.wave-decor {
  --wave-edge-inset: max(16px, min(52px, 6vw));
  --wave-edge-inset-wide: max(24px, min(72px, 5.5vw));
  position: absolute;
  z-index: 1;
  pointer-events: none;
  user-select: none;
  opacity: 0.72;
}

.wave-decor__icon {
  display: block;
  width: 100%;
  height: auto;
}

.wave-decor--sm .wave-decor__icon {
  width: clamp(64px, 9vw, 88px);
}

.wave-decor--md .wave-decor__icon {
  width: clamp(84px, 11.5vw, 118px);
}

.wave-decor--lg .wave-decor__icon {
  width: clamp(104px, 14vw, 146px);
}

/* Темная тема: отдельный масштаб для нового SVG-элемента "Волна" */
.wave-decor--dark.wave-decor--sm .wave-decor__icon {
  width: clamp(92px, 12vw, 132px);
}

.wave-decor--dark.wave-decor--md .wave-decor__icon {
  width: clamp(124px, 16vw, 182px);
}

.wave-decor--dark.wave-decor--lg .wave-decor__icon {
  width: clamp(162px, 21vw, 236px);
}

.wave-decor--left {
  left: var(--wave-edge-inset);
  top: 24%;
  transform: rotate(-12deg);
  animation: waveFloatLeft 8s ease-in-out infinite;
}

.wave-decor--right {
  right: var(--wave-edge-inset);
  bottom: 18%;
  transform: rotate(10deg);
  animation: waveFloatRight 10s ease-in-out infinite;
}

.wave-decor--top {
  right: clamp(16%, 14vw, 22%);
  top: clamp(56px, 9vh, 96px);
  transform: rotate(8deg);
  animation: waveFloatTop 7s ease-in-out infinite;
}

.wave-decor--bottom {
  left: clamp(16%, 14vw, 24%);
  bottom: clamp(40px, 6vh, 64px);
  transform: rotate(-6deg);
  animation: waveFloatBottom 9s ease-in-out infinite;
}

@keyframes waveFloatLeft {
  0%,
  100% {
    transform: translateY(0) rotate(-12deg);
  }

  50% {
    transform: translateY(-18px) rotate(-8deg);
  }
}

@keyframes waveFloatRight {
  0%,
  100% {
    transform: translateY(0) rotate(10deg);
  }

  50% {
    transform: translateY(16px) rotate(6deg);
  }
}

@keyframes waveFloatTop {
  0%,
  100% {
    transform: translateY(0) rotate(8deg);
  }

  50% {
    transform: translateY(-12px) rotate(12deg);
  }
}

@keyframes waveFloatBottom {
  0%,
  100% {
    transform: translateY(0) rotate(-6deg);
  }

  50% {
    transform: translateY(14px) rotate(-2deg);
  }
}

@media (min-width: 1025px) {
  .wave-decor--sm .wave-decor__icon {
    width: clamp(80px, 6vw, 108px);
  }

  .wave-decor--md .wave-decor__icon {
    width: clamp(104px, 7.5vw, 146px);
  }

  .wave-decor--lg .wave-decor__icon {
    width: clamp(130px, 9vw, 184px);
  }

  .wave-decor--dark.wave-decor--sm .wave-decor__icon {
    width: clamp(112px, 8.2vw, 162px);
  }

  .wave-decor--dark.wave-decor--md .wave-decor__icon {
    width: clamp(146px, 10.5vw, 214px);
  }

  .wave-decor--dark.wave-decor--lg .wave-decor__icon {
    width: clamp(186px, 13.2vw, 276px);
  }

  .wave-decor--left,
  .wave-decor--right {
    --wave-edge-inset: var(--wave-edge-inset-wide);
  }

  .wave-decor--top {
    right: clamp(20%, 16vw, 26%);
  }

  .wave-decor--bottom {
    left: clamp(20%, 16vw, 28%);
  }
}

/* Планшет: без верхних/нижних, чтобы не заходить на карточки */
@media (max-width: 1100px) {
  .wave-decor--top,
  .wave-decor--bottom {
    display: none;
  }

  .wave-decor {
    opacity: 0.58;
  }

  .wave-decor--left {
    left: max(12px, min(40px, 4.5vw));
  }

  .wave-decor--right {
    right: max(12px, min(40px, 4.5vw));
  }
}

/* ~820px: компактнее */
@media (max-width: 980px) and (min-width: 761px) {
  .wave-decor--lg .wave-decor__icon {
    width: clamp(56px, 7.5vw, 72px);
  }

  .wave-decor--md .wave-decor__icon {
    width: clamp(48px, 6.5vw, 64px);
  }

  .wave-decor--dark.wave-decor--lg .wave-decor__icon {
    width: clamp(74px, 9.4vw, 104px);
  }

  .wave-decor--dark.wave-decor--md .wave-decor__icon {
    width: clamp(64px, 8.2vw, 90px);
  }

  .wave-decor--left {
    left: max(10px, min(32px, 3.8vw));
  }

  .wave-decor--right {
    right: max(10px, min(32px, 3.8vw));
  }
}

/* Телефон: одна иконка, ближе к центру, но у края */
@media (max-width: 768px) {
  .wave-decor {
    opacity: 0.42;
  }

  .wave-decor--right {
    display: none;
  }

  .wave-decor--left {
    left: max(14px, min(28px, 5vw));
    top: auto;
    bottom: 12%;
    transform: rotate(-10deg);
  }
}

/* Узкий экран: декор убираем — контент важнее */
@media (max-width: 520px) {
  .wave-decor {
    display: none;
  }
}
</style>
