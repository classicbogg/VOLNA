<script setup>
import { ref } from 'vue'
import RegistrationModal from './RegistrationModal.vue'
import WaveDecor from './WaveDecor.vue'
import { useVolnaLogo } from '../composables/useVolnaLogo'

const { logoSrc, logoAlt, onLogoError } = useVolnaLogo({ variant: 'hero' })

const isRegistrationOpen = ref(false)

const openRegistration = () => {
  isRegistrationOpen.value = true
}

const closeRegistration = () => {
  isRegistrationOpen.value = false
}

const handleRegistrationSubmit = (data) => {
  console.log('Данные регистрации:', data)
}
</script>

<template>
  <section class="hero-section">
    <WaveDecor placement="left" size="md" />
    <WaveDecor placement="right" size="lg" />

    <div class="hero-container">
      <div class="hero-brand">
        <img
          class="hero-brand__logo"
          :src="logoSrc"
          :alt="logoAlt"
          width="605"
          height="172"
          decoding="async"
          @error="onLogoError"
        />
      </div>

      <h2 class="hero-kicker">региональный</h2>

      <div class="hero-title-fit">
        <h1 class="hero-title" aria-label="форум молодежного предпринимательства">
          <span class="hero-title__line hero-title__line--first">
            <span>форум</span>
          </span>

          <span class="hero-title__line hero-title__line--second">
            <span>молодежного</span>
          </span>

          <span class="hero-title__line hero-title__line--third">
            <span>предпринимательства</span>
          </span>
        </h1>
      </div>

      <div class="hero-bottom">
        <div class="hero-actions">
          <div class="hero-date">
            <p class="hero-date__where">ХМАО-Югра Сургут</p>
            <p class="hero-date__when">29 мая 2026</p>
          </div>

          <button
            class="hero-button"
            type="button"
            aria-haspopup="dialog"
            @click="openRegistration"
          >
            зарегистрироваться
          </button>
        </div>
      </div>
    </div>

    <div class="hero-marquee" aria-hidden="true">
      <div class="hero-marquee__track">
        <div class="hero-marquee__group">
          <span>создай наше</span>
          <span>форум молодежного предпринимательства</span>
          <span>создай наше</span>
          <span>форум молодежного предпринимательства</span>
        </div>

        <div class="hero-marquee__group">
          <span>создай наше</span>
          <span>форум молодежного предпринимательства</span>
          <span>создай наше</span>
          <span>форум молодежного предпринимательства</span>
        </div>
      </div>
    </div>

    <RegistrationModal
      :is-open="isRegistrationOpen"
      @close="closeRegistration"
      @submit="handleRegistrationSubmit"
    />
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: auto;
  --hero-top-gap: clamp(12px, 2.4vw, 28px);
  --hero-marquee-h: 54px;
  --hero-bottom-gap: clamp(16px, 3vw, 24px);
  padding-top: calc(
    var(--site-header-offset, 172px) + env(safe-area-inset-top, 0px) + var(--hero-top-gap)
  );
  padding-inline: clamp(16px, 4vw, 40px);
  padding-bottom: calc(
    var(--hero-bottom-gap) + var(--hero-marquee-h) + env(safe-area-inset-bottom, 0px)
  );
  background: var(--hero-bg, var(--color-bg));
  color: var(--color-hero-title, var(--color-text));
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.hero-container {
  position: relative;
  z-index: 3;
  width: min(1440px, 100%);
  max-width: 100%;
  margin: 0 auto;
  display: block;
  container-type: inline-size;
  container-name: hero;
  overflow: visible;
  --hero-logo-delay: 0.08s;
  --hero-kicker-delay: 0.52s;
  /* после штампа (~0.52s) — пауза, затем заголовок */
  --hero-title-base-delay: 1.16s;
  --hero-logo-max-h: min(clamp(148px, 26vw, 228px), 30vh);
  --hero-logo-max-w: min(840px, 98vw);
  /* зазор «региональный» → заголовок; на узких экранах только положительный */
  --hero-kicker-title-gap: clamp(10px, 2.4vw, 16px);
}

