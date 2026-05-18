<template>
  <header
    class="site-header"
    :class="{
      'site-header--scrolled': isScrolled,
      'site-header--menu-open': menuOpen,
    }"
  >
    <div ref="headerShellRef" class="site-header__wrap">
      <div class="site-header__cluster">
        <div class="site-header__bar">
        <a class="site-header__brand" href="#" :aria-label="logoAlt" @click="closeMenu">
          <img
            class="site-header__logo"
            :src="logoSrc"
            :alt="logoAlt"
            width="605"
            height="219"
            decoding="async"
            @error="onLogoError"
          />
          <img
            class="site-header__emblem"
            :src="sielomEmblemUrl"
            alt="Символ СиелоМ"
            width="120"
            height="120"
            decoding="async"
          />
        </a>

        <div class="site-header__end">
          <nav class="site-header__nav" aria-label="Главная навигация">
            <a href="#program" @click="closeMenu">В программе</a>
            <a href="#speakers" @click="closeMenu">Спикеры</a>
            <a href="#schedule" @click="closeMenu">Программа</a>
            <a href="#partners" @click="closeMenu">Партнёры</a>
            <a href="#contacts" @click="closeMenu">Как добраться</a>
          </nav>

          <div class="site-header__tools">
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

        <button
          class="site-header__theme site-header__theme--detached"
          type="button"
          :aria-label="isDark ? 'Включить светлую тему' : 'Включить тёмную тему'"
          @click="toggleTheme"
        >
          <ThemeIcon :is-dark="isDark" />
        </button>
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
          <button type="button" aria-label="Закрыть меню" @click="closeMenu">закрыть</button>
        </div>

        <nav class="site-header__mobile-nav" aria-label="Мобильная навигация">
          <a href="#program" @click="closeMenu">В программе</a>
          <a href="#speakers" @click="closeMenu">Спикеры</a>
          <a href="#schedule" @click="closeMenu">Программа форума</a>
          <a href="#partners" @click="closeMenu">Партнёры</a>
          <a href="#contacts" @click="closeMenu">Как добраться</a>
        </nav>

        <div class="site-header__mobile-bottom">
          <span>ЦДП, Москва</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { h, onMounted, onUnmounted, ref } from 'vue'
import { useTheme } from '../composables/useTheme'
import { useVolnaLogo } from '../composables/useVolnaLogo'
import sielomEmblemUrl from '../assets/sielom.svg'

const ThemeIcon = (props) => {
  if (props.isDark) {
    return h('svg', { width: 32, height: 32, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' }, [
      h('circle', { cx: 12, cy: 12, r: 4, fill: 'currentColor' }),
      h('path', {
        d: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41',
        stroke: 'currentColor',
        'stroke-width': 2,
        'stroke-linecap': 'round',
      }),
    ])
  }

  return h('svg', { width: 32, height: 32, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': 'true' }, [
    h('path', {
      d: 'M21 14.5A8.5 8.5 0 0 1 9.5 3 6.5 6.5 0 1 0 21 14.5Z',
      fill: 'currentColor',
    }),
  ])
}

const { isDark, toggleTheme } = useTheme()
const { logoSrc, logoAlt, onLogoError } = useVolnaLogo({ variant: 'hero' })

const SCROLL_THRESHOLD = 16

const isScrolled = ref(false)
const menuOpen = ref(false)
const headerShellRef = ref(null)

let headerResizeObserver = null

const updateHeaderOffset = () => {
  const shell = headerShellRef.value
  if (!shell) return

  const gap = window.innerWidth <= 720 ? 12 : 16
  const offset = Math.ceil(shell.getBoundingClientRect().bottom + gap)
  document.documentElement.style.setProperty('--site-header-offset', `${offset}px`)
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > SCROLL_THRESHOLD
  requestAnimationFrame(updateHeaderOffset)
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
  if (event.key === 'Escape') closeMenu()
}

const MOBILE_NAV_BREAKPOINT = 640

const handleResize = () => {
  if (window.innerWidth > MOBILE_NAV_BREAKPOINT) closeMenu()
  requestAnimationFrame(updateHeaderOffset)
}

onMounted(() => {
  handleScroll()

  if (headerShellRef.value) {
    headerResizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateHeaderOffset)
    })
    headerResizeObserver.observe(headerShellRef.value)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleEscape)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  headerResizeObserver?.disconnect()
  document.documentElement.style.removeProperty('--site-header-offset')
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

