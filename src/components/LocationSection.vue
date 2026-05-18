<template>
  <section class="route-section" id="contacts">
    <WaveDecor placement="left" size="md" />
    <WaveDecor placement="right" size="sm" />
    <WaveDecor placement="top" size="sm" />

    <div class="route-container">
      <div class="route-heading">
        <h2>
          <span class="phrase-marker">
            <span class="phrase-marker__text">как добраться до корпуса</span>
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
      </div>

      <div class="route-layout">
        <div class="route-map-card">

          <iframe
            class="route-map"
            title="Карта: СИЭУиП институт, проспект Пролетарский, 3, Сургут"
            src="https://www.openstreetmap.org/export/embed.html?bbox=73.435845%2C61.250863%2C73.439845%2C61.254863&layer=mapnik&marker=61.252863%2C73.437845"
            loading="lazy"
          ></iframe>
        </div>

        <article class="route-info-card">
          <div class="route-badge">Локация</div>

          <h3 class="route-info-card__title">
            <span class="route-info-card__title-abbr">СИЭУиП</span>
            <span class="route-info-card__title-name">институт</span>
          </h3>

          <p>
            г. Сургут, проспект Пролетарский, 3.
          </p>

          <p>
            Доберитесь на общественном транспорте или такси до здания с адресом
            проспект Пролетарский, 3. Ориентир — СИЭУиП институт на карте.
          </p>

          <div class="route-actions">
            <a
              class="route-button route-button--primary"
              href="https://yandex.ru/maps/?pt=73.437845,61.252863&z=18&l=map"
              target="_blank"
              rel="noopener noreferrer"
            >
              открыть в картах
            </a>

            <a
              class="route-button route-button--ghost"
              href="https://www.openstreetmap.org/?mlat=61.252863&mlon=73.437845#map=19/61.252863/73.437845"
              target="_blank"
              rel="noopener noreferrer"
            >
              маршрут
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import WaveDecor from './WaveDecor.vue'
</script>

<style scoped>
.route-section {
  position: relative;
  width: 100%;
  padding: 96px var(--layout-gutter-wide, 40px) 112px;
  background: var(--color-bg);
  color: var(--color-text);
  overflow: hidden;
}

.route-pixels {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  opacity: 0.42;
}

.route-pixels--left {
  left: -64px;
  top: 220px;
  width: 48px;
  height: 48px;
  background: rgba(var(--color-accent-rgb), 0.15);
  box-shadow:
    48px 0 0 rgba(var(--color-accent-rgb), 0.12),
    96px 0 0 rgba(var(--color-accent-rgb), 0.08),
    0 48px 0 rgba(var(--color-accent-rgb), 0.10),
    48px 48px 0 rgba(var(--color-accent-rgb), 0.08),
    96px 48px 0 rgba(var(--color-accent-rgb), 0.06),
    0 96px 0 rgba(var(--color-accent-rgb), 0.08),
    48px 96px 0 rgba(var(--color-accent-rgb), 0.06);
  transform: rotate(-10deg);
  animation: routePixelFloatLeft 8s ease-in-out infinite;
}

.route-pixels--right {
  right: -90px;
  bottom: 150px;
  width: 60px;
  height: 60px;
  background: rgba(var(--color-accent-rgb), 0.12);
  box-shadow:
    -60px 0 0 rgba(var(--color-accent-rgb), 0.09),
    -120px 0 0 rgba(var(--color-accent-rgb), 0.06),
    0 -60px 0 rgba(var(--color-accent-rgb), 0.09),
    -60px -60px 0 rgba(var(--color-accent-rgb), 0.06),
    -120px -60px 0 rgba(var(--color-accent-rgb), 0.05),
    0 -120px 0 rgba(var(--color-accent-rgb), 0.07);
  transform: rotate(8deg);
  animation: routePixelFloatRight 10s ease-in-out infinite;
}

