<script setup lang="ts">
import { motion } from "motion-v";

const props = defineProps<{
  packets?: Array<{ title: string; image: any }>;
  text?: any;
}>();

const seeds = computed(() =>
  (props.packets ?? []).slice(0, 4).map((packet) => ({
    title: packet.title,
    image: packet.image,
  }))
);
</script>

<template>
  <section class="flex flex-col pb-40 bg-white">
    <!-- Title -->
    <h2 class="text-brown text-center text-large-2 font-bold py-20">
      Expert garden <br />
      maintenance <br />
      services
    </h2>
    <!-- Packet container -->
    <div
      class="relative flex flex-col md:flex-row items-center justify-center px-10 md:px-60"
    >
      <div
        v-for="(packet, index) in seeds"
        :key="index"
        class="packet w-10/12 md:w-1/4 -mb-60 md:mb-0 group cursor-pointer"
      >
        <motion.div
          :while-hover="{ y: -36, zIndex: 10 }"
          :transition="{ type: 'spring', stiffness: 300, damping: 15 }"
          class="packet-card aspect-9/16 -mx-1 outline-brown outline rounded shadow-xl bg-white overflow-hidden relative"
        >
          <!-- hole -->
          <div
            class="top-6 w-[40%] bg-white h-6 rounded-full border border-brown z-1 relative mx-auto"
          ></div>

          <div
            class="mt-12 left-0 w-full md:w-[calc(100%-2rem)] bg-off-white md:rounded-e-2xl z-1 relative text-center py-4 md:py-6"
          >
            <div
              class="md:ms-8 flex items-center justify-center font-bold text-yellow text-large leading-8 tracking-tight"
            >
              {{ packet.title }}
            </div>
          </div>

          <div
            class="absolute bottom-4 left-0 z-1 mt-30 bg-brown pe-4 p-2 text-off-white rounded-e-2xl -translate-x-full group-hover:translate-0 transition"
          >
            We've got you covered!
          </div>
          <SanityImage
            v-if="packet.image"
            :image="packet.image"
            :alt="packet.title"
            class="w-full h-full object-cover absolute top-0 left-0 brightness-80 md:brightness-60 md:group-hover:brightness-80 duration-300 transition"
          />
        </motion.div>
      </div>
    </div>

    <div class="mt-80 md:mt-30 flex flex-col items-center gap-4">
      <div class="w-full md:w-4/12 mx-auto text-center text-brown">
        <SanityContent :value="text" />
      </div>
      <NuxtLink to="/services">
        <motion.div
          class="text-brown outline outline-[#6d340967] hover:outline-0 hover:text-off-white hover:bg-brown group h-9 flex items-center justify-center cursor-pointer relative mt-3 px-4"
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
          Services
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
