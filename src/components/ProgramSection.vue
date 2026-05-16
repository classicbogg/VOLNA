<template>
  <section class="program-section" id="schedule">
    <!-- Пиксельные декорации -->
    <div class="program-pixels program-pixels--left" aria-hidden="true"></div>
    <div class="program-pixels program-pixels--right" aria-hidden="true"></div>
    <div class="program-pixels program-pixels--top" aria-hidden="true"></div>

    <div class="program-container">
      <div class="program-heading">
        <h2>программа форума</h2>
        <svg
          class="program-marker"
          viewBox="0 0 760 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M70 112C65 63 126 31 230 20C356 7 580 1 674 39C750 70 711 128 609 150C490 176 262 174 128 150C47 136 15 96 51 64"
            stroke="currentColor"
            stroke-width="8"
            stroke-linecap="round"
          />
          <path
            d="M420 166C487 165 551 158 596 146"
            stroke="currentColor"
            stroke-width="8"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <div class="program-timeline">
        <div 
          v-for="(item, index) in programItems" 
          :key="index"
          class="program-card"
          :class="[`program-card--${item.type}`, { 'program-card--expanded': expandedIndex === index }]"
          @click="toggleExpand(index)"
        >
          <div class="program-card__time">
            {{ item.time }}
          </div>
          
          <div class="program-card__content">
            <h3 class="program-card__title">{{ item.title }}</h3>
            
            <div v-if="item.description" class="program-card__description">
              <p>{{ item.description }}</p>
            </div>

            <div v-if="item.speakers && item.speakers.length" class="program-card__speakers">
              <span class="program-card__speakers-label">Спикеры:</span>
              <span class="program-card__speakers-list">{{ item.speakers.join(', ') }}</span>
            </div>

            <div v-if="item.theme" class="program-card__theme">
              <span class="program-card__theme-label">Тема:</span>
              <span class="program-card__theme-text">{{ item.theme }}</span>
            </div>

            <button class="program-card__more">
              <span>{{ expandedIndex === index ? 'Свернуть' : 'Подробнее' }}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="program-note">
        <span>*</span> Организаторы оставляют за собой право вносить изменения в программу
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const expandedIndex = ref(null)

const toggleExpand = (index) => {
  expandedIndex.value = expandedIndex.value === index ? null : index
}

const programItems = ref([
  {
    time: '13:30',
    title: 'Зона регистрации',
    description: 'Открытие регистрации участников. Тематические активности и фуршет.',
    type: 'registration'
  },
  {
    time: '14:45',
    title: 'Торжественное открытие форума',
    description: 'Официальный старт третьего форума «Создай НАШЕ». Энергия зала, приветственные слова и настрой на большой день.',
    type: 'opening'
  },
  {
    time: '15:00',
    title: 'Выступления приглашенных спикеров',
    description: 'Что важно знать предпринимателю на старте? Как пройти путь от первого клиента до устойчивой компании, сохранив себя и команду? На этой сессии основатели известных российских компаний поделятся честными историями построения бизнеса — о решениях, которые сработали, и о сложностях, ставших точкой роста.',
    speakers: ['Михаил Каптюг (Sciencely)', 'Анна Давидова (5YES!)', 'Мария Лапук (Vinci Agency)', 'Александр Мутовин («Много Лосося»)'],
    type: 'speakers'
  },
  {
    time: '16:00',
    title: 'Пленарное заседание и награждение победителей Федерального конкурса «Создай НАШЕ»',
    description: 'В рамках пленарного заседания участники обсудят, как молодые предприниматели меняют экономику, задают новые тренды в бизнесе, технологиях и креативных индустриях. Сегодня молодежь до 25 лет активнее остальных вовлекается в экономику предложения: за три года число ИП в научно-технической деятельности в этой возрастной группе выросло в 3 раза, а в сфере ИТ — в 2 раза.',
    theme: 'Не в найме: будущее за развитием молодежного предпринимательства',
    type: 'plenary'
  },
  {
    time: '18:00',
    title: 'Из спорта в предпринимательство: какие принципы забрать с собой в бизнес',
    description: 'Хедлайнер форума, мастер спорта международного класса, предприниматель, поделится личной историей трансформации из профессиональной спортсменки в основателя компании международного масштаба. Самира расскажет, как принципы спортивной подготовки помогают выстроить устойчивый бизнес? Что важнее — дисциплина, команда или способность рисковать?',
    speakers: ['Самира'],
    type: 'keynote'
  },
  {
    time: '18:30',
    title: 'Что нужно стартапу, чтобы заинтересовать инвестора',
    description: 'Практический разбор того, как стартапу подготовиться к встрече с инвестором: на что смотрят на венчурном рынке, какие ошибки команды совершают чаще всего и какие сигналы помогают проекту выделиться на фоне других',
    type: 'practical'
  },
  {
    time: '19:00',
    title: 'Тематические активности',
    description: 'Общение, кофе-брейк',
    type: 'networking'
  },
  {
    time: '19:30',
    title: 'Завершение форума',
    description: 'Закрытие третьего форума «Создай НАШЕ»',
    type: 'closing'
  }
])
</script>

