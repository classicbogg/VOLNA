<template>
  <footer class="footer">
    <!-- Пиксельные декорации -->
    <div class="footer-pixels footer-pixels--left" aria-hidden="true"></div>
    <div class="footer-pixels footer-pixels--right" aria-hidden="true"></div>
    <div class="footer-pixels footer-pixels--bottom" aria-hidden="true"></div>

    <div class="footer-container">
      <!-- Основной контент футера -->
      <div class="footer-main">
        <div class="footer-brand">
          <img
            src="https://xn--80aakggo2ad0a1f.xn--p1ai/assets/img/header_logos.png"
            alt="Создай НАШЕ"
            class="footer-logo"
          />
          <p class="footer-tagline">
            Форум молодых предпринимателей
          </p>
          <div class="footer-socials">
            <a href="#" class="footer-social" aria-label="VK">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21.5 7.5c.1-.5 0-.9-.5-1h-3c-.5 0-.9.2-1 .7-.4 1.2-1 2.3-1.7 3.3-.1.1-.2.1-.3 0-.4-.4-.5-.9-.5-1.4V7.5c0-.5-.4-.9-.9-1h-2.6c-.4 0-.6.2-.6.5 0 1.1-.5 2.3-1.2 3.2 0 0-.1.1-.2.1-.3-.3-.5-.8-.5-1.3V7.5c0-.5-.3-.9-.8-1H6.9c-.3 0-.5.2-.4.5.4 1.8 1 3.5 2.1 5 .1.1.1.2 0 .3l-3 3.9c-.1.2 0 .5.2.5h3.1c.3 0 .5-.1.6-.4l2.1-2.8c.1-.1.2-.1.3 0l1.6 2.6c.1.2.3.4.6.4h3.1c.3 0 .5-.3.4-.6l-2.7-4.4c-.1-.1-.1-.2 0-.3.9-1 1.6-2.2 2-3.4z" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" class="footer-social" aria-label="Telegram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-4l5-2-5-2v-4l9 5-9 7z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>

        <div class="footer-links">
          <div class="footer-links-column">
            <h4>О форуме</h4>
            <ul>
              <li><a href="#program">В программе</a></li>
              <li><a href="#speakers">Спикеры</a></li>
              <li><a href="#schedule">Программа форума</a></li>
              <li><a href="#partners">Партнеры</a></li>
            </ul>
          </div>

          <div class="footer-links-column">
            <h4>Участникам</h4>
            <ul>
              <li><a href="#registration">Регистрация</a></li>
              <li><a href="#contacts">Как добраться</a></li>
              <li><a href="#docs">Документы</a></li>
              <li><a href="#faq">Частые вопросы</a></li>
            </ul>
          </div>

          <div class="footer-links-column">
            <h4>Контакты</h4>
            <ul>
              <li><a href="mailto:info@sozdainashe.ru">info@sozdainashe.ru</a></li>
              <li><a href="tel:+74951234567">+7 (495) 123-45-67</a></li>
              <li class="footer-address">
                г. Москва,<br>
                ЦВЗ «Манеж»
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Партнеры -->
      <div class="footer-partners">
        <div class="footer-partners__row">
          <span class="footer-partners__label">Организатор</span>
          <div class="footer-partners__logos">
            <div class="footer-partner-placeholder">
              <svg width="120" height="40" viewBox="0 0 120 40" fill="none">
                <rect x="0.5" y="0.5" width="119" height="39" rx="5" stroke-width="1"/>
                <text x="60" y="25" text-anchor="middle" font-size="12" font-weight="700">ОРГАНИЗАТОР</text>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="footer-partners__row">
          <span class="footer-partners__label">Генеральный партнер</span>
          <div class="footer-partners__logos">
            <div class="footer-partner-placeholder">
              <svg width="160" height="50" viewBox="0 0 160 50" fill="none">
                <rect x="0.5" y="0.5" width="159" height="49" rx="5" stroke-width="1"/>
                <text x="80" y="30" text-anchor="middle" font-size="13" font-weight="700">ГЕНЕРАЛЬНЫЙ ПАРТНЕР</text>
              </svg>
            </div>
          </div>
        </div>

        <div class="footer-partners__row">
          <span class="footer-partners__label">Стратегические партнеры</span>
          <div class="footer-partners__logos footer-partners__logos--multi">
            <div class="footer-partner-placeholder">
              <svg width="130" height="45" viewBox="0 0 130 45" fill="none">
                <rect x="0.5" y="0.5" width="129" height="44" rx="5" stroke-width="1"/>
                <text x="65" y="27" text-anchor="middle" font-size="11" font-weight="700">ПАРТНЕР 1</text>
              </svg>
            </div>
            <div class="footer-partner-placeholder">
              <svg width="130" height="45" viewBox="0 0 130 45" fill="none">
                <rect x="0.5" y="0.5" width="129" height="44" rx="5" stroke-width="1"/>
                <text x="65" y="27" text-anchor="middle" font-size="11" font-weight="700">ПАРТНЕР 2</text>
              </svg>
            </div>
            <div class="footer-partner-placeholder">
              <svg width="130" height="45" viewBox="0 0 130 45" fill="none">
                <rect x="0.5" y="0.5" width="129" height="44" rx="5" stroke-width="1"/>
                <text x="65" y="27" text-anchor="middle" font-size="11" font-weight="700">ПАРТНЕР 3</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Нижняя часть -->
      <div class="footer-bottom">
        <div class="footer-copyright">
          © 2026 Форум «Создай НАШЕ». Все права защищены.
        </div>
        <div class="footer-legal">
          <a href="#privacy">Политика конфиденциальности</a>
          <span class="footer-legal-separator">|</span>
          <a href="#terms">Условия использования</a>
        </div>
        <div class="footer-made">
          Сделано с <span class="footer-heart">✦</span> для молодых предпринимателей
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  width: 100%;
  background: var(--color-footer-bg, var(--color-bg));
  color: var(--color-footer-text, var(--color-text));
  overflow: hidden;
  border-top: 1px solid var(--color-footer-border, var(--color-border));
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
}

