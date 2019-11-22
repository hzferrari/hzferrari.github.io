<template>
  <div id="app">
    <HelloWorld />
    <!-- <icons /> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import icons from "./components/Icon";

export default {
  name: "app",
  components: {
    HelloWorld,
    icons
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body, html {
  margin: 0;
  padding: 0;
}
</style>
