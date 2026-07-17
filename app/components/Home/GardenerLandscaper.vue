<script setup lang="ts">
const props = defineProps<{
  title?: string;
  subtitle?: string;
  text?: any;
  image?: any;
}>();
</script>

<template>
  <section class="bg-off-white w-full py-30 relative">
    <!-- Line top -->
    <div class="top-0 -mt-1 md:-mt-3 w-full absolute">
      <RoughLine color="#F0EFD6" :flipped="false" />
    </div>
    <!-- Line bottom -->
    <div class="bottom-0 -mb-1 md:-mb-3 w-full absolute">
      <RoughLine color="#F0EFD6" :flipped="true" />
    </div>

    <div class="md:mx-50 md:bg-green p-4 md:rounded-3xl grid md:grid-cols-2 gap-12">
      <div class="order-2 md:order-1">
        <SanityImage
          v-if="image"
          :image="image"
          :alt="title ?? 'Gardener'"
          class="w-full md:rounded-2xl"
        />
      </div>

      <div class="flex flex-col gap-8 items-center justify-center md:me-12 order-1 md:order-2">
        <h2 class="text-brown text-center text-large">
          <span class="font-bold">{{ title }}</span>
          <br v-if="subtitle" />
          {{ subtitle }}
        </h2>
        <div class="md:text-mid text-brown text-center">
          <SanityContent :value="text" />
        </div>
      </div>
    </div>
  </section>
</template>