<template>
  <Page>
    <template v-slot:header>
      <div class="container">
        <div class="course-banner">
          <div class="course-banner__lead">
            <h1>{{ course.title }}</h1>
            <p>{{ course.brief }}</p>
          </div>
          <img
            class="course-banner__image"
            :src="
              `/${$route.params.sectionLink}/assets/${$route.params.courseLink}.svg`
            "
          />
        </div>
      </div>
    </template>

    <template v-slot:main>
      <Chapter
        v-for="chapter in course.chapters"
        :sectionLink="$route.params.sectionLink"
        :courseLink="$route.params.courseLink"
        :chapterLink="chapter"
        :key="chapter.link"
      />
    </template>
  </Page>
</template>

<script>
import Page from 'components/Page';
import Chapter from 'components/Chapter';
import { fetchCourse } from 'libs/courses';

export default {
  components: {
    Page,
    Chapter,
  },
  serverPrefetch() {
    return fetchCourse(
      this.$route.params.sectionLink,
      this.$route.params.courseLink,
    )
      .then((data) => {
        this.course = data;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss">
.course-banner {
  display: flex;
  flex-direction: column;
  align-items: center;

  @include breakpoint-md {
    justify-content: space-between;
    flex-direction: row;
    align-items: stretch;
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
      margin: 0;
      width: 50%;
    }
  }

  &__image {
    width: 60%;
    height: auto;

    @include breakpoint-md {
      margin-left: 2rem;
      flex: 0 0 33.333%;
      width: 40%;
      height: auto;
      padding-bottom: 0;
    }
  }
}
</style>
