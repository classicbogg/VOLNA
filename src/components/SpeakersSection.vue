<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const theme = ref('light')
const speakersExpanded = ref(false)
let htmlObserver = null
let bodyObserver = null

const resolveTheme = () => {
  if (typeof document === 'undefined') {
    return 'light'
  }

  const html = document.documentElement
  const body = document.body
  const htmlTheme = html?.getAttribute('data-theme')
  const bodyTheme = body?.getAttribute('data-theme')

  if (htmlTheme === 'dark' || bodyTheme === 'dark') {
    return 'dark'
  }

  if (html?.classList.contains('dark') || html?.classList.contains('theme-dark')) {
    return 'dark'
  }

  if (body?.classList.contains('dark') || body?.classList.contains('theme-dark')) {
    return 'dark'
  }

  return 'light'
}

const updateTheme = () => {
  theme.value = resolveTheme()
}

onMounted(() => {
  updateTheme()

  htmlObserver = new MutationObserver(updateTheme)
  htmlObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme', 'class'],
  })

  if (document.body) {
    bodyObserver = new MutationObserver(updateTheme)
    bodyObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    })
  }
})

onUnmounted(() => {
  htmlObserver?.disconnect()
  bodyObserver?.disconnect()
})

const speakers = [
  {
    image: '/speaker_1.png',
    name: 'Максим Орешкин',
    role: 'Заместитель Руководителя Администрации Президента Российской Федерации',
  },
  {
    image: '/speaker_3.png',
    name: 'Алексей Репик',
    role: 'Основатель фонда «Молодежная предпринимательская инициатива», председатель Общероссийской общественной организации «Деловая Россия»',
  },
  {
    image: '/speaker_4.png',
    name: 'Светлана Чупшева',
    role: 'Генеральный директор АНО «Агентство стратегических инициатив по продвижению новых проектов»',
  },
  {
    image: '/speaker_5.png',
    name: 'Александр Исаевич',
    role: 'Генеральный директор АО «Корпорация «МСП»',
  },
  {
    image: '/speaker_7.png',
    name: 'Кристина Кострома',
    role: 'Руководитель Департамента предпринимательства и инновационного развития города Москвы',
  },
  {
    image: '/speaker_6.png',
    name: 'Юрий Максимов',
    role: 'Основатель фонда Сайберус и компании Positive Technologies',
  },
  {
    image: '/speaker_8.png',
    name: 'Мария Папук',
    role: 'Основатель коммуникационной группы Vinci Agency с международной экспертизой, совладелец журнала Инк',
  },
  {
    image: '/speaker_9.png',
    name: 'Михаил Каптюг',
    role: 'Основатель проекта Sciencely, эксперт в сфере научно-просветительских и образовательных продуктов для детей',
  },
  {
    image: '/speaker_10.png',
    name: 'Анна Давыдова',
    role: 'Основатель и сооснователь компании 5YES! — производителя растительного молока для бариста и ритейла',
  },
  {
    image: '/speaker_11.png',
    name: 'Александр Мутовин',
    role: 'Основатель сервиса доставки еды «Много Лосося»',
  },
  {
    image: '/speaker_12.png',
    name: 'Кирилл Токарев',
    role: 'Телеведущий, шеф-редактор телеканала РБК-ТВ по экономической аналитике',
  },
  {
    image: '/speaker_14.png',
    name: 'Самира Мустафаева',
    role: 'Основатель сети студий растяжки и фитнеса SM Stretching; мастер спорта международного класса по художественной гимнастике; многократный призер чемпионатов России и Европы',
  },
  {
    image: '/speaker_15.png',
    name: 'Глеб Белявский',
    role: 'Руководитель направления инвестиций акселераторов Сбера и сообщества инвесторов SberUnity',
  },
]
</script>