.hero-brand {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  margin: 0 auto clamp(22px, 4.5vw, 40px);
  opacity: 0;
  animation: heroLogoReveal 0.48s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: var(--hero-logo-delay);
}

.hero-brand__logo {
  display: block;
  width: var(--hero-logo-max-w);
  height: auto;
  max-height: var(--hero-logo-max-h);
  object-fit: contain;
  object-position: center;
}

.hero-kicker {
  position: relative;
  width: max-content;
  max-width: calc(100vw - 24px);
  margin: clamp(4px, 0.8vw, 10px) auto 0;
  z-index: 2;
  padding: clamp(7px, 1.4vw, 12px) clamp(14px, 2.8vw, 26px) clamp(5px, 1vw, 8px);
  border: none;
  border-radius: 6px;
  background-color: transparent;
  background-image: var(--hero-title-primary-gradient, none);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 0 50%;

  font-size: clamp(17px, 3.6vw, 38px);
  line-height: 1.15;
  font-weight: 800;
  text-transform: lowercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
  overflow-wrap: normal;
  word-break: keep-all;
  hyphens: none;
  text-align: center;

  color: var(--color-hero-title-primary);
  -webkit-text-fill-color: var(--color-hero-title-primary);
  -webkit-background-clip: var(--hero-title-primary-clip, border-box);
  background-clip: var(--hero-title-primary-clip, border-box);

  transform: rotate(-2deg);
  transform-origin: center center;
  overflow: visible;
  isolation: isolate;
  opacity: 0;
  animation: heroKickerStamp 0.52s cubic-bezier(0.22, 1.05, 0.32, 1) forwards;
  animation-delay: var(--hero-kicker-delay);

  box-shadow:
    4px 4px 0 rgba(var(--hero-kicker-shadow-rgb, 252, 82, 108), 0.12),
    0 10px 20px rgba(var(--palette-navy-rgb), 0.08);
}

.hero-kicker::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 6px;
  padding: 1.5px;
  pointer-events: none;
  z-index: -2;
  background: var(--hero-kicker-border, var(--volna-brand-gradient));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

.hero-kicker::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 6px;
  pointer-events: none;
  z-index: -1;
  opacity: 0;
  background:
    radial-gradient(circle at 22% 38%, rgba(var(--hero-kicker-ink-rgb, 252, 82, 108), 0.18), transparent 44%),
    radial-gradient(circle at 78% 62%, rgba(var(--hero-kicker-ink-rgb, 252, 82, 108), 0.12), transparent 40%);
  transform: scale(1.08);
  animation: heroKickerInkWash 0.55s ease-out forwards;
  animation-delay: var(--hero-kicker-delay);
}

.hero-title-fit {
  width: 100%;
  max-width: 100%;
  display: flex;
  justify-content: center;
  overflow: visible;
  padding-inline: clamp(12px, 3vw, 32px);
  padding-block: 0;
  margin-top: var(--hero-kicker-title-gap);
  margin-bottom: 0;
  box-sizing: border-box;
  position: relative;
  z-index: 3;
}

.hero-title {
  position: relative;
  margin-inline: auto;
  width: min(max-content, 100%);
  max-width: 100%;
  color: var(--color-hero-title);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: clamp(2px, 0.45cqi, 6px);
  font-size: clamp(40px, min(7.8cqi, 8.2vw), 132px);
  line-height: 1.06;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  isolation: isolate;
  overflow: visible;
}

.hero-title__line {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  line-height: 1.1;
  padding-block: 0;
  overflow: visible;
  --delay: 0s;
  --line-scale-x: 1;
}

