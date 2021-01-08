<template>
  <div id="app">
    <Header />
    <div class="container mx-auto mt-4 pt-4">
      <div class="flex flex-wrap">
        <Navigation
          :algorithm.sync="algorithm"
          :element.sync="element"
          :speed.sync="speed"
          :allow-diagonal.sync="allowDiagonal"
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
import { states, types, algorithms } from "@/algorithms/constants";
import { calculateBFS } from "@/algorithms/breadthFirstSearch";
import { calculateDijkstra } from "@/algorithms/dijkstra";
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
      element: types.wall,
      algorithm: algorithms.dijkstra,
      speed: 100,
      allowDiagonal: true
    };
  },
  methods: {
    async findPath() {
      // Make sure the gird is in its initial state
      this.grid.forEach((row) => {
        row.forEach((cell) => {
           cell.state = states.unvisited
           cell.parent = null
           cell.distance = '∞'
        })
      })
      let pathFound = false;
      if (this.algorithm === algorithms.bfs) {
        pathFound = await calculateBFS(this.grid, this.allowDiagonal, this.speed);
      }
      if (this.algorithm === algorithms.dijkstra) {
        pathFound = await calculateDijkstra(this.grid, this.allowDiagonal, this.speed);
      }
      if (this.algorithm === algorithms.astar) {
        // calculateAstar(this.grid)
        console.log("Calculating A*");
      }

      if(!pathFound) {
        this.$alert('Es wurde kein passender Pfad gefunden.', '', 'warning');
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
