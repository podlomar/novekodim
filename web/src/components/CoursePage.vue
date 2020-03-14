<template>
  <Page>
    <template v-slot:header>
      <div class="container">
        <h1>{{courseTitle}}</h1>
      </div>
    </template>

    <template v-slot:main>
      <div class="container">
        <slot name="chapters"></slot>
      </div>
    </template>
  </Page>
</template>

<script>
import Page from "components/Page";

export default {
  components: {
    Page
  },
  props: {
    courseTitle: String
  }
};
</script>
