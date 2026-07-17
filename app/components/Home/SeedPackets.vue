<script setup lang="ts">
import { motion } from "motion-v";

const props = defineProps<{
  packets?: Array<{ title: string; image: any; caption:string }>;
  text?: any;
}>();

const seeds = computed(() =>
  (props.packets ?? []).slice(0, 4).map((packet) => ({
    title: packet.title,
    image: packet.image,
    caption: packet.caption
  }))
);

const activeIndex = ref<number | null>(null);
const xOffsets = reactive<Record<number, number>>({});
const nudgeTimeouts: Record<number, ReturnType<typeof setTimeout>> = {};

const NUDGE_RETURN_DELAY = 200; // how long the neighbor stays poked out before springing back

function nudgeRight(index: number) {
  clearTimeout(nudgeTimeouts[index]);
  xOffsets[index] = 20;
  nudgeTimeouts[index] = setTimeout(() => {
    xOffsets[index] = 0;
  }, NUDGE_RETURN_DELAY);
}

function onEnter(index: number) {
  activeIndex.value = index;
  nudgeRight(index + 1);
}
function onLeave(index: number) {
  activeIndex.value = null;
  nudgeRight(index + 1); // same nudge plays again on the way out
}

function zIndexFor(index: number) {
  return activeIndex.value === index ? 10 : 0;
}
function yFor(index: number) {
  return activeIndex.value === index ? -60 : 0;
}
</script>

<template>
  <section class="flex flex-col pb-20 md:pb-40 bg-off-white relative">
    <!-- Line top -->
    <div class="top-0 left-0 -mt-1 md:-mt-3 w-full absolute">
      <RoughLine color="#F0EFD6" :flipped="false" />
    </div>
    <!-- Title -->
    <h2 class="text-brown text-center text-large-2 pt-20">Gardening services</h2>
    <div class="w-full md:w-7/12 mx-auto text-center text-brown text-mid mt-12 mb-18">
      <SanityContent :value="text" />
    </div>
    <!-- Packet container -->
    <div
      class="relative flex flex-col md:flex-row items-center justify-center px-10 md:px-60"
    >
      <div
        v-for="(packet, index) in seeds"
        :key="index"
        :style="{ zIndex: zIndexFor(index) }"
        @mouseenter="onEnter(index)"
        @mouseleave="onLeave(index)"
        class="packet relative w-8/12 md:w-1/4 even:ms-10 odd:-ms-10 md:even:ms-0 md:odd:ms-0 -mb-40 md:mb-0 group cursor-pointer"
      >
        <motion.div
          :animate="{ x: xOffsets[index] ?? 0, y: yFor(index) }"
          :transition="{ type: 'spring', stiffness: 300, damping: 15 }"
          class="packet-card aspect-9/16 -mx-1 outline-brown outline rounded shadow-xl bg-[#D1D1AF] overflow-hidden relative flex flex-col items-between justify-between"
        >
          <!-- hole -->
          <div
            class="absolute top-6 w-[40%] bg-off-white h-6 left-0 right-0 rounded-full border border-brown z-1 mx-auto"
          ></div>

        

          <SanityImage
            v-if="packet.image"
            :image="packet.image"
            :alt="packet.title"
            class="w-full absolute top-0 bottom-0 m-auto left-0 pb-5"
          />
          <div class="w-full p-4 mt-auto">
        
            <div
              class="flex items-center justify-start font-bold text-brown text-large leading-8 mb-3 tracking-tight"
            >
              {{ packet.title }}

          </div>
          
            <div class="w-full pt-2 border-t border-brown text-brown text-small">
              {{ packet.caption }}
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    <div class="mt-60 md:mt-30 flex flex-col items-center gap-4">
      <NuxtLink to="/services">
        <motion.div
          class="text-brown outline outline-[#6d340937] hover:outline-0 bg-white hover:text-off-white hover:bg-brown group h-10 flex items-center justify-center cursor-pointer relative mt-3 px-4"
          :while-hover="{
            scale: 1.02,
          }"
          :while-tap="{ scale: 0.98 }"
          :transition="{
            type: 'spring',
            stiffness: 500,
            damping: 24,
          }"
        >
          Explore all services
        </motion.div>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
/* Rotation applies to the outer wrapper */
.packet:nth-child(1) {
  transform: rotate(-6deg);
}
.packet:nth-child(2) {
  transform: rotate(-2deg);
}
.packet:nth-child(3) {
  transform: rotate(2deg);
}
.packet:nth-child(4) {
  transform: rotate(6deg);
}

/* Top offset applies to the inner card, not the wrapper */
.packet:nth-child(1) > .packet-card {
  top: 3.5rem;
}
.packet:nth-child(2) > .packet-card {
  top: 1rem;
}
.packet:nth-child(3) > .packet-card {
  top: 0;
}
.packet:nth-child(4) > .packet-card {
  top: 3.5rem;
}

/* Mobile overrides */
@media (max-width: 767px) {
  .packet:nth-child(1) {
    transform: rotate(-3deg);
  }
  .packet:nth-child(2) {
    transform: rotate(3deg);
  }
  .packet:nth-child(3) {
    transform: rotate(-3deg);
  }
  .packet:nth-child(4) {
    transform: rotate(3deg);
  }

  .packet:nth-child(1) > .packet-card {
    top: 0;
  }
  .packet:nth-child(2) > .packet-card {
    top: 0;
  }
  .packet:nth-child(3) > .packet-card {
    top: 0;
  }
  .packet:nth-child(4) > .packet-card {
    top: 0;
  }
}
</style>