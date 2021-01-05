<template>
  <div class="w-full sm:w-3/12 lg:w-2/12 pr-4 tex-left">
    <div class="block overflow-y-auto pt-8 pb-4">
      <div class="mb-6">
        <p class="text-gray-800 uppercase font-bold block py-1 px-4">
          Algorithmen
        </p>
        <ul class="block flex-wrap list-none pl-0 mb-0 mt-0">
          <li
            v-for="loopAlgorithm in algorithms"
            :key="loopAlgorithm"
            @click="localAlgorithm = loopAlgorithm"
            class="cursor-pointer"
          >
            <p
              class="block mb-2 mx-4 text-sm"
              :class="getElementCssClass(loopAlgorithm)"
            >
              {{ loopAlgorithm }}
            </p>
          </li>
        </ul>
        <p class="text-gray-800 uppercase font-bold block py-1 px-4 mt-8">
          Elemente
        </p>
        <ul class="block flex-wrap list-none pl-0 mb-0 mt-0">
          <li
            @click="changeCurrentElementToPlace('start')"
            :class="getElementCssClass('start')"
            class="cursor-pointer"
          >
            <i class="fas fa-street-view"></i>
            <p class="block mb-2 mx-4 text-sm">Startpunkt</p>
          </li>
          <li
            @click="changeCurrentElementToPlace('end')"
            :class="getElementCssClass('end')"
            class="cursor-pointer"
          >
            <i class="fas fa-flag-checkered"></i>
            <p class="block mb-2 mx-4 text-sm">Endpunkt</p>
          </li>
          <li
            @click="changeCurrentElementToPlace('wall')"
            :class="getElementCssClass('wall')"
            class="cursor-pointer"
          >
            <i class="fas fa-stop"></i>
            <p class="block mb-2 mx-4 text-sm">Hindernis / Wand</p>
          </li>
        </ul>
        <button
          class="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          type="button"
          style="transition: all 0.15s ease"
          @click="calculateShortestPath"
        >
          <i class="fas fa-play"></i> Weg berechnen
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { algorithms } from "@/algorithms/constants";

export default {
  name: "Navigation",

  props: {
    algorithm: { 
      type: String, 
      required: true 
    },
    element: { 
      type: String, 
      required: true 
    },
  },
  data() {
    return {
      algorithms: algorithms,
      localElement: this.element,
      localAlgorithm: this.algorithm
    };
  },
  methods: {
    changeCurrentElementToPlace(name) {
      this.localElement = name;
    },
    getElementCssClass(name) {
      if (this.localElement === name || this.localAlgorithm === name) {
        return "text-orange-600";
      }
      return "text-gray-600";
    },
    calculateShortestPath() {
      this.$emit("find");
    },
  },
  watch: {
    localAlgorithm: {
      handler(newValue) {
        this.$emit("update:algorithm", newValue);
      },
    },
    localElement: {
      handler(newValue) {
        this.$emit("update:element", newValue);
      },
    },
  },
};
</script>
