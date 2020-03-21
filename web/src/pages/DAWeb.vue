<template>
  <CoursePage courseTitle="Digitální akademie Web">
    <template v-slot:chapters>
      <Chapter sectionLink="czechitas" courseLink="daweb" chapterLink="priprava" />
      <Chapter sectionLink="czechitas" courseLink="daweb" chapterLink="html-css" />
      <Chapter sectionLink="czechitas" courseLink="daweb" chapterLink="zaklady-js" />
      <Chapter sectionLink="czechitas" courseLink="daweb" chapterLink="pokrocily-js" />
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
