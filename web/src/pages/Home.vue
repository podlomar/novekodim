<template>
  <Page>
    <template v-slot:header>
      <div class="banner container">
        <div class="banner__lead">
          <h1>Kodím.cz</h1>
          <p>
            Kurzy programování pro všechny, kdo si chtějí hrát a zároveň věcem
            opravdu rozumět.
          </p>
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
              <div class="codex-card__text">
                Většina programátorů se začala učit svoje řemeslo tak, že je
                bavilo si prostě jen hrát a tvořit.
              </div>
            </div>
          </div>
          <div class="codex-card">
            <img class="codex-card__icon" :src="image2" />
            <div class="codex-card__body">
              <div class="codex-card__title">Bezpečí</div>
              <div class="codex-card__text">
                Všechny probírané pojmy vysvětlíme opravdu od základu a vstřícně
                ke všem, kteří ještě nemají žádné zkušenosti.
              </div>
            </div>
          </div>
          <div class="codex-card">
            <img class="codex-card__icon" :src="image3" />
            <div class="codex-card__body">
              <div class="codex-card__title">Znalosti</div>
              <div class="codex-card__text">
                Získáte skutečné vědomosti a dovednosti, které profesionální
                programátoři používají každý den.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="courses-section">
        <div class="courses container">
          <div class="courses__info">
            <h2>Czechitas</h2>
            <p>
              Kurzy pořádané ve spolupráci s Czechitas, kteří pomáhají holkám,
              ženám i dětem poznat svět informačních technologií.
            </p>
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
  flex-direction: column;
  @include breakpoint-md {
    flex-direction: row;
  }

  &__lead {
    max-width: 30rem;
    margin: 0 auto;
    text-align: center;
    padding-top: 3rem;
    padding-left: 2rem;
    padding-right: 2rem;

    @include breakpoint-md {
      text-align: left;
      padding-left: 0;
      padding-right: 2rem;
      width: 33.333%;
    }

    h1 {
      margin: 0;
      font-weight: 900;
      font-size: 3rem;
    }
  }

  &__graphic {
    width: 100%;
    height: 0;
    padding-bottom: 62%;

    @include breakpoint-md {
      text-align: left;
      padding-right: 2rem;
      width: $container-md * 2 / 3;
      height: $container-md * 2 / 3 * 0.62;
      padding-bottom: 0;
    }

    @include breakpoint-lg {
      width: $container-lg * 2 / 3;
      height: $container-lg * 2 / 3 * 0.62;
    }

    // width: 640px;
    // height: 397px;

    background-image: url("../assets/img/coding.svg");
    background-size: contain;
    background-repeat: no-repeat;
  }
}

.codex {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-left: 1rem;
  padding-right: 1rem;
  margin: 2rem -1.5rem 0 -1.5rem;

  @include breakpoint-md {
    flex-direction: row;
    align-items: flex-start;
    padding-left: 0;
    padding-right: 0;
  }
}

.codex-card {
  display: flex;
  align-items: flex-start;

  max-width: 20rem;
  margin: 1.5rem 0.5rem;

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
  flex-direction: column;
  align-items: center;

  margin-top: 5rem;
  margin-bottom: 5rem;

  @include breakpoint-md {
    flex-direction: row;
    align-items: flex-start;
  }

  &__info {
    text-align: center;
    max-width: 30rem;
    padding: 1rem 2rem;
    // padding-right: 2rem;
    background-color: $color-bg-tertiary;
    border-radius: 1rem;
    box-shadow: 0 0 10px #ddd;

    @include breakpoint-md {
      flex: 0 0 33.333%;
      text-align: left;
      // padding-left: 0;
      // padding-right: 1rem;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    @include breakpoint-md {
      flex: 0 0 66.666%;
      flex-direction: row;
      align-items: stretch;
    }
  }
}

.course-card {
  flex: 1;
  max-width: 20rem;
  // background-color: white;
  // box-shadow: 0 0 10px #ddd;
  // border-radius: 1rem;
  margin: 0 1rem;
  text-decoration: none;

  @include breakpoint-md {
    margin-bottom: 1rem;
  }

  &__image {
    width: 80%;
    height: auto;
    margin-left: 10%;
    margin-right: 10%;
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