.hero-title__line span {
  position: relative;
  z-index: 3;
  display: inline-block;
  max-width: 100%;
  line-height: 1.1;
  padding-block: 0;
  opacity: 0;
  white-space: nowrap;
  transform: translateY(120%) rotate(4deg) scaleX(var(--line-scale-x)) scaleY(0.72);
  transform-origin: center bottom;
  animation:
    heroTitleReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards,
    heroTitleBreathe 5s ease-in-out infinite;
  animation-delay: var(--delay), calc(var(--delay) + 1.2s);
  text-shadow: none;
}

.hero-title__line--first {
  --delay: var(--hero-title-base-delay);
}

.hero-title__line--second {
  /* ~11 символов «молодежного» */
  font-size: min(0.94em, calc((100cqi - 1.25rem) / 11.2));
  --delay: calc(var(--hero-title-base-delay) + 0.22s);
}

.hero-title__line--third {
  /* ~20 символов «предпринимательства» в CAPS (делитель ≈ ширина / кегль) */
  font-size: min(0.78em, calc((100cqi - 1.25rem) / 16.8));
  --delay: calc(var(--hero-title-base-delay) + 0.44s);
}

.hero-title__line--third span {
  letter-spacing: 0.04em;
}

.hero-title__line--second span {
  letter-spacing: 0.03em;
}

.hero-title__line--first span {
  letter-spacing: 0.02em;
}

.hero-title__line--first span,
.hero-title__line--second span,
.hero-title__line--third span {
  line-height: 1.12;
  padding-block: 0.02em;
  background-image: var(--hero-title-primary-gradient, none);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: 0 50%;
  -webkit-background-clip: var(--hero-title-primary-clip, border-box);
  background-clip: var(--hero-title-primary-clip, border-box);
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  color: var(--color-hero-title-primary);
  -webkit-text-fill-color: var(--color-hero-title-primary);
  text-shadow: none;
}

.hero-bottom {
  width: 100%;
  max-width: 100%;
  margin-top: clamp(-12px, -1.5vh, -4px);
  display: flex;
  justify-content: center;
}

.hero-actions {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: clamp(10px, 2.2vw, 14px);
  width: min(100%, 420px);
  max-width: 100%;
}

.hero-date {
  position: relative;
  margin: 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: clamp(6px, 1.2vw, 10px) clamp(18px, 3.6vw, 26px);
  border: none;
  border-radius: 999px;
  background: transparent;
  text-align: center;
  box-shadow: none;
  isolation: isolate;
}

.hero-date::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  pointer-events: none;
  z-index: -1;
  background: var(--hero-date-border, var(--hero-kicker-border, var(--volna-brand-gradient)));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

