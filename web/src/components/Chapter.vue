<template>
  <div class="chapter">
    <h2 class="chapter-title">{{ chapter.title }}</h2>

    <div class="lessons">
      <div class="lesson" v-for="(lesson, index) in chapter.lessons" :key="lesson.link">
        <router-link append :to="`${chapter.link}/${lesson.link}`">
          <div class="lesson__head">
            <div class="lesson-num">{{ index + 1 }}</div>
            <h3>{{ lesson.title }}</h3>
          </div>
          <p>{{ lesson.brief }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchChapter } from "libs/courses";

export default {
  props: {
    sectionLink: String,
    courseLink: String,
    chapterLink: String
  },
  serverPrefetch() {
    return fetchChapter(this.sectionLink, this.courseLink, this.chapterLink)
      .then(chapter => {
        this.chapter = chapter;
        console.log("chapter", chapter);
      })
      .catch(err => console.log(err));
  }
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
  margin: 0 -1.5rem;

  @include breakpoint-md {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.lesson {
  background-color: $color-bg-tertiary;
  border-radius: 1rem;
  box-shadow: 0 0 10px #ddd;
  margin: 1.5rem;
  margin-bottom: 2rem;
  transition: 400ms;
  padding: 1.5rem 2.5rem;

  @include breakpoint-sm {
    flex: 0 0 calc(50% - 3rem);
  }

  @include breakpoint-lg {
    flex: 0 0 calc(33.33% - 3rem);
  }

  &:hover {
    transform: scale(1.1);
  }

  &__head {
    display: flex;
    align-items: baseline;
    margin-left: -2rem;

    @include breakpoint-sm {
      margin-left: -4rem;
    }
  }

  h3 {
    margin: 0 2rem 0 1rem;
    font-size: 1.2rem;
  }

  a {
    text-decoration: none;
  }
}

.lesson-num {
  flex: 0 0 auto;
  background-color: white;
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
