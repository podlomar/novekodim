<template>
  <div class="chapter">
    <SectionHead :title="chapter.title" :brief="chapter.brief" />

    <div class="container">
      <div class="lessons">
        <div
          class="lesson"
          v-for="(lesson, index) in chapter.lessons"
          :key="lesson.link"
        >
          <div class="lesson__head">
            <div class="lesson-num">{{ index + 1 }}</div>
            <h3>{{ lesson.title }}</h3>
          </div>
          <div class="lesson__body">
            <p>{{ lesson.brief }}</p>
            <router-link
              append
              class="btn btn-open"
              :to="`${chapter.link}/${lesson.link}`"
              >Otevřít lekci</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchChapter } from 'libs/courses';
import SectionHead from 'components/SectionHead';

export default {
  components: {
    SectionHead,
  },
  props: {
    sectionLink: String,
    courseLink: String,
    chapterLink: String,
  },
  serverPrefetch() {
    return fetchChapter(this.sectionLink, this.courseLink, this.chapterLink)
      .then((chapter) => {
        this.chapter = chapter;
        console.log('chapter', chapter);
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss">
.chapter {
  margin-bottom: 4rem;
}

.chapter-title {
  text-transform: uppercase;
  font-weight: 900;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  box-shadow: 0 0 10px #ddd;
  padding: 2rem;
  margin: 3rem 0;
}

.lessons {
  display: flex;
  flex-direction: column;
  margin: 4rem 0;

  @include breakpoint-md {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.lesson {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 1rem;

  @include breakpoint-sm {
    flex: 0 0 50%;
  }

  @include breakpoint-lg {
    flex: 0 0 33.33%;
  }

  &__head {
    display: flex;
    align-items: baseline;
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 4rem;

    p {
      flex: 1;
    }
  }

  h3 {
    margin: 0 2rem 0 1rem;
    font-size: 1.2rem;
  }
}

.lesson-num {
  flex: 0 0 auto;
  background-color: #d1e0f1;
  box-shadow: 0 0 10px #ddd;
  width: 3rem;
  height: 3rem;
  text-align: center;
  line-height: 3rem;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 1.5rem;
}
</style>
