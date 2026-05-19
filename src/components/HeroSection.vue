<script setup>
import { ref } from 'vue'
import RegistrationModal from './RegistrationModal.vue'
import { useTheme } from '../composables/useTheme'
import sielomEmblemUrl from '../assets/sielom.svg'

const { isDark } = useTheme()
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
  <section
    class="hero-section"
    :class="isDark ? 'hero-section--dark' : 'hero-section--light'"
  >
    <div class="hero-bg" aria-hidden="true">
      <span class="hero-bg__shape hero-bg__shape--one"></span>
      <span class="hero-bg__shape hero-bg__shape--two"></span>
      <span class="hero-bg__shape hero-bg__shape--three"></span>
      <span class="hero-bg__shape hero-bg__shape--four"></span>
      <span class="hero-bg__glow hero-bg__glow--one"></span>
      <span class="hero-bg__glow hero-bg__glow--two"></span>
      <span class="hero-bg__glow hero-bg__glow--three"></span>
    </div>

    <div class="hero-container">
      <div class="hero-top">
        <div class="hero-organizers" aria-label="Организатор форума">
          <div class="hero-organizers__head">
            <span>Организатор</span>
            <i aria-hidden="true"></i>
          </div>

          <div class="hero-organizers__body">
            <img
              class="hero-organizers__logo"
              :src="sielomEmblemUrl"
              alt="Логотип организатора"
              width="120"
              height="120"
              decoding="async"
            >

            <p class="hero-organizers__name">
              Сургутский институт<br>
              экономики, управления и права
            </p>
          </div>
        </div>
      </div>

      <div class="hero-main">
        <div class="hero-title-block">
          <p class="hero-location">ХМАО-Югра · Сургут</p>

          <h1 class="hero-title" aria-label="форум молодежного предпринимательства ВОЛНА 2026">
            <span class="hero-title__line">форум</span>
            <span class="hero-title__line">молодежного</span>
            <span class="hero-title__line">предпринимательства</span>

            <span class="hero-title__bottom">
              <span class="hero-title__brand">волна</span>
              <span class="hero-title__year">2026</span>
            </span>
          </h1>
        </div>

        <div class="hero-bottom">
          <div class="hero-date">
            <span>29 мая 2026</span>
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
  --site-header-offset: 96px;

  position: relative;
  min-height: 100svh;
  padding:
    calc(var(--site-header-offset) + env(safe-area-inset-top, 0px) + clamp(12px, 2vh, 28px))
    clamp(18px, 4vw, 58px)
    clamp(26px, 4.5vh, 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--hero-text);
  background: var(--hero-bg);
  overflow: hidden;
  isolation: isolate;
  box-sizing: border-box;
  transition:
    background 0.35s ease,
    color 0.35s ease;
}

.hero-section--light {
  --hero-text: #111827;
  --hero-muted: rgba(17, 24, 39, 0.72);
  --hero-accent: #fc526c;
  --hero-location-text: rgba(17, 24, 39, 0.76);

  --hero-title-text-gradient: linear-gradient(
    92deg,
    #101827 0%,
    #241c43 38%,
    #6b2d6f 70%,
    #b23655 100%
  );

  --hero-sunset-gradient: linear-gradient(
    92deg,
    #7a2f00 0%,
    #b64b00 28%,
    #e96d00 56%,
    #ff9f43 78%,
    #ffd6a5 100%
  );

  --hero-button-bg: linear-gradient(
    92deg,
    #8a3600 0%,
    #c45800 34%,
    #f47b00 62%,
    #ff9f43 82%,
    #ffd6a5 100%
  );

  --hero-button-shadow: rgba(230, 106, 0, 0.34);
  --hero-button-glow: rgba(255, 159, 67, 0.32);

  --hero-organizers-label: rgba(17, 24, 39, 0.72);
  --hero-organizers-line: linear-gradient(90deg, rgba(252, 82, 108, 0.95), rgba(255, 146, 77, 0.95));
  --hero-logo-filter: brightness(0);
  --hero-name-text: #4b5563;

  --hero-bg:
    radial-gradient(circle at 10% 9%, rgba(255, 195, 116, 0.82), transparent 32%),
    radial-gradient(circle at 86% 16%, rgba(252, 82, 108, 0.34), transparent 36%),
    radial-gradient(circle at 50% 92%, rgba(255, 132, 43, 0.3), transparent 36%),
    radial-gradient(circle at 28% 72%, rgba(109, 91, 166, 0.22), transparent 34%),
    linear-gradient(180deg, #ffffff 0%, #ffffff 48%, #fff4f1 100%);

  --hero-shape-bg: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.96),
    rgba(238, 231, 247, 0.72)
  );
  --hero-shape-border: rgba(109, 91, 166, 0.08);
  --hero-shape-shadow:
    28px 34px 80px rgba(13, 27, 42, 0.08),
    inset 14px 14px 32px rgba(255, 255, 255, 0.86),
    inset -16px -16px 30px rgba(109, 91, 166, 0.08);

  --hero-glow-one: rgba(252, 82, 108, 0.44);
  --hero-glow-two: rgba(255, 132, 43, 0.36);
  --hero-glow-three: rgba(109, 91, 166, 0.3);
}

