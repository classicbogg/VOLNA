<template>
  <header class="site-header" :class="{ 'site-header--scrolled': isScrolled }">
    <div class="site-header__shell">
      <div class="site-header__info-tab" aria-label="Информация о форуме">
        <span>создай наше</span>
        <span>27 мая 2026</span>
        <span>москва</span>
      </div>

      <div class="site-header__body">
        <a class="site-header__logo" href="#" aria-label="Создай НАШЕ" @click="closeMenu">
          <img
            src="https://xn--80aakggo2ad0a1f.xn--p1ai/assets/img/header_logos.png"
            alt="Создай НАШЕ"
          />
        </a>

        <nav class="site-header__nav" aria-label="Главная навигация">
          <a href="#program" @click="closeMenu">В программе</a>
          <a href="#speakers" @click="closeMenu">Спикеры</a>
          <a href="#schedule" @click="closeMenu">Программа форума</a>
          <a href="#partners" @click="closeMenu">Партнеры</a>
          <a href="#contacts" @click="closeMenu">Как добраться</a>
        </nav>

        <div class="site-header__right">
          <button
            class="site-header__theme"
            type="button"
            :aria-label="isDark ? 'Включить светлую тему' : 'Включить тёмную тему'"
            @click="toggleTheme"
          >
            <svg
              v-if="isDark"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path
                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>

            <svg
              v-else
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M21 14.5A8.5 8.5 0 0 1 9.5 3 6.5 6.5 0 1 0 21 14.5Z"
                fill="currentColor"
              />
            </svg>
          </button>

          <div class="site-header__socials">
            <a class="site-header__social" href="#" aria-label="MAX">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <a class="site-header__social" href="#" aria-label="Telegram">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-4l5-2-5-2v-4l9 5-9 7z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>

          <button
            class="site-header__burger"
            :class="{ 'site-header__burger--active': menuOpen }"
            type="button"
            aria-label="Открыть меню"
            :aria-expanded="menuOpen"
            @click="toggleMenu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>

    <div
      class="site-header__mobile"
      :class="{ 'site-header__mobile--active': menuOpen }"
      @click.self="closeMenu"
    >
      <div class="site-header__mobile-panel">
        <div class="site-header__mobile-head">
          <span>меню</span>

          <button type="button" aria-label="Закрыть меню" @click="closeMenu">
            закрыть
          </button>
        </div>

        <nav class="site-header__mobile-nav" aria-label="Мобильная навигация">
          <a href="#program" @click="closeMenu">В программе</a>
          <a href="#speakers" @click="closeMenu">Спикеры</a>
          <a href="#schedule" @click="closeMenu">Программа форума</a>
          <a href="#partners" @click="closeMenu">Партнеры</a>
          <a href="#contacts" @click="closeMenu">Как добраться</a>
        </nav>

        <div class="site-header__mobile-bottom">
          <span>27 мая 2026</span>
          <span>ЦДП, Москва</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useTheme } from '../composables/useTheme'

const { isDark, toggleTheme } = useTheme()

const isScrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

const setBodyLock = (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  setBodyLock(menuOpen.value)
}

const closeMenu = () => {
  menuOpen.value = false
  setBodyLock(false)
}

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

const handleResize = () => {
  if (window.innerWidth > 1180) {
    closeMenu()
  }
}

onMounted(() => {
  handleScroll()

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleEscape)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleEscape)
  window.removeEventListener('resize', handleResize)
  setBodyLock(false)
})
</script>

<style scoped>
.site-header {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.site-header__shell {
  width: calc(100% - 48px);
  max-width: 1600px;
  margin: 18px auto 0;
  pointer-events: auto;
  transition:
    margin 0.25s ease,
    transform 0.25s ease,
    filter 0.25s ease;
}

.site-header--scrolled .site-header__shell {
  margin-top: 10px;
  transform: translateY(-4px);
  filter: drop-shadow(0 16px 32px var(--color-header-shadow-strong));
}

.site-header__info-tab {
  position: relative;
  z-index: 3;
  width: fit-content;
  max-width: 100%;
  margin: 0 0 -2px 32px;
  padding: 12px 22px 11px;
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--color-header-accent);
  color: var(--color-header-purple);
  border: 2px solid var(--color-header-accent);
  border-radius: 20px 20px 0 0;
  box-shadow:
    8px 8px 0 rgba(var(--color-header-accent-rgb), 0.14),
    0 12px 28px rgba(var(--color-header-accent-rgb), 0.12);
  transform: rotate(-1deg);
  pointer-events: auto;
}