.hero-date__when,
.hero-date__where {
  margin: 0;
  color: var(--hero-date-text, var(--palette-navy));
  font-size: clamp(24px, 3.2vw, 38px);
  line-height: 1.05;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.hero-date__when {
  margin-top: clamp(2px, 0.4vw, 4px);
  text-transform: lowercase;
}

.hero-date__where {
  text-transform: none;
}

.hero-button {
  position: relative;
  isolation: isolate;
  width: 100%;
  min-height: 80px;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 52px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--hero-button-text, var(--hero-date-text, var(--palette-navy)));
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-family: inherit;
  font-size: clamp(22px, 2.4vw, 32px);
  line-height: 1.05;
  font-weight: 900;
  text-transform: lowercase;
  letter-spacing: -0.04em;
  box-shadow:
    5px 5px 0 rgba(var(--hero-button-wash-rgb, 252, 82, 108), 0.14),
    0 14px 28px rgba(var(--palette-navy-rgb), 0.08);
  transition:
    color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.hero-button::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 3px;
  pointer-events: none;
  z-index: -1;
  background: var(--hero-button-ring, var(--hero-date-border, var(--volna-brand-gradient)));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

.hero-button::after {
  content: '';
  position: absolute;
  inset: 3px;
  border-radius: inherit;
  pointer-events: none;
  z-index: -2;
  background: var(--hero-button-fill, rgba(var(--palette-peach-rgb), 0.5));
  transition: background-color 0.25s ease;
}

.hero-button:hover {
  background: transparent;
  color: var(--hero-button-text-hover, var(--hero-button-text));
  transform: translateY(-3px);
  box-shadow:
    6px 6px 0 rgba(var(--hero-button-wash-rgb, 252, 82, 108), 0.18),
    0 18px 34px rgba(var(--palette-navy-rgb), 0.1);
}

.hero-button:hover::after {
  background: var(--hero-button-fill-hover, var(--hero-button-fill));
}

.hero-button:active {
  transform: translateY(0);
  box-shadow: none;
}

.hero-button:focus-visible {
  outline: 3px solid var(--hero-focus-outline);
  outline-offset: 4px;
}

.hero-section :deep(.wave-decor--left) {
  left: 6%;
  top: 22%;
}

.hero-section :deep(.wave-decor--right) {
  right: 8%;
  bottom: 22%;
  top: auto;
}

@media (max-width: 760px) {
  .hero-section :deep(.wave-decor) {
    display: none;
  }
}

.hero-marquee {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  height: var(--hero-marquee-h, 54px);
  background: var(--palette-navy-mid);
  color: var(--palette-pink);
  display: flex;
  align-items: center;
  overflow: hidden;
  transform: rotate(-1deg) scaleX(1.03);
  transform-origin: center;
}

.hero-marquee__track {
  display: flex;
  width: max-content;
  animation: marqueeMove 22s linear infinite;
  will-change: transform;
}

.hero-marquee__group {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 30px;
  padding-right: 30px;
}

.hero-marquee__group span {
  flex-shrink: 0;
  font-size: 22px;
  line-height: 1;
  font-weight: 900;
  text-transform: lowercase;
  letter-spacing: -0.05em;
  white-space: nowrap;
}

.hero-marquee__group span::after {
  content: '•';
  margin-left: 30px;
}

@keyframes heroLogoReveal {
  0% {
    opacity: 0;
    transform: translateY(12px) scale(0.96);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes heroKickerStamp {
  0% {
    opacity: 0;
    transform: rotate(-7deg) scale(1.28) translateY(-28px);
    filter: blur(2px);
  }

  48% {
    opacity: 0.92;
    transform: rotate(-2.5deg) scale(0.96) translateY(3px);
    filter: blur(0);
  }

  64% {
    opacity: 1;
    transform: rotate(-1.5deg) scale(1.025) translateY(-1px);
  }

  82% {
    transform: rotate(-2.2deg) scale(0.995) translateY(0);
  }

  100% {
    opacity: 1;
    transform: rotate(-2deg) scale(1) translateY(0);
    filter: blur(0);
  }
}

@keyframes heroKickerInkWash {
  0% {
    opacity: 0;
    transform: scale(1.18);
  }

  38% {
    opacity: 0.85;
    transform: scale(1.02);
  }

  100% {
    opacity: 0;
    transform: scale(1);
  }
}

@keyframes heroTitleReveal {
  0% {
    opacity: 0;
    transform: translateY(120%) rotate(4deg) scaleX(var(--line-scale-x)) scaleY(0.72);
    filter: blur(8px);
  }

  55% {
    opacity: 1;
    transform: translateY(-8%) rotate(-1deg) scaleX(var(--line-scale-x)) scaleY(1.08);
    filter: blur(0);
  }

  100% {
    opacity: 1;
    transform: translateY(0) rotate(0) scaleX(var(--line-scale-x)) scaleY(1);
    filter: blur(0);
  }
}

@keyframes heroTitleBreathe {
  0%, 100% {
    transform: translateY(0) rotate(0) scaleX(var(--line-scale-x)) scaleY(1);
  }

  50% {
    transform: translateY(-3px) rotate(-0.25deg) scaleX(var(--line-scale-x)) scaleY(1.01);
  }
}

@keyframes marqueeMove {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

@media (max-width: 1280px) and (min-width: 981px) {
  .hero-title {
    font-size: clamp(38px, 6.8cqi, 118px);
  }
}

@media (min-width: 981px) {
  .hero-section {
    min-height: 100vh;
    min-height: 100dvh;
    align-items: center;
  }

  .hero-container {
    --hero-kicker-title-gap: clamp(-2px, -0.4vh, 4px);
  }
}

@media (max-width: 980px) {
  .hero-section {
    --hero-top-gap: 12px;
    --hero-bottom-gap: 14px;
  }

  .hero-date__when,
  .hero-date__where {
    font-size: clamp(22px, 3.4vw, 34px);
  }

  .hero-container {
    --hero-logo-max-h: min(clamp(132px, 27vw, 196px), 28vh);
  }

  .hero-container {
    --hero-kicker-title-gap: clamp(8px, 1.8vw, 12px);
  }

  .hero-kicker {
    font-size: clamp(15px, 3.2vw, 32px);
    padding: 8px 18px 7px;
  }

  .hero-title {
    gap: clamp(2px, 0.5cqi, 6px);
    font-size: clamp(34px, 7.2cqi, 88px);
  }

  .hero-title__line--third {
    font-size: min(0.76em, calc((100cqi - 1.25rem) / 16.8));
  }
}

@container hero (max-width: 720px) {
  .hero-title {
    font-size: clamp(28px, min(8.5cqi, 9.2vw), 68px);
  }

  .hero-title__line--second {
    font-size: min(0.92em, calc((100cqi - 0.75rem) / 11.2));
  }

  .hero-title__line--third {
    font-size: min(0.74em, calc((100cqi - 0.75rem) / 16.8));
  }
}

@container hero (max-width: 620px) {
  .hero-title__line--third {
    font-size: min(0.74em, calc((100cqi - 1rem) / 17));
  }

  .hero-title__line--third span {
    letter-spacing: 0.02em;
  }
}

@container hero (max-width: 520px) {
  .hero-container {
    --hero-kicker-title-gap: 12px;
  }

  .hero-kicker {
    transform: rotate(-1deg);
    font-size: clamp(13px, 3.4vw, 22px);
    padding: 7px 14px 6px;
  }

  .hero-title {
    font-size: clamp(26px, min(8.8cqi, 9.4vw), 52px);
  }

  .hero-title__line--third {
    font-size: min(0.72em, calc((100cqi - 0.5rem) / 17));
  }
}

@container hero (max-width: 390px) {
  .hero-title__line--third {
    font-size: min(0.7em, calc((100cqi - 0.65rem) / 17.1));
  }
}

@container hero (max-width: 360px) {
  .hero-container {
    --hero-kicker-title-gap: 10px;
  }

  .hero-kicker {
    font-size: clamp(12px, 3.2vw, 20px);
    letter-spacing: 0.05em;
  }

  .hero-title {
    font-size: clamp(22px, min(8.2cqi, 8.8vw), 40px);
    letter-spacing: 0.02em;
  }

  .hero-title__line--third {
    font-size: min(0.68em, calc((100cqi - 0.5rem) / 17.2));
  }
}

@media (max-width: 760px) {
  .hero-kicker,
  .hero-button,
  .hero-button:hover,
  .hero-button:active,
  .hero-button:focus-visible {
    box-shadow: none;
  }
}

@media (max-width: 620px) {
  .hero-section {
    --hero-top-gap: 10px;
    --hero-bottom-gap: 12px;
    --hero-marquee-h: 44px;
    padding-inline: clamp(12px, 3.5vw, 20px);
  }

  .hero-container {
    --hero-logo-max-h: min(clamp(118px, 28vw, 168px), 22vh);
  }

  .hero-brand {
    margin-bottom: 14px;
  }

  .hero-container {
    --hero-kicker-title-gap: 12px;
  }

  .hero-kicker {
    margin-top: clamp(4px, 0.8vw, 8px);
    padding: 8px 16px 7px;
    border-radius: 5px;
    font-size: clamp(14px, 3.6vw, 26px);
    letter-spacing: 0.07em;
    text-align: center;
    transform: rotate(-1deg);
  }

  .hero-title-fit {
    padding-inline: clamp(6px, 1.8vw, 14px);
    padding-block: 0 clamp(0px, 0.4vh, 4px);
    margin-bottom: 0;
  }

  .hero-title {
    gap: clamp(2px, 0.5cqi, 6px);
    font-size: clamp(25px, min(8.8cqi, 9vw), 52px);
    letter-spacing: 0.02em;
  }

  .hero-title__line--second {
    font-size: min(0.92em, calc((100cqi - 0.75rem) / 11.2));
  }

  .hero-title__line--third {
    font-size: min(
      0.74em,
      calc((100cqi - 0.75rem) / 17),
      calc((100vw - 3rem) / 17)
    );
  }

  .hero-title__line--third span {
    letter-spacing: 0.02em;
  }

  .hero-actions {
    gap: 12px;
    width: min(100%, 360px);
  }

  .hero-bottom {
    margin-top: 0;
  }

  .hero-button {
    width: 100%;
    max-width: 100%;
    min-height: 72px;
    padding: 0 32px;
    font-size: clamp(20px, 5.4vw, 26px);
    justify-content: center;
    text-align: center;
  }

  .hero-date {
    padding: 11px 20px;
    max-width: 100%;
  }

  .hero-date__when,
  .hero-date__where {
    font-size: clamp(21px, 5.8vw, 30px);
  }

  .hero-marquee__group span {
    font-size: 18px;
  }

  .hero-marquee__group {
    gap: 22px;
    padding-right: 22px;
  }

  .hero-marquee__group span::after {
    margin-left: 22px;
  }
}

@media (max-width: 420px) {
  .hero-container {
    --hero-logo-max-h: min(clamp(104px, 30vw, 148px), 26vh);
    --hero-kicker-title-gap: 11px;
  }

  .hero-date {
    padding: 10px 18px;
  }

  .hero-date__when,
  .hero-date__where {
    font-size: clamp(20px, 5.4vw, 28px);
  }

  .hero-button {
    min-height: 60px;
    font-size: 18px;
    width: 100%;
    max-width: 100%;
  }
}

@media (max-width: 380px) {
  .hero-container {
    --hero-kicker-title-gap: 10px;
  }
}

@media (max-width: 340px) {
  .hero-section {
    --hero-top-gap: 10px;
  }

  .hero-date {
    padding: 10px 16px;
  }

  .hero-date__when,
  .hero-date__where {
    font-size: clamp(19px, 5.2vw, 24px);
    letter-spacing: -0.03em;
  }

  .hero-container {
    --hero-logo-max-h: min(clamp(96px, 32vw, 132px), 25vh);
  }

  .hero-container {
    --hero-kicker-title-gap: 9px;
  }

  .hero-button {
    min-height: 56px;
    font-size: 17px;
  }
}

/* Низкий экран (ландшафт / маленький телефон) — не даём логотипу вытеснить заголовок */
@media (max-height: 680px) {
  .hero-container {
    --hero-logo-max-h: min(clamp(100px, 22vw, 140px), 24vh);
  }

  .hero-bottom {
    margin-top: clamp(-4px, -0.8vh, 4px);
    gap: 12px;
  }

  .hero-container {
    --hero-kicker-title-gap: 10px;
  }

  .hero-kicker {
    margin-top: 6px;
    transform: rotate(-1deg);
  }

  .hero-bottom {
    margin-top: -6px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-brand {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .hero-kicker {
    animation: none;
    opacity: 1;
    transform: rotate(-2deg);
  }

  .hero-kicker::after {
    animation: none;
    opacity: 0.3;
    transform: none;
  }

  .hero-title__line span {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
</style>
