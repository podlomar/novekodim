<template>
  <div class="navbar container">
    <router-link class="page-logo" to="/">
      <div class="page-logo__icon"></div>
      <div class="page-logo__title">Kódím.cz</div>
    </router-link>
  </div>
</template>

<style lang="scss">
.page-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;

  &__icon {
    width: 2rem;
    height: 2rem;
    background-image: url("../assets/img/kodim-icon.svg");
    background-size: contain;
  }

  &__title {
    font-size: 1.2rem;
    font-weight: bold;
    margin-left: 0.5rem;
  }
}

.navbar {
  padding: 1rem 0;
}
</style>

