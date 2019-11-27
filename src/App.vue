<template>
  <div id="app">
    <todoPC />
    <!-- <icons /> -->
  </div>
</template>

<script>
import todoPC from "@/views/todo_pc.vue";
import icons from "./components/Icon";

export default {
  name: "app",
  components: {
    todoPC,
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
