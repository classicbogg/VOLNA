<template>
  <header class="header">
    <div class="header__glass" :class="{ 'header__glass--scrolled': isScrolled }">
      <div class="header__inner">
        <a class="header__logo" href="#">
          <img
            src="https://xn--80aakggo2ad0a1f.xn--p1ai/assets/img/header_logos.png"
            alt="Создай НАШЕ"
          />
        </a>

        <button class="header__burger" @click="toggleMenu" aria-label="Меню">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav class="header__nav" :class="{ 'header__nav--active': menuOpen }">
          <a href="#program" @click="closeMenu">В программе</a>
          <a href="#speakers" @click="closeMenu">Спикеры</a>
          <a href="#schedule" @click="closeMenu">Программа форума</a>
          <a href="#partners" @click="closeMenu">Партнеры</a>
          <a href="#contacts" @click="closeMenu">Как добраться</a>
        </nav>

        <div class="header__actions">
          <button
            class="header__theme"
            type="button"
            :aria-label="isDark ? 'Включить светлую тему' : 'Включить тёмную тему'"
            @click="toggleTheme"
          >
            <svg
              v-if="isDark"
              class="header__theme-icon"
              width="18"
              height="18"
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
              class="header__theme-icon"
              width="18"
              height="18"
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

          <div class="header__socials">
          <a class="header__social" href="#" aria-label="MAX">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" fill="currentColor"/>
            </svg>
          </a>
          <a class="header__social" href="#" aria-label="Telegram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-4l5-2-5-2v-4l9 5-9 7z" fill="currentColor"/>
            </svg>
          </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Пиксельные декорации -->
    <div class="header-pixels" aria-hidden="true">
      <div class="header-pixel header-pixel--1"></div>
      <div class="header-pixel header-pixel--2"></div>
      <div class="header-pixel header-pixel--3"></div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'

const { isDark, toggleTheme } = useTheme()

const isScrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  if (menuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  menuOpen.value = false
  document.body.style.overflow = ''
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.header {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding: 20px 24px 0;
  pointer-events: none;
}

.header__glass {
  max-width: 1400px;
  width: 100%;
  background: var(--color-glass);
  backdrop-filter: blur(12px);
  border-radius: 60px;
  border: 1px solid var(--color-glass-border);
  box-shadow:
    0 8px 32px var(--color-shadow),
    inset 0 1px 0 var(--color-glass-inset);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: auto;
}

.header__glass--scrolled {
  background: var(--color-glass-scrolled);
  backdrop-filter: blur(12px);
  border-color: var(--color-border-accent);
  box-shadow:
    0 8px 32px var(--color-shadow-strong),
    inset 0 1px 0 var(--color-glass-inset);
}

.header__inner {
  width: 100%;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  position: relative;
}

.header__logo {
  display: block;
  flex-shrink: 0;
  text-decoration: none;
  transition: all 0.2s ease;
}

.header__logo:hover {
  transform: scale(1.02);
  opacity: 0.9;
}

.header__logo img {
  display: block;
  width: 280px;
  height: auto;
  object-fit: contain;
  filter: var(--color-logo-filter);
  opacity: var(--color-logo-opacity, 0.92);
  transition:
    filter 0.35s ease,
    opacity 0.35s ease;
}

.header__burger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 100;
}

.header__burger span {
  width: 100%;
  height: 2px;
  background: var(--color-yellow);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.header__burger span:nth-child(2) {
  width: 70%;
  transform-origin: right;
}

.header__burger:hover span:nth-child(2) {
  width: 100%;
}

.header__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  flex: 1;
}

.header__nav a {
  position: relative;
  color: var(--color-nav-link);
  text-decoration: none;
  font-size: 15px;
  line-height: 1.4;
  font-weight: 700;
  white-space: nowrap;
  letter-spacing: -0.01em;
  padding: 8px 0;
  transition: color 0.2s ease;
  text-transform: lowercase;
}

.header__nav a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--color-yellow);
  transition: all 0.3s ease;
  transform: translateX(-50%);
  border-radius: 2px;
}

.header__nav a:hover {
  color: var(--color-accent-link, var(--color-yellow));
}