.footer-pixels {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  opacity: 0.3;
}

.footer-pixels--left {
  left: -50px;
  top: 120px;
  width: 40px;
  height: 40px;
  background: rgba(var(--color-accent-rgb), 0.12);
  box-shadow:
    40px 0 0 rgba(var(--color-accent-rgb), 0.10),
    80px 0 0 rgba(var(--color-accent-rgb), 0.06),
    0 40px 0 rgba(var(--color-accent-rgb), 0.08),
    40px 40px 0 rgba(var(--color-accent-rgb), 0.06),
    0 80px 0 rgba(var(--color-accent-rgb), 0.05);
  transform: rotate(-8deg);
  animation: footerPixelFloatLeft 10s ease-in-out infinite;
}

.footer-pixels--right {
  right: -60px;
  bottom: 100px;
  width: 48px;
  height: 48px;
  background: rgba(var(--color-accent-rgb), 0.10);
  box-shadow:
    -48px 0 0 rgba(var(--color-accent-rgb), 0.08),
    -96px 0 0 rgba(var(--color-accent-rgb), 0.05),
    0 -48px 0 rgba(var(--color-accent-rgb), 0.07),
    -48px -48px 0 rgba(var(--color-accent-rgb), 0.05);
  transform: rotate(6deg);
  animation: footerPixelFloatRight 12s ease-in-out infinite;
}

.footer-pixels--bottom {
  left: 25%;
  bottom: -30px;
  width: 56px;
  height: 56px;
  background: rgba(var(--color-accent-rgb), 0.08);
  box-shadow:
    56px 0 0 rgba(var(--color-accent-rgb), 0.06),
    0 56px 0 rgba(var(--color-accent-rgb), 0.05);
  transform: rotate(15deg);
  animation: footerPixelFloatBottom 8s ease-in-out infinite;
}

@keyframes footerPixelFloatLeft {
  0%, 100% { transform: translateY(0) rotate(-8deg); }
  50% { transform: translateY(-15px) rotate(-5deg); }
}

@keyframes footerPixelFloatRight {
  0%, 100% { transform: translateY(0) rotate(6deg); }
  50% { transform: translateY(12px) rotate(3deg); }
}

@keyframes footerPixelFloatBottom {
  0%, 100% { transform: translateY(0) rotate(15deg); }
  50% { transform: translateY(-10px) rotate(18deg); }
}

.footer-container {
  position: relative;
  z-index: 2;
  max-width: 1440px;
  margin: 0 auto;
  padding: 64px 52px 48px;
}

