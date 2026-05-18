/**
 * Контракт для Django API (ожидаемый бэкенд):
 * POST {baseUrl}/api/registrations/
 * Content-Type: application/json
 *
 * Тело запроса (snake_case):
 * {
 *   first_name, last_name, patronymic?, company, phone, email,
 *   info_consent, personal_data_consent
 * }
 *
 * Успех: 201 + { id, ... } или 200
 * Ошибка: 4xx/5xx + { detail?: string, errors?: Record<string, string[]> }
 */

const DEFAULT_PATH = '/api/registrations/'

function getApiBaseUrl() {
  const base = import.meta.env.VITE_API_BASE_URL ?? ''
  return base.replace(/\/$/, '')
}

/**
 * @typedef {Object} RegistrationFormData
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} [patronymic]
 * @property {string} company
 * @property {string} phone
 * @property {string} email
 * @property {boolean} infoConsent
 * @property {boolean} personalDataConsent
 */

/**
 * @typedef {Object} RegistrationPayload
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} patronymic
 * @property {string} company
 * @property {string} phone
 * @property {string} email
 * @property {boolean} info_consent
 * @property {boolean} personal_data_consent
 */

/**
 * @param {RegistrationFormData} form
 * @returns {{ valid: boolean, message?: string }}
 */
export function validateRegistrationForm(form) {
  const required = [
    ['firstName', 'Имя'],
    ['lastName', 'Фамилия'],
    ['company', 'Компания / учебное заведение'],
    ['phone', 'Номер телефона'],
    ['email', 'Электронная почта'],
  ]

  for (const [key, label] of required) {
    if (!String(form[key] ?? '').trim()) {
      return { valid: false, message: `Заполните поле «${label}»` }
    }
  }

  if (!form.infoConsent || !form.personalDataConsent) {
    return { valid: false, message: 'Нужно дать согласие на обработку данных' }
  }

  const email = String(form.email).trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, message: 'Укажите корректный адрес электронной почты' }
  }

  return { valid: true }
}

/**
 * @param {RegistrationFormData} form
 * @returns {RegistrationPayload}
 */
export function toRegistrationPayload(form) {
  return {
    first_name: form.firstName.trim(),
    last_name: form.lastName.trim(),
    patronymic: String(form.patronymic ?? '').trim(),
    company: form.company.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    info_consent: Boolean(form.infoConsent),
    personal_data_consent: Boolean(form.personalDataConsent),
  }
}

/**
 * @param {unknown} body
 * @returns {string}
 */
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

  const firstKey = Object.keys(body)[0]
  const firstVal = firstKey ? body[firstKey] : null
  if (Array.isArray(firstVal) && firstVal[0]) {
    return String(firstVal[0])
  }

  return 'Не удалось отправить заявку. Попробуйте позже.'
}

/**
 * Отправка заявки на регистрацию на бэкенд.
 *
 * @param {RegistrationFormData} form
 * @param {{ signal?: AbortSignal }} [options]
 * @returns {Promise<{ ok: true, data: unknown } | { ok: false, message: string }>}
 */
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