.site-header__wrap {
  width: 100%;
  max-width: 1720px;
  margin: 0 auto;
  padding: 12px clamp(14px, 2.8vw, 28px) 0;
  pointer-events: auto;
  transition: padding 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.site-header__cluster {
  display: flex;
  align-items: stretch;
  gap: clamp(8px, 1.1vw, 12px);
}

.site-header__bar {
  flex: 1;
  min-width: 0;
  min-height: 86px;
  padding: 0 clamp(16px, 2.8vw, 44px);
  display: flex;
  align-items: center;
  gap: clamp(10px, 1.8vw, 24px);
  background: var(--header-bar-solid);
  border: 1px solid rgba(var(--palette-navy-rgb), 0.06);
  border-radius: 0 0 0 24px;
  box-shadow: 0 8px 32px rgba(var(--palette-navy-rgb), 0.06);
  transition:
    background 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    backdrop-filter 0.35s ease;
}

.site-header--scrolled .site-header__bar {
  background: var(--header-glass-bg);
  border-color: var(--header-glass-border);
  box-shadow: var(--header-glass-shadow);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.site-header__brand {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: clamp(12px, 1.8vw, 20px);
  text-decoration: none;
  color: inherit;
}

.site-header__logo {
  display: block;
  width: auto;
  height: auto;
  max-height: clamp(42px, 5.8vw, 56px);
  max-width: min(210px, 36vw);
  object-fit: contain;
  object-position: left center;
  transition: max-height 0.35s ease;
}

.site-header--scrolled .site-header__logo {
  max-height: clamp(40px, 5.2vw, 48px);
}

.site-header__emblem {
  display: block;
  flex-shrink: 0;
  width: auto;
  height: clamp(48px, 5vw, 64px);
  max-width: min(64px, 12vw);
  object-fit: contain;
  object-position: center;
}

[data-theme='light'] .site-header__emblem {
  filter: brightness(0);
}

[data-theme='dark'] .site-header__emblem {
  filter: brightness(0) invert(1);
}

.site-header--scrolled .site-header__emblem {
  height: clamp(40px, 4.2vw, 50px);
}

.site-header__end {
  flex: 1;
  min-width: 0;
  margin-left: clamp(8px, 1.2vw, 16px);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(12px, 2vw, 28px);
}

.site-header__nav {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  gap: clamp(4px, 0.6vw, 10px);
  padding-inline: clamp(4px, 1vw, 16px);
}

.site-header__nav a {
  flex: 1 1 0;
  min-width: 0;
  text-align: center;
  color: var(--header-nav-link);
  text-decoration: none;
  font-size: clamp(14px, 1.15vw, 18px);
  line-height: 1.25;
  font-weight: 600;
  letter-spacing: -0.01em;
  white-space: nowrap;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.site-header__nav a:hover {
  color: var(--header-nav-link-hover);
}

.site-header__tools {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: clamp(8px, 1vw, 12px);
}

.site-header__theme {
  flex-shrink: 0;
  width: 86px;
  min-height: 86px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(var(--palette-navy-rgb), 0.06);
  border-radius: 0 0 24px 0;
  background: var(--header-bar-solid);
  box-shadow: 0 8px 32px rgba(var(--palette-navy-rgb), 0.06);
  color: var(--header-nav-link);
  cursor: pointer;
  transition:
    background 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease,
    backdrop-filter 0.35s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.site-header__theme:hover {
  color: var(--header-nav-link-hover);
}

.site-header--scrolled .site-header__theme--detached {
  background: var(--header-glass-bg);
  border-color: var(--header-glass-border);
  box-shadow: var(--header-glass-shadow);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.site-header__theme :deep(svg) {
  width: 32px;
  height: 32px;
}

.site-header__burger {
  display: none;
  position: relative;
  width: 56px;
  height: 56px;
  padding: 0;
  border: none;
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
}

.site-header__burger span {
  position: absolute;
  left: 50%;
  width: 26px;
  height: 2.5px;
  margin-left: -13px;
  border-radius: 999px;
  background: var(--header-nav-link);
  transition:
    transform 0.24s ease,
    opacity 0.2s ease,
    top 0.24s ease;
}

.site-header__burger span:nth-child(1) {
  top: 17px;
}

.site-header__burger span:nth-child(2) {
  top: 26.5px;
}

.site-header__burger span:nth-child(3) {
  top: 36px;
}

.site-header__burger--active span:nth-child(1) {
  top: 26.5px;
  transform: rotate(45deg);
}

.site-header__burger--active span:nth-child(2) {
  opacity: 0;
}

.site-header__burger--active span:nth-child(3) {
  top: 26.5px;
  transform: rotate(-45deg);
}

/* Mobile menu */
.site-header__mobile {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: transparent;
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
  background: var(--header-mobile-overlay);
  backdrop-filter: blur(4px);
}

.site-header__mobile-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: min(400px, 92vw);
  height: 100%;
  padding: 24px 20px;
  background: var(--header-mobile-panel);
  backdrop-filter: blur(16px);
  border-left: 1px solid var(--header-glass-border);
  transform: translateX(110%);
  transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
}

.site-header__mobile--active .site-header__mobile-panel {
  transform: translateX(0);
}

.site-header__mobile-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(var(--palette-purple-rgb), 0.2);
}

.site-header__mobile-head span {
  font-size: 28px;
  font-weight: 900;
  text-transform: lowercase;
  letter-spacing: -0.06em;
  color: var(--header-nav-link);
}

.site-header__mobile-head button {
  min-height: 36px;
  padding: 0 14px;
  border: 1px solid rgba(var(--palette-purple-rgb), 0.35);
  border-radius: 999px;
  background: transparent;
  color: var(--header-nav-link);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.site-header__mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 0;
}

.site-header__mobile-nav a {
  padding: 16px 18px;
  border-radius: 14px;
  background: rgba(var(--palette-purple-rgb), 0.08);
  color: var(--header-nav-link);
  text-decoration: none;
  font-size: clamp(22px, 5vw, 28px);
  font-weight: 800;
  text-transform: lowercase;
  letter-spacing: -0.04em;
  transition: background-color 0.2s ease;
}

.site-header__mobile-nav a:hover {
  background: rgba(var(--palette-purple-rgb), 0.16);
}

.site-header__mobile-bottom {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid rgba(var(--palette-purple-rgb), 0.2);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.site-header__mobile-bottom > span {
  font-size: 18px;
  font-weight: 800;
  color: var(--palette-peach);
}

@media (max-width: 1200px) {
  .site-header__bar {
    padding-inline: clamp(12px, 2vw, 28px);
    gap: 10px;
  }

  .site-header__nav a {
    font-size: clamp(13px, 1.05vw, 15px);
    font-weight: 600;
  }

  .site-header__logo {
    max-width: min(176px, 30vw);
    max-height: 46px;
  }
}

@media (max-width: 960px) {
  .site-header__nav {
    display: none;
  }

  .site-header__burger {
    display: block;
  }

  .site-header__end {
    flex: 0 0 auto;
    gap: 4px;
  }
}

@media (max-width: 640px) {
  .site-header__wrap {
    padding: 8px 10px 0;
    padding-top: max(8px, env(safe-area-inset-top, 0px));
  }

  .site-header__cluster {
    gap: 8px;
  }

  .site-header__bar {
    min-height: 72px;
    padding: 0 14px 0 16px;
    gap: 10px;
    border-radius: 0 0 0 18px;
  }

  .site-header__brand {
    min-width: 0;
    flex: 1 1 auto;
    gap: 8px;
  }

  .site-header__logo {
    max-width: min(128px, 36vw);
    max-height: 40px;
  }

  .site-header__emblem {
    height: 38px;
    max-width: 38px;
  }

  .site-header__theme {
    width: 64px;
    min-height: 64px;
    border-radius: 0 0 18px 0;
  }

  .site-header__theme :deep(svg) {
    width: 28px;
    height: 28px;
  }

  .site-header__burger {
    width: 52px;
    height: 52px;
  }

  .site-header__burger span {
    width: 24px;
    margin-left: -12px;
  }

  .site-header__burger span:nth-child(1) {
    top: 15px;
  }

  .site-header__burger span:nth-child(2) {
    top: 24.5px;
  }

  .site-header__burger span:nth-child(3) {
    top: 34px;
  }

  .site-header__burger--active span:nth-child(1),
  .site-header__burger--active span:nth-child(3) {
    top: 24.5px;
  }

  .site-header__mobile-panel {
    padding-bottom: max(24px, env(safe-area-inset-bottom, 0px));
  }

  .site-header__bar {
    min-height: 64px;
    padding-inline: 12px;
  }
}

@media (max-width: 380px) {
  .site-header__wrap {
    padding: 6px 8px 0;
    padding-top: max(6px, env(safe-area-inset-top, 0px));
  }

  .site-header__cluster {
    gap: 6px;
  }

  .site-header__bar {
    min-height: 56px;
    padding-inline: 10px;
    gap: 8px;
    border-radius: 0 0 0 16px;
  }

  .site-header__logo {
    max-width: min(108px, 34vw);
    max-height: 36px;
  }

  .site-header__emblem {
    height: 32px;
    max-width: 32px;
  }

  .site-header__theme {
    width: 56px;
    min-height: 56px;
    border-radius: 0 0 16px 0;
  }

  .site-header__theme :deep(svg) {
    width: 24px;
    height: 24px;
  }

  .site-header__burger {
    width: 48px;
    height: 48px;
  }

  .site-header__burger span:nth-child(1) {
    top: 14px;
  }

  .site-header__burger span:nth-child(2),
  .site-header__burger--active span:nth-child(1),
  .site-header__burger--active span:nth-child(3) {
    top: 22.5px;
  }

  .site-header__burger span:nth-child(3) {
    top: 31px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-header__bar,
  .site-header__theme,
  .site-header__wrap,
  .site-header__logo {
    transition-duration: 0.01ms;
  }
}
</style>