.route-pixels--top {
  right: 14%;
  top: 70px;
  width: 34px;
  height: 34px;
  background: rgba(var(--color-accent-rgb), 0.10);
  box-shadow:
    34px 0 0 rgba(var(--color-accent-rgb), 0.08),
    68px 0 0 rgba(var(--color-accent-rgb), 0.05),
    0 34px 0 rgba(var(--color-accent-rgb), 0.07),
    68px 34px 0 rgba(var(--color-accent-rgb), 0.08),
    102px 34px 0 rgba(var(--color-accent-rgb), 0.05),
    34px 68px 0 rgba(var(--color-accent-rgb), 0.07);
  transform: rotate(12deg);
  animation: routePixelFloatTop 7s ease-in-out infinite;
}

@keyframes routePixelFloatLeft {
  0%, 100% {
    transform: translateY(0) rotate(-10deg);
  }

  50% {
    transform: translateY(-18px) rotate(-7deg);
  }
}

@keyframes routePixelFloatRight {
  0%, 100% {
    transform: translateY(0) rotate(8deg);
  }

  50% {
    transform: translateY(16px) rotate(5deg);
  }
}

@keyframes routePixelFloatTop {
  0%, 100% {
    transform: translateY(0) rotate(12deg);
  }

  50% {
    transform: translateY(-12px) rotate(16deg);
  }
}

.route-container {
  position: relative;
  z-index: 2;
  width: min(1440px, 100%);
  margin: 0 auto;
}

.route-heading {
  position: relative;
  width: fit-content;
  margin: 0 auto 64px;
  padding: 34px 68px 38px;
}

.route-heading h2 {
  position: relative;
  z-index: 2;
  margin: 0;
  color: var(--color-text);
  font-size: clamp(46px, 6.5vw, 92px);
  line-height: 0.9;
  font-weight: 900;
  text-align: center;
  text-transform: lowercase;
  letter-spacing: -0.08em;
}

.route-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
  gap: 34px;
  align-items: stretch;
}

.route-map-card,
.route-info-card {
  position: relative;
  min-height: 520px;
  border: 2px solid var(--color-border-accent);
  border-radius: 34px;
  overflow: hidden;
  background: var(--color-surface-card);
  box-shadow:
    12px 12px 0 rgba(var(--color-accent-rgb), 0.35),
    0 24px 46px var(--color-shadow);
}

.route-map-card {
  transform: rotate(-1.2deg);
}

.route-map-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background:
    linear-gradient(135deg, rgba(var(--color-accent-rgb), 0.18), transparent 34%),
    linear-gradient(0deg, rgba(var(--palette-navy-rgb), 0.06), transparent 44%);
  mix-blend-mode: multiply;
}

.route-map {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  border: 0;
  filter: saturate(0.95) contrast(1.05);
}

.route-info-card {
  padding: 48px 42px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transform: rotate(1deg);
}

.route-info-card::before {
  content: '';
  position: absolute;
  top: 22px;
  right: 26px;
  width: clamp(52px, 11vw, 72px);
  height: clamp(52px, 11vw, 72px);
  pointer-events: none;
  opacity: 1;
  background-color: rgba(var(--palette-orange-rgb), 0.88);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z' fill='%23000'/%3E%3C/svg%3E")
    center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z' fill='%23000'/%3E%3C/svg%3E")
    center / contain no-repeat;
  transform: rotate(6deg);
  filter: drop-shadow(2px 3px 0 rgba(var(--palette-navy-rgb), 0.12));
}

:global(html[data-theme='dark']) .route-info-card::before {
  background-color: rgba(var(--palette-peach-rgb), 0.92);
  filter: drop-shadow(2px 3px 0 rgba(0, 0, 0, 0.28));
}

.route-info-card::after {
  content: '';
  position: absolute;
  left: -32px;
  bottom: -32px;
  width: 150px;
  height: 150px;
  border-radius: 36px;
  background:
    repeating-linear-gradient(
      0deg,
      rgba(var(--color-accent-rgb), 0.09) 0px,
      rgba(var(--color-accent-rgb), 0.09) 1px,
      transparent 1px,
      transparent 22px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(var(--color-accent-rgb), 0.09) 0px,
      rgba(var(--color-accent-rgb), 0.09) 1px,
      transparent 1px,
      transparent 22px
    );
  pointer-events: none;
}

