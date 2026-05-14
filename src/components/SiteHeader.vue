<template>
  <header class="header">
    <div class="header__inner">
      <a class="header__logo" href="#">
        <img
          src="https://xn--80aakggo2ad0a1f.xn--p1ai/assets/img/header_logos.png"
          alt="Создай НАШЕ"
        />
      </a>

      <nav class="header__nav">
        <a href="#program">В программе</a>
        <a href="#speakers">Спикеры</a>
        <a href="#schedule">Программа форума</a>
        <a href="#partners">Партнеры</a>
        <a href="#contacts">Как добраться</a>
      </nav>

      <div class="header__socials">
        <a class="header__social" href="#" aria-label="MAX">M</a>
        <a class="header__social" href="#" aria-label="Telegram">T</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  height: 94px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  background: transparent;
}

.header__inner {
  width: 100%;
  height: 100%;
  padding: 24px 52px 0;
  display: grid;
  grid-template-columns: 541px 1fr 96px;
  align-items: start;
  column-gap: 38px;
}

.header__logo {
  display: block;
  width: 541px;
  height: 47px;
  text-decoration: none;
}

.header__logo img {
  display: block;
  width: 541px;
  height: 47px;
  object-fit: contain;
}

.header__nav {
  padding-top: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 34px;
}

.header__nav a {
  position: relative;
  color: #ffffff;
  text-decoration: none;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  white-space: nowrap;
  letter-spacing: -0.02em;
}

.header__nav a::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -7px;
  width: 0;
  height: 1px;
  background: #ffffff;
  transition: width 0.25s ease;
}

.header__nav a:hover::after {
  width: 100%;
}

.header__socials {
  padding-top: 1px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.header__social {
  width: 40px;
  height: 40px;
  border: 1px solid #ffffff;
  border-radius: 50%;
  color: #ffffff;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.header__social:hover {
  background: #ffffff;
  color: #050505;
}

@media (max-width: 1280px) {
  .header__inner {
    padding-left: 32px;
    padding-right: 32px;
    grid-template-columns: 420px 1fr 96px;
    column-gap: 24px;
  }

  .header__logo,
  .header__logo img {
    width: 420px;
    height: auto;
  }

  .header__nav {
    gap: 20px;
  }

  .header__nav a {
    font-size: 14px;
  }
}

@media (max-width: 980px) {
  .header {
    height: auto;
    position: relative;
    background: #050505;
  }

  .header__inner {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 22px;
  }

  .header__logo,
  .header__logo img {
    width: min(541px, 100%);
  }

  .header__nav {
    flex-wrap: wrap;
    gap: 16px 24px;
    padding-top: 0;
  }

  .header__socials {
    padding-top: 0;
  }
}

@media (max-width: 560px) {
  .header__inner {
    padding: 18px 14px;
  }

  .header__nav {
    flex-direction: column;
    gap: 14px;
  }

  .header__nav a {
    font-size: 15px;
  }
}
</style>