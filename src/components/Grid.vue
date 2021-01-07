<template>
  <div class="w-full sm:w-9/12 lg:w-8/12 px-4 sm:pr-10 lg:pr-4">
    <div class="my-8">
      <div class="mt-8">
        <h1 class="font-semibold mt-8 mb-2 text-3xl">Shortest Path Finder</h1>
        <p class="lead text-gray-600 text-l">
          Platziere zuerst den Start und den Endpunkt, sowie beliebig viele
          Hindernisse. Wähle anschliessend den gewünschten Algorithmus und
          starte die Pfadsuche.
        </p>
        <hr class="mt-6 mb-8 border-b-1 border-gray-300" />
      </div>
      <div v-for="(row, index) in grid" :key="index" class="flex justify-center">
        <div
          v-for="(column, index) in row"
          :key="index"
          class="w-12 h-12 border-solid border-black border-r-2 border-b-2 flex justify-center items-center"
          :class="[column.type, column.state]"
          @click="placeElementOnMap(column)"
        >
          <div v-if="column.type === 'start'">
            <i class="fas fa-street-view"></i>
          </div>
          <div v-if="column.type === 'end'">
            <i class="fas fa-flag-checkered"></i>
          </div>
          <div v-if="column.type === 'free'" class="text-xs">{{ column.weight }}<br>{{ column.distance }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueScreenSize from "vue-screen-size";
import { states, types } from "@/algorithms/constants";
import { flatMap } from "lodash";

export default {
  name: "Grid",
  mixins: [VueScreenSize.VueScreenSizeMixin],
  props: {
    grid: {
      type: Array,
      required: true,
    },
    element: {
      type: String,
      required: true
    }
  },

  methods: {
    placeElementOnMap(col) {
      if (this.element === types.wall) {
        if (col.type === types.wall) {
          col.type = types.free;
          return;
        }
        if (col.type !== types.free) return;
        col.type = types.wall;
      }

      if (this.element === types.start) {
        if (col.type !== types.free) return;
        flatMap(this.grid).find((col) => col.type === types.start).type =
          types.free;
        col.type = types.start;
      }

      if (this.element === types.end) {
        if (col.type !== types.free) return;
        flatMap(this.grid).find((col) => col.type === types.end).type =
          types.free;
        col.type = types.end;
      }
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
          distance: '∞', // Equivalent to infinity as the max grid sizes is 12x12 (144)
          weight: Math.floor(Math.random() * 50) + 1
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
