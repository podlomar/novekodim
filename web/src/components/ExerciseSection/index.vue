<template>
  <div class="exercise">
    <div class="exercise__head">
      <div class="exercise__title">
        <div class="exercise__num">{{ exrcNum }}</div>
        <h3 :id="content.anchor">
          <a class="anchor" :href="`#${content.anchor}`">¶</a>
          {{ content.title }}
        </h3>
      </div>
      <div class="exercise__demand">
        <div :class="`demand demand--${content.demand}`"></div>
        <div class="demand-text">{{ content.demandText }}</div>
      </div>
    </div>
    <div class="exercise__body" v-html="content.html"></div>
  </div>
</template>

<script>
import { fetchExercise } from "libs/courses";

export default {
  props: {
    sectionLink: String,
    courseLink: String,
    chapterLink: String,
    lessonLink: String,
    exrcLink: String,
    exrcNum: Number
  },
  serverPrefetch() {
    return fetchExercise(
      this.sectionLink,
      this.courseLink,
      this.chapterLink,
      this.lessonLink,
      this.exrcLink
    )
      .then(content => (this.content = content))
      .catch(err => console.log(err));
  }
};
</script>

<style lang="scss">
.exercise {
  &__head {
    display: flex;
    margin-left: -1.5rem;
  }

  &__num {
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    background-color: white;
    box-shadow: 0 0 10px #ddd;
    border-radius: 1.5rem;
    text-align: center;
  }

  &__title {
    display: flex;
    align-items: baseline;
    flex: 1;
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 0rem;

    h3 {
      font-size: 100%;
      padding-left: 2.5rem;
      margin-bottom: 0.5rem;
    }
  }

  &__demand {
    margin-top: 2rem;
    padding-right: 4rem;
    text-align: right;
  }

  &__body {
    & > p,
    & > ul,
    & > ol,
    & > dl {
      margin-left: 4rem;
      margin-right: 4rem;
    }
  }

  table {
    tr:nth-child(even) {
      background-color: #ffe664;
    }
  }
}

.demand {
  min-width: 70px;
  height: 14px;
  background-size: contain;
  background-position-x: right;
  background-repeat: no-repeat;
  background-size: 70px 14px;

  &--1 {
    background-image: url("./img/demand1.svg");
  }

  &--2 {
    background-image: url("./img/demand2.svg");
  }

  &--3 {
    background-image: url("./img/demand3.svg");
  }

  &--4 {
    background-image: url("./img/demand4.svg");
  }

  &--5 {
    background-image: url("./img/demand5.svg");
  }
}

.demand-text {
  font-size: 0.8rem;
  font-weight: bold;
}
</style>