.site-header__info-tab span {
  position: relative;
  font-size: 15px;
  line-height: 1;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  white-space: nowrap;
}

.site-header__info-tab span:not(:last-child)::after {
  content: '•';
  margin-left: 14px;
}

.site-header__body {
  position: relative;
  width: 100%;
  min-height: 106px;
  margin: 0;
  padding: 18px 20px 18px 30px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 28px;
  color: var(--color-header-text);
  background:
    radial-gradient(circle at 0% 0%, rgba(var(--color-header-accent-rgb), 0.18), transparent 34%),
    linear-gradient(135deg, var(--color-header-bg), var(--color-header-bg-2));
  border: 2px solid var(--color-header-border);
  border-radius: 0 34px 34px 34px;
  box-shadow:
    8px 8px 0 rgba(var(--color-header-accent-rgb), 0.16),
    0 20px 46px var(--color-header-shadow);
  backdrop-filter: blur(14px);
  overflow: hidden;
  pointer-events: auto;
  transition:
    min-height 0.25s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.25s ease;
}

.site-header__body::after {
  content: '';
  position: absolute;
  right: 22px;
  top: 18px;
  width: 9px;
  height: 9px;
  background: var(--color-header-accent);
  box-shadow:
    -15px 0 0 rgba(var(--color-header-accent-rgb), 0.82),
    -30px 0 0 rgba(var(--color-header-accent-rgb), 0.48),
    0 15px 0 rgba(var(--color-header-accent-rgb), 0.58),
    -15px 15px 0 rgba(var(--color-header-accent-rgb), 0.36);
  opacity: 0.9;
  pointer-events: none;
}

.site-header--scrolled .site-header__body {
  min-height: 90px;
  box-shadow:
    6px 6px 0 rgba(var(--color-header-accent-rgb), 0.13),
    0 16px 36px var(--color-header-shadow-strong);
}

.site-header__logo,
.site-header__nav,
.site-header__right {
  position: relative;
  z-index: 2;
}

.site-header__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 430px;
  min-width: 430px;
  padding: 18px 24px;
  border-radius: 24px;
  background:
    linear-gradient(135deg, rgba(11, 8, 20, 0.96), rgba(30, 23, 57, 0.98));
  border: 1px solid rgba(var(--color-header-accent-rgb), 0.34);
  text-decoration: none;
  overflow: hidden;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 14px 28px rgba(0, 0, 0, 0.18);
  transition:
    transform 0.2s ease,
    border-color 0.3s ease,
    box-shadow 0.2s ease;
}

.site-header__logo::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(120deg, transparent 0%, rgba(var(--color-header-accent-rgb), 0.14) 45%, transparent 70%);
  transform: translateX(-120%);
  transition: transform 0.55s ease;
}

.site-header__logo:hover::before {
  transform: translateX(120%);
}

.site-header__logo img {
  position: relative;
  z-index: 2;
  display: block;
  width: 100%;
  min-width: 100%;
  height: auto;
  object-fit: contain;
  filter: var(--color-logo-filter);
  opacity: var(--color-logo-opacity, 1);
}

.site-header__logo:hover {
  transform: translateY(-3px);
  border-color: var(--color-header-accent);
  box-shadow:
    0 0 0 1px rgba(var(--color-header-accent-rgb), 0.16),
    0 16px 30px rgba(0, 0, 0, 0.24);
}

.site-header__nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  min-width: 0;
}

