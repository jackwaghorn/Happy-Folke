<script setup>
import { homepageQuery } from "~/sanity/queries";
const { data: home } = await useSanityQuery(homepageQuery);
</script>

<template>
  <main class="relative w-full min-h-full h-full z-1">
    <HomeLandingPage :subtitle="home?.subtitle" />

    <HomeCallToAction :brown="true" />

    <HomeGallery
      :bioIntro="home?.bioIntro"
      :para-left="home?.paraLeft"
      :left-image-one="home?.bioLeftImageOne"
      :left-image-two="home?.bioLeftImageTwo"
      :para-right="home?.paraRight"
      :right-image-one="home?.bioRightImageOne"
      :right-image-two="home?.bioRightImageTwo"
    />

    <HomeCallToAction :brown="false" />

    <HomeSeedPackets :packets="home?.seedPackets" :text="home?.seedText" />

    <HomeGardenerLandscaper
      :title="home?.gardenerTitle"
      :subtitle="home?.gardenerSubtitle"
      :text="home?.gardenerText"
      :image="home?.gardenerImage"
    />

    <HomeTestimonials
      :title="home?.testTitle"
      :text="home?.testText"
      :testimonials="home?.testimonials"
    />
  </main>
</template>
