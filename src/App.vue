<template>
  <div id="app">
    <todoPC />
    <!-- <icons /> -->

    <div style="text-align:center;padding:50px 0 30px 0;font-size:12px;color:#555;">
      Copyright © 2019
      <span style="font-style:italic">hzferrari@qq.com </span
      ><span class="version">-beta v0.1.1-</span>
    </div>
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
  overflow-x: hidden;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background: #efefef;
  min-height: 100vh;
  width: 100vw;
}
</style>
