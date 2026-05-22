/**
 * Контракт для Django API (ожидаемый бэкенд):
 * POST {baseUrl}/api/registrations/
 * Content-Type: application/json
 *
 * Тело запроса (snake_case):
 * {
 *   last_name, first_name, patronymic?,
 *   organization, study_or_position, phone, vk_url,
 *   forum_direction, forum_direction_label,
 *   info_consent, personal_data_consent
 * }
 */

import { getForumDirectionLabel } from '@/data/forumDirections.js'

const DEFAULT_PATH = '/api/registrations/'

function getApiBaseUrl() {
  const base = import.meta.env.VITE_API_BASE_URL ?? ''
  return base.replace(/\/$/, '')
}

/**
 * @typedef {Object} RegistrationFormData
 * @property {string} lastName
 * @property {string} firstName
 * @property {string} [patronymic]
 * @property {string} organization
 * @property {string} studyOrPosition
 * @property {string} phone
 * @property {string} vkUrl
 * @property {string} forumDirection
 * @property {boolean} infoConsent
 * @property {boolean} personalDataConsent
 */

/**
 * @param {RegistrationFormData} form
 * @returns {{ valid: boolean, message?: string }}
 */
export function validateRegistrationForm(form) {
  const required = [
    ['lastName', 'Фамилия'],
    ['firstName', 'Имя'],
    ['organization', 'Учебное заведение / организация'],
    ['studyOrPosition', 'Направления обучения / должность'],
    ['phone', 'Номер телефона'],
    ['vkUrl', 'Ссылка в ВК'],
    ['forumDirection', 'Направление форума'],
  ]

  for (const [key, label] of required) {
    if (!String(form[key] ?? '').trim()) {
      return { valid: false, message: `Заполните поле «${label}»` }
    }
  }

  if (!form.infoConsent || !form.personalDataConsent) {
    return { valid: false, message: 'Нужно дать согласие на обработку данных' }
  }

  const vk = String(form.vkUrl).trim()
  const vkOk = /(?:^https?:\/\/)?(?:www\.)?vk\.com\//i.test(vk)

  if (!vkOk) {
    return { valid: false, message: 'Укажите корректную ссылку на профиль ВКонтакте' }
  }

  if (!getForumDirectionLabel(form.forumDirection)) {
    return { valid: false, message: 'Выберите направление форума' }
  }

  return { valid: true }
}

/**
 * @param {RegistrationFormData} form
 */
export function toRegistrationPayload(form) {
  const forumDirection = form.forumDirection.trim()

  return {
    last_name: form.lastName.trim(),
    first_name: form.firstName.trim(),
    patronymic: String(form.patronymic ?? '').trim(),
    organization: form.organization.trim(),
    study_or_position: form.studyOrPosition.trim(),
    phone: form.phone.trim(),
    vk_url: form.vkUrl.trim(),
    forum_direction: forumDirection,
    forum_direction_label: getForumDirectionLabel(forumDirection),
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
