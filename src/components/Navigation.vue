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
        <hr class="border-gray-300 py-2" />

        <p class="text-gray-800 uppercase font-bold block py-1 px-4 mt-8">
          Elemente
        </p>
        <p class="text-gray-600 text-sm">
          Durch klicken auf das Element und danach auf das Feld im Grid kann das Element
          plaziert werden. Es können beliebeig viele Wände plaziert werden.
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
        <hr class="border-gray-300 py-2" />

        <p class="text-gray-800 uppercase font-bold block py-1 px-4 mt-8">
          Optionen
        </p>
        <ul class="block flex-wrap list-none pl-0 mb-8 mt-0">
          <li class="cursor-pointer px-10 py-3">
            <i class="fas fa-tachometer-alt"></i>
            <p class="block mb-2 mx-4 text-sm">Geschwindigkeit</p>
            <vue-slider v-model="localSpeed" />
          </li>
          <li class="cursor-pointer">
            <p class="text-gray-600 text-sm">
              Erlaubt neben links, recht, oben und unten auch die diagonalen Nachbarfelder.
            </p>
            <i class="fas fa-route"></i>
            <p class="block mb-2 mx-4 text-sm">Diagonale erlauben</p>
            <div
              class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
            >
              <input
                v-model="localAllowDiagonal"
                type="checkbox"
                name="toggle"
                id="toggle"
                class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                for="toggle"
                class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </li>
        </ul>
        <hr class="border-gray-300 py-2" />
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
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
import { algorithms } from "@/algorithms/constants";

export default {
  name: "Navigation",
  components: {
    VueSlider,
  },
  props: {
    algorithm: {
      type: String,
      required: true,
    },
    element: {
      type: String,
      required: true,
    },
    speed: {
      type: Number,
      required: true,
    },
    allowDiagonal: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      algorithms: algorithms,
      localElement: this.element,
      localAlgorithm: this.algorithm,
      localSpeed: this.speed,
      localAllowDiagonal: this.allowDiagonal,
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
    localSpeed: {
      handler(newValue) {
        this.$emit("update:speed", newValue);
      },
    },
    localAllowDiagonal: {
      handler(newValue) {
        this.$emit("update:allowDiagonal", newValue);
      },
    },
  },
};
</script>
