<template>
  <div class="w-full sm:w-3/12 lg:w-2/12 pr-4 tex-left">
    <div class="block overflow-y-auto pt-8 pb-4">
      <div class="mb-6">
        <p class="text-gray-800 uppercase font-bold block py-1 px-4">Algorithmen</p>
        <ul class="block flex-wrap list-none pl-0 mb-0 mt-0">
          <li v-for="loopAlgorithm in algorithms" :key="loopAlgorithm"
              @click="algorithm = loopAlgorithm"
              class="cursor-pointer">
            <p class="block mb-2 mx-4 text-sm"
               :class="getElementCssClass(loopAlgorithm)">{{ loopAlgorithm }}</p>
          </li>
        </ul>
        <p class="text-gray-800 uppercase font-bold block py-1 px-4 mt-8">Elemente</p>
        <ul class="block flex-wrap list-none pl-0 mb-0 mt-0">
          <li @click="changeCurrentElementToPlace('start')"
              :class="getElementCssClass('start')"
              class="cursor-pointer">
            <i class="fas fa-street-view"></i>
            <p class="block mb-2 mx-4 text-sm">Startpunkt</p>
          </li>
          <li @click="changeCurrentElementToPlace('end')"
              :class="getElementCssClass('end')"
              class="cursor-pointer">
            <i class="fas fa-flag-checkered"></i>
            <p class="block mb-2 mx-4 text-sm">Endpunkt</p>
          </li>
          <li @click="changeCurrentElementToPlace('wall')"
              :class="getElementCssClass('wall')"
              class="cursor-pointer">
            <i class="fas fa-stop"></i>
            <p class="block mb-2 mx-4 text-sm">Hindernis / Wand</p>
          </li>
        </ul>
        <button
            class="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3
            rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
            type="button" style="transition: all .15s ease">
          <i class="fas fa-play"></i> Weg berechnen
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShortestPathSidebar",

  props: {
    currentAlgorithm: String,
    currentElementToPlace: String,

  },
  data () {
    return {
      algorithms: ['Breadth-First-Search', 'Dijkstra', 'A*'],
      elementToPlace: this.currentElementToPlace,
      algorithm: this.currentAlgorithm
    }
  },
  methods: {
    changeCurrentElementToPlace(name) {
      this.elementToPlace = name;
    },
    getElementCssClass(name) {
      if (this.elementToPlace === name || this.algorithm === name) {
        return 'text-orange-600';
      }
      return 'text-gray-600';
    },
  },
  watch: {
    currentElementToPlace: {
      handler(newValue) {
        this.elementToPlace = newValue;
      }
    },
    currentAlgorithm: {
      handler(newValue) {
        this.elementToPlace = newValue;
      }
    },
    algorithm: {
      handler(newValue) {
        this.$emit('update:currentAlgorithm', newValue);
      }
    },
    elementToPlace: {
      handler(newValue) {
        this.$emit('update:currentElementToPlace', newValue);
      }
    },
  }
}
</script>
