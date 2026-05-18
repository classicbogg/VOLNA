<template>
  <section class="in-program-section" id="program">
    <div class="in-program-container">
      <div class="in-program-heading">
        <h2>
          <span class="phrase-marker">
            <span class="phrase-marker__text">в программе</span>
            <svg
              class="phrase-marker__svg"
              viewBox="0 0 650 165"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M58 97C54 55 104 29 190 18C302 4 502 6 585 36C646 58 620 106 534 127C434 151 232 151 116 132C38 119 16 84 47 58"
                stroke="currentColor"
                stroke-width="8"
                stroke-linecap="round"
              />
            </svg>
          </span>
        </h2>
      </div>

      <div class="in-program-grid">
        <article
          v-for="(card, index) in visibleCards"
          :key="card.title"
          class="in-program-card"
          :style="{ '--card-index': index }"
        >
          <div class="in-program-card__image-wrap">
            <img
              class="in-program-card__image"
              :src="card.image"
              :alt="card.title"
              loading="lazy"
            />
          </div>

          <div class="in-program-card__spark" aria-hidden="true">
            <span></span>
          </div>

          <div class="in-program-card__content">
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
          </div>
        </article>
      </div>

      <div class="in-program-actions">
        <button class="in-program-toggle" type="button" @click="toggleCards">
          {{ showAllCards ? 'Скрыть' : 'Показать еще' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const showAllCards = ref(false)

const programCards = [
  {
    title: 'Выступления спикеров',
    text: 'Практический опыт от предпринимателей, которые уже прошли путь от идеи до результата',
    image: '/program_card_bg_5.png'
  },
  {
    title: 'Награждение победителей Конкурса «Создай НAШЕ»',
    text: 'Лучшие проекты получат признание экспертного сообщества и поддержку для развития',
    image: '/program_card_bg_1.png'
  },
  {
    title: 'Консультации менторов',
    text: 'Индивидуальные сессии с экспертами, которые дадут конкретные шаги именно для вашей ситуации',
    image: '/program_card_bg_2.png'
  },
  {
    title: 'Зона «нетворкинг» с модератором',
    text: 'Возможность расширения сети контактов в интерактивном формате будет доступна в течение всего времени проведения форума',
    image: '/program_card_bg_3.png'
  },
  {
    title: 'Зона «Вайб-кодинг здесь и сейчас»',
    text: 'Эксперт в режиме реальной демонстрации создаст цифровой продукт с нуля, используя языковые модели и no-code-решения',
    image: '/program_card_bg_4.png'
  }
]

const visibleCards = computed(() => {
  return showAllCards.value ? programCards : programCards.slice(0, 3)
})

const toggleCards = () => {
  showAllCards.value = !showAllCards.value
}
</script>

<style scoped>
.in-program-section {
  position: relative;
  width: 100%;
  padding: 92px var(--layout-gutter-wide, 40px) 100px;
  background: var(--color-in-program-bg);
  color: var(--color-in-program-text);
  overflow: hidden;
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
}

.in-program-container {
  position: relative;
  z-index: 2;
  width: min(1540px, 100%);
  margin: 0 auto;
}

.in-program-heading {
  position: relative;
  width: fit-content;
  max-width: 100%;
  margin: 0 0 58px;
  padding: 0 26px 18px 0;
}

.in-program-heading h2 {
  position: relative;
  z-index: 2;
  margin: 0;
  color: var(--color-in-program-text);
  font-size: clamp(46px, 5.4vw, 78px);
  line-height: 0.9;
  font-weight: 900;
  text-transform: lowercase;
  letter-spacing: -0.075em;
}

.in-program-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px 28px;
  align-items: stretch;
}

.in-program-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 448px;
  border: 3px solid var(--color-in-program-card-border);
  border-radius: 28px;
  background: var(--color-in-program-card-bg);
  overflow: hidden;
  box-shadow: 0 18px 38px var(--color-in-program-card-shadow);
  transform: translateY(0);
  transition:
    transform 0.24s ease,
    border-color 0.24s ease,
    box-shadow 0.24s ease,
    background-color 0.35s ease;
}

