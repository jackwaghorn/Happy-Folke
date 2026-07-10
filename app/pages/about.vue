<script setup lang="ts">
import { aboutQuery } from "~/sanity/queries";
const { data: about } = await useSanityQuery(aboutQuery);
</script>
<template>
  <main class="relative w-full min-h-full h-full z-1">
    <section class="w-full bg-off-white pt-30 md:pt-40">
      <div class="md:mx-50 p-4 grid md:grid-cols-2 gap-12 md:gap-24">
        <div class="flex flex-col gap-8 items-center md:items-start justify-center md:justify-start">
          <h2 class="text-brown text-center md:text-start text-large-2 font-bold">
            {{ about?.title }}
          </h2>
          <div class="md:text-mid text-brown text-start">
            <SanityContent :value="about?.biographyText" />
          </div>
        </div>
        <div>
          <SanityImage
            v-if="about?.bioImage"
            :image="about.bioImage"
            :alt="about?.title ?? 'About'"
            class="w-full md:rounded-2xl"
          />
        </div>
      </div>
    </section>
  </main>
</template>