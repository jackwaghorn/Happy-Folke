<script setup lang="ts">
type GalleryItem = {
  title?: string;
  caption?: string;
  image?: any; // Sanity image with asset->{ url, metadata { dimensions } }
};

const props = defineProps<{ items: GalleryItem[] }>();
const emit = defineEmits<{ (e: "navigate", index: number): void }>();

const route = useRoute();
const router = useRouter();

// null = closed, otherwise the open slide's index
const index = ref<number | null>(null);
const isOpen = computed(() => index.value !== null);
const count = computed(() => props.items.length);

// Tell the page which slide is showing (so it can reveal it in the grid)
watch(index, (i) => {
  if (i !== null) emit("navigate", i);
});

const VT_NAME = "gallery-image";
const FADE_MS = 300; // keep in sync with duration-300 / delay-300 in the template

/* ---------- Full-size image: one deterministic URL per viewport ----------
   A single width (instead of a big srcset) means we know exactly which URL
   will be displayed, so we can preload it *before* the transition starts and
   it will be a cache hit when the lightbox renders it. */
const FULL_QUALITY = 75;
const fullWidth = ref(1600);
function updateFullWidth() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const needed = window.innerWidth * dpr;
  fullWidth.value = [1000, 1400, 1800, 2200].find((w) => w >= needed) ?? 2200;
}
const fullUrl = (item?: GalleryItem) => {
  const base = item?.image?.asset?.url;
  return base ? `${base}?w=${fullWidth.value}&auto=format&q=${FULL_QUALITY}` : null;
};

const preloaded = new Map<string, Promise<void>>();
function preloadImage(i: number): Promise<void> {
  const url = fullUrl(props.items[i]);
  if (!url) return Promise.resolve();
  if (!preloaded.has(url)) {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    preloaded.set(
      url,
      img.decode().catch(() => {})
    );
  }
  return preloaded.get(url)!;
}
// Called by the page on thumbnail hover/focus so the click feels instant
function preload(i: number) {
  if (isOpen.value) return;
  updateFullWidth();
  preloadImage(i);
}

/* ---------- View transition helper (open/close expand) ---------- */
const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

async function transition(update: () => void | Promise<void>) {
  const start = (document as any).startViewTransition?.bind(document);
  if (!start || prefersReducedMotion()) {
    await update();
    await nextTick();
    return;
  }
  const t = start(async () => {
    await update();
    await nextTick();
  });
  await t.finished.catch(() => {});
}

const thumbFor = (i: number) =>
  document.querySelector<HTMLElement>(`[data-gallery-thumb="${i}"]`);

/* ---------- Scroll lock ---------- */
function lockScroll() {
  const gap = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  if (gap > 0) document.body.style.paddingRight = `${gap}px`;
}
function unlockScroll() {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
}

/* ---------- URL (?image=N, 1-based, replace so Back leaves the page) ---------- */
function writeQuery(i: number | null) {
  router.replace({
    query: { ...route.query, image: i === null ? undefined : String(i + 1) },
  });
}
const queryIndex = () => {
  const n = Number(route.query.image);
  return Number.isInteger(n) && n >= 1 && n <= count.value ? n - 1 : null;
};

/* ---------- Open / close ---------- */
async function open(i: number) {
  if (isOpen.value) return;
  updateFullWidth();
  // Wait (briefly) for the full image so the expand lands on a real picture,
  // not an empty box. Capped so a slow network never blocks the click.
  await Promise.race([preloadImage(i), new Promise((r) => setTimeout(r, 800))]);

  const thumb = thumbFor(i);
  if (thumb) thumb.style.viewTransitionName = VT_NAME; // old snapshot
  await transition(() => {
    if (thumb) thumb.style.viewTransitionName = "";
    index.value = i; // lightbox image now carries the name
    lockScroll();
  });
  writeQuery(i);
  warmNeighbours(i);
}

async function close() {
  const i = index.value;
  if (i === null) return;
  pending = null;
  writeQuery(null);
  let thumb: HTMLElement | null = null;
  await transition(() => {
    index.value = null;
    unlockScroll();
    thumb = thumbFor(i);
    if (thumb) {
      thumb.scrollIntoView({ block: "nearest" }); // make sure the target is on screen
      thumb.style.viewTransitionName = VT_NAME;
    }
  });
  if (thumb) (thumb as HTMLElement).style.viewTransitionName = "";
}

/* ---------- Navigate between slides (crossfade) ----------
   `pending` is the slide we're waiting on, so rapid clicks stack up
   (click twice = two steps ahead) instead of both going to the same slide. */
let pending: number | null = null;

function warmNeighbours(i: number) {
  preloadImage((i + 1) % count.value);
  preloadImage((i - 1 + count.value) % count.value);
}

async function go(to: number) {
  if (index.value === null || count.value < 2) return;
  const i = ((to % count.value) + count.value) % count.value;
  pending = i;

  // Switch only once the next image is ready, so the crossfade is always
  // between two loaded images. Capped so a slow network never blocks you.
  await Promise.race([preloadImage(i), new Promise((r) => setTimeout(r, 500))]);
  if (index.value === null || pending !== i) return; // closed, or superseded by a newer click

  pending = null;
  index.value = i;
  writeQuery(i);
  warmNeighbours(i);
}

// Step relative to where we're heading (the pending slide if there is one)
const step = (delta: number) => go((pending ?? index.value ?? 0) + delta);

defineExpose({ open, preload });

