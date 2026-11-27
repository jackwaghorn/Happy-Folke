<script setup lang="ts">
type Variant = "outline" | "solid" | "light" | "solidLight";

const props = withDefaults(
  defineProps<{
    /** Route or URL to link to, e.g. "/about" */
    to: string;
    /** Colour style of the button */
    variant?: Variant;
    /** Open in a new tab (useful for external links) */
    external?: boolean;
  }>(),
  {
    variant: "outline",
    external: false,
  }
);

// Tailwind needs full class names written out, so keep them static here.
const variants: Record<Variant, string> = {
  // Original style: outlined, fills brown on hover
  outline:
    "text-dark-brown outline outline-[#6d340933] hover:outline-brown hover:text-off-white hover:bg-brown",
  // Filled brown, inverts on hover
  solid:
    "bg-brown text-off-white outline outline-brown hover:bg-transparent hover:text-dark",
  // For use on dark/brown backgrounds (e.g. the footer)
  light:
    "text-off-white outline outline-[#f5f1e033] hover:outline-brown hover:text-brown hover:bg-off-white",

  solidLight: "text-dark-brown bg-off-white outline outline-[#6d340933] ",
};
</script>

<template>
  <NuxtLink
    :to="props.to"
    :target="props.external ? '_blank' : undefined"
    :rel="props.external ? 'noopener noreferrer' : undefined"
    class="h-9 inline-flex items-center justify-center rounded-full cursor-pointer relative text-small px-6 transition-colors duration-100 no-underline!"
    :class="variants[props.variant]"
  >
    <slot />
  </NuxtLink>
</template>
