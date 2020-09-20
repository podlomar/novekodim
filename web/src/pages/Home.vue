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
      <SectionHead title="Czechitas">
        Kurzy pořádané ve spolupráci s Czechitas, kteří pomáhají holkám,
        ženám i dětem poznat svět informačních technologií.
      </SectionHead>
      <div class="courses container">
        <Course
          v-for="course in courses"
          sectionLink="czechitas"
          :courseLink="course"
          :key="course.link"
        />
      </div>
    </template>
  </Page>
</template>

<script>
import { fetchCoursesList } from "libs/courses";
import Page from "components/Page";
import SectionHead from "components/SectionHead";
import Course from "components/Course";
import image1 from "../assets/img/playfulness.svg";
import image2 from "../assets/img/safety.svg";
import image3 from "../assets/img/knowledge.svg";

export default {
  name: "Home",
  components: {
    Page,
    SectionHead,
    Course
  },
  serverPrefetch() {
    this.image1 = image1;
    this.image2 = image2;
    this.image3 = image3;

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
    padding-bottom: 55.55%;
    background-image: url("../assets/img/coding.svg");
    background-size: contain;
    background-repeat: no-repeat;

    @include breakpoint-md {
      margin-left: 2rem;
      flex: 0 0 $container-md * 0.8;
      height: $container-md * 0.8 * 0.5555;
      padding-bottom: 0;
    }

    @include breakpoint-lg {
      flex: 0 0 $container-lg * 0.8;
      height: $container-lg * 0.8 * 0.5555;
    }
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
  margin-bottom: 4rem;

  @include breakpoint-md {
    flex-flow: row wrap;
    align-items: stretch;
  }
}
</style>