.footer-main {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 60px;
  margin-bottom: 56px;
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-logo {
  width: 240px;
  height: auto;
  filter: var(--color-logo-filter);
  opacity: var(--color-logo-opacity, 0.92);
  transition:
    filter 0.35s ease,
    opacity 0.35s ease;
}

.footer-tagline {
  font-size: 14px;
  color: var(--color-footer-text-muted, var(--color-text-muted));
  letter-spacing: -0.02em;
  margin: 0;
}

.footer-socials {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.footer-social {
  width: 40px;
  height: 40px;
  background: var(--color-icon-bg);
  border: 1px solid var(--color-icon-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-icon-fg);
  transition: all 0.2s ease;
  text-decoration: none;
}

.footer-social:hover {
  background: var(--color-yellow);
  color: var(--color-icon-fg-hover, var(--color-purple));
  transform: translateY(-3px);
  border-color: transparent;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.footer-links-column h4 {
  font-size: 16px;
  font-weight: 800;
  color: var(--color-accent-heading);
  letter-spacing: -0.03em;
  margin: 0 0 20px;
  text-transform: lowercase;
}

.footer-links-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.footer-links-column li {
  margin: 0;
}

.footer-links-column a {
  color: var(--color-footer-text-muted, var(--color-text-muted));
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
  letter-spacing: -0.01em;
}

.footer-links-column a:hover {
  color: var(--color-accent-link);
  transform: translateX(4px);
  display: inline-block;
}

.footer-address {
  color: var(--color-footer-text-muted, var(--color-text-muted));
  font-size: 14px;
  line-height: 1.4;
  font-style: normal;
}

.footer-partners {
  padding: 40px 0;
  border-top: 1px solid var(--color-footer-border, var(--color-border));
  border-bottom: 1px solid var(--color-footer-border, var(--color-border));
  margin-bottom: 40px;
}

.footer-partners__row {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.footer-partners__row:last-child {
  margin-bottom: 0;
}

.footer-partners__label {
  min-width: 200px;
  font-size: 13px;
  font-weight: 700;
  color: var(--color-footer-label);
  letter-spacing: -0.02em;
  text-transform: uppercase;
}

.footer-partners__logos {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
}

.footer-partners__logos--multi {
  gap: 24px;
}

.footer-partner-placeholder {
  transition: all 0.2s ease;
}

.footer-partner-placeholder :deep(rect) {
  fill: var(--color-partner-box-fill);
  stroke: var(--color-partner-box-stroke);
}

.footer-partner-placeholder :deep(text) {
  fill: var(--color-partner-box-text);
}

.footer-partner-placeholder:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 12px;
  color: var(--color-footer-bottom, var(--color-text-muted));
}

.footer-copyright {
  letter-spacing: -0.01em;
}

.footer-legal {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.footer-legal a {
  color: var(--color-footer-bottom, var(--color-text-muted));
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-legal a:hover {
  color: var(--color-accent-link);
}

.footer-legal-separator {
  color: var(--color-footer-separator, rgba(30, 23, 57, 0.25));
}

.footer-made {
  letter-spacing: -0.01em;
}

.footer-heart {
  color: var(--color-accent-link, var(--color-yellow));
  display: inline-block;
  animation: heartBeat 1.5s ease-in-out infinite;
}

@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Адаптивность */
@media (max-width: 1100px) {
  .footer-container {
    padding: 50px 32px 40px;
  }

  .footer-main {
    grid-template-columns: 260px 1fr;
    gap: 40px;
  }

  .footer-logo {
    width: 200px;
  }
}

@media (max-width: 900px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer-brand {
    align-items: center;
    text-align: center;
  }

  .footer-socials {
    justify-content: center;
  }

  .footer-partners__row {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .footer-partners__label {
    min-width: auto;
  }
}

@media (max-width: 680px) {
  .footer-container {
    padding: 40px 20px 32px;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 32px;
    text-align: center;
  }

  .footer-links-column ul {
    align-items: center;
  }

  .footer-links-column a:hover {
    transform: translateX(0) translateY(-2px);
  }

  .footer-partners__logos {
    justify-content: center;
  }

  .footer-partners__logos--multi {
    flex-direction: column;
    align-items: center;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .footer-legal {
    justify-content: center;
  }

  .footer-pixels {
    opacity: 0.15;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 32px 16px 28px;
  }

  .footer-logo {
    width: 160px;
  }
}

@media (max-width: 360px) {
  .footer-container {
    padding: 28px 12px 24px;
  }

  .footer-logo {
    width: 140px;
  }

  .footer-bottom {
    font-size: 11px;
    gap: 12px;
  }

  .footer-legal {
    flex-direction: column;
    gap: 8px;
  }

  .footer-legal-separator {
    display: none;
  }

  .footer-made {
    max-width: 260px;
    line-height: 1.35;
  }
}
</style>