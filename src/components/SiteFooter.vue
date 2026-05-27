<template>
  <footer class="footer">
    <WaveDecor placement="left" size="sm" />
    <WaveDecor placement="right" size="md" />
    <WaveDecor placement="bottom" size="sm" />

    <div class="footer-container">
      <div class="footer-main">
        <a class="footer-logo-wrap" href="#" :aria-label="logoAlt">
          <img
            :src="logoSrc"
            :alt="logoAlt"
            class="footer-logo"
            width="520"
            height="120"
            decoding="async"
            @error="onLogoError"
          />
        </a>

        <p class="footer-tagline">
          Форум молодых предпринимателей, где идеи превращаются в проекты,
          а проекты — в реальные возможности.
        </p>

        <div class="footer-contacts">
          <h4 class="footer-contacts__heading">Контакты</h4>
          <ul class="footer-contacts__list">
            <li>
              <a href="mailto:sielom@yandex.ru">sielom@yandex.ru</a>
            </li>
            <li>
              <a href="tel:+79935230421">+7 993 523 0421</a>
            </li>
            <li class="footer-contacts__address">
              г. Сургут,
              проспект Пролетарский, 3
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-info">
          <p class="footer-copyright">
            © 2026 Форум ВОЛНА. Все права защищены.
          </p>

          <p class="footer-made-by">
            <span class="footer-made-by__text">Сайт сделан сообществом</span>
            <span
              class="footer-made-by__logo"
              role="img"
              aria-label="SIELOM.WEB"
            ></span>
          </p>
        </div>

        <div class="footer-legal">
          <a
            href="/Политика конфиденциальности и обработка данных.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Политика конфиденциальности
          </a>

          <span class="footer-legal-separator" aria-hidden="true">|</span>

          <a
            href="/Polzovatelskoe_soglashenie (1).pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Условия использования
          </a>

          <span class="footer-legal-separator" aria-hidden="true">|</span>

          <a
            href="/Soglasie_na_obrabotku_PD_dlya_saita_obshchee (1) (2).pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Согласие на обработку данных
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import WaveDecor from './WaveDecor.vue'
import { useVolnaLogo } from '../composables/useVolnaLogo'

const { logoSrc, logoAlt, onLogoError } = useVolnaLogo({ variant: 'footer' })
</script>

<style scoped>
.footer {
  position: relative;
  width: 100%;
  overflow: hidden;
  color: var(--color-footer-text);
  background: linear-gradient(135deg, var(--color-footer-bg), var(--color-footer-bg-2));
  border-top: 1px solid var(--color-footer-border);
  isolation: isolate;
}

.footer-container {
  position: relative;
  z-index: 2;
  width: min(1100px, 100%);
  margin: 0 auto;
  padding: 72px var(--layout-gutter-wide, 56px) 40px;
}

.footer-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(22px, 3.5vw, 32px);
  margin-bottom: 36px;
  padding-bottom: 36px;
  border-bottom: 1px solid var(--color-footer-border);
  text-align: center;
}

.footer-logo-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: min(560px, 92vw);
  margin-inline: auto;
  text-decoration: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.footer-logo-wrap:hover {
  opacity: 0.92;
  transform: scale(1.01);
}

.footer-logo {
  display: block;
  width: 100%;
  height: auto;
  max-height: clamp(52px, 10vw, 96px);
  object-fit: contain;
  object-position: center;
}

.footer-tagline {
  margin: 0;
  width: 100%;
  max-width: min(40rem, 100%);
  color: var(--color-footer-text-muted);
  font-size: clamp(17px, 1.35vw, 22px);
  line-height: 1.35;
  font-weight: 750;
  letter-spacing: -0.035em;
}

.footer-contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(12px, 2vw, 16px);
  width: 100%;
  max-width: min(36rem, 100%);
  margin-inline: auto;
  padding-top: clamp(4px, 1vw, 8px);
  text-align: center;
}

.footer-contacts__heading {
  margin: 0;
  color: var(--color-footer-accent);
  font-size: clamp(18px, 1.6vw, 22px);
  line-height: 1;
  font-weight: 900;
  text-transform: lowercase;
  letter-spacing: -0.05em;
}

.footer-contacts__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(8px, 1.4vw, 12px);
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-contacts__list li {
  margin: 0;
}

.footer-contacts__list a,
.footer-contacts__address {
  display: inline-block;
  color: var(--color-footer-text-muted);
  text-decoration: none;
  font-size: clamp(15px, 1.2vw, 18px);
  line-height: 1.35;
  font-weight: 750;
  letter-spacing: -0.03em;
  transition: color 0.2s ease;
}

.footer-contacts__list a:hover {
  color: var(--color-footer-accent);
}

.footer-contacts__address {
  margin-top: 4px;
  font-style: normal;
}

.footer-bottom {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 18px 28px;
  width: 100%;
  color: var(--color-footer-bottom);
  font-size: 14px;
  line-height: 1.3;
  font-weight: 800;
  letter-spacing: -0.025em;
}

