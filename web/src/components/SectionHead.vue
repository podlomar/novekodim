<template>
  <div class="section-head">
    <div class="container">
      <div class="section-head__content">
        <h2 class="section-head__title">{{ title }}</h2>
        <p>
          {{ brief }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    brief: String,
  },
};
</script>

<style lang="scss">
.section-head {
  margin-top: 5rem;
  padding-top: 4rem;
  width: 100%;
  min-height: 120px;
  background-image: url('../assets/img/keys.png');
  background-repeat: repeat-x;
}

.section-head__content {
  text-align: center;
  padding: 1rem 2rem;
  background-color: $color-bg-tertiary;
  border-radius: 1rem;
  box-shadow: 0 0 10px #ddd;

  @include breakpoint-md {
    width: 50%;
    text-align: left;
  }
}
</style>
