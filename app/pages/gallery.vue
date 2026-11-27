<script setup lang="ts">
import { galleryQuery } from "~/sanity/queries";
const { data: galleryPage } = await useSanityQuery(galleryQuery);

// Only slides that have an image, so grid indexes and lightbox indexes match
const items = computed(() =>
  (galleryPage.value?.images ?? []).filter((s: any) => s.image)
);

// Grid shows a page at a time; the lightbox still gets every item
const PAGE_SIZE = 8;
const visible = ref(PAGE_SIZE);
const shown = computed(() => items.value.slice(0, visible.value));
const remaining = computed(() => Math.max(items.value.length - visible.value, 0));
const loadMore = () => {
  visible.value += PAGE_SIZE;
};

// If the lightbox lands on an image the grid hasn't revealed yet (deep link,
// or arrowing past the end), reveal it so closing can shrink back into a tile
function onNavigate(i: number) {
  if (i >= visible.value) visible.value = Math.ceil((i + 1) / PAGE_SIZE) * PAGE_SIZE;
}

const lightbox = ref<{ open: (i: number) => void; preload: (i: number) => void } | null>(
  null
);

/* ---------- Masonry ----------
   No layout library: every image's real dimensions come from Sanity, so we
   know each tile's height up front. Items are dealt one at a time into the
   currently shortest column. Because that only depends on the items before
   it, tiles already on screen never move when "Load more" adds new ones.
   The server renders 4 columns; the real count is applied once mounted. */
const cols = ref(4);
onMounted(() => {
  const queries = [
    window.matchMedia("(min-width: 640px)"),
    window.matchMedia("(min-width: 1024px)"),
  ];
  const update = () => {
    cols.value = queries[1].matches ? 4 : queries[0].matches ? 3 : 2;
  };
  update();
  queries.forEach((q) => q.addEventListener("change", update));
  onBeforeUnmount(() => queries.forEach((q) => q.removeEventListener("change", update)));
});

const columns = computed(() => {
  const out: { slide: any; index: number }[][] = Array.from(
    { length: cols.value },
    () => []
  );
  const heights = Array(cols.value).fill(0);
  shown.value.forEach((slide: any, index: number) => {
    const d = slide.image?.asset?.metadata?.dimensions;
    const ratio = d?.width && d?.height ? d.height / d.width : 0.75; // tile height ÷ width
    const shortest = heights.indexOf(Math.min(...heights));
    out[shortest].push({ slide, index });
    heights[shortest] += ratio;
  });
  return out;
});

// Thumbnails: small widths, lower quality. `sizes` matches the real column
// width (2 / 3 / 4 columns, 24px gap, max-w-7xl container with side padding).
const thumbWidths = [200, 300, 400, 600, 800];
const thumbSizes = "(min-width: 1280px) 286px, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";
</script>

<template>
  <main
    class="w-full bg-white max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto pt-12 pb-40 md:pt-30 z-10"
  >
    <div class="w-full relative">
      <div
        class="pt-6 pb-16 flex items-center justify-center text-center text-subheading text-dark-brown"
      >
        A taste of the work we do
      </div>

      <div
        class="grid gap-6 items-start"
        :style="{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }"
      >
        <div v-for="(column, c) in columns" :key="c" class="flex flex-col gap-6 min-w-0">
          <button
            v-for="{ slide, index } in column"
            :key="index"
            type="button"
            :data-gallery-thumb="index"
            :aria-label="`Open image${slide.title ? ': ' + slide.title : ''}`"
            class="group block w-full overflow-hidden bg-black/5 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2"
            @click="lightbox?.open(index)"
            @pointerenter="lightbox?.preload(index)"
            @focus="lightbox?.preload(index)"
          >
            <!-- preserve-aspect-ratio ON: the tile reserves its real height
                 before the image loads, so nothing jumps -->
            <SanityImage
              :image="slide.image"
              :alt="slide.title"
              :preserve-aspect-ratio="true"
              :widths="thumbWidths"
              :sizes="thumbSizes"
              :quality="40"
              :loading="index < 4 ? 'eager' : 'lazy'"
              class="w-full h-auto block transition duration-300 ease-out group-hover:scale-[1.03] group-hover:opacity-90"
            />
          </button>
        </div>
      </div>

      <div v-if="remaining > 0" class="flex justify-center py-10">
        <button
          type="button"
          class="text-dark-brown text-small font-bold capitalize cursor-pointer btn-small"
          @click="loadMore"
        >
          Load more
        </button>
      </div>
    </div>

    <GalleryLightBox ref="lightbox" :items="items" @navigate="onNavigate" />
  </main>
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