.route-badge {
  position: relative;
  z-index: 2;
  width: fit-content;
  margin-bottom: 26px;
  padding: 13px 22px 12px;
  border-radius: 999px;
  background: var(--color-yellow);
  color: var(--color-purple);
  font-size: clamp(18px, 1.5vw, 24px);
  line-height: 1;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.04em;
}

.route-info-card__title {
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.22em;
  margin: 0 0 26px;
  padding-right: clamp(56px, 14vw, 84px);
  color: var(--color-text);
  font-size: clamp(40px, 4.6vw, 68px);
  line-height: 0.95;
  font-weight: 900;
  text-transform: none;
  letter-spacing: -0.06em;
}

.route-info-card__title-abbr {
  font-size: 1em;
  line-height: 0.92;
}

.route-info-card__title-name {
  font-size: 0.58em;
  line-height: 1.1;
  font-weight: 850;
  letter-spacing: -0.04em;
}

.route-info-card p {
  position: relative;
  z-index: 2;
  max-width: 560px;
  margin: 0 0 20px;
  color: var(--color-text-muted);
  font-size: clamp(18px, 1.45vw, 22px);
  line-height: 1.28;
  font-weight: 750;
  letter-spacing: -0.035em;
}

.route-actions {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 22px;
}

.route-button {
  min-height: 54px;
  padding: 0 24px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 17px;
  line-height: 1;
  font-weight: 900;
  text-transform: lowercase;
  letter-spacing: -0.045em;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.route-button--primary {
  background: var(--color-yellow);
  color: var(--color-purple);
  border: 2px solid var(--color-yellow);
}

.route-button--ghost {
  background: transparent;
  color: var(--color-text);
  border: 2px solid rgba(var(--color-accent-rgb), 0.75);
}

.route-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 30px rgba(var(--color-accent-rgb), 0.12);
}

.route-button--ghost:hover {
  background: var(--color-yellow);
  color: var(--color-purple);
}

@media (min-width: 1920px) {
  .route-section {
    padding: 108px var(--layout-gutter-wide, 80px) 124px;
  }
}

@media (max-width: 1050px) {
  .route-section {
    padding: 82px var(--layout-gutter, 28px) 96px;
  }

  .route-layout {
    grid-template-columns: 1fr;
  }

  .route-map-card,
  .route-info-card {
    min-height: 430px;
    transform: none;
  }

  .route-info-card {
    min-height: auto;
  }
}

@media (max-width: 680px) {
  .route-section {
    padding: 62px 16px 76px;
  }

  .route-pixels {
    opacity: 0.22;
  }

  .route-pixels--left,
  .route-pixels--right,
  .route-pixels--top {
    display: none;
  }

  .route-heading {
    margin-bottom: 42px;
    padding: 24px 28px 30px;
  }

  .route-heading h2 {
    font-size: clamp(42px, 15vw, 66px);
  }

  .route-info-card p {
    font-size: 17px;
    line-height: 1.4;
  }

  .route-layout {
    gap: 24px;
  }

  .route-map-card {
    min-height: 360px;
    border-radius: 26px;
  }

  .route-info-card {
    padding: 34px 24px 30px;
    border-radius: 26px;
  }

  .route-info-card__title {
    font-size: clamp(36px, 11vw, 52px);
    padding-right: clamp(48px, 12vw, 72px);
  }

  .route-info-card p {
    font-size: 17px;
  }

  .route-actions {
    flex-direction: column;
  }

  .route-button {
    width: 100%;
  }
}

@media (max-width: 440px) {
  .route-map-card {
    min-height: 320px;
  }

  .route-badge {
    font-size: clamp(14px, 4.2vw, 18px);
    padding: 11px 16px 10px;
  }
}

@media (max-width: 360px) {
  .route-section {
    padding: 52px 12px 64px;
  }

  .route-heading {
    width: 100%;
    max-width: 100%;
    padding: 20px 16px 24px;
    box-sizing: border-box;
  }

  .route-heading h2 {
    font-size: clamp(34px, 12vw, 48px);
  }

  .route-info-card__title {
    font-size: clamp(32px, 10vw, 44px);
  }

  .route-button {
    min-height: 52px;
    font-size: 16px;
  }
}
</style>