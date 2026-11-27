<script setup lang="ts">
type Variant = "dark" | "brown" | "white";

const props = withDefaults(
  defineProps<{
    /** Route or URL to link to, e.g. "/about" */
    to: string;
    /** Colour style of the button */
    variant?: Variant;
  }>(),
  {
    variant: "dark",
  }
);

// Tailwind needs full class names written out, so keep them static here.
const variants: Record<Variant, string> = {
  dark: "text-dark-brown",
  brown: "text-brown",
  white: "text-off-white",
};
</script>

<template>
  <NuxtLink
    :to="props.to"
    class="flex flex-col cursor-pointer relative font-bold text-small btn-small"
    :class="variants[props.variant]"
  >
    <slot />
  </NuxtLink>
</template>

<style scoped>
.btn-small:after {
  display: block;
  content: "";
  height: 7px;
  border-bottom: 2px solid currentColor;
  transform: scaleX(1);
  transform-origin: 0% 50%;
  transition: transform 125ms ease-in-out;
}
.btn-small:hover:after {
  transform: scaleX(0);
}
</style>
