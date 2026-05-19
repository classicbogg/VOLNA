<template>
  <section class="route-section" id="contacts">
    <WaveDecor placement="left" size="md" />
    <WaveDecor placement="right" size="sm" />
    <WaveDecor placement="top" size="sm" />

    <div class="route-container">
      <div class="route-heading">
        <h2>
          <span class="phrase-marker">
            <span class="phrase-marker__text">место проведения</span>
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
            title="Карта: институт экономики, управления и права, проспект Пролетарский, 3, Сургут"
            src="https://www.openstreetmap.org/export/embed.html?bbox=73.435845%2C61.250863%2C73.439845%2C61.254863&layer=mapnik&marker=61.252863%2C73.437845"
            loading="lazy"
          ></iframe>
        </div>

        <article class="route-info-card">
          <div class="route-badge">Локация</div>

          <h3 class="route-info-card__title">
            Сургутский институт экономики,
            управления и права
          </h3>

          <p>
            г. Сургут, проспект Пролетарский, 3.
          </p>

          <p>
            Заглушкатекста заглушкатекста — до здания заглушкатекста заглушкатекста.
            Ориентир: заглушкатекста заглушкатекста на карте.
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
  --route-card-shadow-hard: 6px 8px 0 rgba(var(--palette-navy-rgb), 0.12);
  --route-card-shadow-soft: 0 18px 36px rgba(var(--palette-navy-rgb), 0.1);
  position: relative;
  width: 100%;
  padding: 96px var(--layout-gutter-wide, 40px) 112px;
  background: var(--color-bg);
  color: var(--color-text);
  overflow: hidden;
}

:global(html[data-theme='dark']) .route-section {
  --route-card-shadow-hard: 6px 8px 0 rgba(0, 0, 0, 0.22);
  --route-card-shadow-soft: 0 20px 40px rgba(0, 0, 0, 0.26);
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
  margin: 0 auto 64px;
  padding: 34px clamp(16px, 5vw, 68px) 38px;
}

.route-heading h2 {
  position: relative;
  z-index: 2;
  margin: 0;
  color: var(--color-text);
  line-height: 0.9;
  font-weight: 900;
  text-align: center;
  text-transform: lowercase;
  letter-spacing: -0.08em;
}

/* «место проведения»: овал шире, больше воздуха вокруг текста */
.route-heading .phrase-marker {
  --phrase-marker-pad-x: 0.84em;
  --phrase-marker-pad-y-top: 0.56em;
  --phrase-marker-pad-y-bottom: 0.6em;
  --phrase-marker-ring-x: 1.8em;
  --phrase-marker-ring-y: 1.46em;
}

.route-heading .phrase-marker__svg path {
  stroke-width: 9;
}

@container (max-width: 680px) {
  .route-heading .phrase-marker {
    --phrase-marker-pad-x: 0.76em;
    --phrase-marker-pad-y-top: 0.5em;
    --phrase-marker-pad-y-bottom: 0.54em;
    --phrase-marker-ring-x: 1.56em;
    --phrase-marker-ring-y: 1.3em;
  }
}

@container (max-width: 420px) {
  .route-heading .phrase-marker {
    --phrase-marker-pad-x: 0.8em;
    --phrase-marker-pad-y-top: 0.48em;
    --phrase-marker-pad-y-bottom: 0.52em;
    --phrase-marker-ring-x: 1.62em;
    --phrase-marker-ring-y: 1.34em;
  }
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
  box-shadow: var(--route-card-shadow-hard), var(--route-card-shadow-soft);
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
  margin: 0 0 26px;
  padding-right: 0;
  max-width: 20ch;
  color: var(--color-text);
  font-size: clamp(22px, 2.8vw, 36px);
  line-height: 1.1;
  font-weight: 900;
  text-transform: none;
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

.route-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 30px rgba(var(--color-accent-rgb), 0.12);
}

@media (min-width: 1025px) and (max-width: 1439px) {
  .route-section {
    padding: 88px var(--layout-gutter-wide) 100px;
  }

  .route-container {
    width: min(1280px, 100%);
  }

  .route-heading {
    margin-bottom: 52px;
    padding: 30px 56px 34px;
  }

  .route-layout {
    gap: 30px;
  }

  .route-map-card,
  .route-info-card {
    min-height: 480px;
  }
}

@media (min-width: 1440px) and (max-width: 1919px) {
  .route-container {
    width: min(1440px, 100%);
  }

}

@media (min-width: 1920px) {
  .route-section {
    padding: 108px var(--layout-gutter-wide, 80px) 124px;
  }

  .route-container {
    width: min(1520px, 100%);
  }
}

@media (max-width: 1050px) {
  .route-section {
    padding: 82px var(--layout-gutter-wide, 28px) 96px;
  }

  .route-layout {
    grid-template-columns: 1fr;
    gap: 28px;
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

@media (max-width: 1024px) and (min-width: 761px) {
  .route-section {
    padding: 76px var(--layout-gutter-wide) 88px;
  }

  .route-heading {
    margin-bottom: 36px;
    padding: 28px 44px 32px;
  }

  .route-map-card {
    min-height: min(52vh, 420px);
  }

  .route-info-card {
    padding: 32px 28px 28px;
  }

  .route-info-card__title {
    font-size: clamp(22px, 2.6vw, 30px);
  }

  .route-actions {
    gap: 14px;
  }

  .route-button {
    min-height: 54px;
    font-size: 17px;
  }
}

@media (max-width: 680px) {
  .route-section {
    --route-card-shadow-hard: 5px 6px 0 rgba(var(--palette-navy-rgb), 0.1);
    --route-card-shadow-soft: 0 14px 28px rgba(var(--palette-navy-rgb), 0.08);
    padding: 62px var(--layout-gutter) 76px;
  }

  :global(html[data-theme='dark']) .route-section {
    --route-card-shadow-hard: 5px 6px 0 rgba(0, 0, 0, 0.18);
    --route-card-shadow-soft: 0 16px 32px rgba(0, 0, 0, 0.22);
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
    max-width: 100%;
    font-size: clamp(20px, 5.2vw, 30px);
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

@media (max-width: 480px) {
  .route-section {
    padding: 56px var(--layout-gutter) 68px;
  }

  .route-heading {
    margin-bottom: 32px;
    padding: 20px var(--layout-gutter) 26px;
  }

  .route-heading .phrase-marker {
    --phrase-marker-pad-x: 0.78em;
    --phrase-marker-ring-x: 1.58em;
    --phrase-marker-ring-y: 1.32em;
  }

  .route-map-card {
    min-height: min(72vw, 300px);
  }

  .route-info-card {
    padding: 28px 20px 26px;
  }
}

@media (max-width: 440px) {
  .route-map-card {
    min-height: min(70vw, 280px);
  }

  .route-badge {
    font-size: clamp(14px, 4.2vw, 18px);
    padding: 11px 16px 10px;
  }
}

@media (max-width: 360px) {
  .route-section {
    padding: 52px var(--layout-gutter) 64px;
  }

  .route-heading {
    padding: 20px 12px 24px;
    box-sizing: border-box;
  }

  .route-heading .phrase-marker {
    --phrase-marker-pad-x: 0.72em;
    --phrase-marker-ring-x: 1.5em;
    --phrase-marker-ring-y: 1.26em;
  }

  .route-info-card__title {
    font-size: clamp(18px, 4.8vw, 26px);
  }

  .route-button {
    min-height: 52px;
    font-size: 16px;
  }
}
</style>