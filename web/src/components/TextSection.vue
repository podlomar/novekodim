<template>
  <section class="article-section text-section" v-html="html"></section>
</template>

<script>
export default {
  props: {
    html: String,
  },
};
</script>