/* ---------- Deep links + back/forward ---------- */
onMounted(() => {
  updateFullWidth();
  const i = queryIndex();
  if (i !== null) {
    index.value = i;
    lockScroll();
    warmNeighbours(i);
  }
});
watch(
  () => route.query.image,
  () => {
    const i = queryIndex();
    if (i === index.value) return;
    if (i === null) {
      index.value = null;
      unlockScroll();
    } else {
      if (index.value === null) lockScroll();
      index.value = i;
    }
  }
);

/* ---------- Keyboard ---------- */
function onKeydown(e: KeyboardEvent) {
  if (!isOpen.value) return;
  if (e.key === "ArrowLeft") step(-1);
  else if (e.key === "ArrowRight") step(1);
  else if (e.key === "Escape") close();
}
onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  unlockScroll();
});

/* ---------- Touch swipe ---------- */
let swipeStartX: number | null = null;
function onPointerDown(e: PointerEvent) {
  swipeStartX = e.pointerType === "mouse" ? null : e.clientX;
}
function onPointerUp(e: PointerEvent) {
  if (swipeStartX === null || index.value === null) return;
  const dx = e.clientX - swipeStartX;
  swipeStartX = null;
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
}

/* ---------- Layout helpers ---------- */
// Fit inside the stage without cropping, at the real aspect ratio, so the
// shared-element transition doesn't distort the image
function fitStyle(image: any) {
  const d = image?.asset?.metadata?.dimensions;
  const ratio = d?.width && d?.height ? d.width / d.height : 3 / 2;
  return { aspectRatio: String(ratio), width: `min(100cqw, 100cqh * ${ratio})` };
}

// Render only the current slide and its neighbours so next/prev preload
const isNear = (i: number) =>
  index.value !== null &&
  (i === index.value ||
    i === (index.value + 1) % count.value ||
    i === (index.value - 1 + count.value) % count.value);

const current = computed(() => (index.value === null ? null : props.items[index.value]));
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[100] bg-white text-dark-brown"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      <div
        class="relative h-full grid grid-cols-[2.5rem_1fr_2.5rem] lg:grid-cols-[60px_1fr_60px] grid-rows-[minmax(0,1fr)_auto] pt-14 lg:pt-15 pb-4 lg:pb-10"
      >
        <!-- Close -->
        <button
          type="button"
          aria-label="Close"
          class="absolute top-4 right-2 lg:top-6 lg:right-12 p-2 cursor-pointer hover:text-primary"
          @click="close"
        >
          <svg
            class="w-4 h-4"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path d="M2 1.5 14 14.5M14 1.5 2 14.5" />
          </svg>
        </button>

        <!-- Previous -->
        <button
          type="button"
          class="col-start-1 row-start-1 ms-4 self-center justify-self-center p-2 cursor-pointer hover:text-primary flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff9f] backdrop-blur text-brown border border-brown transition hover:bg-brown hover:text-off-white"
          v-if="count > 1"
          aria-label="Previous image"
          @click="step(-1)"
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

        <!-- Stage (click empty space to close).
             Slides are stacked in one grid cell and crossfaded: the active
             slide fades in on top while the outgoing one stays put until the
             fade finishes, so there's never a gap between images. -->
        <div
          class="col-start-2 row-start-1 relative min-h-0 grid place-items-center touch-pan-y [container-type:size]"
          @click.self="close"
          @pointerdown="onPointerDown"
          @pointerup="onPointerUp"
          @pointercancel="swipeStartX = null"
        >
          <template v-for="(item, i) in items" :key="i">
            <div
              v-if="isNear(i) && item.image"
              class="col-start-1 row-start-1 relative overflow-hidden transition-opacity ease-in-out motion-reduce:transition-none"
              :class="
                i === index
                  ? 'opacity-100 z-10 duration-300'
                  : 'opacity-0 z-0 duration-300 pointer-events-none'
              "
              :aria-hidden="i !== index"
              :style="{
                ...fitStyle(item.image),
                ...(i === index ? { viewTransitionName: VT_NAME } : {}),
              }"
            >
              <SanityImage
                :image="item.image"
                :alt="item.title"
                :preserve-aspect-ratio="false"
                :widths="[fullWidth]"
                :quality="FULL_QUALITY"
                sizes="100vw"
                loading="eager"
                class="absolute inset-0 size-full"
                draggable="false"
              />
            </div>
          </template>
        </div>

        <!-- Next -->
        <button
          type="button"
          class="col-start-3 row-start-1 self-center justify-self-center p-2 cursor-pointer hover:text-primary flex h-10 w-10 items-center justify-center rounded-full bg-[#ffffff9f] backdrop-blur text-brown border border-brown transition hover:bg-brown hover:text-off-white"
          v-if="count > 1"
          aria-label="Next image"
          @click="step(1)"
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

        <!-- Title / caption | counter -->
        <div class="col-start-2 row-start-2 flex justify-between gap-4 pt-4 text-small">
          <div class="min-w-0">
            <p v-if="current?.title">{{ current.title }}</p>
            <p v-if="current?.caption" class="opacity-70">{{ current.caption }}</p>
          </div>
          <span v-if="count > 1" class="whitespace-nowrap font-bold"
            >{{ index! + 1 }} / {{ count }}</span
          >
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
/* Shared-element expand/shrink between thumbnail and full-size image */
::view-transition-group(gallery-image) {
  animation-duration: 0.45s;
  animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
}
::view-transition-old(gallery-image),
::view-transition-new(gallery-image) {
  height: 100%;
  object-fit: cover;
}
</style>
