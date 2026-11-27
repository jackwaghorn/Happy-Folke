<script setup lang="ts">
const title = "Happy Folke Gardens";
const description =
  "Garden maintenance expert serving Folkestone, Ashford, Dover and surrounding villages";

useSeoMeta({
  title: title,
  ogTitle: title,
  description: description,
  ogDescription: description,
  ogImage: "./preview.jpg",
  twitterCard: "./preview.jpg",
});
</script>
<template>
  <UiNavBar />
  <NuxtPage />
  <UiTheFooter />
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 150ms;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