<template>
  <section
    class="speakers-section"
    :class="[
      theme === 'dark' ? 'speakers-section--dark' : 'speakers-section--light',
      { 'speakers-section--expanded': speakersExpanded },
    ]"
    id="speakers"
  >
    <div class="speakers-container">
      <div class="speakers-heading">
        <h2>
          <span class="phrase-marker">
            <span class="phrase-marker__text">кто выступит?</span>
            <svg
              class="phrase-marker__svg"
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
            </svg>
          </span>
        </h2>
      </div>

      <div class="speakers-grid" aria-label="Список спикеров форума">
        <article v-for="speaker in speakers" :key="speaker.name" class="speaker-card">
          <div class="speaker-card__photo-wrap">
            <img class="speaker-card__photo" :src="speaker.image" :alt="speaker.name" loading="lazy" />
          </div>

          <div class="speaker-card__info">
            <h3>{{ speaker.name }}</h3>
            <p>{{ speaker.role }}</p>
          </div>
        </article>
      </div>

      <button
        v-if="speakers.length > 4"
        class="speakers-more"
        type="button"
        :aria-expanded="speakersExpanded"
        @click="speakersExpanded = !speakersExpanded"
      >
        {{ speakersExpanded ? 'скрыть' : 'показать ещё' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.speakers-section {
  --speakers-section-bg: var(--color-speakers-section-bg);
  --speakers-heading: var(--color-speakers-heading);
  --speakers-marker: var(--color-speakers-marker);
  --speakers-card-bg: var(--color-speakers-card-bg);
  --speakers-card-border: var(--color-speakers-card-border);
  --speakers-card-shadow: var(--color-speakers-card-shadow);
  --speakers-card-shadow-hover: var(--color-speakers-card-shadow-hover);
  --speakers-more-bg: var(--color-speakers-more-bg);
  --speakers-more-border: var(--color-speakers-more-border);
  --speakers-more-text: var(--color-speakers-more-text);
  --speakers-more-shadow-offset: var(--color-speakers-more-shadow-offset);
  --speakers-more-shadow: var(--color-speakers-more-shadow);

  position: relative;
  isolation: isolate;
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: 104px 40px 120px;
  background: var(--speakers-section-bg);
  color: var(--speakers-heading);
  overflow: hidden;
  transition:
    background-color 0.35s ease,
    color 0.35s ease;
}

.speakers-container {
  width: min(100%, 1360px);
  margin: 0 auto;
}

.speakers-heading {
  position: relative;
  width: fit-content;
  margin: 0 auto 58px;
  padding: 34px 86px 42px;
  isolation: isolate;
}

.speakers-heading h2 {
  position: relative;
  z-index: 3;
  margin: 0;
  color: var(--speakers-heading);
  font-size: clamp(44px, 6.6vw, 92px);
  line-height: 0.9;
  font-weight: 950;
  text-align: center;
  text-transform: lowercase;
  letter-spacing: -0.075em;
}

.speakers-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 30px;
  align-items: stretch;
}

.speakers-more {
  display: none;
  width: fit-content;
  min-width: 220px;
  min-height: 58px;
  margin: 30px auto 0;
  padding: 0 30px;
  border: 2px solid var(--speakers-more-border);
  border-radius: 999px;
  background: var(--speakers-more-bg);
  color: var(--speakers-more-text);
  font-size: 20px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.04em;
  text-transform: lowercase;
  cursor: pointer;
  box-shadow:
    7px 7px 0 var(--speakers-more-shadow-offset),
    0 16px 34px var(--speakers-more-shadow);
  transition:
    transform 0.25s ease,
    background-color 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.speakers-more:hover {
  transform: translateY(-3px);
  box-shadow:
    9px 9px 0 var(--speakers-more-shadow-offset),
    0 22px 42px var(--speakers-more-shadow);
}

.speakers-more:active {
  transform: translateY(-1px);
}

.speaker-card {
  position: relative;
  min-height: 530px;
  display: grid;
  grid-template-rows: minmax(340px, 1fr) auto;
  border: 3px solid var(--speakers-card-border);
  border-radius: 30px;
  background:
    radial-gradient(circle at 76% 12%, rgba(255, 255, 255, 0.96), transparent 34%),
    linear-gradient(180deg, var(--speakers-card-bg) 0%, var(--color-speakers-card-bg-end) 100%);
  overflow: hidden;
  box-shadow:
    9px 9px 0 rgba(var(--palette-purple-rgb), 0.18),
    0 22px 48px var(--speakers-card-shadow);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
}

.speaker-card:hover {
  transform: translateY(-6px);
  border-color: var(--palette-peach);
  box-shadow:
    11px 11px 0 rgba(var(--palette-purple-rgb), 0.24),
    0 30px 58px var(--speakers-card-shadow-hover);
}

.speakers-section--dark .speaker-card {
  background: linear-gradient(
    180deg,
    var(--speakers-card-bg) 0%,
    var(--color-speakers-card-bg-end) 100%
  );
}

.speakers-section--dark .speaker-card:hover {
  border-color: var(--palette-purple);
}

.speakers-section--dark .speaker-card__photo-wrap::before {
  display: none;
}

.speaker-card__photo-wrap {
  position: relative;
  min-height: 340px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 0 10px;
  overflow: hidden;
}

.speaker-card__photo-wrap::before {
  content: '';
  position: absolute;
  left: 12%;
  right: 12%;
  bottom: 8px;
  height: 64%;
  border-radius: 999px;
  background: rgba(var(--palette-purple-rgb), 0.2);
  filter: blur(18px);
}

.speaker-card__photo {
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: -1px;
  width: min(96%, 310px);
  max-width: none;
  height: auto;
  max-height: calc(100% + 2px);
  display: block;
  transform: translateX(-50%) scale(1);
  transform-origin: center bottom;
  object-fit: contain;
  object-position: center bottom;
  transition: transform 0.25s ease;
}

.speaker-card:hover .speaker-card__photo {
  transform: translateX(-50%) scale(1.035);
}

.speaker-card__info {
  position: relative;
  z-index: 2;
  min-height: 156px;
  margin-top: 0;
  padding: 22px 24px 24px;
  border-radius: 26px 26px 0 0;
  background: var(--color-speakers-card-info-bg);
  box-shadow: 0 -10px 28px rgba(var(--palette-navy-rgb), 0.1);
}

.speaker-card__info h3 {
  margin: 0 0 12px;
  color: var(--color-speakers-card-info-text);
  font-size: clamp(21px, 1.6vw, 27px);
  line-height: 0.94;
  font-weight: 950;
  letter-spacing: -0.055em;
  overflow-wrap: anywhere;
  hyphens: auto;
}

.speaker-card__info p {
  margin: 0;
  color: var(--color-speakers-card-info-muted);
  font-size: clamp(13px, 1vw, 15px);
  line-height: 1.35;
  font-weight: 650;
  letter-spacing: -0.02em;
  overflow-wrap: anywhere;
  hyphens: auto;
}

@media (max-width: 1180px) {
  .speakers-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .speakers-section {
    padding: 80px 24px 92px;
  }

  .speakers-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px;
  }

  .speaker-card {
    min-height: 510px;
    grid-template-rows: minmax(330px, 1fr) auto;
  }

  .speaker-card__photo-wrap {
    min-height: 330px;
  }
}

@media (max-width: 600px) {
  .speakers-section {
    padding: 70px 16px 84px;
  }

  .speakers-heading {
    margin-bottom: 34px;
    padding: 26px 44px 32px;
  }

  .speakers-heading h2 {
    font-size: clamp(38px, 13vw, 58px);
    line-height: 0.92;
    letter-spacing: -0.065em;
  }

  .speaker-card__info p {
    font-size: 14px;
    line-height: 1.42;
  }

  .speakers-grid {
    grid-template-columns: 1fr;
    gap: 22px;
    max-width: 430px;
    margin: 0 auto;
  }

  .speakers-grid .speaker-card:nth-child(n + 5) {
    display: none;
  }

  .speakers-section--expanded .speakers-grid .speaker-card:nth-child(n + 5) {
    display: grid;
  }

  .speakers-more {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .speaker-card {
    min-height: 560px;
    grid-template-rows: minmax(360px, 1fr) auto;
    border-radius: 28px;
  }

  .speaker-card__photo-wrap {
    min-height: 360px;
  }

  .speaker-card__photo {
    width: min(92%, 330px);
  }

  .speaker-card__info {
    min-height: 158px;
    padding: 22px 22px 24px;
    border-radius: 24px 24px 0 0;
  }

  .speaker-card__info h3 {
    margin-bottom: 12px;
    font-size: clamp(25px, 7.5vw, 32px);
    line-height: 0.98;
    letter-spacing: -0.045em;
  }

  .speaker-card__info p {
    font-size: clamp(15px, 4.2vw, 17px);
    line-height: 1.42;
    font-weight: 650;
    letter-spacing: -0.015em;
  }
}

@media (max-width: 380px) {
  .speakers-section {
    padding-left: 12px;
    padding-right: 12px;
  }

  .speakers-heading {
    padding-left: 34px;
    padding-right: 34px;
  }

  .speakers-heading h2 {
    font-size: clamp(34px, 13vw, 46px);
  }

  .speaker-card {
    min-height: 548px;
    grid-template-rows: minmax(348px, 1fr) auto;
  }

  .speaker-card__photo-wrap {
    min-height: 348px;
  }

  .speaker-card__info {
    padding: 20px 18px 22px;
  }

  .speaker-card__info h3 {
    font-size: clamp(23px, 7.2vw, 29px);
  }

  .speaker-card__info p {
    font-size: clamp(14px, 4vw, 16px);
    line-height: 1.4;
  }
}

</style>
