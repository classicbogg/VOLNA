<script setup>
import { ref } from 'vue'
import RegistrationModal from './RegistrationModal.vue'
import sielomEmblemUrl from '../assets/sielom.svg'

const isRegistrationOpen = ref(false)

const openRegistration = () => {
  isRegistrationOpen.value = true
}

const closeRegistration = () => {
  isRegistrationOpen.value = false
}
</script>

<template>
  <section class="hero-section">
    <div class="hero-bg" aria-hidden="true">
      <span class="hero-bg__shape hero-bg__shape--one"></span>
      <span class="hero-bg__shape hero-bg__shape--two"></span>
      <span class="hero-bg__shape hero-bg__shape--three"></span>
      <span class="hero-bg__glow hero-bg__glow--one"></span>
      <span class="hero-bg__glow hero-bg__glow--three"></span>
    </div>

    <div class="hero-container">
      <div class="hero-column">
      <div class="hero-top">
        <div class="hero-organizers" aria-label="Организатор форума">
          <div class="hero-organizers__head">
            <span>Организатор</span>
            <i aria-hidden="true"></i>
          </div>

          <div class="hero-organizers__body">
            <div class="hero-organizers__logo-mark">
              <img
                class="hero-organizers__logo"
                :src="sielomEmblemUrl"
                alt="Логотип организатора"
                width="120"
                height="120"
                decoding="async"
              >
            </div>

            <p class="hero-organizers__name">
              Сургутский институт<br>
              экономики, управления и права
            </p>
          </div>
        </div>
      </div>

      <p class="hero-location">ХМАО-Югра · Сургут</p>

      <div class="hero-main">
        <div class="hero-title-block">
          <h1 class="hero-title" aria-label="форум молодежного предпринимательства ВОЛНА 2026">
            <span class="hero-title__line">форум</span>
            <span class="hero-title__line">молодежного</span>
            <span class="hero-title__line hero-title__line--long">предпринимательства</span>

          </h1>

          <div class="hero-title__footer">
            <div class="hero-title__bottom">
              <span class="hero-title__brand">волна</span>
              <span class="hero-title__year">2026</span>
            </div>

            <div class="hero-actions">
              <button
                class="hero-button"
                type="button"
                aria-haspopup="dialog"
                @click="openRegistration"
              >
                <span>зарегистрироваться</span>
              </button>
            </div>
          </div>
        </div>

        <div class="hero-bottom">
          <div class="hero-date">
            <span>29 мая 2026</span>
          </div>
        </div>
      </div>
      </div>
    </div>

    <div class="hero-marquee" aria-hidden="true">
      <div class="hero-marquee__track">
        <div class="hero-marquee__group">
          <span>лови свою волну</span>
          <span>задавай движение</span>
          <span>собирай сообщество</span>
          <span>лови свою волну</span>
          <span>задавай движение</span>
          <span>собирай сообщество</span>
        </div>
        <div class="hero-marquee__group">
          <span>лови свою волну</span>
          <span>задавай движение</span>
          <span>собирай сообщество</span>
          <span>лови свою волну</span>
          <span>задавай движение</span>
          <span>собирай сообщество</span>
        </div>
      </div>
    </div>

    <RegistrationModal
      :is-open="isRegistrationOpen"
      @close="closeRegistration"
    />
  </section>
</template>

