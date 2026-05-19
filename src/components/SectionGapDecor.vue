<script setup>
import WaveDecor from './WaveDecor.vue'
</script>

<template>
  <div class="section-gap-decor" aria-hidden="true">
    <WaveDecor placement="left" size="sm" />
    <WaveDecor placement="right" size="sm" />
  </div>
</template>

<style scoped>
.section-gap-decor {
  position: relative;
  z-index: 2;
  width: 100%;
  height: clamp(64px, 8vh, 112px);
  margin-block: clamp(-52px, -5vh, -36px);
  pointer-events: none;
  overflow: visible;
}

.section-gap-decor :deep(.wave-decor) {
  opacity: 0.62;
}

.section-gap-decor :deep(.wave-decor--left) {
  top: 50%;
  bottom: auto;
  left: clamp(14%, 12vw, 22%);
  transform: translateY(-50%) rotate(-14deg);
  animation: sectionGapWaveFloatLeft 9s ease-in-out infinite;
}

.section-gap-decor :deep(.wave-decor--right) {
  top: 50%;
  bottom: auto;
  right: clamp(14%, 12vw, 22%);
  left: auto;
  display: block;
  transform: translateY(-50%) rotate(12deg);
  animation: sectionGapWaveFloatRight 9s ease-in-out infinite;
  animation-delay: -4s;
}

.section-gap-decor :deep(.wave-decor--sm .wave-decor__icon) {
  width: clamp(44px, 6.5vw, 64px);
}

@keyframes sectionGapWaveFloatLeft {
  0%,
  100% {
    transform: translateY(-50%) rotate(-14deg);
  }

  50% {
    transform: translateY(calc(-50% - 10px)) rotate(-10deg);
  }
}

@keyframes sectionGapWaveFloatRight {
  0%,
  100% {
    transform: translateY(-50%) rotate(12deg);
  }

  50% {
    transform: translateY(calc(-50% - 10px)) rotate(16deg);
  }
}

@media (min-width: 1025px) {
  .section-gap-decor :deep(.wave-decor--left) {
    left: clamp(18%, 14vw, 26%);
  }

  .section-gap-decor :deep(.wave-decor--right) {
    right: clamp(18%, 14vw, 26%);
  }
}

@media (max-width: 980px) and (min-width: 761px) {
  .section-gap-decor {
    height: clamp(56px, 7vh, 96px);
    margin-block: clamp(-44px, -4.5vh, -28px);
  }

  .section-gap-decor :deep(.wave-decor--left) {
    left: clamp(10%, 8vw, 16%);
  }

  .section-gap-decor :deep(.wave-decor--right) {
    right: clamp(10%, 8vw, 16%);
  }
}

@media (max-width: 768px) {
  .section-gap-decor {
    height: clamp(48px, 6vh, 72px);
    margin-block: clamp(-36px, -4vh, -24px);
  }

  .section-gap-decor :deep(.wave-decor) {
    opacity: 0.48;
  }

  .section-gap-decor :deep(.wave-decor--left) {
    left: clamp(8%, 6vw, 14%);
  }

  .section-gap-decor :deep(.wave-decor--right) {
    right: clamp(8%, 6vw, 14%);
    display: block;
  }
}

@media (max-width: 520px) {
  .section-gap-decor {
    display: none;
  }
}
</style>
