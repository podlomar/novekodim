<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700,900|Roboto+Mono:400,700&display=fallback&subset=latin-ext');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Montserrat', sans-serif;
  font-size: 15px;
}

body {
  margin: 0;
  color: $color-text-primary;
  background-color: #f9f9f9;
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

.btn {
  border: none;
  outline: none;
  border-radius: 1rem;
  padding: 0.5rem 1rem;
  text-align: center;
  text-decoration: none;
  color: black;
  box-shadow: 0 0 10px #ddd;
  transition: 400ms;

  &:hover {
    transform: scale(1.1);
  }
}

.btn-open {
  background-color: $color-bg-tertiary;
}
</style>
