<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const props = defineProps<{
  gallery?: Array<{ title?: string; image?: any }>;
  text?: any;
}>();

const modules = [Pagination];

const swiperInstance = ref<SwiperType | null>(null);

function onSwiperInit(swiper: SwiperType) {
  swiperInstance.value = swiper;
}

const prev = () => swiperInstance.value?.slidePrev();
const next = () => swiperInstance.value?.slideNext();
</script>

<template>
  <section class="w-full grid grid-cols-1 md:grid-cols-2 md:h-[31rem] bg-[#D1D1AF]">
    <div
      class="flex items-center px-4 pt-12 pb-4 md:py-0 sm:px-6 lg:px-8 md:pr-12 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]"
    >
      <div
        class="w-full max-w-md md:max-w-[30rem] flex flex-col items-start gap-4 text-dark-brown"
      >
        <div class="text-dark-brown text-subheading text-start">Gallery</div>
        <div class="text-body-lg-sans text-dark-brown mb-1">
          <SanityContent v-if="text" :value="text" />
          <p v-else>
            These are just a few of the services I provide. From regular upkeep to one-off
            transformations. If you have something else in mind, just get in touch.
          </p>
        </div>

        <UiSmallButton :to="'/gallery'" class="self-start" variant="dark">
          See More Photos
        </UiSmallButton>
      </div>
    </div>

    <!-- Right: slider -->
    <div class="relative w-full h-full p-3 md:p-0 aspect-4/5 md:aspect-auto overflow-hidden">
      <ClientOnly>
        <Swiper
          :modules="modules"
          :slides-per-view="1"
          :space-between="0"
          :speed="500"
          :loop="true"
          :pagination="{ el: '.gallery-pagination', clickable: true }"
          class="h-full w-full"
          @swiper="onSwiperInit"
        >
          <SwiperSlide v-for="(slide, index) in gallery" :key="index">
            <SanityImage
              v-if="slide.image"
              :image="slide.image"
              :alt="slide.title"
              :preserve-aspect-ratio="false"
              loading="lazy"
              sizes="(min-width: 768px) 50vw, 100vw"
              class="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </ClientOnly>

      <!-- Previous -->
      <button
        type="button"
        aria-label="Previous slide"
        class="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#e7e7e79f] backdrop-blur text-brown border border-brown cursor-pointer transition hover:bg-brown hover:text-off-white"
        @click="prev"
      >
        <svg
          class="w-3 rotate-180"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.6229e-08 6.75758L0 5.24242H9.09091L4.92424 1.07576L6 0L12 6L6 12L4.92424 10.9242L9.09091 6.75758H6.6229e-08Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <!-- Next -->
      <button
        type="button"
        aria-label="Next slide"
        class="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#e7e7e79f] backdrop-blur text-brown border border-brown cursor-pointer transition hover:bg-brown hover:text-off-white"
        @click="next"
      >
        <svg
          class="w-3"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.6229e-08 6.75758L0 5.24242H9.09091L4.92424 1.07576L6 0L12 6L6 12L4.92424 10.9242L9.09091 6.75758H6.6229e-08Z"
            fill="currentColor"
          />
        </svg>
      </button>

      <!-- Dots -->
      <div
        class="gallery-pagination absolute bottom-6 md:bottom-3 left-0 right-0 z-20 flex items-center justify-center gap-1.5"
      ></div>
    </div>
  </section>
</template>

<style scoped>
.gallery-pagination :deep(.swiper-pagination-bullet) {
  width: 0.65rem;
  height: 0.65rem;
  margin: 0 !important;
  border-radius: 9999px;
  background: #ffffff;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
}
.gallery-pagination :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  transform: scale(1.15);
}
</style>
