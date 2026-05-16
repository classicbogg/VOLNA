<script setup>
import { ref } from 'vue'
import RegistrationModal from './RegistrationModal.vue'

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
    <div class="hero-decor hero-decor--student" aria-hidden="true"></div>
    <div class="hero-decor hero-decor--square hero-decor--square-one" aria-hidden="true"></div>
    <div class="hero-decor hero-decor--square hero-decor--square-two" aria-hidden="true"></div>

    <div class="hero-container">
      <h2 class="hero-kicker">
        ТРЕТИЙ ФОРУМ
      </h2>

      <h1 class="hero-title" aria-label="форум молодых предпринимателей">
        <span class="hero-title__line hero-title__line--first" data-text="форум">
          <span>форум</span>
        </span>

        <span class="hero-title__line hero-title__line--second" data-text="молодых">
          <span>молодых</span>
        </span>

        <span class="hero-title__line hero-title__line--third" data-text="предпринимателей">
          <span>предпринимателей</span>
        </span>
      </h1>

      <div class="hero-bottom">
        <div class="hero-date">
          27 мая 2026
        </div>

        <button class="hero-button" type="button" @click="openRegistration">
          зарегистрироваться
        </button>
      </div>
    </div>

    <div class="hero-marquee" aria-hidden="true">
      <div class="hero-marquee__track">
        <div class="hero-marquee__group">
          <span>создай наше</span>
          <span>27 мая 2026</span>
          <span>форум молодых предпринимателей</span>
          <span>создай наше</span>
          <span>27 мая 2026</span>
          <span>форум молодых предпринимателей</span>
        </div>

        <div class="hero-marquee__group">
          <span>создай наше</span>
          <span>27 мая 2026</span>
          <span>форум молодых предпринимателей</span>
          <span>создай наше</span>
          <span>27 мая 2026</span>
          <span>форум молодых предпринимателей</span>
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
  min-height: 100vh;
  padding: 170px 40px 110px;
  background: var(--hero-bg, var(--color-bg, #ffffff));
  color: var(--color-hero-title, var(--color-text, #1e1739));
  overflow: hidden;
  display: flex;
  align-items: center;
}

.hero-container {
  position: relative;
  z-index: 3;
  width: min(1440px, 100%);
  margin: 0 auto;
  display: block;
}

.hero-kicker {
  position: relative;
  width: fit-content;
  max-width: calc(100vw - 32px);
  margin: 0 auto 44px;
  padding: 20px 40px 18px;
  border: 3px solid var(--color-yellow, #f2f55e);
  border-radius: 8px;
  background: transparent;

  font-size: clamp(36px, 4.2vw, 72px);
  line-height: 0.9;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-align: center;

  color: transparent;
  background-image: linear-gradient(
    90deg,
    var(--color-yellow, #f2f55e) 0%,
    var(--color-yellow, #f2f55e) 50%,
    var(--color-hero-kicker-end, #ffffff) 50%,
    var(--color-hero-kicker-end, #ffffff) 100%
  );
  background-size: 200% 100%;
  background-position: 100% 0;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  transform: rotate(-2deg);
  overflow: hidden;
  isolation: isolate;
  animation: kickerLettersFill 0.9s steps(18, end) forwards;
  animation-delay: 1.75s;

  filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.24));

  box-shadow:
    8px 8px 0 rgba(242, 245, 94, 0.12),
    0 18px 36px rgba(0, 0, 0, 0.24);
}

.hero-title {
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: clamp(54px, 9.5vw, 158px);
  line-height: 0.76;
  font-weight: 900;
  text-transform: lowercase;
  letter-spacing: -0.105em;
  isolation: isolate;
}

.hero-title__line {
  position: relative;
  display: block;
  width: fit-content;
  max-width: 100%;
  overflow: visible;
  --delay: 0s;
  --line-scale-x: 1;
}

.hero-title__line span {
  position: relative;
  z-index: 3;
  display: block;
  opacity: 0;
  white-space: nowrap;
  transform: translateY(120%) rotate(4deg) scaleX(var(--line-scale-x)) scaleY(0.72);
  transform-origin: center bottom;
  animation:
    heroTitleReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards,
    heroTitleBreathe 5s ease-in-out infinite;
  animation-delay: var(--delay), calc(var(--delay) + 1.2s);
  text-shadow:
    6px 6px 0 var(--color-hero-title-shadow, rgba(30, 23, 57, 0.1)),
    0 20px 46px var(--color-hero-title-shadow-strong, rgba(30, 23, 57, 0.18));
}

.hero-title__line::before,
.hero-title__line::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
}

.hero-title__line::before {
  color: var(--color-yellow, #f2f55e);
  transform: translate(18px, 14px) skewX(-8deg);
  clip-path: inset(0 100% 0 0);
  animation: heroTitleStrike 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  animation-delay: calc(var(--delay) + 0.08s);
}

.hero-title__line::after {
  z-index: 4;
  color: var(--color-hero-glitch, rgba(255, 255, 255, 0.9));
  mix-blend-mode: var(--hero-glitch-blend, difference);
  animation: heroTitleGlitch 1.15s steps(2, end) both;
  animation-delay: calc(var(--delay) + 0.18s);
}

.hero-title__line--first {
  align-self: flex-start;
  --delay: 0.1s;
}

.hero-title__line--second {
  align-self: center;
  color: var(--color-yellow, #f2f55e);
  --delay: 0.32s;
}

.hero-title__line--third {
  align-self: flex-end;
  max-width: 100%;
  text-align: center;
  --delay: 0.54s;
}

.hero-title__line--third span,
.hero-title__line--third::before,
.hero-title__line--third::after {
  font-size: 0.76em;
  letter-spacing: -0.035em;
}

.hero-title__line--second::before {
  color: var(--color-hero-line2-before, #ffffff);
}

.hero-title__line--second span {
  text-shadow:
    6px 6px 0 var(--color-hero-line2-shadow, rgba(255, 255, 255, 0.12)),
    0 20px 46px var(--color-hero-title-shadow-strong, rgba(0, 0, 0, 0.24));
}

.hero-bottom {
  width: 100%;
  margin-top: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
}

.hero-date {
  width: fit-content;
  max-width: calc(100vw - 32px);
  padding: 18px 30px 16px;
  border: 2px solid var(--hero-date-bg, #dbafff);
  border-radius: 999px;
  background: var(--hero-date-bg, #dbafff);
  color: var(--hero-date-text, #1e1739);
  font-size: clamp(24px, 3vw, 46px);
  line-height: 0.9;
  font-weight: 900;
  text-align: center;
  text-transform: lowercase;
  letter-spacing: -0.07em;
  box-shadow:
    8px 8px 0 var(--hero-date-shadow-offset, rgba(30, 23, 57, 0.08)),
    0 18px 34px var(--hero-date-shadow, rgba(30, 23, 57, 0.18));
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.hero-button {
  width: fit-content;
  min-height: 68px;
  min-width: min(100%, 320px);
  padding: 0 44px;
  border: 2px solid var(--hero-button-border, #f4d35e);
  border-radius: 999px;
  background: var(--hero-button-bg, #f4d35e);
  color: var(--hero-button-text, #1e1739);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  font-family: inherit;
  font-size: clamp(20px, 2vw, 28px);
  line-height: 1.05;
  font-weight: 900;
  text-transform: lowercase;
  letter-spacing: -0.04em;
  box-shadow:
    8px 8px 0 var(--hero-button-shadow-offset, rgba(30, 23, 57, 0.08)),
    0 18px 34px var(--hero-button-shadow, rgba(30, 23, 57, 0.18));
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.hero-button:hover {
  background: var(--hero-button-bg-hover, var(--hero-button-bg, #f4d35e));
  border-color: var(--hero-button-border-hover, var(--hero-button-border, #f4d35e));
  color: var(--hero-button-text-hover, var(--hero-button-text, #1e1739));
  transform: translateY(-3px);
  box-shadow:
    10px 10px 0 var(--hero-button-shadow-offset-hover, rgba(30, 23, 57, 0.12)),
    0 24px 42px var(--hero-button-shadow-hover, rgba(30, 23, 57, 0.22));
}

.hero-button:active {
  transform: translateY(-1px);
  box-shadow:
    6px 6px 0 var(--hero-button-shadow-offset, rgba(30, 23, 57, 0.08)),
    0 12px 26px var(--hero-button-shadow, rgba(30, 23, 57, 0.18));
}

.hero-button:focus-visible {
  outline: 3px solid var(--hero-focus-outline, #1e1739);
  outline-offset: 4px;
}

.hero-decor {
  position: absolute;
  pointer-events: none;
  user-select: none;
}

.hero-decor--student {
  z-index: 1;
  right: 7%;
  top: 18%;
  width: clamp(130px, 16vw, 280px);
  height: clamp(130px, 16vw, 280px);
  background: var(--color-hero-decor-student, rgba(242, 245, 94, 0.13));

  mask-image: url('/icons/student-fill.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;

  -webkit-mask-image: url('/icons/student-fill.svg');
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;

  filter: drop-shadow(14px 14px 0 var(--color-hero-decor-student-shadow, rgba(242, 245, 94, 0.08)));
  transform: rotate(8deg);
}

.hero-decor--square {
  z-index: 1;
  width: 42px;
  height: 42px;
  background: var(--color-hero-decor-pixel, rgba(242, 245, 94, 0.12));
}

.hero-decor--square-one {
  left: 8%;
  top: 28%;
  box-shadow:
    42px 0 0 var(--color-hero-decor-pixel-shadow, rgba(242, 245, 94, 0.08)),
    0 42px 0 var(--color-hero-decor-pixel-shadow, rgba(242, 245, 94, 0.07)),
    84px 42px 0 var(--color-hero-decor-pixel-shadow, rgba(242, 245, 94, 0.06));
  transform: rotate(-8deg);
}

.hero-decor--square-two {
  right: 13%;
  bottom: 24%;
  background: var(--color-hero-decor-square, rgba(255, 255, 255, 0.08));
  box-shadow:
    -42px 0 0 var(--color-hero-decor-square, rgba(255, 255, 255, 0.06)),
    0 -42px 0 var(--color-hero-decor-square, rgba(255, 255, 255, 0.05)),
    -84px -42px 0 var(--color-hero-decor-square, rgba(255, 255, 255, 0.04));
  transform: rotate(12deg);
}

.hero-marquee {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  height: 54px;
  background: var(--color-yellow, #f2f55e);
  color: var(--color-purple, #1e1739);
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

@keyframes kickerLettersFill {
  0% {
    background-position: 100% 0;
    filter: drop-shadow(0 18px 30px rgba(0, 0, 0, 0.24));
  }

  70% {
    background-position: 0 0;
    filter:
      drop-shadow(0 18px 30px rgba(0, 0, 0, 0.24))
      drop-shadow(0 0 12px rgba(242, 245, 94, 0.28));
  }

  100% {
    background-position: 0 0;
    filter:
      drop-shadow(0 18px 30px rgba(0, 0, 0, 0.24))
      drop-shadow(0 0 6px rgba(242, 245, 94, 0.18));
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

@keyframes heroTitleStrike {
  0% {
    opacity: 0;
    clip-path: inset(0 100% 0 0);
    transform: translate(28px, 20px) skewX(-12deg);
  }

  35% {
    opacity: 0.9;
  }

  70% {
    opacity: 0.45;
    clip-path: inset(0 0 0 0);
    transform: translate(12px, 10px) skewX(-7deg);
  }

  100% {
    opacity: 0.16;
    clip-path: inset(0 0 0 0);
    transform: translate(8px, 7px) skewX(-4deg);
  }
}

@keyframes heroTitleGlitch {
  0% {
    opacity: 0;
    transform: translate(0, 0);
    clip-path: inset(0 0 100% 0);
  }

  12% {
    opacity: 0.85;
    transform: translate(-8px, 4px);
    clip-path: inset(8% 0 72% 0);
  }

  20% {
    transform: translate(10px, -4px);
    clip-path: inset(58% 0 22% 0);
  }

  30% {
    transform: translate(-5px, 3px);
    clip-path: inset(28% 0 45% 0);
  }

  42% {
    opacity: 0.65;
    transform: translate(7px, 0);
    clip-path: inset(72% 0 8% 0);
  }

  56% {
    opacity: 0;
    transform: translate(0, 0);
    clip-path: inset(0 0 100% 0);
  }

  100% {
    opacity: 0;
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

@media (max-width: 980px) {
  .hero-section {
    min-height: 780px;
    padding: 110px 24px 98px;
  }

  .hero-title {
    gap: 8px;
    font-size: clamp(52px, 13vw, 116px);
    text-align: center;
  }

  .hero-title__line--first,
  .hero-title__line--second,
  .hero-title__line--third {
    align-self: center;
  }

  .hero-title__line--third {
    width: 100%;
    text-align: center;
  }

  .hero-title__line--third span,
  .hero-title__line--third::before,
  .hero-title__line--third::after {
    font-size: clamp(32px, 7.1vw, 58px);
    letter-spacing: -0.032em;
  }

  .hero-decor--student {
    right: -18px;
    top: 110px;
    opacity: 0.8;
  }
}

@media (max-width: 620px) {
  .hero-section {
    min-height: 720px;
    padding: 90px 16px 90px;
  }

  .hero-kicker {
    margin-bottom: 32px;
    padding: 14px 24px 12px;
    border-radius: 6px;
    font-size: clamp(30px, 10vw, 48px);
    letter-spacing: 0.04em;
    text-align: center;
  }

  .hero-title {
    gap: 8px;
    font-size: clamp(48px, 16vw, 82px);
    line-height: 0.82;
    letter-spacing: -0.075em;
    text-align: center;
  }

  .hero-title__line {
    width: 100%;
    max-width: 100%;
    text-align: center;
  }

  .hero-title__line--third {
    --line-scale-x: 0.89;
  }

  .hero-title__line--third span {
    font-size: clamp(24px, 6.9vw, 38px);
    letter-spacing: -0.015em;
  }

  .hero-title__line--third::before,
  .hero-title__line--third::after {
    display: none;
  }

  .hero-bottom {
    margin-top: 38px;
    gap: 16px;
  }

  .hero-date,
  .hero-button {
    width: min(100%, 360px);
    justify-content: center;
    text-align: center;
  }

  .hero-button {
    min-height: 58px;
  }

  .hero-decor--student {
    width: 120px;
    height: 120px;
    right: -28px;
    top: 86px;
  }

  .hero-decor--square {
    display: none;
  }

  .hero-marquee {
    height: 44px;
  }

  .hero-marquee__group span {
    font-size: 18px;
  }
}

@media (max-width: 380px) {
  .hero-title__line--third {
    --line-scale-x: 0.86;
  }

  .hero-title__line--third span {
    font-size: clamp(21px, 6.4vw, 26px);
    letter-spacing: -0.01em;
  }
}

@media (max-width: 340px) {
  .hero-title__line--third {
    --line-scale-x: 0.84;
  }

  .hero-title__line--third span {
    font-size: 20px;
  }
}
</style>
