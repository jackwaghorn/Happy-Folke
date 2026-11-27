<script setup>
import { motion } from "motion-v";
const props = defineProps(["subheading", "paragraph", "illustration"]);
</script>
<template>
  <section class="max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-38 mx-auto">
    <div class="w-full flex md:flex-row flex-col gap-8 md:gap-1 justify-between">
      <!-- Opening para -->
      <div class="order-2 md:order-1 text-start text-dark-brown w-full md:w-1/2 flex flex-col justify-center gap-3">
        <!-- Subheading -->
        <div class="text-subheading">
          <SanityContent :value="subheading" />
        </div>
        <!-- Paragraph -->
        <div class="text-body-lg-sans pb-1">
          <SanityContent :value="paragraph" />
        </div>


          <UiSmallButton
            :to="'/about'"
            class="self-start "
            variant="dark"
          >
            About Me
          </UiSmallButton>
      </div>

      <!-- Column two -->
      <div class="order-1 md:order-2  w-full md:w-1/2 flex justify-center items-center">
      <div class="w-1/2 mx-auto">
        <motion.div
          :initial="{ opacity: 0 }"
          :while-in-view="{ opacity: 1 }"
          :viewport="{ once: true, amount: 0.3 }"
          :transition="{ duration: 0.6, ease: 'easeOut' }"
          class=""
        >
          <SanityImage
            :image="illustration"
            alt="Tools"
            sizes="(min-width: 1024px) 50vw, 100vw"
            class="w-full mx-auto"
          />
        </motion.div>
      </div>
      </div>
    </div>
  </section>
</template>
