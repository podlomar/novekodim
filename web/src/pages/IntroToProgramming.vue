<template>
  <CoursePage courseTitle="Úvod do programování">
    <template v-slot:chapters>
      <h2 class="chapter-title">{{chapters[0].title}}</h2>
      
      <div class="lessons">
        <div 
          class="lesson"
          v-for="(lesson, index) in chapters[0].lessons"
          :key="lesson.link"
        >
          <router-link append :to="`${chapters[0].link}/${lesson.link}`">
            <div class="lesson__head">
              <div class="lesson-num">{{index+1}}</div>
              <h3>{{lesson.title}}</h3>
            </div>
            <p>{{lesson.brief}}</p>
          </router-link>
        </div>
      </div>
    </template>
  </CoursePage>
</template>

<script>
import CoursePage from 'components/CoursePage';
import { fetchChapter } from 'libs/courses';

export default {
  components: {
    CoursePage,
  },
  serverPrefetch() {
    return Promise.all([
      fetchChapter('czechitas', 'uvod-do-progr', 'prvni-krucky'),
    ]).then(
      chapters => this.chapters = chapters
    ).catch(
      err => console.log(err),
    ); 
  }
}
</script>

<style lang="scss">
.chapter-title {
  text-transform: uppercase;
  font-weight: 900;
  text-align: center;
  color: $color-bg-tertiary;
  margin: 3rem 0;
}

.lessons {
  display: flex;
  flex-wrap: wrap;
}

.lesson {
  flex: 0 0 33.333%;
  width: 33.333%;
  margin-bottom: 2rem;
  transition: 400ms;


  &:hover {
    transform: scale(1.1);
    h3 {
      color: orange;
    }

    .lesson-num {
      background-color: orange;
    }
  }

  &__head {
    display: flex;
    align-items: baseline;
    padding-right: 1rem;
    color: $color-bg-tertiary;
  }

  h3 {
    margin: 0 2rem 0 1rem;
    font-size: 1.2rem;
  }

  a {
    text-decoration: none;
  }

  p {
    padding: 0 2rem 0 3.5rem;
  }
}

.lesson-num {
  background-color: $color-bg-tertiary;
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  line-height: 2.5rem;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 6px;
}
</style>
