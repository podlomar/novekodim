<template>
  <CoursePage courseTitle="Datová analýza v Pythonu">
    <template v-slot:chapters>
      <Chapter sectionLink="czechitas" courseLink="python-data" chapterLink="zaklady-programovani" />
      <Chapter sectionLink="czechitas" courseLink="python-data" chapterLink="datova-analyza" />
    </template>
  </CoursePage>
</template>

<script>
import CoursePage from "components/CoursePage";
import Chapter from "components/Chapter";

export default {
  components: {
    CoursePage,
    Chapter
  }
};
</script>

<style lang="scss">
</style>
