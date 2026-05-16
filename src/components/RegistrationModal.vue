<script setup>
import { reactive, watch, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'submit'])

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

const closeModal = () => {
  emit('close')
}

const submitForm = () => {
  if (!form.firstName || !form.lastName || !form.company || !form.phone || !form.email) {
    alert('Заполни обязательные поля')
    return
  }

  if (!form.infoConsent || !form.personalDataConsent) {
    alert('Нужно дать согласие на обработку данных')
    return
  }

  emit('submit', {
    firstName: form.firstName,
    lastName: form.lastName,
    patronymic: form.patronymic,
    company: form.company,
    phone: form.phone,
    email: form.email,
    infoConsent: form.infoConsent,
    personalDataConsent: form.personalDataConsent,
  })

  alert('Заявка на регистрацию отправлена')

  form.firstName = ''
  form.lastName = ''
  form.patronymic = ''
  form.company = ''
  form.phone = ''
  form.email = ''
  form.infoConsent = false
  form.personalDataConsent = false

  closeModal()
}

watch(
  () => props.isOpen,
  (value) => {
    document.body.style.overflow = value ? 'hidden' : ''
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
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

          <form class="registration-form" @submit.prevent="submitForm">
            <p class="registration-note">
              Регистрация необходима для посетителей форума, онлайн-трансляция
              будет доступна на сайте без регистрации.
            </p>

            <div class="registration-grid">
              <label class="registration-field">
                <input v-model="form.firstName" type="text" required />
                <span>Имя *</span>
              </label>

              <label class="registration-field">
                <input v-model="form.company" type="text" required />
                <span>Компания / Учебное заведение *</span>
              </label>

              <label class="registration-field">
                <input v-model="form.lastName" type="text" required />
                <span>Фамилия *</span>
              </label>

              <label class="registration-field">
                <input v-model="form.phone" type="tel" required />
                <span>Номер телефона *</span>
              </label>

              <label class="registration-field">
                <input v-model="form.patronymic" type="text" />
                <span>Отчество</span>
              </label>

              <label class="registration-field">
                <input v-model="form.email" type="email" required />
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

              <button class="registration-submit" type="submit">
                Отправить
              </button>
            </div>
          </form>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.registration-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  padding: 28px;
  background: rgba(11, 8, 20, 0.72);
  backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.registration-modal {
  position: relative;
  width: min(1200px, 100%);
  max-height: calc(100vh - 56px);
  overflow: auto;
  border: 2px solid #c7a8ff;
  border-radius: 24px;
  background: #f7f7f4;
  color: #0b0814;
  box-shadow:
    14px 14px 0 rgba(242, 245, 94, 0.18),
    0 34px 80px rgba(0, 0, 0, 0.36);
}

.registration-head {
  width: min(360px, 72%);
  min-height: 100px;
  padding: 28px 28px 30px;
  border-radius: 0 0 28px 0;
  background: #cdb2ff;
  display: flex;
  align-items: center;
}

.registration-head h2 {
  margin: 0;
  font-size: clamp(38px, 5vw, 64px);
  line-height: 0.9;
  font-weight: 900;
  letter-spacing: -0.06em;
}

.registration-close {
  position: absolute;
  top: 20px;
  right: 36px;
  width: 70px;
  height: 70px;
  border: 1.5px solid #cdb2ff;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
}

.registration-close:hover {
  background: #cdb2ff;
  transform: rotate(8deg);
}

.registration-close span {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 30px;
  height: 2px;
  background: #0b0814;
  transform-origin: center;
}

.registration-close span:first-child {
  transform: translate(-50%, -50%) rotate(45deg);
}

.registration-close span:last-child {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.registration-form {
  padding: 30px 28px 46px;
}

.registration-note {
  max-width: 360px;
  margin: 0 0 18px;
  color: rgba(11, 8, 20, 0.7);
  font-size: 14px;
  line-height: 1.35;
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
  height: 74px;
  padding: 26px 28px 12px;
  border: 2px solid transparent;
  border-radius: 18px;
  outline: none;
  background: #e3e3e3;
  color: #0b0814;
  font-size: 18px;
  line-height: 1;
  font-weight: 800;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.registration-field span {
  position: absolute;
  left: 28px;
  top: 50%;
  color: rgba(11, 8, 20, 0.72);
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
  border-color: #cdb2ff;
  background: #eeeeee;
  box-shadow: 0 0 0 4px rgba(205, 178, 255, 0.22);
}

.registration-field input:focus + span,
.registration-field input:not(:placeholder-shown) + span {
  top: 18px;
  font-size: 12px;
  color: rgba(11, 8, 20, 0.52);
}

.registration-field input {
  placeholder: '';
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
  border: 1.5px solid #cdb2ff;
  border-radius: 5px;
  background: transparent;
  transition:
    background-color 0.2s ease,
    box-shadow 0.2s ease;
}

.registration-checkbox input:checked + .registration-checkbox__box {
  background: #cdb2ff;
  box-shadow: inset 0 0 0 5px #f7f7f4;
}

.registration-checkbox__text {
  color: rgba(11, 8, 20, 0.66);
  font-size: 14px;
  line-height: 1.35;
  font-weight: 600;
}

.registration-submit {
  width: 100%;
  height: 78px;
  border: none;
  border-radius: 18px;
  background: #cdb2ff;
  color: #1e1739;
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

.registration-submit:hover {
  background: #f2f55e;
  transform: translateY(-4px);
  box-shadow: 0 18px 34px rgba(30, 23, 57, 0.18);
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
    padding: 14px;
  }

  .registration-modal {
    max-height: calc(100vh - 28px);
  }

  .registration-head {
    width: calc(100% - 96px);
    min-height: 84px;
  }

  .registration-close {
    top: 18px;
    right: 18px;
    width: 58px;
    height: 58px;
  }

  .registration-grid,
  .registration-bottom {
    grid-template-columns: 1fr;
  }

  .registration-submit {
    order: -1;
  }
}

@media (max-width: 520px) {
  .registration-modal {
    border-radius: 18px;
  }

  .registration-head {
    padding: 24px 22px;
    border-radius: 0 0 22px 0;
  }

  .registration-form {
    padding: 24px 18px 30px;
  }

  .registration-field input {
    height: 66px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .registration-field span {
    left: 20px;
  }
}
</style>