<template>
  <div class="page">
    <header>
      <Navbar />
      <slot name="header"></slot>
    </header>
    <main class="main">
      <slot name="main"></slot>
    </main>
    <footer class="footer">
      <div class="container">Martin Podloucký</div>
    </footer>
  </div>
</template>

<script>
import Navbar from "./Navbar";

export default {
  name: "Page",
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
.page {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 1fr auto;

  min-height: 100vh;
}

.footer {
  padding: 2rem 0;
  background-color: #dce7f4;
}
</style>
