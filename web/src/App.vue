<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700,900|Roboto+Mono:400,700&display=fallback&subset=latin-ext");

* {
  box-sizing: border-box;
}

html {
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
}

body {
  margin: 0;
  color: $color-text-primary;
  background-image: linear-gradient(to bottom right, #f1f2d9, #bbeaf6);
}

.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;

  @include breakpoint-sm {
    width: $container-sm;
  }

  @include breakpoint-md {
    width: $container-md;
  }

  @include breakpoint-lg {
    width: $container-lg;
  }
}
</style>
