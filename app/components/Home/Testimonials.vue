<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import trowl from "~/assets/img/small/trowl.png";
import snippers from "~/assets/img/small/snippers.png";
import fork from "~/assets/img/small/fork.png";
import hoe from "~/assets/img/small/hoe.png";

const props = defineProps<{
  title?: string;
  text?: any;
  testimonials?: Array<{ test: any; testName: string }>;
}>();

const modules = [Autoplay];
const tools = [trowl, snippers, fork, hoe];
function toolFor(index: number) {
  return tools[index % tools.length];
}
</script>
<template>
  <section class="pt-20 md:pt-40 pb-6 bg-off-white">
    <h2 class="text-super-large text-center relative z-1 mb-8 text-brown w-8/12 mx-auto">
      {{ title }}
    </h2>

    <div class="w-full flex items-center justify-center pb-12">
      <div class="px-2 w-full md:w-6/12 text-center text-mid text-brown mt-6">
        <SanityContent :value="text" />
      </div>
    </div>

    <ClientOnly>
      <Swiper
        :modules="modules"
        :slides-per-view="'auto'"
        :centered-slides="true"
        :space-between="120"
        :loop="true"
        :speed="1000"
        :autoplay="{ delay: 5000 }"
        class="my-6 h-full"
      >
        <SwiperSlide
          class="border bg-[#f0efd64b] border-green md:bg-white pt-12 md:pt-20 p-8 md:p-8 rounded-3xl h-full relative flex! flex-col w-[60%]"
          v-for="(test, i) in testimonials"
          :key="i"
        >
          <img
            :src="toolFor(i)"
            alt=""
            class="absolute top-0 right-0 w-16 md:w-30 pe-2 pt-2 pointer-events-none select-none"
          />
          <svg
            class="absolute top-0 left-0 w-22 ps-8 pt-8 text-yellow"
            viewBox="0 0 46 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.41 13.73C0.95134 14.1217 0.665719 14.6785 0.615166 15.2795C0.564613 15.8805 0.75321 16.4772 1.14 16.94L0.66 17.5C0.72 18.35 0.76 18.87 0.79 19.38C2.31 21.38 1.03 24.74 4.06 25.85C3.95 26.39 3.86 26.85 3.77 27.23L4.05 27.18C4.33 28.09 4.62 28.99 5.05 30.23L7.12 31.93C7.12 32.06 7 32.37 6.91 32.7L7.91 33.57L11.08 33.18L10.63 31.41L9.48 32C9.34 31.48 9.21 31 9.16 30.86C8.36 30.09 7.79 29.54 7.16 28.86L5.7 29L7.23 27.78C7.11 27.35 7 26.98 6.89 26.59L5.63 26.14L6.2 25.28L5.55 21.46L5.94 21.23L3.83 20.53L4.83 18.53L4.33 18.39L4.14 18.61L3.64 18.21L4.33 18.39L5.57 17L8.42 18L8.82 17.44L9.5 19C11.68 17.91 13.56 16.88 15.5 16C18.26 14.77 19.21 12.17 20.43 9.77C20.605 9.41679 20.6509 9.01353 20.56 8.63C20 6.81 19.28 5 18.76 3.56L16 2C14.6 2.36 14.31 0.92 13.64 0H8.34L3.58 3.17L4.5 4.42C4.33 4.55 4.22 4.71 4.1 4.71C3.01 4.71 2.8 5.26 2.42 6.32C1.84 7.93 1.59 9.87 0 11V11.34C0.18 11.93 0.35 12.52 0.56 13.21L1.41 13.73ZM12.66 7.06L14.22 8.06L12.66 10.06V7.06Z"
              fill="currentColor"
            />
            <path
              d="M4.15039 18.65L4.34039 18.43L3.65039 18.25L4.15039 18.65Z"
              fill="currentColor"
            />
            <path
              d="M38.2306 1.57983C35.3806 1.76983 32.1406 1.86983 30.0706 4.80983C30.1806 5.06983 30.3606 5.47983 30.5606 5.96983C28.8506 5.87983 28.8406 5.89983 28.2806 7.53983C28.213 7.80366 28.0827 8.04724 27.9006 8.24983C26.3716 9.71845 25.3549 11.6395 25.0006 13.7298L25.8706 14.6398C25.3112 14.9349 24.8864 15.4334 24.6836 16.0325C24.4808 16.6316 24.5155 17.2856 24.7806 17.8598L24.2006 18.3198L23.8906 20.5498H24.1406C24.3806 22.4298 24.6206 24.3198 24.8106 25.7698L26.6306 28.1298L27.6306 27.9098C27.4806 29.3098 27.7406 29.6198 29.6306 30.4498L30.4206 31.8998L33.4206 32.4098C33.4206 32.6998 33.5206 32.9998 33.5806 33.3098L38.0006 32.5498V32.2398L36.8306 31.9998L36.4806 30.7998L35.8906 31.1998L32.2106 29.5998L30.8106 30.5198L31.7006 28.3998L29.2506 27.6398L29.4406 26.5898L29.0506 26.6498C28.8606 25.5198 28.6806 24.3998 28.4606 23.0398L26.6806 22.2298L28.0006 20.3998L27.2806 19.8798C27.8987 19.1546 28.4446 18.3709 28.9106 17.5398C29.291 16.4625 29.5951 15.3598 29.8206 14.2398L30.1206 14.3098L29.8506 13.3998L31.1706 12.2498C31.2806 12.5298 31.3906 12.8398 31.5306 13.1298C32.3531 14.6944 33.759 15.8719 35.4436 16.4072C37.1282 16.9425 38.9558 16.7926 40.5306 15.9898C41.1106 15.6698 41.5306 14.8798 42.0906 14.7498C43.6106 14.3998 44.0906 13.3598 44.3006 12.0598C44.3006 11.7798 44.5606 11.5298 44.6306 11.2498C44.8006 10.5098 44.9406 9.76983 45.0906 9.02983L45.0006 8.99983C45.1606 8.19983 45.3206 7.39983 45.4106 6.92983C43.6306 3.81983 41.5106 1.37983 38.2306 1.57983Z"
              fill="currentColor"
            />
          </svg>

          <div class="my-auto relative z-1">
            <div class="text-start text-brown text-mid pt-4">
              <SanityContent :value="test.test" />
            </div>
            <p class="text-start text-green text-mid pt-6">
              {{ test.testName }}
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
  </section>
</template>

<style>
.swiper-wrapper {
  align-items: stretch;
}

.swiper-slide {
  width: 55%;
  height: auto; /* override Swiper's default height: 100% */
}

@media (max-width: 900px) {
  .swiper-slide {
    width: 85%;
  }
}
</style>
