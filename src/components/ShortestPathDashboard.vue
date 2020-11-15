<template>
  <div class="container mx-auto mt-4 pt-4">
    <div class="flex flex-wrap">
      <ShortestPathSidebar
          :currentAlgorithm.sync="currentAlgorithm"
          :currentElementToPlace.sync="currentElementToPlace"
      />
      <div class="w-full sm:w-9/12 lg:w-8/12 px-4 sm:pr-10 lg:pr-4">
        <div class="my-8">
          <div class="mt-8"><h1 class="font-semibold mt-8 mb-2 text-3xl">Shortest Path Finder</h1>
            <p class="lead text-gray-600 text-l">
              Platziere zuerst den Start und den Endpunkt, sowie beliebig viele Hindernisse.
              Wähle anschliessend den gewünschten Algorithmus und starte die Pfadsuche.
            </p>
            <hr class="mt-6 mb-8 border-b-1 border-gray-300">
          </div>
          <div v-for="row in grid.size_x" :key="row" class="h-10">
            <div v-for="column in grid.size_y" :key="column"
                 class="w-10 h-10 inline-block border-solid border-black p-2"
                 v-bind:class="getAdditionalClasses(row, column)"
                 v-on:click="placeElementOnMap(row, column)">
              <div v-if="isStart(row, column)">
                <i class="fas fa-street-view block"></i>
              </div>
              <div v-if="isEnd(row, column)">
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
import VueScreenSize from 'vue-screen-size';
import ShortestPathSidebar from "@/components/ShortestPathSidebar";

export default {
  name: 'ShortestPathDashboard',
  components: {ShortestPathSidebar},
  mixins: [VueScreenSize.VueScreenSizeMixin],

  data: function () {
    return {
      grid: {},
      currentAlgorithm: 'Breadth-First-Search',
      currentElementToPlace: 'wall'
    }
  },
  methods: {
    isStart(x, y) {
      return this.grid.start_x === x && this.grid.start_y === y;
    },
    isEnd(x, y) {
      return this.grid.end_x === x && this.grid.end_y === y;
    },
    isWall(x, y) {
      let elementIndex = 'x:' + x.toString() + 'y:' + y.toString();
      return this.grid.walls.includes(elementIndex);
    },
    placeElementOnMap(x, y) {
      if (this.currentElementToPlace === 'wall') {
        this.changeWallStatus(x, y);
      }
      if (this.currentElementToPlace === 'start') {
        this.setStartElement(x, y);
      }
      if (this.currentElementToPlace === 'end') {
        this.setEndElement(x, y);
      }
    },
    setStartElement(x, y) {
      if (this.isWall(x, y)) {
        this.currentElementToPlace = 'wall';
        return;
      }
      if (this.isEnd(x, y)) {
        this.currentElementToPlace = 'end';
        return;
      }
      this.grid.start_x = x;
      this.grid.start_y = y;
    },
    setEndElement(x, y) {
      if (this.isWall(x, y)) {
        this.currentElementToPlace = 'wall';
        return;
      }
      if (this.isStart(x, y)) {
        this.currentElementToPlace = 'start';
        return;
      }
      this.grid.end_x = x;
      this.grid.end_y = y;
    },
    changeWallStatus(x, y) {
      if (this.isStart(x, y)) {
        this.currentElementToPlace = 'start';
        return;
      }
      if (this.isEnd(x, y)) {
        this.currentElementToPlace = 'end';
        return;
      }
      let elementIndex = 'x:' + x.toString() + 'y:' + y.toString();
      if (this.isWall(x, y)) {
        this.grid.walls.splice(this.grid.walls.indexOf(elementIndex), 1);
        return;
      }
      this.grid.walls.push(elementIndex);
    },
    getAdditionalClasses(x, y) {
      let cssClass = 'border-l-2 border-t-2';
      if (x === this.grid.size_x) {
        cssClass += " border-b-2"
      }
      if (y === this.grid.size_y) {
        cssClass += " border-r-2"
      }
      if (this.isWall(x, y)) {
        cssClass += ' wall'
      }
      return cssClass;
    }
  },
  async mounted() {
    // optimize the grid size according to the place we have on the display
    let max = (this.$vssWidth > 768) ? 12 : (this.$vssWidth > 360) ? 8 : 6;
    this.grid = {
      size_x: max, // make grid quadratic
      size_y: max,
      start_x: 1,
      start_y: 1,
      end_x: max,
      end_y: max,
      walls: []
    };
  },
}
</script>
