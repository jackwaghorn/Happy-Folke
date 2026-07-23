<script setup lang="ts">
const props = defineProps<{
  image: any
  alt?: string
  sizes?: string
  widths?: number[]
  loading?: 'lazy' | 'eager'
  preserveAspectRatio?: boolean // opt-out when parent controls aspect/height itself
}>()

const widths = props.widths ?? [320, 480, 640, 768, 1024, 1280, 1600, 1920]

const baseUrl = computed(() => props.image?.asset?.url)

const urlFor = (width: number) =>
  `${baseUrl.value}?w=${width}&auto=format&q=80`

const srcset = computed(() =>
  widths.map((w) => `${urlFor(w)} ${w}w`).join(', ')
)

const fallbackSrc = computed(() => urlFor(widths[widths.length - 1]))

const aspectRatio = computed(() => {
  if (props.preserveAspectRatio === false) return undefined
  const dims = props.image?.asset?.metadata?.dimensions
  return dims ? `${dims.width} / ${dims.height}` : undefined
})
</script>

<template>
  <img
    :src="fallbackSrc"
    :srcset="srcset"
    :sizes="sizes ?? '100vw'"
    :alt="alt ?? ''"
    :loading="loading ?? 'lazy'"
    :style="{ aspectRatio }"
    decoding="async"
    class=""
  />
</template>