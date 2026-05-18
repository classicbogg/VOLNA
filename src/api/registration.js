const DEFAULT_PATH = '/api/registrations/'

const FIELD_LIMITS = {
  firstName: 80,
  lastName: 80,
  patronymic: 80,
  company: 180,
  phone: 32,
  email: 254,
}

function getApiBaseUrl() {
  const base = import.meta.env.VITE_API_BASE_URL ?? ''
  return base.replace(/\/$/, '')
}

function normalizeText(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function hasControlChars(value) {
  return /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value)
}

function hasHtml(value) {
  return /<[^>]*>/.test(value)
}

function validateSafeText(value, label) {
  if (hasControlChars(value) || hasHtml(value)) {
    return { valid: false, message: `Поле «${label}» содержит недопустимые символы` }
  }

  return { valid: true }
}

export function validateRegistrationForm(form) {
  const required = [
    ['firstName', 'Имя'],
    ['lastName', 'Фамилия'],
    ['company', 'Компания / учебное заведение'],
    ['phone', 'Номер телефона'],
    ['email', 'Электронная почта'],
  ]

  for (const [key, label] of required) {
    if (!normalizeText(form[key])) {
      return { valid: false, message: `Заполните поле «${label}»` }
    }
  }

  const lengthChecks = [
    ['firstName', 'Имя'],
    ['lastName', 'Фамилия'],
    ['patronymic', 'Отчество'],
    ['company', 'Компания / учебное заведение'],
    ['phone', 'Номер телефона'],
    ['email', 'Электронная почта'],
  ]

  for (const [key, label] of lengthChecks) {
    const value = normalizeText(form[key])
    if (value.length > FIELD_LIMITS[key]) {
      return { valid: false, message: `Поле «${label}» слишком длинное` }
    }

    const safe = validateSafeText(value, label)
    if (!safe.valid) return safe
  }

  if (!form.infoConsent || !form.personalDataConsent) {
    return { valid: false, message: 'Нужно дать согласие на обработку данных' }
  }

  const email = normalizeText(form.email)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, message: 'Укажите корректный адрес электронной почты' }
  }

  const phone = normalizeText(form.phone)
  if (!/^\+?[0-9\s()\-]{7,32}$/.test(phone)) {
    return { valid: false, message: 'Укажите корректный номер телефона' }
  }

  return { valid: true }
}

export function toRegistrationPayload(form) {
  return {
    first_name: normalizeText(form.firstName),
    last_name: normalizeText(form.lastName),
    patronymic: normalizeText(form.patronymic),
    company: normalizeText(form.company),
    phone: normalizeText(form.phone),
    email: normalizeText(form.email).toLowerCase(),
    info_consent: Boolean(form.infoConsent),
    personal_data_consent: Boolean(form.personalDataConsent),
  }
}

function parseApiError(body) {
  if (!body || typeof body !== 'object') {
    return 'Не удалось отправить заявку. Попробуйте позже.'
  }

  if (typeof body.detail === 'string') {
    return body.detail
  }

  if (Array.isArray(body.detail)) {
    return body.detail.map((item) => item?.msg ?? item).filter(Boolean).join(' ') || 'Ошибка валидации'
  }

  if (body.errors && typeof body.errors === 'object') {
    const parts = []
    for (const messages of Object.values(body.errors)) {
      if (Array.isArray(messages)) {
        parts.push(...messages.map(String))
      } else if (messages) {
        parts.push(String(messages))
      }
    }
    if (parts.length) return parts.join(' ')
  }

  for (const value of Object.values(body)) {
    if (Array.isArray(value) && value[0]) return String(value[0])
    if (typeof value === 'string') return value
  }

  return 'Не удалось отправить заявку. Попробуйте позже.'
}

export async function submitRegistration(form, options = {}) {
  const validation = validateRegistrationForm(form)
  if (!validation.valid) {
    return { ok: false, message: validation.message }
  }

  const baseUrl = getApiBaseUrl()
  const url = baseUrl ? `${baseUrl}${DEFAULT_PATH}` : DEFAULT_PATH

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toRegistrationPayload(form)),
      signal: options.signal,
    })

    let data = null
    const contentType = response.headers.get('content-type') ?? ''
    if (contentType.includes('application/json')) {
      data = await response.json().catch(() => null)
    }

    if (!response.ok) {
      return { ok: false, message: parseApiError(data) }
    }

    return { ok: true, data }
  } catch (error) {
    if (error?.name === 'AbortError') {
      return { ok: false, message: 'Отправка отменена' }
    }

    return {
      ok: false,
      message: 'Сервер недоступен. Проверьте подключение и попробуйте снова.',
    }
  }
}
