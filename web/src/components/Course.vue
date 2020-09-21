<template>
  <div class="course-card">
    <img
      class="course-card__image"
      :src="`/czechitas/assets/${courseLink}.svg`"
    />
    <div class="course-card__body">
      <h3>{{ course.title }}</h3>
      <p>{{ course.brief }}</p>
      <router-link class="btn btn-open" :to="`/czechitas/${courseLink}`"
        >Přejít na kurz</router-link
      >
    </div>
  </div>
</template>

<script>
import { fetchCourse } from 'libs/courses';

export default {
  props: {
    sectionLink: String,
    courseLink: String,
  },
  serverPrefetch() {
    return fetchCourse(this.sectionLink, this.courseLink)
      .then((course) => {
        this.course = course;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss">
.course-card {
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 20rem;
  margin-top: 4rem;

  @include breakpoint-md {
    flex: 0 0 33.333%;
  }

  &__image {
    flex: 0 0 auto;
    width: 70%;
    height: auto;
    margin: 0 15% 1rem 15%;
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0 2rem;

    h3 {
      margin: 0;
    }

    p {
      flex: 1;
    }
  }
}
</style>
