<script setup lang="ts">
import { motion, useScroll, useSpring, useTransform } from "motion-v";

defineProps<{
  image?: any;
  alt?: string;
}>();

const target = ref<HTMLElement | null>(null);

// 0 when the banner's top enters the bottom of the viewport,
// 1 when its bottom reaches the bottom of the viewport.
const { scrollYProgress } = useScroll({
  target,
  offset: ["start end", "start 30%"],
});

// Smooths out wheel/trackpad jitter
const progress = useSpring(scrollYProgress, {
  stiffness: 120,
  damping: 28,
  mass: 0.4,
});

// Start as a rounded, inset card (~66% wide) and open up to full bleed.
const clipPath = useTransform(progress, (v) => {
  const p = Math.min(Math.max(v, 0), 1);
  const inset = 17 * (1 - p); // % trimmed from each side
  return `inset(0% ${inset}% 0% ${inset}% )`;
});

// Slight zoom-out inside the frame gives the parallax feel
const scale = useTransform(progress, [0, 1], [1.2, 1]);
</script>

<template>
  <div ref="target" class="w-full overflow-hidden">
    <motion.div
      :style="{ clipPath }"
      class="relative w-full h-[60vh] md:h-[75vh] will-change-[clip-path]"
    >
      <motion.div :style="{ scale }" class="absolute inset-0 will-change-transform">
        <SanityImage
          v-if="image"
          :image="image"
          :alt="alt"
          :preserve-aspect-ratio="false"
          sizes="100vw"
          class="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  </div>
</template>