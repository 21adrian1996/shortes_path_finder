<template>
  <div id="app">
    <Header />
    <div class="container mx-auto mt-4 pt-4">
      <div class="flex flex-wrap">
        <Navigation
          :algorithm.sync="algorithm"
          :element.sync="element"
          @find="findPath()"
        />
        <Grid
            :grid.sync="grid"
            :element="element"
            :algorithm="algorithm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Grid from "@/components/Grid.vue";
import Header from "@/components/Header.vue";
import Navigation from "@/components/Navigation";
import { types, algorithms } from "@/algorithms/constants";
import { calculateBFS } from "@/algorithms/breadthFirstSearch";
// import { calculateDijkstra } from "@/algorithms/dijkstra";
// import { calculateAstar } from "@/algorithms/astar";

export default {
  name: "App",
  components: {
    Grid,
    Header,
    Navigation,
  },
  data() {
    return {
      grid: [],
      element: types.start,
      algorithm: algorithms.bfs,
    };
  },
  methods: {
    findPath() {
      if (this.algorithm === algorithms.bfs) {
        calculateBFS(this.grid);
      }
      if (this.algorithm === algorithms.dijkstra) {
        // calculateDijkstra(this.grid);
        console.log("Calculating Djikstra");
      }
      if (this.algorithm === algorithms.astar) {
        // calculateAstar(this.grid)
        console.log("Calculating A*");
      }
    },
  },
};
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
