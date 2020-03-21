<template>
  <Page>
    <template v-slot:header>
      <div class="banner container">
        <div class="banner__lead">
          <h1>Kodím.cz</h1>
          <p>Kurzy programování pro všechny, kdo si chtějí hrát a zároveň věcem opravdu rozumět.</p>
        </div>
        <div class="banner__graphic"></div>
      </div>
    </template>

    <template v-slot:main>
      <div class="container">
        <div class="codex">
          <div class="codex-card">
            <img class="codex-card__icon" :src="image1" />
            <div class="codex-card__body">
              <div class="codex-card__title">Hravost</div>
              <div
                class="codex-card__text"
              >Většina programátorů se začala učit svoje řemeslo tak, že je bavilo si prostě jen hrát a tvořit.</div>
            </div>
          </div>
          <div class="codex-card">
            <img class="codex-card__icon" :src="image2" />
            <div class="codex-card__body">
              <div class="codex-card__title">Bezpečí</div>
              <div
                class="codex-card__text"
              >Všechny probírané pojmy vysvětlíme opravdu od základu a vstřícně ke všem, kteří ještě nemají žádné zkušenosti.</div>
            </div>
          </div>
          <div class="codex-card">
            <img class="codex-card__icon" :src="image3" />
            <div class="codex-card__body">
              <div class="codex-card__title">Znalosti</div>
              <div
                class="codex-card__text"
              >Získáte skutečné vědomosti a dovednosti, které profesionální programátoři používají každý den.</div>
            </div>
          </div>
        </div>
      </div>
      <div class="courses-section">
        <div class="courses container">
          <div class="courses__info">
            <h2>Czechitas</h2>
            <p>Kurzy pořádané ve spolupráci s Czechitas, kteří pomáhají holkám, ženám i dětem poznat svět informačních technologií.</p>
          </div>

          <div class="courses__list">
            <router-link
              class="course-card"
              v-for="course in courses"
              :key="course.link"
              :to="`/czechitas/${course.link}`"
            >
              <img class="course-card__image" :src="courseImages[course.link]" />
              <div class="course-card__body">
                <h3>{{ course.title }}</h3>
                <p>{{ course.brief }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </Page>
</template>

<script>
import { fetchCoursesList } from "libs/courses";
import Page from "components/Page";
import image1 from "../assets/img/playfulness.svg";
import image2 from "../assets/img/safety.svg";
import image3 from "../assets/img/knowledge.svg";

import course1 from "../assets/img/daweb.svg";
import course2 from "../assets/img/python-data.svg";

export default {
  name: "Home",
  components: {
    Page
  },
  serverPrefetch() {
    this.image1 = image1;
    this.image2 = image2;
    this.image3 = image3;
    this.courseImages = {
      daweb: course1,
      "python-data": course2
    };

    return fetchCoursesList("czechitas")
      .then(data => (this.courses = data))
      .catch(err => console.log(err));
  }
};
</script>

<style lang="scss">
.banner {
  display: flex;

  &__lead {
    width: 320px;
    padding-top: 3rem;

    h1 {
      margin: 0;
      font-weight: 900;
      font-size: 3rem;
    }
  }

  &__graphic {
    width: 640px;
    height: 397px;

    background-image: url("../assets/img/coding.svg");
    background-size: contain;
  }
}

.home {
  &__main {
    display: flex;
  }
}

.codex {
  display: flex;
  margin: 2rem -1.5rem 0 -1.5rem;
}

.codex-card {
  display: flex;
  align-items: flex-start;

  width: 320px;
  margin: 1.5rem;

  &__icon {
    width: 3rem;
    height: auto;
  }

  &__body {
    margin-left: 1rem;
  }

  &__title {
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
}

.courses {
  display: flex;
  margin-top: 5rem;
  margin-bottom: 5rem;

  &__info {
    flex: 0 0 33.333%;
    padding-right: 1rem;
  }

  &__list {
    flex: 0 0 66.666%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin-top: 4rem;

    &::before {
      content: "";
      position: absolute;
      display: block;
      background-color: #c3e5de;
      top: 4rem;
      left: 7rem;
      width: calc(100% - 6rem);
      height: calc(100% - 3rem);
      border-radius: 1rem;
      z-index: -1;
    }
  }
}

.course-card {
  flex: 1;
  background-color: white;
  box-shadow: 0 0 10px #ddd;
  border-radius: 1rem;
  margin: 1rem;
  text-decoration: none;

  &__image {
    width: 100%;
    height: auto;
    margin-top: -8rem;
  }

  &__body {
    padding: 0 2rem 2rem 2rem;
    margin-top: -1rem;

    h3 {
      margin: 0;
    }
  }
}
</style>
