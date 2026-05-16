import { computed, ref } from 'vue'

const STORAGE_KEY = 'volna-theme'

export const theme = ref('dark')

export function getStoredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function applyTheme(value) {
  document.documentElement.setAttribute('data-theme', value)
}

export function initTheme() {
  theme.value = getStoredTheme()
  applyTheme(theme.value)
}

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')
  const isLight = computed(() => theme.value === 'light')

  const setTheme = (value) => {
    if (value !== 'light' && value !== 'dark') {
      return
    }

    theme.value = value
    localStorage.setItem(STORAGE_KEY, value)
    applyTheme(value)
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return {
    theme,
    isDark,
    isLight,
    setTheme,
    toggleTheme,
  }
}
