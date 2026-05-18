<script setup>
import { reactive, ref, watch, onUnmounted } from 'vue'
import { submitRegistration } from '@/api/registration'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'success'])

const form = reactive({
  firstName: '',
  lastName: '',
  patronymic: '',
  company: '',
  phone: '',
  email: '',
  infoConsent: false,
  personalDataConsent: false,
})

const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)

const resetForm = () => {
  form.firstName = ''
  form.lastName = ''
  form.patronymic = ''
  form.company = ''
  form.phone = ''
  form.email = ''
  form.infoConsent = false
  form.personalDataConsent = false
}

const closeModal = () => {
  if (isSubmitting.value) return
  submitError.value = ''
  submitSuccess.value = false
  emit('close')
}

const submitForm = async () => {
  if (isSubmitting.value) return

  submitError.value = ''
  isSubmitting.value = true

  const payload = {
    firstName: form.firstName,
    lastName: form.lastName,
    patronymic: form.patronymic,
    company: form.company,
    phone: form.phone,
    email: form.email,
    infoConsent: form.infoConsent,
    personalDataConsent: form.personalDataConsent,
  }

  const result = await submitRegistration(payload)

  isSubmitting.value = false

  if (!result.ok) {
    submitError.value = result.message
    return
  }

  submitSuccess.value = true
  emit('success', { form: payload, data: result.data })

  resetForm()

  window.setTimeout(() => {
    submitSuccess.value = false
    closeModal()
  }, 1800)
}

const setModalOpenState = (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
  document.body.classList.toggle('has-registration-modal', value)
}

watch(
  () => props.isOpen,
  (open) => {
    setModalOpenState(open)
    if (!open) {
      submitError.value = ''
      submitSuccess.value = false
    }
  },
)

