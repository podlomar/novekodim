<template>
  <ArticlePage>
    <template v-slot:uplink>
      <div class="chapter-link">
        <router-link
          :to="`/${$route.params.sectionLink}/${$route.params.courseLink}`"
          >{{ content.course.title }}</router-link
        >
      </div>
    </template>

    <template v-slot:links>
      <div class="article-link article-link--backward" v-if="content.back">
        <div class="arrow-left"></div>
        <router-link
          :to="
            `/${$route.params.sectionLink}/${$route.params.courseLink}/${$route.params.chapterLink}/${content.back.link}`
          "
        >
          {{ content.back.title }}
        </router-link>
      </div>
      <div class="article-links-filler"></div>
      <div class="article-link article-link--forward" v-if="content.forward">
        <router-link
          :to="
            `/${$route.params.sectionLink}/${$route.params.courseLink}/${$route.params.chapterLink}/${content.forward.link}`
          "
        >
          {{ content.forward.title }}
        </router-link>
        <div class="arrow-right"></div>
      </div>
    </template>

    <template v-slot:num>{{ content.lesson.order }}</template>

    <template v-slot:title>{{ content.lesson.title }}</template>

    <template v-slot:brief>{{ content.lesson.brief }}</template>

    <template v-slot:outline>
      <nav class="article-outline">
        <a
          class="toc-link"
          v-for="tocItem in content.toc"
          :key="tocItem.anchor"
          :href="`#${tocItem.anchor}`"
          >{{ tocItem.content }}</a
        >
      </nav>
    </template>

    <template v-slot:articleBody>
      <base
        :href="
          `/${$route.params.sectionLink}/${$route.params.courseLink}/${$route.params.chapterLink}/${$route.params.lessonLink}/`
        "
      />
      <template v-for="(section, idx) in content.sections">
        <TextSection
          v-if="section.type === '@text'"
          :key="idx"
          :html="section.html"
        ></TextSection>
        <section
          v-if="section.type === '@exercises'"
          :key="idx"
          class="article-section exercises-section"
        >
          <h2
            v-if="section.title && section.level === 2"
            :id="section.anchor"
            class="exrc-section-title"
          >
            <a class="anchor" :href="`#${section.anchor}`">¶</a>
            {{ section.title }}
          </h2>
          <div v-if="section.title === 'bonuses'" class="exrc-bonuses">
            <div class="exrc-bonuses__head">Bonusová cvičení</div>
            <div class="exrc-bonuses__body">
              Nepovinné úložky, které můžete řešit pokud máte chuť na větší
              výzvu nebo si chcete látku procvičit víc do hloubky.
            </div>
          </div>
          <ExerciseSection
            v-for="(exrc, eidx) in section.data"
            :key="eidx"
            :sectionLink="$route.params.sectionLink"
            :courseLink="$route.params.courseLink"
            :chapterLink="$route.params.chapterLink"
            :lessonLink="$route.params.lessonLink"
            :exrcNum="exrc.num"
            :exrcLink="exrc.link"
          ></ExerciseSection>
        </section>
      </template>
    </template>
  </ArticlePage>
</template>

<script>
import { fetchLesson } from 'libs/courses';
import ArticlePage from 'components/ArticlePage';
import TextSection from 'components/TextSection';
import ExerciseSection from 'components/ExerciseSection';

export default {
  name: 'Article',
  components: {
    ArticlePage,
    TextSection,
    ExerciseSection,
  },
  serverPrefetch() {
    return fetchLesson(
      this.$route.params.sectionLink,
      this.$route.params.courseLink,
      this.$route.params.chapterLink,
      this.$route.params.lessonLink,
    )
      .then((content) => {
        this.content = content;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss">
@import 'highlight.js/scss/gml.scss';

@mixin button {
  background-color: $color-bg-tertiary;
  background-size: contain;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1.25rem;
  box-shadow: 0 0 10px #ddd;
}

.article-outline {
  margin: 2rem 3rem 0 0;
}

.arrow-left {
  @include button;
  background-image: url('img/arrow-left.svg');
}

.arrow-right {
  @include button;
  background-image: url('img/arrow-right.svg');
}

.chapter-link {
  padding-left: 1rem;

  a {
    text-decoration: none;
    color: black;
    font-size: 1.2rem;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
}

.article-links {
  display: flex;
  margin-top: 1rem;
}

.article-links-filler {
  flex: 1;
}

.article-link {
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    color: black;

    &:hover {
      text-decoration: underline;
    }
  }

  &--backward {
    margin-left: -1.25rem;

    a {
      margin-left: 2.75rem;
    }
  }

  &--forward {
    margin-right: -1.25rem;

    a {
      margin-right: 2.75rem;
    }
  }
}

.toc-link {
  display: block;
  width: 100%;
  text-decoration: none;
  color: black;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: $color-bg-primary;
  }
}

.exrc-section-title {
  margin-top: 1rem !important;
  margin-bottom: 0rem !important;
}

.exrc-bonuses {
  padding: 2rem 4rem;
  color: white;
  background-color: orange;

  &__head {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  margin-bottom: 1rem;
}

.article-section {
  padding: 2rem 0;
}

.warn-section {
  background-color: #e2252b;
  color: white;
}

.text-section {
  table {
    tr:nth-child(even) {
      background-color: #e8e8e8;
    }
  }
}

.exercises-section {
  background-color: $color-bg-tertiary;
}

.block-image {
  margin: 3rem 0;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
}

.fig {
  display: block;
  margin: 2rem auto;
  height: auto;

  li > & {
    margin: 1rem auto;
  }

  &-100 {
    width: 100%;
  }

  &-90 {
    width: 90%;
  }

  &-80 {
    width: 80%;
  }

  &-70 {
    width: 70%;
  }

  &-60 {
    width: 60%;
  }

  &-50 {
    width: 50%;
  }
}

table {
  margin: 2rem auto;

  thead {
    border-bottom: 2px solid #333;
  }

  td {
    padding: 0.5rem;
  }
}
</style>
