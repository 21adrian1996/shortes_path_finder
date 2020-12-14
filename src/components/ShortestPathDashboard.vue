<template>
  <div class="container mx-auto mt-4 pt-4">
    <div class="flex flex-wrap">
      <ShortestPathSidebar
        :currentAlgorithm.sync="currentAlgorithm"
        :currentElementToPlace.sync="currentElementToPlace"
        @calculate="calculatePath()"
      />
      <div class="w-full sm:w-9/12 lg:w-8/12 px-4 sm:pr-10 lg:pr-4">
        <div class="my-8">
          <div class="mt-8">
            <h1 class="font-semibold mt-8 mb-2 text-3xl">
              Shortest Path Finder
            </h1>
            <p class="lead text-gray-600 text-l">
              Platziere zuerst den Start und den Endpunkt, sowie beliebig viele
              Hindernisse. Wähle anschliessend den gewünschten Algorithmus und
              starte die Pfadsuche.
            </p>
            <hr class="mt-6 mb-8 border-b-1 border-gray-300" />
          </div>
          <div v-for="(row, index) in grid" :key="index" class="h-10">
            <div
              v-for="(column, index) in row"
              :key="index"
              class="w-10 h-10 inline-block border-solid border-black border-r-2 border-b-2 p-2"
              :class="[column.type, column.state]"
              @click="placeElementOnMap(column)"
            >
              <div v-if="column.type === 'start'">
                <i class="fas fa-street-view block"></i>
              </div>
              <div v-if="column.type === 'end'">
                <i class="fas fa-flag-checkered block"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-2/12 px-4 hidden lg:block"></div>
    </div>
  </div>
</template>

<script>
import VueScreenSize from "vue-screen-size";
import ShortestPathSidebar from "@/components/ShortestPathSidebar";
import { states, types } from "@/algorithms/constants";
import { findNeighbours } from "@/algorithms/breadthFirstSearch";
import { flatMap } from "lodash";

export default {
  name: "ShortestPathDashboard",
  components: { ShortestPathSidebar },
  mixins: [VueScreenSize.VueScreenSizeMixin],

  data() {
    return {
      grid: [],
      queue: [],
      currentAlgorithm: "Breadth-First-Search",
      currentElementToPlace: types.wall,
    };
  },
  computed: {
    start() {
      return flatMap(this.grid).find((col) => col.type === types.start);
    },
    end() {
      return flatMap(this.grid).find((col) => col.type === types.end);
    },
  },
  methods: {
    placeElementOnMap(col) {
      // If you click on the start or the end icon change the current element to place on the map to clicked icon
      if (col.type === types.start || col.type === types.end) {
        this.currentElementToPlace = col.type;
        return;
      }

      // If you click on the wall icon change the current element to place on the map to wall
      if (
        this.currentElementToPlace !== types.wall &&
        col.type === types.wall
      ) {
        this.currentElementToPlace = col.type;
        return;
      }

      if (this.currentElementToPlace === types.wall) {
        if (col.type === types.wall) {
          col.type = types.free;
          return;
        }
        if (col.type !== types.free) return;
        col.type = types.wall;
      }

      if (this.currentElementToPlace === types.start) {
        if (col.type !== types.free) return;
        flatMap(this.grid).find((col) => col.type === types.start).type =
          types.free;
        col.type = types.start;
      }

      if (this.currentElementToPlace === types.end) {
        if (col.type !== types.free) return;
        flatMap(this.grid).find((col) => col.type === types.end).type =
          types.free;
        col.type = types.end;
      }
    },

    async calculatePath() {
      this.queue.push(this.start);

      while (this.queue.length) {
        let currentCell = this.queue.shift();
        console.log("Current Queue: ", this.queue.length, this.queue);
        console.log(`Handling cell x: ${currentCell.x} / y: ${currentCell.y}`);

        // If the current location is the target cell
        if (currentCell.y === this.end.y && currentCell.x === this.end.x) {
          console.log("Returning the grid");
          break;
        }

        // If not then we marke the current cell as visited
        this.grid[currentCell.y - 1][currentCell.x - 1].state = states.visited;

        // Check for neighbours
        let neighbours = findNeighbours(this.grid, currentCell);

        // Check if the neighbours were visitet and if not add them to the queue
        neighbours.forEach((n) => {
          if (n.state !== states.visited && n.state !== states.enqueued) {
            // Set the parent on the neighbour children
            n.parent = currentCell;
            this.grid[n.y - 1][n.x - 1].state = states.enqueued;
            console.log(`Adding x: ${n.x} / y: ${n.y} to the queue`);
            this.queue.push(n);
          }
        });
      }
      if (!this.end.parent) {
        this.error = true;
        return;
      }

      let path = [];
      let parent = this.end;

      while (parent) {
        path.push(parent);
        parent = parent.parent;
      }

      path.reverse();

      path.forEach((cell, index) => {
        setTimeout(function () {
          cell.state = states.shortest;
        }, 200 * (index + 1));
      });
    },
  },
  async mounted() {
    // optimize the grid size according to the place we have on the display
    let max = this.$vssWidth > 768 ? 12 : this.$vssWidth > 360 ? 8 : 6;

    for (let i = 1; i <= max; i++) {
      let row = [];
      for (let j = 1; j <= max; j++) {
        row.push({
          x: j,
          y: i,
          type: types.free,
          state: states.unvisited,
          parent: null,
        });
      }
      this.grid.push(row);
    }

    // Initialize start and end grid points
    this.grid[0][0].type = types.start;
    this.grid[max - 1][max - 1].type = types.end;
  },
};
</script>
