<template>
  <div id="app">
    <ShortestPathHeader />
    <ShortestPathDashboard />
  </div>
</template>

<script>
import ShortestPathDashboard from '@/components/ShortestPathDashboard.vue'
import ShortestPathHeader from '@/components/ShortestPathHeader.vue'

export default {
  name: 'App',
  components: {
    ShortestPathDashboard,
    ShortestPathHeader
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
