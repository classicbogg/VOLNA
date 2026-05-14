<template>
  <section class="audience-section" id="audience">
    <div class="audience-pixels audience-pixels--left" aria-hidden="true"></div>
    <div class="audience-pixels audience-pixels--right" aria-hidden="true"></div>
    <div class="audience-pixels audience-pixels--top" aria-hidden="true"></div>

    <div class="audience-container">
      <div class="audience-heading">
        <h2>Для кого форум?</h2>

        <svg
          class="heading-marker"
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

      <p class="audience-intro">
        Создай НАШЕ — форум для молодых предпринимателей, которые хотят запустить
        свой проект, найти точки роста и превратить идею в реальный бизнес.
      </p>

      <div class="audience-layout">
        <article class="audience-card audience-card--start" data-symbol="→">
          <h3>старт</h3>
          <p>
            Если ты только думаешь о собственном бизнесе, поможем сделать первый шаг.
            Присоединяйся и узнай, как начать бизнес без опыта, собрать команду,
            проверить идею и запустить свое дело.
          </p>
        </article>

        <article class="audience-card audience-card--scale" data-symbol="⤢">
          <h3 class="scale-title">
            <span>масштабирование</span>
          </h3>

          <p>
            Если проект уже есть, здесь ты найдешь новые идеи, мотивацию и полезные
            знакомства. В программе — лекции, сессии с экспертами, нетворкинг,
            а также кейсы реальных предпринимателей и финалистов конкурса «Создай НАШЕ».
          </p>
        </article>

        <article class="audience-card audience-card--opportunities" data-symbol="✦">
          <h3>возможности</h3>
          <p>
            Форум откроет доступ к инструментам, которые помогают расти быстрее:
            гранты для молодых предпринимателей, акселерационные программы,
            обучение ключевым предпринимательским навыкам — от продуктового подхода
            до управления финансами.
          </p>
        </article>
      </div>

      <p class="audience-bottom">
        Здесь ты получишь не только вдохновение, но и практические инструменты для
        старта и развития своего дела. Это возможность посмотреть на бизнес через
        реальные истории и практику опытных предпринимателей.
      </p>
    </div>
  </section>
</template>

