<script setup lang="ts">
import { motion } from "motion-v";

const props = defineProps<{
  packets?: Array<{ title: string; image: any; caption: string }>;
  text?: any;
}>();

const seeds = computed(() =>
  (props.packets ?? []).slice(0, 4).map((packet) => ({
    title: packet.title,
    image: packet.image,
    caption: packet.caption,
  }))
);

const activeIndex = ref<number | null>(null);
const xOffsets = reactive<Record<number, number>>({});

function onEnter(index: number) {
  activeIndex.value = index;
}
function onLeave(index: number) {
  activeIndex.value = null;
}

function zIndexFor(index: number) {
  return activeIndex.value === index ? 10 : 0;
}
function yFor(index: number) {
  return activeIndex.value === index ? -10 : 0;
}
</script>

<template>
  <section class="py-14 md:py-28 bg-off-white relative z-1">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Packet container -->
      <div class="relative grid grid-cols-3 md:grid-cols-5 gap-x-6 md:gap-x-10 gap-y-10">
        <!-- CTA -->
        <div class="order-last md:order-first col-span-3 md:col-span-2 h-full flex flex-col items-start justify-center gap-4">
        <div class="text-brown text-subheading text-start">Services</div>
          <div class="w-full text-start text-body-lg-sans text-brown">
            <SanityContent :value="text" />
          </div>

          <UiSmallButton :to="'/services'" class="self-start" variant="brown">
            Explore All Services
          </UiSmallButton>
        </div>
        <!-- Cards  -->
        <NuxtLink
          :to="`/services#${packet.title}`"
          v-for="(packet, index) in seeds"
          :key="index"
          :style="{ zIndex: zIndexFor(index) }"
          @mouseenter="onEnter(index)"
          @mouseleave="onLeave(index)"
          class="packet  relative w-full group cursor-pointer"
        >
          <motion.div
            :initial="{ y: 30 }"
            :while-in-view="{y: 0 }"
            :viewport="{ once: true, amount: 1.5 }"
            :transition="{
              type: 'spring',
              stiffness: 300,
              damping: 15,
              delay: Math.min(index * 0.08, 0.6),
            }"
          >
            <motion.div
              :animate="{ x: xOffsets[index] ?? 0, y: yFor(index) }"
              :transition="{ type: 'spring', stiffness: 500, damping: 15 }"
              class="packet-card aspect-9/16 noise -mx-1 outline-brown outline-1 md:outline-2 shadow-xl overflow-hidden relative flex flex-col items-between justify-between"
            >
              <!-- hole -->
              <div
                class="absolute top-2 md:top-3 w-[40%] bg-white h-2.5 md:h-4.5 left-0 right-0 rounded-full border-1 md:border-2 border-brown z-1 mx-auto"
              ></div>

              <SanityImage
                v-if="packet.image"
                :image="packet.image"
                :alt="packet.title"
                class="w-full absolute top-0 bottom-0 mt-auto md:m-auto left-0 pb-2"
              />
              <div class="w-full flex flex-col p-1 md:p-3 mt-auto">
                <div
                  class="flex items-center justify-start text-body-lg-serif md:mb-2 w-full no-underline!"
                >
                  {{ packet.title }}
                </div>

                <div class="md:block hidden w-full border-t border-[#f0efd63d]"></div>
              </div>
            </motion.div>
          </motion.div>
        </NuxtLink>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Top offset applies to the inner card, not the wrapper */
.packet:nth-child(1) .packet-card {
  top: 0.3rem;
  color: #f0efd6;
  rotate: -1deg;
}
.packet:nth-child(2) .packet-card {
  
  background: #6d3409;
  color: #f0efd6;
  rotate: 0.5deg;
}
.packet:nth-child(3) .packet-card {
  top: 0.3rem;
  background: #a5ab00;
  color: #6d3409;
}
.packet:nth-child(4) .packet-card {
  top: 0.1rem;
  background: #45532f;
  color: #f0efd6;
  rotate: 1deg;
}
</style>
