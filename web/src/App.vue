<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700,900|Space+Mono:400,700|Roboto+Mono:400,700&display=swap&subset=latin-ext");

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
  width: 960px;
  margin-left: auto;
  margin-right: auto;
}
</style>
