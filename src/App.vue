<template>
  <VueGanttastic/>
</template>

<script>
import VueGanttastic from './components/VueGanttastic.vue'

export default {
  name: 'App',
  components: {
    VueGanttastic,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