.site-header__nav a {
  position: relative;
  min-height: 54px;
  padding: 0 18px;
  border: 1px solid var(--color-header-border-soft);
  border-radius: 17px;
  background: var(--color-header-card);
  color: var(--color-header-text);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  text-decoration: none;
  font-size: 16px;
  line-height: 1;
  font-weight: 900;
  text-transform: lowercase;
  letter-spacing: -0.04em;
  white-space: nowrap;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.site-header__nav a::before {
  content: '';
  position: absolute;
  inset: auto 0 0;
  z-index: -1;
  height: 0;
  background: var(--color-header-accent);
  transition: height 0.22s ease;
}

.site-header__nav a:hover {
  color: var(--color-header-purple);
  border-color: var(--color-header-accent);
  transform: translateY(-3px);
  box-shadow: 0 12px 20px rgba(var(--color-header-accent-rgb), 0.12);
}

.site-header__nav a:hover::before {
  height: 100%;
}

.site-header__right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.site-header__theme,
.site-header__social,
.site-header__burger {
  flex-shrink: 0;
  color: var(--color-header-purple);
  border: 1px solid rgba(var(--color-header-accent-rgb), 0.54);
  background: var(--color-header-accent);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    0 10px 18px rgba(var(--color-header-accent-rgb), 0.12);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.site-header__theme {
  width: 54px;
  height: 54px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  cursor: pointer;
}

.site-header__theme:hover,
.site-header__social:hover {
  transform: translateY(-4px) rotate(-3deg);
  background: var(--color-header-white);
  color: var(--color-header-purple);
  border-color: var(--color-header-accent);
  box-shadow:
    5px 5px 0 rgba(var(--color-header-accent-rgb), 0.22),
    0 14px 24px rgba(0, 0, 0, 0.18);
}

.site-header__socials {
  display: flex;
  align-items: center;
  gap: 8px;
}

.site-header__social {
  width: 54px;
  height: 54px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 18px;
}

.site-header__burger {
  display: none;
  position: relative;
  width: 56px;
  height: 54px;
  padding: 0;
  border-radius: 18px;
  cursor: pointer;
}

.site-header__burger span {
  position: absolute;
  left: 14px;
  width: 26px;
  height: 2px;
  background: var(--color-header-purple);
  transition:
    transform 0.24s ease,
    opacity 0.2s ease,
    top 0.24s ease,
    width 0.24s ease;
}

.site-header__burger span:nth-child(1) {
  top: 17px;
}

.site-header__burger span:nth-child(2) {
  top: 26px;
  width: 20px;
}

.site-header__burger span:nth-child(3) {
  top: 35px;
}

.site-header__burger--active span:nth-child(1) {
  top: 26px;
  transform: rotate(45deg);
}

.site-header__burger--active span:nth-child(2) {
  opacity: 0;
  width: 0;
}

.site-header__burger--active span:nth-child(3) {
  top: 26px;
  transform: rotate(-45deg);
}

.site-header__mobile {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(11, 8, 20, 0);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity 0.25s ease,
    visibility 0.25s ease,
    background-color 0.25s ease;
}

.site-header__mobile--active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  background: var(--color-header-overlay);
}

.site-header__mobile-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: min(460px, 90vw);
  height: 100%;
  padding: 30px 24px;
  background:
    radial-gradient(circle at 0% 0%, rgba(var(--color-header-accent-rgb), 0.14), transparent 34%),
    var(--color-header-mobile-bg);
  color: var(--color-header-text);
  border-left: 2px solid var(--color-header-accent);
  box-shadow: -12px 0 0 rgba(var(--color-header-accent-rgb), 0.12);
  transform: translateX(110%);
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;
}

.site-header__mobile--active .site-header__mobile-panel {
  transform: translateX(0);
}

.site-header__mobile-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(var(--color-header-accent-rgb), 0.28);
}

.site-header__mobile-head span {
  color: var(--color-header-accent);
  font-size: 42px;
  line-height: 0.9;
  font-weight: 900;
  text-transform: lowercase;
  letter-spacing: -0.08em;
}

.site-header__mobile-head button {
  min-height: 40px;
  padding: 0 16px;
  border: 1px solid rgba(var(--color-header-accent-rgb), 0.55);
  border-radius: 999px;
  background: transparent;
  color: var(--color-header-text);
  font-size: 14px;
  line-height: 1;
  font-weight: 900;
  text-transform: lowercase;
  cursor: pointer;
}

.site-header__mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 32px 0;
}

.site-header__mobile-nav a {
  position: relative;
  padding: 20px 52px 19px 18px;
  background: var(--color-header-mobile-card);
  border: 1px solid rgba(var(--color-header-accent-rgb), 0.24);
  border-radius: 20px;
  color: var(--color-header-text);
  text-decoration: none;
  font-size: clamp(27px, 7vw, 42px);
  line-height: 0.92;
  font-weight: 900;
  text-transform: lowercase;
  letter-spacing: -0.075em;
  overflow: hidden;
  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease,
    border-color 0.2s ease;
}