.footer-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  min-width: 0;
}

.footer-copyright {
  margin: 0;
}

.footer-made-by {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  color: var(--color-footer-bottom);
  font-size: 13px;
  line-height: 1;
  font-weight: 850;
  letter-spacing: -0.03em;
  opacity: 0.92;
}

.footer-made-by__text {
  display: inline-block;
  white-space: nowrap;
}

.footer-made-by__logo {
  display: inline-block;
  flex: 0 0 auto;
  width: 118px;
  height: 18px;
  color: currentColor;
  background-color: currentColor;
  mask: url('/SIELOMWEB.svg') center / contain no-repeat;
  -webkit-mask: url('/SIELOMWEB.svg') center / contain no-repeat;
  transform: translateY(1px);
}

.footer-legal {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;
}

.footer-legal a {
  color: var(--color-footer-bottom);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-legal a:hover {
  color: var(--color-footer-accent);
}

.footer-legal-separator {
  color: var(--color-footer-separator);
}

/* Планшет ~820px: декор не заходит на слоган и блок контактов */
@media (max-width: 980px) and (min-width: 761px) {
  .footer :deep(.wave-decor) {
    opacity: 0.32;
  }

  .footer :deep(.wave-decor--right),
  .footer :deep(.wave-decor--bottom) {
    display: none;
  }

  .footer :deep(.wave-decor--left) {
    left: max(12px, min(32px, 3.8vw));
    top: auto;
    bottom: 12%;
    transform: rotate(-8deg);
  }

  .footer :deep(.wave-decor--sm .wave-decor__icon) {
    width: clamp(44px, 6vw, 56px);
  }

  .footer-container {
    padding: 64px var(--layout-gutter, 28px) 36px;
  }

  .footer-tagline {
    font-size: clamp(17px, 1.8vw, 20px);
    line-height: 1.4;
  }

  .footer-contacts__list a,
  .footer-contacts__address {
    font-size: clamp(15px, 1.5vw, 17px);
  }

  .footer-main {
    gap: 24px;
  }

  .footer-bottom {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
    gap: 16px;
  }

  .footer-info {
    align-items: center;
  }

  .footer-made-by {
    justify-content: center;
  }

  .footer-legal {
    justify-content: center;
  }
}

@media (min-width: 1025px) and (max-width: 1439px) {
  .footer-container {
    width: min(1040px, 100%);
    padding: 68px var(--layout-gutter-wide) 38px;
  }
}

@media (min-width: 1440px) and (max-width: 1919px) {
  .footer-container {
    width: min(1200px, 100%);
    padding: 72px var(--layout-gutter-wide) 40px;
  }
}

@media (min-width: 1920px) {
  .footer-container {
    width: min(1280px, 100%);
    padding: 80px var(--layout-gutter-wide) 44px;
  }
}

@media (max-width: 1180px) {
  .footer-container {
    padding: 64px var(--layout-gutter-wide) 36px;
  }
}

@media (max-width: 768px) {
  .footer :deep(.wave-decor) {
    display: none;
  }

  .footer-logo {
    max-height: clamp(48px, 12vw, 72px);
  }

  .footer-bottom {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
  }

  .footer-info {
    align-items: center;
  }

  .footer-made-by {
    justify-content: center;
  }

  .footer-legal {
    justify-content: center;
  }
}

@media (max-width: 680px) {
  .footer-container {
    padding: 56px var(--layout-gutter) 32px;
  }

  .footer-main {
    gap: 20px;
    margin-bottom: 28px;
    padding-bottom: 28px;
  }

  .footer-tagline {
    font-size: 17px;
  }

  .footer-made-by {
    font-size: 12px;
  }

  .footer-made-by__logo {
    width: 108px;
    height: 17px;
  }
}

@media (max-width: 480px) {
  .footer-logo {
    max-height: clamp(44px, 11vw, 60px);
  }

  .footer-tagline {
    font-size: 16px;
    line-height: 1.35;
  }

  .footer-made-by {
    flex-wrap: wrap;
    row-gap: 7px;
    max-width: 100%;
  }
}

@media (max-width: 420px) {
  .footer-container {
    padding: 48px var(--layout-gutter) 28px;
  }

  .footer-contacts__list a,
  .footer-contacts__address {
    font-size: 15px;
  }

  .footer-bottom {
    font-size: 12px;
  }

  .footer-made-by {
    gap: 7px;
  }

  .footer-made-by__logo {
    width: 98px;
    height: 16px;
  }

  .footer-legal {
    flex-direction: column;
    gap: 8px;
  }

  .footer-legal-separator {
    display: none;
  }
}

@media (max-width: 360px) {
  .footer-container {
    padding: 44px var(--layout-gutter) 24px;
  }

  .footer-tagline {
    font-size: 16px;
  }

  .footer-contacts__list a,
  .footer-contacts__address {
    font-size: 14px;
  }

  .footer-made-by {
    flex-direction: column;
  }

  .footer-made-by__logo {
    width: 108px;
    height: 17px;
  }
}
</style>