<script setup>
import { motion } from "motion-v";
const props = defineProps([
  "bioIntro",
  "paraLeft",
  "leftImageOne",
  "leftIllustration",
  "leftImageTwo",
  "rightIllustration",
]);
</script>
<template>
  <section class="w-full relative pb-32 overflow-hidden bg-white">
    <!-- Opening para -->
    <div class="w-full relative my-34">
      <div
        class="w-full px-2 md:w-8/12 text-brown text-large-2 text-center mx-auto relative z-1"
      >
        <SanityContent :value="paraLeft" />
      </div>
    </div>

    <!-- Image columns -->
    <div class="w-full px-4 md:px-70 grid md:grid-cols-2 gap-0 md:gap-32">
      <!-- Left col -->
      <div class="flex flex-col">
        <!-- Image 1 -->
        <div class="md:mb-20 w-full bg-brown rounded-xl overflow-hidden">
          <motion.div
            :initial="{ opacity: 0 }"
            :while-in-view="{ opacity: 1 }"
            :viewport="{ once: true, amount: 0.3 }"
            :transition="{ duration: 0.6, ease: 'easeOut' }"
            class=""
          >
            <SanityImage
              :image="leftImageOne"
              alt="Gardener at work"
              sizes="(min-width: 1024px) 50vw, 100vw"
              class="w-full"
            />
          </motion.div>
        </div>
        <!-- Clippers -->
        <div class="z-0">
          <SanityImage
            :image="leftIllustration"
            class="w-full md:w-6/12 mx-auto"
            alt="Gardener at work"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
      <!-- Right col -->
      <div class="flex flex-col md:order-2 order-1">
        <!-- Spade -->
        <div class="z-0 order-2 md:order-2">
          <div class="w-5/12 mx-auto pb-10 text-off-white flex">
            <SanityImage
              :image="rightIllustration"
              class="w-full mx-auto"
              alt="Gardener at work"
              sizes="(min-width: 1024px) 60vw, 100vw"
            />
          </div>
        </div>
        <!-- Image 3 -->
        <div class="flex items-center justify-center z-1 order-1 md:order-2">
        <div class="w-full rounded-xl overflow-hidden bg-brown">
        
          <motion.div
            :initial="{ opacity: 0 }"
            :while-in-view="{ opacity: 1 }"
            :viewport="{ once: true, amount: 0.3 }"
            :transition="{ duration: 0.6, ease: 'easeOut' }"
            class="w-full"
          >
            <SanityImage
              :image="leftImageTwo"
              alt="Bed"
              sizes="(min-width: 1024px) 30vw, 100vw"
              class="w-full"
            />
          </motion.div>
          </div>
        </div>
      </div>
    </div>
    <!-- CTA -->
    <div class="flex flex-col items-center justify-center mt-30">
      <div class="text-brown text-center w-full md:w-6/12 text-mid">
        <SanityContent :value="bioIntro" />
      </div>
      <NuxtLink to="/about" class="mt-3">
        <motion.div
          class="group h-10 flex items-center rounded-full justify-center cursor-pointer relative mt-4 px-4 text-brown outline hover:outline-0 outline-[#6d340967] hover:text-off-white hover:bg-brown"
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
          Learn more
        </motion.div>
      </NuxtLink>
    </div>
  </section>
</template>
