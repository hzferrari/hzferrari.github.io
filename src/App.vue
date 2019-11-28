<template>
  <div id="app">
    <todoPC />
    <!-- <icons /> -->

    <div style="text-align:center;margin-top:50px;">Copyright © 2019 ~Chriz~</div>
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
body,
html {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background: #efefef;
  min-height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}
</style>