<style scoped>
.program-section {
  position: relative;
  width: 100%;
  padding: 90px 40px 110px;
  background: var(--color-program-section-bg, var(--color-bg-soft));
  color: var(--color-program-heading, var(--color-text));
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
  overflow: hidden;
}

.program-pixels {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  opacity: 0.4;
}

.program-pixels--left {
  left: -60px;
  top: 200px;
  width: 48px;
  height: 48px;
  background: rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.15);
  box-shadow:
    48px 0 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.12),
    96px 0 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.08),
    0 48px 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.10),
    48px 48px 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.08),
    96px 48px 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.06),
    0 96px 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.08),
    48px 96px 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.06);
  transform: rotate(-10deg);
  animation: pixelFloatLeft 7s ease-in-out infinite;
}

.program-pixels--right {
  right: -80px;
  bottom: 150px;
  width: 56px;
  height: 56px;
  background: rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.12);
  box-shadow:
    -56px 0 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.10),
    -112px 0 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.07),
    0 -56px 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.09),
    -56px -56px 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.07),
    -112px -56px 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.05),
    0 -112px 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.07),
    -56px -112px 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.05);
  transform: rotate(8deg);
  animation: pixelFloatRight 9s ease-in-out infinite;
}

.program-pixels--top {
  right: 15%;
  top: 80px;
  width: 32px;
  height: 32px;
  background: rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.10);
  box-shadow:
    32px 0 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.08),
    64px 0 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.05),
    0 32px 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.07),
    32px 32px 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.06),
    64px 32px 0 rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.04);
  transform: rotate(12deg);
  animation: pixelFloatTop 6s ease-in-out infinite;
}

@keyframes pixelFloatLeft {
  0%, 100% { transform: translateY(0) rotate(-10deg); }
  50% { transform: translateY(-20px) rotate(-7deg); }
}

@keyframes pixelFloatRight {
  0%, 100% { transform: translateY(0) rotate(8deg); }
  50% { transform: translateY(18px) rotate(5deg); }
}

@keyframes pixelFloatTop {
  0%, 100% { transform: translateY(0) rotate(12deg); }
  50% { transform: translateY(-14px) rotate(16deg); }
}