.header__nav a:hover::after {
  width: 70%;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.header__theme {
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid var(--color-icon-border);
  border-radius: 50%;
  background: var(--color-icon-bg);
  color: var(--color-icon-fg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    border-color 0.2s ease;
}

.header__theme:hover {
  background: var(--color-yellow);
  color: var(--color-icon-fg-hover, var(--color-purple));
  transform: translateY(-2px);
  border-color: transparent;
}

.header__theme-icon {
  display: block;
}

.header__socials {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header__social {
  width: 36px;
  height: 36px;
  background: var(--color-icon-bg);
  backdrop-filter: blur(4px);
  border-radius: 50%;
  color: var(--color-icon-fg);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid var(--color-icon-border);
}

.header__social:hover {
  background: var(--color-yellow);
  color: var(--color-icon-fg-hover, var(--color-purple));
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--color-accent-rgb), 0.3);
  border-color: transparent;
}

/* Пиксельные декорации */
.header-pixels {
  position: absolute;
  bottom: -15px;
  left: 0;
  right: 0;
  z-index: 1001;
  pointer-events: none;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.header-pixel {
  width: 4px;
  height: 4px;
  background: var(--color-yellow);
  opacity: 0.6;
  box-shadow:
    4px 0 0 var(--color-yellow),
    8px 0 0 rgba(var(--color-accent-rgb), 0.8),
    12px 0 0 rgba(var(--color-accent-rgb), 0.4),
    0 4px 0 var(--color-yellow),
    4px 4px 0 var(--color-yellow),
    8px 4px 0 rgba(var(--color-accent-rgb), 0.7),
    0 8px 0 rgba(var(--color-accent-rgb), 0.5),
    4px 8px 0 rgba(var(--color-accent-rgb), 0.3);
  animation: pixelFloat 2s ease-in-out infinite;
}

.header-pixel--1 {
  animation-delay: 0s;
  transform: translateX(-20px);
}

.header-pixel--2 {
  animation-delay: 0.5s;
  transform: translateX(0);
}

.header-pixel--3 {
  animation-delay: 1s;
  transform: translateX(20px);
}

@keyframes pixelFloat {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-8px);
    opacity: 1;
  }
}

/* Анимация появления */
.header__glass {
  animation: slideDownFade 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideDownFade {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Адаптивность */
@media (max-width: 1280px) {
  .header {
    padding: 16px 20px 0;
  }
  
  .header__glass {
    border-radius: 50px;
  }
  
  .header__inner {
    padding: 6px 20px;
  }
  
  .header__logo img {
    width: 240px;
  }
  
  .header__nav {
    gap: 20px;
  }
  
  .header__nav a {
    font-size: 14px;
  }
}

@media (max-width: 1024px) {
  .header__glass {
    border-radius: 40px;
  }
  
  .header__burger {
    display: flex;
  }
  
  .header__nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 80%;
    max-width: 360px;
    height: 100vh;
    background: var(--color-mobile-nav-bg);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    gap: 32px;
    transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 99;
    border-left: 1px solid var(--color-glass-border);
  }
  
  .header__nav--active {
    right: 0;
  }
  
  .header__nav a {
    font-size: 18px;
    white-space: normal;
    text-align: center;
  }
  
  .header__nav a::after {
    display: none;
  }
  
  .header-pixels {
    display: none;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 12px 16px 0;
  }
  
  .header__glass {
    border-radius: 35px;
  }
  
  .header__inner {
    padding: 4px 16px;
    gap: 20px;
  }
  
  .header__logo img {
    width: 180px;
  }
  
  .header__social {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
  }
  
  .header__social svg {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 560px) {
  .header {
    padding: 10px 12px 0;
  }
  
  .header__glass {
    border-radius: 30px;
  }
  
  .header__inner {
    padding: 3px 12px;
  }
  
  .header__logo img {
    width: 150px;
  }
  
  .header__actions {
    gap: 6px;
  }

  .header__theme {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
  }

  .header__theme-icon {
    width: 14px;
    height: 14px;
  }

  .header__socials {
    gap: 6px;
  }
  
  .header__social {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
  }
}

@media (max-width: 480px) {
  .header__logo img {
    width: 130px;
  }
}

@media (max-width: 360px) {
  .header {
    padding: 8px 10px 0;
  }

  .header__glass {
    border-radius: 24px;
  }

  .header__logo img {
    width: 112px;
  }

  .header__theme,
  .header__social {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
  }

  .header__burger {
    width: 32px;
    min-height: 36px;
  }
}
</style>