<style scoped>
.hero-section {
  width: 100%;
  max-width: 100%;
  --hero-title-size-max: clamp(42px, 5.2vw, 96px);
  --hero-title-fit-divisor: 11.6;
  --hero-title-fit-divisor-long: 14.2;
  --hero-marquee-h: clamp(68px, 7.5vh, 80px);
  --hero-button-bg: var(--volna-brand-gradient);
  --hero-button-shadow: 0 8px 24px rgba(255, 111, 145, 0.28);
  --hero-button-shadow-hover: 0 12px 32px rgba(255, 111, 145, 0.36);

  position: relative;
  min-height: 100svh;
  padding:
    calc(var(--site-header-offset) + env(safe-area-inset-top, 0px) + clamp(12px, 2vh, 28px))
    clamp(18px, 4vw, 58px)
    calc(var(--hero-marquee-h) + clamp(20px, 3vh, 36px) + env(safe-area-inset-bottom, 0px));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--hero-text);
  background: var(--hero-bg);
  overflow-x: clip;
  overflow-y: visible;
  isolation: isolate;
  box-sizing: border-box;
  transition:
    background 0.35s ease,
    color 0.35s ease;

  --hero-text: #fff4f1;
  --hero-muted: rgba(255, 244, 241, 0.86);
  --hero-accent: #ffb56a;
  --hero-location-text: #ffffff;
  --hero-title-text-base: #ffffff;
  /* Бренд справа → белый ровно в середине (50%), левая половина — белая */
  --hero-title-fill: linear-gradient(
    to left,
    color-mix(in srgb, var(--volna-brand-end) 44%, var(--hero-title-text-base)) 0%,
    color-mix(in srgb, var(--volna-brand-start) 34%, var(--hero-title-text-base)) 20%,
    color-mix(in srgb, var(--volna-brand-start) 20%, var(--hero-title-text-base)) 36%,
    color-mix(in srgb, var(--volna-brand-start) 8%, var(--hero-title-text-base)) 48%,
    var(--hero-title-text-base) 50%,
    var(--hero-title-text-base) 100%
  );
  /* Длинное слово — градиент шире, белый ближе к 70% */
  --hero-title-fill-long: linear-gradient(
    to left,
    color-mix(in srgb, var(--volna-brand-end) 44%, var(--hero-title-text-base)) 0%,
    color-mix(in srgb, var(--volna-brand-start) 34%, var(--hero-title-text-base)) 28%,
    color-mix(in srgb, var(--volna-brand-start) 20%, var(--hero-title-text-base)) 48%,
    color-mix(in srgb, var(--volna-brand-start) 8%, var(--hero-title-text-base)) 66%,
    var(--hero-title-text-base) 70%,
    var(--hero-title-text-base) 100%
  );

  --hero-organizers-label: rgba(255, 255, 255, 0.94);
  --hero-organizers-line: linear-gradient(90deg, #ff7fa5, #ff9f43, #b7a5ff);
  --hero-logo-filter: brightness(0) invert(1) brightness(1.08);
  --hero-name-text: #ffffff;

  --hero-bg:
    radial-gradient(circle at 8% 9%, rgba(var(--palette-purple-rgb), 0.32), transparent 34%),
    radial-gradient(circle at 87% 14%, rgba(var(--palette-pink-rgb), 0.22), transparent 38%),
    linear-gradient(180deg, #25134f 0%, #141f3d 52%, var(--hero-bridge-bg) 100%);
  --hero-bridge-bg: var(--palette-navy-mid);
  --hero-marquee-bg: var(--hero-bridge-bg);
  --hero-marquee-text: #ffffff;

  --hero-shape-opacity: 0.34;
  --hero-shape-border: rgba(var(--palette-peach-rgb), 0.1);
  --hero-shape-shadow:
    18px 22px 56px rgba(0, 0, 0, 0.2),
    inset 8px 8px 20px rgba(var(--palette-peach-rgb), 0.06),
    inset -10px -10px 22px rgba(0, 0, 0, 0.14);

  --hero-glow-opacity: 0.38;
  --hero-glow-one: rgba(var(--palette-orange-rgb), 0.2);
  --hero-glow-three: rgba(var(--palette-peach-rgb), 0.18);
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.hero-bg__shape {
  position: absolute;
  display: block;
  background: var(--hero-shape-bg);
  border: 1px solid var(--hero-shape-border);
  box-shadow: var(--hero-shape-shadow);
  opacity: 0;
  transform: translateY(20px) rotate(var(--shape-rotate, 0deg)) scale(0.96);
  animation: heroShapeIn 1.1s cubic-bezier(0.19, 1, 0.22, 1) forwards;
  transition:
    background 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

.hero-bg__shape--one {
  --shape-rotate: -28deg;
  --hero-shape-bg: linear-gradient(
    145deg,
    rgba(var(--palette-peach-rgb), 0.2),
    rgba(var(--palette-orange-rgb), 0.1)
  );
  left: 5%;
  top: 9%;
  width: clamp(150px, 18vw, 320px);
  height: clamp(150px, 18vw, 320px);
  clip-path: polygon(16% 10%, 88% 0, 100% 72%, 32% 100%, 0 44%);
  animation-delay: 0.12s;
}

.hero-bg__shape--two {
  --shape-rotate: 18deg;
  --hero-shape-bg: linear-gradient(
    148deg,
    rgba(var(--palette-pink-rgb), 0.14),
    rgba(var(--palette-orange-rgb), 0.08)
  );
  right: 6%;
  top: 11%;
  width: clamp(170px, 22vw, 390px);
  height: clamp(130px, 16vw, 280px);
  clip-path: polygon(10% 10%, 88% 0, 100% 84%, 18% 100%, 0 42%);
  animation-delay: 0.2s;
}

/* Не перекрывает «2026» и кнопку — акцент у даты внизу слева */
.hero-bg__shape--three {
  --shape-rotate: -22deg;
  --hero-shape-bg: linear-gradient(
    152deg,
    rgba(var(--palette-orange-rgb), 0.12),
    rgba(var(--palette-peach-rgb), 0.16)
  );
  left: clamp(-24px, -1vw, 0px);
  right: auto;
  top: auto;
  bottom: clamp(108px, 16vh, 200px);
  width: clamp(130px, 15vw, 250px);
  height: clamp(100px, 12vw, 190px);
  clip-path: polygon(10% 0, 100% 16%, 86% 88%, 22% 100%, 0 34%);
  animation-delay: 0.28s;
}

.hero-bg__glow {
  position: absolute;
  display: block;
  border-radius: 999px;
  filter: blur(30px);
  pointer-events: none;
  opacity: 0;
  transform: scale(0.78);
  animation: heroGlowIn 1.25s ease forwards;
  transition: background-color 0.35s ease;
}

.hero-bg__glow--one {
  left: 6%;
  bottom: 16%;
  width: 290px;
  height: 290px;
  background: var(--hero-glow-one);
  animation-delay: 0.22s;
}

.hero-bg__glow--three {
  left: clamp(4%, 8vw, 14%);
  top: auto;
  bottom: clamp(72px, 11vh, 150px);
  width: clamp(200px, 22vw, 280px);
  height: clamp(200px, 22vw, 280px);
  background: var(--hero-glow-three);
  animation-delay: 0.4s;
}

.hero-container {
  container-type: inline-size;
  position: relative;
  z-index: 2;
  display: grid;
  align-content: center;
  gap: 0;
  width: min(1260px, 100%);
  margin: 0 auto;
}

.hero-column {
  display: contents;
}

.hero-top {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 0;
}

.hero-organizers {
  display: grid;
  gap: 10px;
  width: fit-content;
  opacity: 0;
  transform: translateY(-18px);
  animation: heroFadeUp 0.82s cubic-bezier(0.19, 1, 0.22, 1) 0.18s forwards;
}

.hero-organizers__head {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hero-organizers__head span {
  color: var(--hero-organizers-label);
  font-size: clamp(11px, 0.82vw, 14px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.hero-organizers__head i {
  display: block;
  width: clamp(56px, 6vw, 96px);
  height: 2px;
  background: var(--hero-organizers-line);
  border-radius: 999px;
  transform: scaleX(0);
  transform-origin: left center;
  animation: heroLineIn 0.7s cubic-bezier(0.19, 1, 0.22, 1) 0.52s forwards;
}

.hero-organizers__body {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: clamp(11px, 0.9vw, 14px);
}

.hero-organizers__logo-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  align-self: center;
  height: 3.1em;
}

.hero-organizers__logo {
  display: block;
  width: auto;
  height: 100%;
  max-height: clamp(58px, 6.4vw, 80px);
  max-width: clamp(64px, 7vw, 88px);
  object-fit: contain;
  object-position: center;
  filter: var(--hero-logo-filter);
  transition: filter 0.35s ease;
}

.hero-organizers__name {
  max-width: 270px;
  margin: 0;
  align-self: center;
  color: var(--hero-name-text);
  font-size: inherit;
  font-weight: 350;
  line-height: 1.16;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.hero-main {
  display: grid;
  gap: clamp(16px, 2.7vh, 34px);
  width: 100%;
}

.hero-title-block {
  container-type: inline-size;
  width: 100%;
  max-width: 100%;
  overflow: visible;
}

.hero-location {
  width: fit-content;
  max-width: 100%;
  margin: clamp(20px, 4.5vh, 52px) 0 clamp(14px, 2.4vh, 32px);
  white-space: nowrap;
  color: var(--hero-location-text);
  font-size: min(clamp(15px, 1.1vw, 20px), max(11px, calc(100cqi / 21)));
  font-weight: 850;
  line-height: 1.25;
  letter-spacing: 0.055em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(18px);
  animation: heroFadeUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.32s forwards;
}

.hero-title,
.hero-title__bottom {
  font-size: min(var(--hero-title-size-max), max(12px, calc(100cqi / var(--hero-title-fit-divisor))));
}

.hero-title {
  display: grid;
  justify-items: start;
  gap: clamp(1px, 0.22vh, 4px);
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0.1em 0 0.12em;
  color: var(--hero-text);
  font-weight: 950;
  line-height: 1.08;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  overflow: visible;
}

.hero-title__line,
.hero-title__brand,
.hero-title__year {
  display: inline-block;
  width: fit-content;
  max-width: 100%;
  min-height: 1.08em;
  padding: 0.03em 0 0.05em;
  /* запасной цвет, если браузер ломает background-clip: text */
  color: var(--hero-title-text-base);
  forced-color-adjust: none;
  background-image: var(--hero-title-fill);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: 0 50%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: inherit;
  line-height: 1.08;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow-wrap: normal;
  word-break: keep-all;
  opacity: 0;
  transform: translateY(30px);
  animation: heroTitleIn 0.9s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

.hero-title__line--long {
  background-image: var(--hero-title-fill-long);
  font-size: min(
    var(--hero-title-size-max),
    max(12px, calc(100cqi / var(--hero-title-fit-divisor-long)))
  );
}

.hero-title__line:nth-child(1) {
  animation-delay: 0.42s;
}

.hero-title__line:nth-child(2) {
  animation-delay: 0.52s;
}

.hero-title__line:nth-child(3) {
  animation-delay: 0.62s;
}

.hero-title__footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  gap: clamp(10px, 1.4vw, 20px);
  width: 100%;
  max-width: 100%;
  margin-top: clamp(2px, 0.4vh, 8px);
  overflow: visible;
}

.hero-title__bottom {
  display: flex;
  align-items: baseline;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: clamp(18px, 3.2vw, 54px);
  flex: 0 1 auto;
  min-width: 0;
  padding-right: 0;
  overflow: visible;
  font-weight: 950;
  line-height: 1.08;
  letter-spacing: -0.01em;
  text-transform: uppercase;
}

.hero-title__brand {
  animation-delay: 0.72s;
}

.hero-title__year {
  padding-right: 0.3em;
  letter-spacing: 0;
  animation-delay: 0.82s;
}

.hero-bottom {
  width: 100%;
  margin-top: clamp(12px, 2vh, 24px);
}

.hero-date {
  display: grid;
  color: var(--hero-text);
  opacity: 0;
  transform: translateY(24px);
  animation: heroFadeUp 0.82s cubic-bezier(0.19, 1, 0.22, 1) 0.94s forwards;
}

.hero-date span {
  white-space: nowrap;
  font-size: clamp(24px, 2.1vw, 38px);
  font-weight: 900;
  line-height: 1.18;
  letter-spacing: -0.012em;
}

.hero-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
  flex-shrink: 0;
}

.hero-button {
  position: relative;
  flex-shrink: 0;
  white-space: nowrap;
  min-width: clamp(220px, 17vw, 320px);
  min-height: clamp(54px, 4.6vw, 70px);
  padding: 0 clamp(28px, 4vw, 52px);
  border: none;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: var(--hero-button-bg);
  background-clip: padding-box;
  box-shadow: var(--hero-button-shadow);
  outline: none;
  filter: saturate(1.06);
  -webkit-appearance: none;
  appearance: none;
  font-family: inherit;
  font-size: clamp(17px, 1.35vw, 22px);
  font-weight: 650;
  line-height: 1;
  letter-spacing: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(24px) scale(0.98);
  animation: heroButtonIn 0.86s cubic-bezier(0.19, 1, 0.22, 1) 1.04s forwards;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    filter 0.22s ease;
  -webkit-tap-highlight-color: transparent;
}

.hero-button::before,
.hero-button::after {
  content: none;
  display: none;
}

.hero-button span {
  color: #ffffff;
  font-weight: inherit;
}

.hero-button:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: var(--hero-button-shadow-hover);
  filter: saturate(1.1);
}

.hero-button:active {
  transform: translateY(0) scale(0.99);
}

.hero-button:focus-visible {
  outline: 3px solid var(--hero-accent);
  outline-offset: 4px;
}

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heroTitleIn {
  from {
    opacity: 0;
    transform: translateY(30px);
    filter: blur(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

@keyframes heroButtonIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes heroShapeIn {
  from {
    opacity: 0;
    transform: translateY(20px) rotate(var(--shape-rotate, 0deg)) scale(0.96);
  }

  to {
    opacity: var(--hero-shape-opacity, 0.34);
    transform: translateY(0) rotate(var(--shape-rotate, 0deg)) scale(1);
  }
}

@keyframes heroGlowIn {
  from {
    opacity: 0;
    transform: scale(0.78);
  }

  to {
    opacity: var(--hero-glow-opacity, 0.38);
    transform: scale(1);
  }
}

@keyframes heroLineIn {
  from {
    transform: scaleX(0);
  }

  to {
    transform: scaleX(1);
  }
}

@keyframes heroMarqueeMove {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-50%);
  }
}

.hero-marquee {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  height: var(--hero-marquee-h);
  background: var(--hero-marquee-bg);
  color: var(--hero-marquee-text);
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-marquee__track {
  display: flex;
  width: max-content;
  animation: heroMarqueeMove 24s linear infinite;
  will-change: transform;
}

.hero-marquee__group {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: clamp(28px, 3.5vw, 44px);
  padding-right: clamp(28px, 3.5vw, 44px);
}

.hero-marquee__group span {
  flex-shrink: 0;
  font-size: clamp(24px, 2.2vw, 30px);
  line-height: 1;
  font-weight: 950;
  text-transform: lowercase;
  letter-spacing: -0.04em;
  white-space: nowrap;
}

.hero-marquee__group span::after {
  content: '|';
  margin-left: clamp(28px, 3.5vw, 44px);
  font-weight: 700;
  opacity: 0.85;
}

@media (min-width: 1920px) {
  .hero-container {
    width: min(1360px, 100%);
  }

  .hero-section {
    --hero-title-size-max: clamp(84px, 4.8vw, 102px);
  }

  .hero-location {
    margin-top: clamp(24px, 5vh, 56px);
  }

  .hero-main {
    gap: clamp(16px, 2.4vh, 32px);
  }
}

@media (min-width: 2200px) {
  .hero-container {
    width: min(1480px, 100%);
  }

  .hero-section {
    --hero-title-size-max: clamp(92px, 4.3vw, 110px);
    padding-top: calc(var(--site-header-offset) + env(safe-area-inset-top, 0px) + 28px);
    padding-bottom: calc(var(--hero-marquee-h) + 36px + env(safe-area-inset-bottom, 0px));
  }
}

@media (max-width: 1180px) {
  .hero-section {
    --hero-title-size-max: clamp(34px, 5.4vw, 68px);
    --hero-title-fit-divisor: 12.4;
    --hero-title-fit-divisor-long: 15.8;
  }

  .hero-button {
    min-width: clamp(200px, 16vw, 300px);
    min-height: clamp(52px, 4.2vw, 64px);
    padding-inline: clamp(26px, 3.5vw, 48px);
    font-size: clamp(16px, 1.2vw, 20px);
    font-weight: 500;
  }
}

@media (min-width: 1025px) and (max-width: 1439px) {
  .hero-section {
    padding-inline: var(--layout-gutter-wide);
    --hero-title-size-max: clamp(54px, 4.6vw, 76px);
    --hero-title-fit-divisor: 11.4;
    --hero-title-fit-divisor-long: 14;
  }

  .hero-title__line--long {
    white-space: normal;
    overflow-wrap: normal;
    word-break: normal;
    text-wrap: balance;
  }

  .hero-location {
    white-space: normal;
    text-wrap: balance;
  }

  .hero-container {
    width: min(1180px, 100%);
  }

  .hero-title__footer {
    flex-wrap: wrap;
    row-gap: 12px;
  }

  .hero-title__bottom {
    gap: clamp(16px, 2.4vw, 40px);
  }

  .hero-button {
    min-width: clamp(220px, 15vw, 300px);
    min-height: clamp(52px, 4vw, 66px);
    font-size: clamp(17px, 1.15vw, 21px);
  }
}

@media (min-width: 1440px) and (max-width: 1919px) {
  .hero-section {
    padding-inline: var(--layout-gutter-wide);
    --hero-title-size-max: clamp(62px, 4.4vw, 88px);
    --hero-title-fit-divisor: 11.2;
    --hero-title-fit-divisor-long: 13.6;
  }

  .hero-container {
    width: min(1280px, 100%);
  }

  .hero-organizers__name {
    max-width: 300px;
  }
}

@media (max-width: 1024px) {
  .hero-section {
    --hero-marquee-h: clamp(56px, 8vw, 64px);
    min-height: auto;
    padding-inline: var(--layout-gutter-wide);
    padding-top: calc(var(--site-header-offset) + 20px);
    --hero-title-size-max: clamp(28px, 6.2vw, 52px);
    --hero-title-fit-divisor: 13;
    --hero-title-fit-divisor-long: 17.2;
  }

  .hero-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
    margin-inline: auto;
  }

  .hero-top {
    justify-content: center;
    width: 100%;
    margin-bottom: 0;
  }

  .hero-organizers {
    justify-items: center;
    width: 100%;
    max-width: 100%;
    gap: 10px;
  }

  .hero-organizers__head {
    justify-content: center;
  }

  .hero-organizers__head i {
    transform-origin: center center;
  }

  .hero-organizers__body {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10px;
  }

  .hero-organizers__name {
    max-width: min(100%, 360px);
  }

  .hero-location {
    margin: 22px auto 16px;
    text-align: center;
  }

  .hero-main {
    width: 100%;
    justify-items: center;
  }

  .hero-title-block {
    width: 100%;
    max-width: 100%;
  }

  .hero-title {
    justify-items: center;
    text-align: center;
    padding-inline: 0;
  }

  .hero-title__line,
  .hero-title__brand,
  .hero-title__year {
    padding-inline: 0;
  }

  .hero-title__footer {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    text-align: center;
  }

  .hero-title__bottom {
    justify-content: center;
    gap: clamp(12px, 3vw, 24px);
  }

  .hero-actions {
    justify-content: center;
    width: 100%;
    max-width: 100%;
  }

  .hero-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .hero-date {
    justify-items: center;
    text-align: center;
  }

  .hero-button {
    width: auto;
    min-width: clamp(196px, 36vw, 284px);
    max-width: min(100%, 320px);
    margin-inline: auto;
    min-height: 48px;
    padding-inline: clamp(24px, 5.5vw, 44px);
    font-size: clamp(15px, 3vw, 19px);
    min-height: clamp(46px, 7vw, 54px);
    font-weight: 500;
    letter-spacing: 0;
  }

  .hero-marquee__group span {
    font-size: clamp(17px, 2.2vw, 22px);
  }

  .hero-marquee__group {
    gap: 20px;
    padding-right: 20px;
  }

  .hero-marquee__group span::after {
    margin-left: 20px;
  }
}

@media (max-width: 1024px) and (min-width: 769px) {
  .hero-section {
    padding-bottom: calc(var(--hero-marquee-h) + 22px + env(safe-area-inset-bottom, 0px));
  }

  .hero-title-block {
    max-width: min(680px, 100%);
  }

  .hero-organizers__body {
    flex-direction: row;
    align-items: center;
    text-align: left;
    max-width: min(100%, 440px);
  }

  .hero-organizers__name {
    text-align: left;
  }

  .hero-title__footer {
    gap: clamp(14px, 2.5vh, 20px);
  }
}

@media (max-width: 920px) {
  .hero-section {
    padding-top: calc(var(--site-header-offset) + 16px);
    --hero-title-size-max: clamp(26px, 6.8vw, 48px);
    --hero-title-fit-divisor: 13.4;
    --hero-title-fit-divisor-long: 17.8;
  }

  .hero-bg__shape--three {
    bottom: clamp(96px, 14vh, 168px);
    width: clamp(110px, 22vw, 180px);
    height: clamp(88px, 18vw, 150px);
  }

  .hero-bg__glow--three {
    left: 2%;
    bottom: clamp(64px, 10vh, 120px);
    width: clamp(160px, 36vw, 220px);
    height: clamp(160px, 36vw, 220px);
  }
}

@media (max-width: 768px) {
  .hero-section {
    align-items: flex-start;
    min-height: auto;
    padding-inline: var(--layout-gutter);
    padding-top: calc(var(--site-header-offset) + 12px);
    padding-bottom: calc(var(--hero-marquee-h) + 14px + env(safe-area-inset-bottom, 0px));
  }

  .hero-section {
    --hero-bg: linear-gradient(180deg, #25134f 0%, #141f3d 52%, var(--hero-bridge-bg) 100%);
    --hero-button-shadow: 0 6px 20px rgba(255, 111, 145, 0.24);
    --hero-button-shadow-hover: 0 10px 26px rgba(255, 111, 145, 0.3);
  }

  .hero-main {
    gap: 12px;
  }

  .hero-bg__shape,
  .hero-bg__glow {
    display: none;
  }

  .hero-location {
    margin: 14px auto 12px;
    white-space: normal;
    text-wrap: balance;
    max-width: 22em;
  }

  .hero-organizers__logo {
    max-height: 52px;
    max-width: 56px;
  }

  .hero-organizers__head i {
    width: clamp(36px, 12vw, 56px);
  }

  .hero-organizers__body {
    gap: 8px;
  }

  .hero-title-block {
    width: 100%;
  }

  .hero-title__footer {
    width: 100%;
    align-items: stretch;
    gap: clamp(12px, 2.8vh, 18px);
    margin-top: clamp(6px, 1.5vh, 12px);
  }

  .hero-title__bottom {
    justify-content: center;
    gap: clamp(10px, 3.2vw, 18px);
  }

  .hero-actions {
    width: 100%;
  }

  .hero-button {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    height: auto;
    min-height: 48px;
    padding: 14px clamp(22px, 5.5vw, 30px);
    font-size: clamp(17px, 5vw, 19px);
    font-weight: 550;
    line-height: 1.15;
    letter-spacing: 0.01em;
  }

  .hero-bottom {
    margin-top: 10px;
  }

  .hero-date span {
    font-size: clamp(20px, 5.4vw, 24px);
    font-weight: 850;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding-top: calc(var(--site-header-offset) + 10px);
  }

  .hero-organizers__name {
    max-width: min(100%, 280px);
    font-size: 11px;
  }

  .hero-organizers__logo {
    max-height: 46px;
    max-width: 50px;
  }

  .hero-title__brand,
  .hero-title__year {
    font-size: min(var(--hero-title-size-max), max(12px, calc(100cqi / 11.8)));
  }
}

@media (max-width: 620px) {
  .hero-section {
    --hero-marquee-h: 52px;
    padding-bottom: calc(var(--hero-marquee-h) + 12px + env(safe-area-inset-bottom, 0px));
  }

  .hero-marquee__group span {
    font-size: 18px;
  }

  .hero-marquee__group {
    gap: 18px;
    padding-right: 18px;
  }

  .hero-marquee__group span::after {
    margin-left: 18px;
  }

  .hero-organizers__name {
    font-size: 12px;
  }

  .hero-location {
    font-size: 14px;
    letter-spacing: 0.04em;
  }

  .hero-section {
    --hero-title-size-max: clamp(26px, 8.8vw, 44px);
    --hero-title-fit-divisor: 13.2;
    --hero-title-fit-divisor-long: 17.6;
  }

  .hero-title {
    gap: 4px;
    letter-spacing: -0.02em;
  }

  .hero-title__line,
  .hero-title__brand,
  .hero-title__year {
    line-height: 1.08;
    min-height: 1.08em;
    letter-spacing: -0.02em;
  }

  .hero-date span {
    font-size: clamp(19px, 5.8vw, 23px);
  }

  .hero-button {
    min-height: 48px;
    padding-block: 14px;
    font-size: 18px;
  }
}

@media (max-width: 420px) {
  .hero-section {
    --hero-marquee-h: 48px;
    --hero-title-size-max: clamp(22px, 8.2vw, 36px);
    --hero-title-fit-divisor: 13.6;
    --hero-title-fit-divisor-long: 18.2;
    padding-top: calc(var(--site-header-offset) + 16px);
  }

  .hero-title__footer {
    gap: 10px;
  }

  .hero-title__bottom {
    gap: 8px;
  }

  .hero-button {
    min-height: 46px;
    padding: 12px 24px;
    font-size: 17px;
    line-height: 1.2;
  }

  .hero-date span {
    font-size: 19px;
  }

  .hero-marquee__group span {
    font-size: 15px;
  }

  .hero-marquee__group {
    gap: 14px;
    padding-right: 14px;
  }

  .hero-marquee__group span::after {
    margin-left: 14px;
  }
}

@media (max-width: 360px) {
  .hero-section {
    --hero-title-size-max: clamp(20px, 7.4vw, 32px);
    padding-top: calc(var(--site-header-offset) + 8px);
  }

  .hero-organizers__name {
    font-size: 10px;
    line-height: 1.25;
  }

  .hero-location {
    font-size: 12px;
    letter-spacing: 0.03em;
  }

  .hero-button {
    font-size: 16px;
    padding: 12px 18px;
    min-height: 44px;
  }

  .hero-date span {
    font-size: 18px;
  }
}

@media (max-width: 320px) {
  .hero-section {
    --hero-marquee-h: 44px;
    --hero-title-fit-divisor: 14;
    --hero-title-fit-divisor-long: 19;
  }

  .hero-marquee__group span {
    font-size: 14px;
  }
}

@media (max-height: 860px) and (min-width: 900px) {
  .hero-section {
    --hero-marquee-h: 60px;
    padding-top: calc(var(--site-header-offset) + 10px);
    padding-bottom: calc(var(--hero-marquee-h) + 16px + env(safe-area-inset-bottom, 0px));
  }

  .hero-top {
    margin-bottom: 6px;
  }

  .hero-organizers {
    gap: 8px;
  }

  .hero-organizers__body {
    gap: 6px;
    font-size: 11px;
  }

  .hero-organizers__logo {
    max-height: 56px;
    max-width: 62px;
  }

  .hero-organizers__name {
    line-height: 1.16;
  }

  .hero-main {
    gap: 16px;
  }

  .hero-location {
    margin: 14px 0 10px;
    font-size: 15px;
  }

  .hero-section {
    --hero-title-size-max: clamp(38px, 4.7vw, 78px);
    --hero-title-fit-divisor: 11.6;
  }

  .hero-title {
    gap: 2px;
    line-height: 1.08;
  }

  .hero-title__line,
  .hero-title__brand,
  .hero-title__year {
    min-height: 1.08em;
    line-height: 1.08;
  }

  .hero-date span {
    font-size: clamp(22px, 1.8vw, 30px);
  }

  .hero-button {
    min-height: 58px;
    font-size: clamp(18px, 1.2vw, 23px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-section *,
  .hero-bg__shape,
  .hero-bg__glow,
  .hero-organizers,
  .hero-organizers__head i,
  .hero-location,
  .hero-title__line,
  .hero-title__brand,
  .hero-title__year,
  .hero-date,
  .hero-button,
  .hero-marquee__track {
    animation: none;
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }
}
</style>