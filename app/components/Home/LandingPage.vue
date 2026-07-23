<script setup>
import { motion } from "motion-v";
const props = defineProps(["subtitle"]);
</script>

<template>
  <div class="w-full h-screen relative">
    <!-- Background -->
    <video
      class="absolute inset-0 -z-10 h-screen w-screen object-cover brightness-75"
      autoplay
      muted
      loop
      playsinline
    >
      <source src="/video.mp4" type="video/mp4" />
    </video>
    <!-- Title -->
    <div
      class="absolute m-auto top-0 left-0 right-0 bottom-0 pt-6 w-full h-full flex items-center justify-center"
    >
     <div class="flex flex-col items-center justify-center m-auto w-full px-4">
  <motion.h1
    class="w-full md:10/12 lg:w-8/12 text-center mx-auto py-4 text-large-2 text-white font-bold"
    :initial="{ opacity: 0, y: 24 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.6, ease: 'easeOut' }"
  >
    {{
      subtitle ||
      "Garden maintenance expert serving Folkestone, Ashford, Dover and surrounding villages"
    }}
  </motion.h1>

  <NuxtLink to="/gallery">
    <motion.div
      class="group h-10 py-1 flex items-center rounded-full font-bold justify-center cursor-pointer relative mt-4 px-4 text-brown outline bg-white hover:outline-0 outline-white hover:text-off-white hover:bg-brown"
      :initial="{ opacity: 0, y: 24 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6, ease: 'easeOut', delay: 0.15 }"
      :while-hover="{ scale: 1.02 }"
      :while-tap="{ scale: 0.98 }"
    >
      Get Started
    </motion.div>
  </NuxtLink>
</div>
    </div>
  </div>
</template>
