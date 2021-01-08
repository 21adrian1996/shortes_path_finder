<template>
  <div class="w-full sm:w-9/12 lg:w-8/12 px-4 sm:pr-10 lg:pr-4">
    <div class="mt-8">
        <h2 class="font-semibold mt-8 mb-2 text-3xl">Erläuterung zu {{ algorithm }}</h2>
        <p v-if="this.isBFS()" class="text-gray-600 text-sm">
          Bei der  Breitensuche werden alle Knoten eines Graphen der Breite nach besucht.
          Gestartet wird beim Start-Element, von dort aus werden zunächst alle Nachbarn in eine Queue geschrieben, bevor es dann eine Ebene nach unten geht.
          Die Knoten werden in der Reihenfolge besucht, in welcher Sie in der Queue sind und bis das Ziel gefunden wurde.
        </p>
        <p v-if="this.isAStar()" class="text-gray-600 text-sm">
          Wie Djikstra, jedoch erhalten Knoten zusätzlich jeweils eine Schätzung der Kosten bis zum Ziel.
          A* geht nun immer den Weg der geringsten Kosten, die sich aus den effektiven Kosten bis zum
          jeweiligen Knoten und der heuristischen Schätzung der Kosten bis zum Ziel ergeben.
          Die heuristische Funktion sollte nie einen grösseren Wert zurückgeben, als die Kosten zum Ziel effektiv sind.
        </p>
        <p v-if="this.isDijkstra()" class="text-gray-600 text-sm">
          Bei Dijkstra wird zunächst jeder Knoten mit der Distanz unendlich initialisiert, die Kanten enthalten die Distanz zwischen den Knoten.
          Der Startpunkt wird mit Distanz 0 initialisiert.
          Nun wird der ‘unbesuchte’ Punkt mit der kleinsten Distanz ausgewählt.
          Allen Nachbarn wird die Summe, aus der sie verbindenden Kante und der Distanz im Punkt, zugewiesen.
          Der Punkt wird als ‘besucht’ markiert und der nächste ‘unbesuchte’ Punkt mit der kleinsten Distanz wird ausgewählt.
          Das wird so lange gemacht, bis das Ziel gefunden wurde. So garantiert Dijkstra den schnellsten Weg zu finden.
        </p>
        <hr class="mt-6 mb-8 border-b-1 border-gray-300" />
      </div>
    <div class="my-8">
      <div v-for="(row, index) in grid" :key="index" class="flex justify-center row">
        <div
          v-for="(column, index) in row"
          :key="index"
          class="w-12 h-12 border-solid border-black border-r-2 border-b-2 flex justify-center
          items-center column"
          :class="[column.type, column.state]"
          @click="placeElementOnMap(column)"
        >
          <div v-if="column.type === 'start'">
            <i class="fas fa-street-view"></i>
          </div>
          <div v-if="column.type === 'end'">
            <i class="fas fa-flag-checkered"></i>
          </div>
          <div v-if="column.type === 'free' && !isBFS()" class="text-xs">
            {{ column.weight }}<br>{{ column.distance }}
            <span v-if="isAStar()">({{ column.heuristicDistance }})</span>
          </div>
        </div>
      </div>
      <hr class="mt-6 mb-8 border-b-1 border-gray-300" />
      <h2 class="font-semibold mt-8 mb-2 text-3xl">Legende</h2>
        <p class="text-gray-600 text-sm">Ein rot markiertes Feld wurde in die Liste der abzuarbeitenden Nachbaren/Felder eingetragen.<br>
          Blau markierte Felder wurden besucht und wieder aus der Liste entfernt.<br>
          Weisse Felder wurden nicht besucht.<br>
          Die grünen Felder markieren den idealen Pfad.
        </p>
        <p v-if="this.isDijkstra() || this.isAStar()" class="text-gray-600 mt-4 text-sm">
          Die obere Zahl im Feld representiert jeweils das Gewicht aller Kanten die zu diesem Feld führen.<br>
          Diese Gewichte sind also für alle Nachbaren identisch.<br>
          Die Kosten werden jeweils zufällig generiert.
        </p>
        <p v-if="this.isDijkstra()" class="text-gray-600 mt-4 text-sm">
          Die untere Zahl representiert die berechneten Kosten zur erreichung dieses Feldes.<br>
        </p>
        <p v-if="this.isAStar()" class="text-gray-600 mt-4 text-sm">
          Die untere Zahl representiert die berechneten Kosten zur erreichung dieses Feldes.<br>
          Die Zahl in Klammern zeigt den heuristisch berechneten Wert an.<br>
          Ist die Option "Diagonale erlauben" aktiviert handelt es sich dabei um die diagonale Distanz,
          andernfalls wird die Manhattan Distanz als heuristische Funktion verwendet.
        </p>
    </div>
  </div>
</template>

<script>
import VueScreenSize from "vue-screen-size";
import { states, types, algorithms } from "@/algorithms/constants";
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
    },
    algorithm: {
      type: String,
      required: true
    },
  },

  methods: {
    isBFS(){
      return this.algorithm === algorithms.bfs;
    },
    isAStar(){
      return this.algorithm === algorithms.astar;
    },
    isDijkstra(){
      return this.algorithm === algorithms.dijkstra;
    },
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
          heuristicDistance: '∞', // only used for A*
          completeDistance: '∞', // only used for A*
          weight: Math.floor(Math.random() * 21) + 1
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