.site-header__mobile-nav a::after {
  content: '→';
  position: absolute;
  right: 18px;
  top: 50%;
  color: var(--color-header-accent);
  transform: translateY(-50%);
}

.site-header__mobile-nav a:hover {
  background: var(--color-header-accent);
  color: var(--color-header-purple);
  border-color: var(--color-header-accent);
  transform: translateX(4px);
}

.site-header__mobile-nav a:hover::after {
  color: var(--color-header-purple);
}

.site-header__mobile-bottom {
  margin-top: auto;
  padding-top: 22px;
  border-top: 1px solid rgba(var(--color-header-accent-rgb), 0.28);
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--color-header-muted);
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.site-header__mobile-bottom span:first-child {
  color: var(--color-header-accent);
  font-size: 24px;
  font-weight: 900;
}

@media (max-width: 1500px) {
  .site-header__shell {
    width: calc(100% - 36px);
  }

  .site-header__body {
    gap: 18px;
    padding-left: 24px;
  }

  .site-header__logo {
    width: 370px;
    min-width: 370px;
    padding: 16px 21px;
  }

  .site-header__nav {
    gap: 6px;
  }

  .site-header__nav a {
    min-height: 50px;
    padding: 0 13px;
    font-size: 14px;
  }

  .site-header__theme,
  .site-header__social {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 1320px) {
  .site-header__logo {
    width: 330px;
    min-width: 330px;
  }

  .site-header__nav a {
    padding: 0 11px;
    font-size: 13px;
  }
}

@media (max-width: 1180px) {
  .site-header__body {
    grid-template-columns: auto auto;
    justify-content: space-between;
  }

  .site-header__nav {
    display: none;
  }

  .site-header__burger {
    display: block;
  }

  .site-header__logo {
    width: 360px;
    min-width: 0;
  }
}

@media (max-width: 720px) {
  .site-header__shell {
    width: calc(100% - 24px);
    margin-top: 10px;
  }

  .site-header__info-tab {
    margin-left: 14px;
    padding: 9px 14px 8px;
    gap: 10px;
    border-radius: 14px 14px 0 0;
  }

  .site-header__info-tab span {
    font-size: 11px;
  }

  .site-header__info-tab span:not(:last-child)::after {
    margin-left: 10px;
  }

  .site-header__info-tab span:nth-child(3) {
    display: none;
  }

  .site-header__body {
    min-height: 78px;
    padding: 12px 12px 12px 16px;
    border-radius: 0 24px 24px 24px;
    box-shadow:
      5px 5px 0 rgba(var(--color-header-accent-rgb), 0.15),
      0 14px 28px var(--color-header-shadow);
  }

  .site-header--scrolled .site-header__shell {
    margin-top: 8px;
    transform: translateY(0);
  }

  .site-header--scrolled .site-header__body {
    min-height: 72px;
  }

  .site-header__body::after {
    display: none;
  }

  .site-header__logo {
    width: 235px;
    min-width: 0;
    padding: 12px 14px;
    border-radius: 17px;
  }

  .site-header__socials {
    display: none;
  }

  .site-header__theme {
    width: 50px;
    height: 46px;
    border-radius: 15px;
  }

  .site-header__burger {
    width: 50px;
    height: 46px;
    border-radius: 15px;
  }

  .site-header__burger span:nth-child(1) {
    top: 14px;
  }

  .site-header__burger span:nth-child(2) {
    top: 22px;
  }

  .site-header__burger span:nth-child(3) {
    top: 30px;
  }

  .site-header__burger--active span:nth-child(1),
  .site-header__burger--active span:nth-child(3) {
    top: 22px;
  }
}

@media (max-width: 480px) {
  .site-header__info-tab {
    margin-left: 10px;
    padding: 7px 11px 6px;
  }

  .site-header__info-tab span {
    font-size: 10px;
  }

  .site-header__logo {
    width: 190px;
  }

  .site-header__theme {
    width: 44px;
  }

  .site-header__burger {
    width: 44px;
  }

  .site-header__mobile-panel {
    width: 92vw;
    padding: 22px 16px 24px;
  }

  .site-header__mobile-head span {
    font-size: 36px;
  }

  .site-header__mobile-nav a {
    padding: 17px 48px 16px 16px;
  }
}

@media (max-width: 390px) {
  .site-header__logo {
    width: 168px;
  }

  .site-header__theme,
  .site-header__burger {
    width: 42px;
    height: 42px;
  }
}
</style>