.program-container {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

.program-heading {
  position: relative;
  width: fit-content;
  margin: 0 auto 60px;
  padding: 34px 84px 42px;
  isolation: isolate;
}

.program-heading h2 {
  position: relative;
  z-index: 3;
  margin: 0;
  font-size: clamp(44px, 6vw, 82px);
  line-height: 0.9;
  font-weight: 900;
  text-align: center;
  text-transform: lowercase;
  letter-spacing: -0.08em;
  color: var(--color-program-heading, var(--color-text));
}

.program-marker {
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 54%;
  width: 145%;
  height: 190%;
  transform: translate(-50%, -50%) rotate(-2deg);
  pointer-events: none;
  color: var(--color-program-marker, var(--color-yellow));
}

.program-timeline {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.program-card {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 30px;
  padding: 28px 32px;
  background: var(--color-program-card-bg, var(--color-surface-card));
  border: 1px solid var(--color-program-card-border, var(--color-border));
  border-radius: 28px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(4px);
}

.program-card:hover {
  background: var(--color-program-card-bg-hover, var(--color-surface-card-hover));
  border-color: var(--color-program-card-border-hover, rgba(30, 23, 57, 0.22));
  transform: translateX(8px);
}

.program-card--expanded {
  background: var(--color-program-card-bg-expanded, var(--color-surface-expanded));
  border-color: var(--color-program-accent);
  box-shadow: 0 8px 32px var(--color-shadow-strong);
}

.program-card__time {
  font-size: 28px;
  font-weight: 900;
  color: var(--color-program-time, var(--color-program-accent));
  letter-spacing: -0.05em;
  line-height: 1;
  padding-top: 4px;
}

.program-card__content {
  flex: 1;
}

.program-card__title {
  font-size: 22px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.03em;
  margin: 0 0 12px;
  color: var(--color-program-card-text, var(--color-text));
}

.program-card--expanded .program-card__title {
  color: var(--color-program-card-text, var(--color-text));
}

.program-card__description {
  font-size: 16px;
  line-height: 1.45;
  color: var(--color-program-card-text-muted, var(--color-text-muted));
  margin-bottom: 16px;
}

.program-card__description p {
  margin: 0;
}

.program-card__speakers,
.program-card__theme {
  margin-bottom: 12px;
  font-size: 14px;
  line-height: 1.4;
}

.program-card__speakers-label,
.program-card__theme-label {
  font-weight: 700;
  color: var(--color-program-accent);
  margin-right: 8px;
}

.program-card__speakers-list,
.program-card__theme-text {
  color: var(--color-program-card-text-muted, var(--color-text-muted));
}

.program-card__more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding: 8px 0;
  background: none;
  border: none;
  color: var(--color-program-accent);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: lowercase;
}

.program-card__more svg {
  transition: transform 0.2s ease;
}

.program-card--expanded .program-card__more svg {
  transform: rotate(45deg);
}

.program-card__more:hover {
  gap: 12px;
  color: var(--color-program-card-text, var(--color-text));
}

.program-note {
  margin-top: 48px;
  padding: 20px 24px;
  text-align: center;
  font-size: 13px;
  color: var(--color-program-note, var(--color-text-muted));
  border-top: 1px solid var(--color-program-card-border, var(--color-border));
}

.program-note span {
  color: var(--color-program-accent);
  margin-right: 6px;
}

/* Адаптивность */
@media (max-width: 900px) {
  .program-section {
    padding: 70px 24px 90px;
  }

  .program-heading {
    margin-bottom: 45px;
    padding: 24px 62px 30px;
  }

  .program-card {
    grid-template-columns: 90px 1fr;
    gap: 20px;
    padding: 22px 24px;
  }

  .program-card__time {
    font-size: 22px;
  }

  .program-card__title {
    font-size: 19px;
  }
}

@media (max-width: 680px) {
  .program-section {
    padding: 55px 16px 70px;
  }

  .program-pixels {
    opacity: 0.25;
  }

  .program-pixels--left,
  .program-pixels--right,
  .program-pixels--top {
    display: none;
  }

  .program-heading {
    padding: 18px 34px 24px;
    margin-bottom: 35px;
  }

  .program-marker {
    top: 54%;
    width: 155%;
    height: 190%;
  }

  .program-card {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 18px 20px;
    border-radius: 20px;
  }

  .program-card__time {
    font-size: 20px;
    padding-bottom: 6px;
    border-bottom: 1px solid rgba(var(--color-program-pixel-rgb, var(--color-accent-rgb)), 0.2);
  }

  .program-card__title {
    font-size: 18px;
  }

  .program-card__description {
    font-size: 14px;
  }

  .program-card__speakers,
  .program-card__theme {
    font-size: 13px;
  }

  .program-note {
    margin-top: 32px;
    padding: 16px 16px;
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .program-card {
    padding: 14px 16px;
  }

  .program-card__title {
    font-size: 16px;
  }

  .program-card__description {
    font-size: 13px;
  }
}

@media (max-width: 360px) {
  .program-section {
    padding: 48px 12px 64px;
  }

  .program-heading {
    padding: 12px 16px 16px;
    margin-bottom: 28px;
  }

  .program-heading h2 {
    font-size: clamp(32px, 11vw, 42px);
  }

  .program-card__time {
    font-size: 18px;
  }

  .program-note {
    font-size: 10px;
    padding: 14px 12px;
  }
}
</style>