onUnmounted(() => {
  setModalOpenState(false)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="registration-overlay"
        @click.self="closeModal"
      >
        <section class="registration-modal">
          <button
            class="registration-close"
            type="button"
            aria-label="Закрыть форму"
            @click="closeModal"
          >
            <span></span>
            <span></span>
          </button>

          <div class="registration-head">
            <h2>Регистрация</h2>
          </div>

          <div class="registration-modal__scroll" tabindex="-1">
            <p class="registration-scroll-hint" aria-hidden="true">листайте вниз</p>

            <form class="registration-form" @submit.prevent="submitForm">
            <p
              v-if="submitError"
              class="registration-message registration-message--error"
              role="alert"
            >
              {{ submitError }}
            </p>

            <p
              v-else-if="submitSuccess"
              class="registration-message registration-message--success"
              role="status"
            >
              Заявка отправлена. Спасибо!
            </p>

            <p class="registration-note">
              Регистрация необходима для посетителей форума, онлайн-трансляция
              будет доступна на сайте без регистрации.
            </p>

            <div class="registration-grid">
              <label class="registration-field">
                <input
                  v-model="form.firstName"
                  type="text"
                  name="firstName"
                  autocomplete="given-name"
                  placeholder="Иван"
                  required
                />
                <span>Имя *</span>
              </label>

              <label class="registration-field">
                <input
                  v-model="form.company"
                  type="text"
                  name="company"
                  autocomplete="organization"
                  placeholder="ООО «ВОЛНА»"
                  required
                />
                <span>Компания / Учебное заведение *</span>
              </label>

              <label class="registration-field">
                <input
                  v-model="form.lastName"
                  type="text"
                  name="lastName"
                  autocomplete="family-name"
                  placeholder="Иванов"
                  required
                />
                <span>Фамилия *</span>
              </label>

              <label class="registration-field">
                <input
                  v-model="form.phone"
                  type="tel"
                  name="phone"
                  autocomplete="tel"
                  inputmode="tel"
                  placeholder="+7 (999) 123-45-67"
                  required
                />
                <span>Номер телефона *</span>
              </label>

              <label class="registration-field">
                <input
                  v-model="form.patronymic"
                  type="text"
                  name="patronymic"
                  autocomplete="additional-name"
                  placeholder="Иванович"
                />
                <span>Отчество</span>
              </label>

              <label class="registration-field">
                <input
                  v-model="form.email"
                  type="email"
                  name="email"
                  autocomplete="email"
                  inputmode="email"
                  placeholder="ivanov@mail.ru"
                  required
                />
                <span>Электронная почта *</span>
              </label>
            </div>

            <div class="registration-bottom">
              <div class="registration-consents">
                <label class="registration-checkbox">
                  <input v-model="form.infoConsent" type="checkbox" />
                  <span class="registration-checkbox__box"></span>
                  <span class="registration-checkbox__text">
                    Отправляя форму, я даю согласие на получение информационных и рекламных сообщений
                  </span>
                </label>

                <label class="registration-checkbox">
                  <input v-model="form.personalDataConsent" type="checkbox" />
                  <span class="registration-checkbox__box"></span>
                  <span class="registration-checkbox__text">
                    Отправляя форму, я даю согласие на обработку моих персональных данных
                  </span>
                </label>
              </div>

              <button
                class="registration-submit"
                type="submit"
                :disabled="isSubmitting || submitSuccess"
              >
                {{ isSubmitting ? 'Отправка…' : 'Отправить' }}
              </button>
            </div>
          </form>
          </div>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.registration-overlay {
  position: fixed;
  inset: 0;
  z-index: 1200;
  padding: clamp(12px, 3vw, 28px);
  padding-top: max(12px, env(safe-area-inset-top, 0px));
  padding-bottom: max(12px, env(safe-area-inset-bottom, 0px));
  background: var(--color-overlay);
  backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}

.registration-modal {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(1200px, 100%);
  max-height: min(calc(100vh - 24px), calc(100dvh - 24px));
  overflow: hidden;
  overscroll-behavior: contain;
  border: 2px solid var(--color-registration-modal-border);
  border-radius: 24px;
  background: var(--color-registration-modal-bg);
  color: var(--color-registration-modal-text);
  box-shadow: 10px 10px 0 rgba(var(--palette-purple-rgb), 0.2);
  box-sizing: border-box;
}

.registration-modal__scroll {
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-y;
  outline: none;
}

.registration-scroll-hint {
  display: none;
}

.registration-head {
  flex-shrink: 0;
  width: min(560px, calc(100% - 140px));
  min-height: 122px;
  padding: 32px 44px 34px;
  border-radius: 0 0 34px 0;
  background: var(--color-registration-head-bg);
  display: flex;
  align-items: center;
  overflow: hidden;
}

.registration-head h2 {
  margin: 0;
  color: var(--color-registration-head-text, var(--palette-white));
  font-size: clamp(42px, 4.6vw, 68px);
  line-height: 0.9;
  font-weight: 900;
  letter-spacing: -0.055em;
  white-space: nowrap;
}

.registration-close {
  position: absolute;
  top: 20px;
  right: 36px;
  width: 70px;
  height: 70px;
  border: 1.5px solid var(--color-registration-modal-border);
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.registration-close:hover {
  background: var(--color-registration-head-bg);
  transform: rotate(8deg);
}

.registration-close span {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 30px;
  height: 2px;
  background: var(--color-registration-modal-text);
  transform-origin: center;
}

.registration-close span:first-child {
  transform: translate(-50%, -50%) rotate(45deg);
}

.registration-close span:last-child {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.registration-form {
  padding: 30px 28px max(46px, env(safe-area-inset-bottom, 0px));
}

.registration-note {
  max-width: min(520px, 100%);
  margin: 0 0 18px;
  color: var(--color-registration-modal-muted, var(--color-text-muted));
  font-size: clamp(13px, 1.8vw, 14px);
  line-height: 1.4;
  font-weight: 600;
}

.registration-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.registration-field {
  position: relative;
  display: block;
}

.registration-field input {
  width: 100%;
  min-height: 74px;
  height: 74px;
  padding: 26px 28px 12px;
  border: 2px solid transparent;
  border-radius: 18px;
  outline: none;
  background: var(--color-registration-modal-field-bg);
  color: var(--color-registration-modal-field-text, var(--palette-navy));
  font-size: clamp(16px, 2.2vw, 18px);
  line-height: 1.15;
  font-weight: 800;
  box-sizing: border-box;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.registration-field input::placeholder {
  color: rgba(var(--palette-navy-rgb), 0.42);
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.registration-field input:focus::placeholder {
  opacity: 1;
}

.registration-field input:not(:placeholder-shown)::placeholder {
  opacity: 0;
}

.registration-field span {
  position: absolute;
  left: 28px;
  top: 50%;
  color: var(--color-registration-modal-field-label, rgba(var(--palette-navy-rgb), 0.62));
  font-size: 14px;
  font-weight: 700;
  transform: translateY(-50%);
  pointer-events: none;
  transition:
    top 0.2s ease,
    font-size 0.2s ease,
    color 0.2s ease;
}

.registration-field input:focus,
.registration-field input:not(:placeholder-shown) {
  border-color: var(--color-registration-modal-border);
  background: var(--color-registration-modal-field-bg-focus);
  box-shadow: 0 0 0 3px rgba(var(--palette-purple-rgb), 0.28);
}

.registration-field input:focus + span,
.registration-field input:not(:placeholder-shown) + span {
  top: 18px;
  font-size: 12px;
  color: var(--color-registration-modal-field-label, rgba(var(--palette-navy-rgb), 0.72));
  transform: translateY(0);
}

.registration-bottom {
  margin-top: 22px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  align-items: start;
}

.registration-consents {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.registration-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
}

.registration-checkbox input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.registration-checkbox__box {
  width: 24px;
  height: 24px;
  flex: 0 0 24px;
  border: 1.5px solid var(--color-registration-modal-border);
  border-radius: 5px;
  background: transparent;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.registration-checkbox input:checked + .registration-checkbox__box {
  background: var(--color-registration-head-bg);
  box-shadow: inset 0 0 0 5px var(--color-registration-modal-bg);
}

.registration-checkbox__text {
  color: var(--color-registration-modal-muted, var(--color-text-muted));
  font-size: 14px;
  line-height: 1.35;
  font-weight: 600;
}

.registration-submit {
  width: 100%;
  height: 78px;
  border: none;
  border-radius: 18px;
  background: var(--color-registration-submit-bg);
  color: var(--color-registration-submit-text);
  cursor: pointer;
  font-size: clamp(24px, 3vw, 36px);
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.06em;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.registration-submit:hover:not(:disabled) {
  background: var(--color-registration-submit-hover);
  color: var(--color-registration-submit-text, var(--palette-white));
  transform: translateY(-4px);
  box-shadow: 6px 6px 0 rgba(var(--palette-purple-rgb), 0.24);
}

.registration-submit:disabled {
  cursor: not-allowed;
  opacity: 0.72;
  transform: none;
  box-shadow: none;
}

.registration-message {
  margin: 0 0 12px;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 600;
}

.registration-message--error {
  background: rgba(220, 38, 38, 0.12);
  color: #b91c1c;
}

.registration-message--success {
  background: rgba(22, 163, 74, 0.12);
  color: #15803d;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-active .registration-modal,
.modal-leave-active .registration-modal {
  transition:
    transform 0.25s ease,
    opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .registration-modal,
.modal-leave-to .registration-modal {
  opacity: 0;
  transform: translateY(24px) scale(0.96);
}

@media (max-width: 820px) {
  .registration-overlay {
    align-items: stretch;
    justify-content: stretch;
    padding: 0;
    overflow: hidden;
  }

  .registration-modal {
    width: 100%;
    max-height: 100dvh;
    max-height: 100vh;
    height: 100dvh;
    height: 100vh;
    margin: 0;
    border-radius: 0;
    border-left: none;
    border-right: none;
    box-shadow: none;
  }

  .registration-modal__scroll {
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }

  .registration-scroll-hint {
    display: block;
    position: sticky;
    top: 0;
    z-index: 2;
    margin: 0;
    padding: 8px 16px 6px;
    color: var(--color-registration-modal-muted, var(--color-text-muted));
    font-size: 12px;
    line-height: 1.2;
    font-weight: 700;
    text-align: center;
    text-transform: lowercase;
    letter-spacing: 0.04em;
    background: linear-gradient(
      180deg,
      var(--color-registration-modal-bg) 68%,
      rgba(var(--palette-navy-rgb), 0)
    );
  }

  .registration-head {
    width: calc(100% - 88px);
    min-height: 96px;
    padding: 26px 28px 28px;
  }

  .registration-head h2 {
    font-size: clamp(34px, 8vw, 52px);
    white-space: normal;
  }

  .registration-close {
    top: 16px;
    right: 16px;
    width: 56px;
    height: 56px;
  }

  .registration-close span {
    width: 24px;
  }

  .registration-form {
    padding: 24px 20px 32px;
  }

  .registration-note {
    max-width: 100%;
    margin-bottom: 16px;
  }

  .registration-grid,
  .registration-bottom {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .registration-bottom {
    margin-top: 18px;
  }

  .registration-submit {
    min-height: 64px;
    height: auto;
    padding: 16px 20px;
  }

  .registration-consents {
    gap: 12px;
  }

  .registration-checkbox__text {
    font-size: 13px;
    line-height: 1.4;
  }
}

@media (max-width: 520px) {
  .registration-modal {
    border-radius: 0;
  }

  .registration-head {
    width: calc(100% - 72px);
    min-height: 82px;
    padding: 22px 18px 24px;
    border-radius: 0 0 22px 0;
  }

  .registration-head h2 {
    font-size: clamp(30px, 9vw, 40px);
    letter-spacing: -0.045em;
  }

  .registration-form {
    padding: 20px 16px 28px;
  }

  .registration-field input {
    min-height: 66px;
    height: 66px;
    padding: 24px 20px 10px;
    font-size: 16px;
  }

  .registration-field span {
    left: 20px;
    font-size: 13px;
  }

  .registration-field input:focus + span,
  .registration-field input:not(:placeholder-shown) + span {
    top: 16px;
    font-size: 11px;
  }
}

@media (max-width: 360px) {
  .registration-head {
    width: calc(100% - 64px);
    min-height: 72px;
    padding: 18px 14px 20px;
  }

  .registration-head h2 {
    font-size: clamp(26px, 8.5vw, 32px);
    white-space: normal;
  }

  .registration-close {
    width: 48px;
    height: 48px;
    top: 12px;
    right: 12px;
  }

  .registration-form {
    padding: 18px 12px 22px;
  }

  .registration-grid {
    gap: 12px;
  }

  .registration-submit {
    min-height: 58px;
    font-size: 20px;
    padding: 14px 16px;
  }
}

@media (max-width: 320px) {
  .registration-form {
    padding: 16px 10px 20px;
  }

  .registration-field input {
    padding-inline: 16px;
  }

  .registration-checkbox {
    gap: 10px;
  }

  .registration-checkbox__box {
    width: 22px;
    height: 22px;
    flex-basis: 22px;
  }
}
</style>