.hero-section--dark {
  --hero-text: #fff4f1;
  --hero-muted: rgba(255, 244, 241, 0.86);
  --hero-accent: #ffb56a;
  --hero-location-text: rgba(255, 244, 241, 0.78);

  --hero-title-text-gradient: linear-gradient(
    92deg,
    #ffffff 0%,
    #fff4f1 34%,
    #ffbfd0 68%,
    #ffd1a8 100%
  );

  --hero-sunset-gradient: linear-gradient(
    92deg,
    #ffd6a5 0%,
    #ffbd7a 28%,
    #ff9f43 58%,
    #ff7b00 82%,
    #d85a00 100%
  );

  --hero-button-bg: linear-gradient(
    92deg,
    #ffd6a5 0%,
    #ffb56a 28%,
    #ff9f43 56%,
    #ff7b00 78%,
    #d85a00 100%
  );

  --hero-button-shadow: rgba(255, 138, 36, 0.42);
  --hero-button-glow: rgba(255, 183, 106, 0.34);

  --hero-organizers-label: rgba(255, 244, 241, 0.76);
  --hero-organizers-line: linear-gradient(90deg, #ff7fa5, #ff9f43, #b7a5ff);
  --hero-logo-filter: brightness(0) invert(1);
  --hero-name-text: rgba(255, 244, 241, 0.8);

  --hero-bg:
    radial-gradient(circle at 8% 9%, rgba(109, 91, 166, 0.6), transparent 32%),
    radial-gradient(circle at 87% 14%, rgba(255, 111, 145, 0.42), transparent 36%),
    radial-gradient(circle at 52% 88%, rgba(255, 159, 67, 0.34), transparent 37%),
    linear-gradient(180deg, #25134f 0%, #141f3d 48%, #071126 100%);

  --hero-shape-bg: linear-gradient(
    145deg,
    rgba(109, 91, 166, 0.44),
    rgba(255, 111, 145, 0.18)
  );
  --hero-shape-border: rgba(255, 244, 241, 0.14);
  --hero-shape-shadow:
    28px 34px 90px rgba(0, 0, 0, 0.28),
    inset 14px 14px 34px rgba(255, 255, 255, 0.09),
    inset -18px -18px 34px rgba(0, 0, 0, 0.2);

  --hero-glow-one: rgba(255, 111, 145, 0.58);
  --hero-glow-two: rgba(255, 159, 67, 0.44);
  --hero-glow-three: rgba(109, 91, 166, 0.58);
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
  left: 5%;
  top: 9%;
  width: clamp(150px, 18vw, 320px);
  height: clamp(150px, 18vw, 320px);
  clip-path: polygon(16% 10%, 88% 0, 100% 72%, 32% 100%, 0 44%);
  animation-delay: 0.12s;
}

.hero-bg__shape--two {
  --shape-rotate: 18deg;
  right: 6%;
  top: 11%;
  width: clamp(170px, 22vw, 390px);
  height: clamp(130px, 16vw, 280px);
  clip-path: polygon(10% 10%, 88% 0, 100% 84%, 18% 100%, 0 42%);
  animation-delay: 0.2s;
}

.hero-bg__shape--three {
  --shape-rotate: -14deg;
  left: 48%;
  bottom: 15%;
  width: clamp(150px, 17vw, 280px);
  height: clamp(120px, 14vw, 220px);
  clip-path: polygon(10% 0, 100% 16%, 86% 88%, 22% 100%, 0 34%);
  animation-delay: 0.28s;
}

.hero-bg__shape--four {
  --shape-rotate: 31deg;
  right: 22%;
  bottom: 5%;
  width: clamp(90px, 10vw, 160px);
  height: clamp(90px, 10vw, 160px);
  border-radius: 24px;
  animation-delay: 0.34s;
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

.hero-bg__glow--two {
  right: 10%;
  bottom: 16%;
  width: 310px;
  height: 310px;
  background: var(--hero-glow-two);
  animation-delay: 0.32s;
}

.hero-bg__glow--three {
  left: 40%;
  top: 12%;
  width: 260px;
  height: 260px;
  background: var(--hero-glow-three);
  animation-delay: 0.4s;
}

.hero-container {
  position: relative;
  z-index: 2;
  width: min(1260px, 100%);
  margin: 0 auto;
}

.hero-top {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: clamp(4px, 0.7vh, 10px);
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
  gap: clamp(16px, 1.8vw, 24px);
}

.hero-organizers__logo {
  display: block;
  width: clamp(42px, 4.5vw, 58px);
  height: clamp(42px, 4.5vw, 58px);
  object-fit: contain;
  filter: var(--hero-logo-filter);
  flex-shrink: 0;
  transition: filter 0.35s ease;
}

.hero-organizers__name {
  max-width: 270px;
  margin: 0;
  color: var(--hero-name-text);
  font-size: clamp(11px, 0.9vw, 14px);
  font-weight: 350;
  line-height: 1.22;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.hero-main {
  display: grid;
  gap: clamp(16px, 2.7vh, 34px);
  width: 100%;
}

.hero-title-block {
  width: 100%;
  overflow: visible;
}

.hero-location {
  width: fit-content;
  margin: 0 0 clamp(6px, 0.8vh, 12px);
  color: var(--hero-location-text);
  font-size: clamp(15px, 1.1vw, 20px);
  font-weight: 850;
  line-height: 1.25;
  letter-spacing: 0.055em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(18px);
  animation: heroFadeUp 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.32s forwards;
}

.hero-title {
  display: grid;
  gap: clamp(1px, 0.22vh, 4px);
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0.1em 0.24em 0.12em 0;
  color: var(--hero-text);
  font-size: clamp(42px, 5.2vw, 96px);
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
  padding: 0.03em 0.1em 0.05em 0;
  line-height: 1.08;
  letter-spacing: -0.01em;
  white-space: nowrap;
  background: var(--hero-title-text-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  opacity: 0;
  transform: translateY(30px);
  animation: heroTitleIn 0.9s cubic-bezier(0.19, 1, 0.22, 1) forwards;
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

.hero-title__bottom {
  display: flex;
  align-items: baseline;
  flex-wrap: nowrap;
  gap: clamp(18px, 3.2vw, 54px);
  width: 100%;
  max-width: 100%;
  margin-top: clamp(0px, 0.3vh, 5px);
  padding-right: 0.3em;
  overflow: visible;
}

.hero-title__brand {
  animation-delay: 0.72s;
}

.hero-title__year {
  padding-right: 0.3em;
  background: var(--hero-sunset-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  letter-spacing: 0;
  animation-delay: 0.82s;
}

.hero-bottom {
  display: grid;
  grid-template-columns: minmax(220px, 340px) minmax(260px, 1fr);
  align-items: center;
  gap: clamp(20px, 4vw, 60px);
  width: 100%;
}

.hero-date {
  display: grid;
  color: var(--hero-text);
  opacity: 0;
  transform: translateY(24px);
  animation: heroFadeUp 0.82s cubic-bezier(0.19, 1, 0.22, 1) 0.94s forwards;
}

.hero-date span {
  font-size: clamp(24px, 2.1vw, 38px);
  font-weight: 900;
  line-height: 1.18;
  letter-spacing: -0.012em;
}

.hero-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.hero-button {
  position: relative;
  min-width: clamp(250px, 22vw, 380px);
  min-height: clamp(66px, 5.4vw, 82px);
  padding: 0 clamp(34px, 5vw, 68px);
  border: 0;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  background: var(--hero-button-bg);
  box-shadow:
    0 22px 48px var(--hero-button-shadow),
    0 0 44px var(--hero-button-glow);
  font-family: inherit;
  font-size: clamp(18px, 1.55vw, 26px);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.012em;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  opacity: 0;
  transform: translateY(24px) scale(0.96);
  animation: heroButtonIn 0.86s cubic-bezier(0.19, 1, 0.22, 1) 1.04s forwards;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    filter 0.22s ease;
}

.hero-button span {
  color: #ffffff;
}

.hero-button:hover {
  transform: translateY(-4px) scale(1.015);
  box-shadow:
    0 28px 58px var(--hero-button-shadow),
    0 0 54px var(--hero-button-glow);
  filter: saturate(1.08);
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
    transform: translateY(24px) scale(0.96);
    filter: blur(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: blur(0);
  }
}

@keyframes heroShapeIn {
  from {
    opacity: 0;
    transform: translateY(20px) rotate(var(--shape-rotate, 0deg)) scale(0.96);
  }

  to {
    opacity: 1;
    transform: translateY(0) rotate(var(--shape-rotate, 0deg)) scale(1);
  }
}

@keyframes heroGlowIn {
  from {
    opacity: 0;
    transform: scale(0.78);
  }

  to {
    opacity: 1;
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

@media (min-width: 1920px) {
  .hero-container {
    width: min(1360px, 100%);
  }

  .hero-title {
    font-size: clamp(84px, 4.8vw, 102px);
  }

  .hero-top {
    margin-bottom: clamp(4px, 1vh, 12px);
  }

  .hero-main {
    gap: clamp(16px, 2.4vh, 32px);
  }
}

@media (min-width: 2200px) {
  .hero-container {
    width: min(1480px, 100%);
  }

  .hero-title {
    font-size: clamp(92px, 4.3vw, 110px);
  }

  .hero-section {
    padding-top: calc(var(--site-header-offset) + env(safe-area-inset-top, 0px) + 28px);
    padding-bottom: 66px;
  }
}

@media (max-width: 1180px) {
  .hero-title {
    font-size: clamp(38px, 6.2vw, 76px);
  }

  .hero-bottom {
    grid-template-columns: 1fr;
    align-items: start;
    gap: 28px;
  }

  .hero-actions {
    justify-content: center;
  }
}

@media (max-width: 860px) {
  .hero-section {
    min-height: auto;
    padding-top: calc(var(--site-header-offset) + 42px);
  }

  .hero-top {
    justify-content: center;
    margin-bottom: 18px;
  }

  .hero-organizers {
    justify-items: center;
    gap: 10px;
  }

  .hero-organizers__body {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }

  .hero-location {
    margin-inline: auto;
    text-align: center;
  }

  .hero-title {
    width: 100%;
    text-align: center;
    font-size: clamp(34px, 8.6vw, 64px);
  }

  .hero-title__line,
  .hero-title__brand,
  .hero-title__year {
    width: 100%;
    white-space: normal;
    overflow-wrap: anywhere;
  }

  .hero-title__bottom {
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    padding-right: 0;
  }

  .hero-date {
    justify-items: center;
    text-align: center;
  }
}

@media (max-width: 620px) {
  .hero-section {
    padding-inline: 16px;
    padding-bottom: 52px;
  }

  .hero-organizers__name {
    font-size: 12px;
  }

  .hero-location {
    font-size: 14px;
    letter-spacing: 0.04em;
  }

  .hero-title {
    gap: 4px;
    font-size: clamp(30px, 10vw, 48px);
    letter-spacing: 0;
  }

  .hero-title__line,
  .hero-title__brand,
  .hero-title__year {
    line-height: 1.1;
    min-height: 1.1em;
    letter-spacing: 0;
  }

  .hero-date span {
    font-size: 24px;
  }

  .hero-actions {
    width: 100%;
  }

  .hero-button {
    width: 100%;
    min-width: 0;
    min-height: 64px;
    padding-inline: 28px;
    font-size: 18px;
  }

  .hero-bg__shape--one {
    left: -34%;
    top: 8%;
  }

  .hero-bg__shape--two {
    right: -42%;
    top: 14%;
  }

  .hero-bg__shape--three {
    left: 22%;
    bottom: 24%;
  }
}

@media (max-width: 420px) {
  .hero-title {
    font-size: clamp(27px, 9.4vw, 40px);
  }

  .hero-title__bottom {
    gap: 6px;
  }

  .hero-date span {
    font-size: 22px;
  }

  .hero-button {
    min-height: 60px;
    font-size: 17px;
  }
}

@media (max-height: 860px) and (min-width: 900px) {
  .hero-section {
    padding-top: calc(var(--site-header-offset) + 10px);
    padding-bottom: 24px;
  }

  .hero-top {
    margin-bottom: 6px;
  }

  .hero-organizers {
    gap: 8px;
  }

  .hero-organizers__body {
    gap: 16px;
  }

  .hero-organizers__logo {
    width: 42px;
    height: 42px;
  }

  .hero-organizers__name {
    font-size: 11px;
    line-height: 1.18;
  }

  .hero-main {
    gap: 16px;
  }

  .hero-location {
    margin-bottom: 6px;
    font-size: 15px;
  }

  .hero-title {
    gap: 2px;
    font-size: clamp(38px, 4.7vw, 78px);
    line-height: 1.08;
  }

  .hero-title__line,
  .hero-title__brand,
  .hero-title__year {
    min-height: 1.08em;
    line-height: 1.08;
  }

  .hero-title__bottom {
    margin-top: 0;
  }

  .hero-date span {
    font-size: clamp(22px, 1.8vw, 30px);
  }

  .hero-button {
    min-height: 64px;
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
  .hero-button {
    animation: none;
    opacity: 1;
    transform: none;
    filter: none;
    transition: none;
  }
}
</style>