.in-program-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 24px 48px var(--color-in-program-card-shadow);
}

.in-program-card__image-wrap {
  position: relative;
  flex-shrink: 0;
  height: 260px;
  overflow: hidden;
  background: rgba(var(--color-in-program-accent-rgb), 0.24);
}

.in-program-card__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.45s ease;
}

.in-program-card:hover .in-program-card__image {
  transform: scale(1.045);
}

.in-program-card__spark {
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
  width: 66px;
  height: 66px;
  border-radius: 0 24px 0 34px;
  background: var(--color-in-program-spark-card-bg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.in-program-card__spark span {
  position: relative;
  width: 30px;
  height: 30px;
  display: block;
}

.in-program-card__spark span::before,
.in-program-card__spark span::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  background: var(--color-in-program-spark-bg);
  transform: translate(-50%, -50%);
}

.in-program-card__spark span::before {
  width: 4px;
  height: 30px;
  clip-path: polygon(50% 0, 100% 42%, 50% 100%, 0 42%);
}

.in-program-card__spark span::after {
  width: 30px;
  height: 4px;
  clip-path: polygon(0 50%, 42% 0, 100% 50%, 42% 100%);
}

.in-program-card__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 188px;
  margin-top: -28px;
  padding: 28px 24px 30px;
  border-radius: 28px;
  background: var(--color-in-program-card-content-bg, var(--color-in-program-card-bg));
  transition: background-color 0.35s ease;
}

.in-program-card__content h3 {
  margin: 0 0 16px;
  color: var(--color-in-program-card-content-text, var(--color-in-program-text));
  font-size: clamp(24px, 1.8vw, 31px);
  line-height: 1.12;
  font-weight: 900;
  letter-spacing: -0.045em;
}

.in-program-card__content p {
  margin: 0;
  color: var(--color-in-program-card-content-muted, var(--color-in-program-muted));
  font-size: clamp(17px, 1.22vw, 22px);
  line-height: 1.36;
  font-weight: 650;
  letter-spacing: -0.035em;
}

.in-program-actions {
  display: flex;
  justify-content: center;
  margin-top: 28px;
}

.in-program-toggle {
  min-width: 148px;
  min-height: 56px;
  padding: 0 32px;
  border: 2px solid var(--color-in-program-button-border);
  border-radius: 999px;
  background: var(--color-in-program-button-bg);
  color: var(--color-in-program-button-text);
  font-size: 18px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.04em;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.in-program-toggle:hover {
  transform: translateY(-3px);
  background: var(--color-in-program-accent);
  color: var(--color-purple);
  box-shadow: 5px 5px 0 rgba(var(--color-in-program-accent-rgb), 0.24);
}

@media (max-width: 1200px) {
  .in-program-section {
    padding: 82px 28px 90px;
  }

  .in-program-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .in-program-section {
    padding: 68px 18px 76px;
  }

  .in-program-heading {
    margin-bottom: 40px;
  }

  .in-program-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .in-program-card {
    min-height: auto;
    border-radius: 24px;
  }

  .in-program-card__image-wrap {
    height: 230px;
  }

  .in-program-card__spark {
    width: 58px;
    height: 58px;
    border-radius: 0 20px 0 30px;
  }

  .in-program-card__content {
    flex: 1;
    min-height: 160px;
    padding: 25px 20px 26px;
  }

  .in-program-card__content p {
    font-size: 16px;
    line-height: 1.42;
  }
}

@media (max-width: 460px) {
  .in-program-heading h2 {
    font-size: clamp(36px, 11vw, 42px);
  }

  .in-program-card__image-wrap {
    height: 200px;
  }

  .in-program-toggle {
    min-height: 52px;
    padding: 0 26px;
    font-size: 17px;
  }
}

@media (max-width: 360px) {
  .in-program-section {
    padding: 60px 12px 68px;
  }

  .in-program-heading {
    width: 100%;
    max-width: 100%;
    margin-bottom: 32px;
    padding: 0 0 14px;
    box-sizing: border-box;
  }
}

@media (max-width: 320px) {
  .in-program-toggle {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    padding-inline: 20px;
  }
}
</style>
