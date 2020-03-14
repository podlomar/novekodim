<template>
  <CoursePage courseTitle="Datová analýza v Pythonu">
    <template v-slot:chapters>
      <Chapter sectionLink="czechitas" courseLink="python-data" chapterLink="zaklady-pythonu" />
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
