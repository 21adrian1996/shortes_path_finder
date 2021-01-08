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
      <div class="mt-8">
        <hr class="mt-6 mb-8 border-b-1 border-gray-300" />
        <h2 class="font-semibold mt-8 mb-2 text-3xl">Erläuterung zu {{ algorithm }}</h2>
        <p v-if="this.isBFS()" class="lead text-gray-600 text-l">
          Bei der  Breitensuche (Breadth first search) werden alle Knoten in eine Baum oder Graphen der Breite nach besucht.
          Gestartet wird beim Wurzel-Element, von dort aus werden zunächst alle Nachbarn besucht bevor es dann eine Ebene nach unten geht.
          Um den Überblick zu behalten, wird zuerst das Wurzelelement und danach jeder besuchte Knoten zu einer first-in-first-out Queue hinzugefügt.
          Anhand dieser Queue werden alle Knoten den Baumes abgearbeitet.
        </p>
        <p v-if="this.isAStar()" class="lead text-gray-600 text-l">
          Bei A* wird der Raum in dem der Pfad gesucht wird in Knoten unterteilt, die jeweils über Kanten miteinander verbunden sind.
          Die Knoten enthalten jeweils eine Schätzung der Kosten bis zum Ziel. Auf den Kanten befinden sich die effektiven Kosten von einem Knoten zum nächsten.
          A* geht nun immer den Weg der geringsten Kosten, die sich aus den effektiven Kosten bis zum
          jeweiligen Knoten und der heuristischen Schätzung der Kosten bis zum Ziel ergeben.
          Wird das Ziel gefunden, aber die Kosten sind größer als  bei einem anderen Knoten plus die jeweilige Schätzung wird dieser auch noch geprüft. So wird sichergestellt dass immer der kürzeste Weg gefunden wird. Dieses Verhalten wird nachfolgend an einem Beispiel erklärt.
        </p>
        <p v-if="this.isDijkstra()" class="lead text-gray-600 text-l">
          Bei Dijkstra wird zunächst jeder Knoten mit der Distanz unendlich initialisiert, die Kanten enthalten die Distanz zwischen den Knoten.
          Der Startpunkt wird mit Distanz 0 initialisiert.
          Nun wird der ‘unbesuchte’ Punkt mit der kleinsten Distanz ausgewählt.
          Allen Nachbarn wird die Summe, aus der sie verbindenden Kante und der Distanz im Punkt, zugewiesen.
          Der Punkt wird als ‘besucht’ markiert und der nächste ‘unbesuchte’ Punkt mit der kleinsten Distanz wird ausgewählt.
          Das wird so lange gemacht, bis das Ziel gefunden wurde. So garantiert Dijkstra den schnellsten Weg zu finden.
        </p>
      </div>
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
