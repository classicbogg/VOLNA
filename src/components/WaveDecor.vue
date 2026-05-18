<script setup>
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
</script>

<template>
  <div
    class="wave-decor"
    :class="[`wave-decor--${placement}`, `wave-decor--${size}`]"
    aria-hidden="true"
  >
    <img class="wave-decor__icon" src="/wave-mark.svg" alt="" loading="lazy" decoding="async" />
  </div>
</template>

<style scoped>
.wave-decor {
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
  width: clamp(52px, 8vw, 72px);
}

.wave-decor--md .wave-decor__icon {
  width: clamp(68px, 10vw, 96px);
}

.wave-decor--lg .wave-decor__icon {
  width: clamp(84px, 12vw, 118px);
}

.wave-decor--left {
  left: -12px;
  top: 24%;
  transform: rotate(-12deg);
  animation: waveFloatLeft 8s ease-in-out infinite;
}

.wave-decor--right {
  right: -16px;
  bottom: 18%;
  transform: rotate(10deg);
  animation: waveFloatRight 10s ease-in-out infinite;
}

.wave-decor--top {
  right: 12%;
  top: 72px;
  transform: rotate(8deg);
  animation: waveFloatTop 7s ease-in-out infinite;
}

.wave-decor--bottom {
  left: 10%;
  bottom: 48px;
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
    left: max(-32px, -3vw);
  }

  .wave-decor--right {
    right: max(-32px, -3vw);
  }
}

/* Телефон: одна иконка у края, слабее */
@media (max-width: 760px) {
  .wave-decor {
    opacity: 0.42;
  }

  .wave-decor--right {
    display: none;
  }

  .wave-decor--left {
    left: max(-36px, -5vw);
    top: auto;
    bottom: 10%;
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
