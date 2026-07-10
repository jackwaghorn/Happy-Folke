<script setup lang="ts">
import { servicesQuery } from "~/sanity/queries";
const { data: servicesPage } = await useSanityQuery(servicesQuery);
</script>
<template>
  <main class="relative w-full min-h-full h-full z-1">
    <section class="w-full bg-off-white pt-30 md:pt-46">
      <!-- Title -->
      <div class="md:mx-50">
        <h1 class="text-brown text-center my-auto text-large font-bold">
          {{ servicesPage?.title }}
        </h1>
        <div class="my-auto w-full text-center px-2 text-brown w-full md:w-5/10 mx-auto mt-8">
          <SanityContent :value="servicesPage?.servicesText" />
        </div>
      </div>
      <!-- Cards  -->
      <div class="md:mx-50 flex flex-col gap-4 md:gap-5 mt-12 pb-20 md:p-0 p-4">
        <div
          v-for="(service, index) in servicesPage?.services"
          :key="index"
          class="bg-white w-full grid md:grid-cols-2 gap-4 p-4 rounded-2xl"
        >
          <div>
            <h2 class="text-brown font-bold text-large mb-4">{{ service.title }}</h2>
            <div class="text-brown">
              <SanityContent :value="service.description" />
            </div>
          </div>
          <div class="col-span-1">
            <SanityImage
              v-if="service.image"
              :image="service.image"
              :alt="service.title"
              :preserve-aspect-ratio="false"
              class="w-full rounded-lg aspect-square object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
