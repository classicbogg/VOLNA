import { computed, ref, watch } from 'vue'
import { useTheme } from './useTheme.js'

const LOGO_BY_THEME = {
  full: {
    light: ['/volna-logo-color.svg', '/volna-logo.png'],
    dark: ['/volna-logo-white.svg', '/volna-logo.png'],
  },
  hero: {
    light: ['/volna-logo-color-hero.svg', '/volna-logo-color.svg', '/volna-logo.png'],
    dark: ['/volna-logo-white-hero.svg', '/volna-logo-white.svg', '/volna-logo.png'],
  },
  footer: {
    light: ['/volna-logo-color-hero.svg', '/volna-logo-color.svg', '/volna-logo.png'],
    dark: ['/volna-logo-white-hero.svg', '/volna-logo-white.svg', '/volna-logo.png'],
  },
}

export function useVolnaLogo(options = {}) {
  const variantKey =
    options.variant === 'hero' ? 'hero' : options.variant === 'footer' ? 'footer' : 'full'
  const variant = variantKey
  const { isDark } = useTheme()
  const logoIndex = ref(0)

  const logoCandidates = computed(() =>
    isDark.value ? LOGO_BY_THEME[variant].dark : LOGO_BY_THEME[variant].light,
  )

  const logoSrc = computed(() => logoCandidates.value[logoIndex.value] ?? logoCandidates.value[0])

  const logoAlt = 'ВОЛНА — форум молодёжного предпринимательства'

  watch(isDark, () => {
    logoIndex.value = 0
  })

  const onLogoError = () => {
    if (logoIndex.value < logoCandidates.value.length - 1) {
      logoIndex.value += 1
    }
  }

  return {
    logoSrc,
    logoAlt,
    onLogoError,
  }
}