<style scoped>
.audience-section {
  position: relative;
  width: 100%;
  padding: 90px 40px 110px;
background: #f8e34b;
  color: var(--color-purple, #1e1739);
  overflow: hidden;
}

.audience-pixels {
  position: absolute;
  z-index: 1;
  pointer-events: none;
  opacity: 0.9;
}

.audience-pixels--left {
  left: -80px;
  top: 180px;
  width: 54px;
  height: 54px;
  background: rgba(30, 23, 57, 0.16);
  box-shadow:
    54px 0 0 rgba(30, 23, 57, 0.18),
    108px 0 0 rgba(30, 23, 57, 0.12),
    162px 0 0 rgba(30, 23, 57, 0.08),
    0 54px 0 rgba(30, 23, 57, 0.13),
    54px 54px 0 rgba(30, 23, 57, 0.10),
    162px 54px 0 rgba(30, 23, 57, 0.13),
    216px 54px 0 rgba(30, 23, 57, 0.08),
    54px 108px 0 rgba(30, 23, 57, 0.12),
    108px 108px 0 rgba(30, 23, 57, 0.09),
    216px 108px 0 rgba(30, 23, 57, 0.10),
    0 162px 0 rgba(30, 23, 57, 0.08),
    108px 162px 0 rgba(30, 23, 57, 0.11),
    162px 162px 0 rgba(30, 23, 57, 0.07),
    54px 216px 0 rgba(30, 23, 57, 0.08),
    216px 216px 0 rgba(30, 23, 57, 0.06);
  transform: rotate(-8deg);
  animation: pixelFloatLeft 8s ease-in-out infinite;
}

.audience-pixels--right {
  right: -110px;
  bottom: 150px;
  width: 64px;
  height: 64px;
  background: rgba(30, 23, 57, 0.15);
  box-shadow:
    -64px 0 0 rgba(30, 23, 57, 0.11),
    -128px 0 0 rgba(30, 23, 57, 0.08),
    -192px 0 0 rgba(30, 23, 57, 0.10),
    0 -64px 0 rgba(30, 23, 57, 0.14),
    -64px -64px 0 rgba(30, 23, 57, 0.09),
    -192px -64px 0 rgba(30, 23, 57, 0.08),
    -256px -64px 0 rgba(30, 23, 57, 0.06),
    -64px -128px 0 rgba(30, 23, 57, 0.12),
    -128px -128px 0 rgba(30, 23, 57, 0.07),
    -256px -128px 0 rgba(30, 23, 57, 0.09),
    0 -192px 0 rgba(30, 23, 57, 0.08),
    -128px -192px 0 rgba(30, 23, 57, 0.10),
    -192px -192px 0 rgba(30, 23, 57, 0.06);
  transform: rotate(7deg);
  animation: pixelFloatRight 9s ease-in-out infinite;
}

.audience-pixels--top {
  right: 12%;
  top: 70px;
  width: 34px;
  height: 34px;
  background: rgba(30, 23, 57, 0.10);
  box-shadow:
    34px 0 0 rgba(30, 23, 57, 0.08),
    68px 0 0 rgba(30, 23, 57, 0.05),
    0 34px 0 rgba(30, 23, 57, 0.07),
    68px 34px 0 rgba(30, 23, 57, 0.09),
    102px 34px 0 rgba(30, 23, 57, 0.05),
    34px 68px 0 rgba(30, 23, 57, 0.08);
  transform: rotate(11deg);
  animation: pixelFloatTop 7s ease-in-out infinite;
}

@keyframes pixelFloatLeft {
  0%, 100% {
    transform: translateY(0) rotate(-8deg);
  }

  50% {
    transform: translateY(-18px) rotate(-5deg);
  }
}

@keyframes pixelFloatRight {
  0%, 100% {
    transform: translateY(0) rotate(7deg);
  }

  50% {
    transform: translateY(16px) rotate(4deg);
  }
}

@keyframes pixelFloatTop {
  0%, 100% {
    transform: translateY(0) rotate(11deg);
  }

  50% {
    transform: translateY(-12px) rotate(15deg);
  }
}

.audience-container {
  position: relative;
  z-index: 2;
  width: min(1460px, 100%);
  margin: 0 auto;
}

.audience-heading {
  position: relative;
  width: fit-content;
  margin: 0 auto 44px;
  padding: 42px 76px 46px;
}

.audience-heading h2 {
  position: relative;
  z-index: 2;
  margin: 0;
  font-size: clamp(48px, 6.8vw, 92px);
  line-height: 0.9;
  font-weight: 900;
  text-align: center;
  text-transform: lowercase;
  letter-spacing: -0.08em;
}

.heading-marker {
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  width: 122%;
  height: 158%;
  color: var(--color-purple, #1e1739);
  transform: translate(-50%, -50%) rotate(-3deg);
  pointer-events: none;
}

.audience-intro {
  max-width: 790px;
  margin: 0 auto 70px;
  font-size: clamp(21px, 2vw, 31px);
  line-height: 1.18;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.04em;
}

.audience-layout {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
  align-items: stretch;
}

.audience-card {
  position: relative;
  min-height: 340px;
  padding: 42px 34px 38px;
  border: 2px solid var(--color-purple, #1e1739);
  border-radius: 34px;
  color: var(--color-purple, #1e1739);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: rgba(242, 245, 94, 0.9);
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(30, 23, 57, 0.08) 0px,
      rgba(30, 23, 57, 0.08) 1px,
      transparent 1px,
      transparent 26px
    ),
    repeating-linear-gradient(
      90deg,
      rgba(30, 23, 57, 0.08) 0px,
      rgba(30, 23, 57, 0.08) 1px,
      transparent 1px,
      transparent 26px
    );
  box-shadow:
    10px 10px 0 rgba(30, 23, 57, 0.12),
    0 22px 36px rgba(30, 23, 57, 0.12);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.audience-card:hover {
  transform: translateY(-8px) rotate(0deg);
  box-shadow:
    14px 14px 0 rgba(30, 23, 57, 0.16),
    0 28px 46px rgba(30, 23, 57, 0.16);
}

.audience-card::before {
  content: attr(data-symbol);
  position: absolute;
  top: 16px;
  right: 22px;
  font-size: 68px;
  line-height: 1;
  font-weight: 900;
  color: rgba(30, 23, 57, 0.16);
  text-shadow:
    3px 3px 0 rgba(30, 23, 57, 0.12),
    6px 6px 14px rgba(30, 23, 57, 0.16);
  pointer-events: none;
  user-select: none;
}

.audience-card h3 {
  position: relative;
  z-index: 2;
  width: 100%;
  margin: 0 0 24px;
  font-size: clamp(38px, 3.2vw, 58px);
  line-height: 0.9;
  font-weight: 900;
  text-align: center;
  text-transform: lowercase;
  letter-spacing: -0.07em;
}

.audience-card p {
  position: relative;
  z-index: 2;
  max-width: 430px;
  margin: 0;
  font-size: clamp(18px, 1.35vw, 22px);
  line-height: 1.28;
  font-weight: 800;
  text-align: center;
  letter-spacing: -0.035em;
}

.audience-card--start {
  transform: rotate(-2deg);
}

.audience-card--start::before {
  content: '';
  position: absolute;
  top: 18px;
  right: 24px;
  width: 92px;
  height: 92px;
  background: var(--color-purple, #1e1739);
  mask-image: url('/planet-rocket.svg');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-image: url('/planet-rocket.svg');
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  opacity: 0.22;
  filter: drop-shadow(6px 6px 0 rgba(30, 23, 57, 0.12));
  pointer-events: none;
}

.audience-card--scale {
  background-color: rgba(255, 255, 255, 0.58);
  color: #0b0814;
  transform: rotate(1deg) translateY(14px);
}

.audience-card--scale::before {
  top: 10px;
  right: 24px;
  font-size: 74px;
  transform: rotate(4deg);
  color: rgba(11, 8, 20, 0.16);
  text-shadow:
    3px 3px 0 rgba(11, 8, 20, 0.10),
    6px 6px 14px rgba(11, 8, 20, 0.16);
}

.scale-title {
  width: 100%;
  max-width: 100%;
  overflow: visible;
}

.scale-title span {
  display: block;
  width: fit-content;
  max-width: 100%;
  margin: 0 auto;
  font-size: clamp(30px, 2.35vw, 44px);
  line-height: 0.9;
  font-weight: 900;
  letter-spacing: -0.07em;
  white-space: nowrap;
}

.audience-card--opportunities {
  transform: rotate(2deg);
}

.audience-card--opportunities::before {
  top: -4px;
  right: 26px;
  font-size: 82px;
  transform: rotate(-8deg);
}

.audience-bottom {
  max-width: 820px;
  margin: 74px auto 0;
  font-size: clamp(21px, 2vw, 31px);
  line-height: 1.18;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.04em;
}

@media (max-width: 1100px) {
  .audience-section {
    padding: 82px 28px 96px;
  }

  .audience-layout {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 30px;
  }

  .audience-card--start {
    grid-column: 1;
    grid-row: 1;
    transform: rotate(-2deg);
  }

  .audience-card--opportunities {
    grid-column: 2;
    grid-row: 1;
    transform: rotate(2deg);
  }

  .audience-card--scale {
    grid-column: 1 / -1;
    grid-row: 2;
    width: min(520px, 100%);
    justify-self: center;
    transform: rotate(-1deg);
  }

  .audience-card:hover {
    transform: translateY(-6px) rotate(0deg);
  }
}

@media (max-width: 760px) {
  .audience-pixels {
    opacity: 0.45;
  }

  .audience-pixels--left {
    left: -130px;
  }

  .audience-pixels--right {
    right: -160px;
  }

  .audience-pixels--top {
    display: none;
  }

  .audience-layout {
    grid-template-columns: 1fr;
  }

  .audience-card--start,
  .audience-card--scale,
  .audience-card--opportunities {
    grid-column: auto;
    grid-row: auto;
    width: 100%;
    transform: none;
  }

  .audience-card {
    min-height: 280px;
  }
}

@media (max-width: 560px) {
  .audience-section {
    padding: 62px 16px 76px;
  }

  .audience-heading {
    margin-bottom: 34px;
    padding: 24px 26px 30px;
  }

  .audience-heading h2 {
    font-size: clamp(42px, 16vw, 66px);
  }

  .heading-marker {
    width: 136%;
    height: 168%;
  }

  .audience-intro {
    margin-bottom: 44px;
  }

  .audience-intro,
  .audience-bottom {
    font-size: 20px;
  }

  .audience-card {
    min-height: 250px;
    padding: 26px 22px 28px;
    border-radius: 26px;
  }

  .audience-card h3 {
    font-size: 40px;
  }

  .scale-title span {
    font-size: clamp(27px, 8.5vw, 34px);
  }

  .audience-card p {
    font-size: 17px;
  }

  .audience-card::before {
    top: 14px;
    right: 16px;
    font-size: 50px;
  }

  .audience-card--start::before {
    top: 14px;
    right: 16px;
    width: 64px;
    height: 64px;
  }

  .audience-bottom {
    margin-top: 44px;
  }
}
</style>
