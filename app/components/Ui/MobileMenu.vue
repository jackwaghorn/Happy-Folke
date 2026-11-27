<script setup lang="ts">
import { motion, stagger, type MotionProps } from 'motion-v'

const isOpen = ref(false)
const dimensions = ref({ width: 0, height: 0 })

const updateDimensions = () => {
  dimensions.value.width = window.innerWidth
  dimensions.value.height = window.innerHeight
}

onMounted(() => {
  updateDimensions()
  window.addEventListener('resize', updateDimensions)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDimensions)
})

// Lock body scroll while the full-screen menu is open
watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const navVariants: MotionProps['variants'] = {
  open: {
    transition: { delayChildren: stagger(0.07, { startDelay: 0.2 }) },
  },
  closed: {
    transition: { delayChildren: stagger(0.05, { from: 'last' }) },
  },
}

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

// Radius uses the full viewport diagonal so the circle always
// covers the entire screen, no matter the device size.
const sidebarVariants: MotionProps['variants'] = {
  open: () => {
    const { width, height } = dimensions.value
    const radius = Math.hypot(width, height) + 100
    return {
      clipPath: `circle(${radius}px at 40px 40px)`,
      transition: {
        type: 'spring',
        stiffness: 20,
        restDelta: 2,
      },
    }
  },
  closed: {
    clipPath: 'circle(28px at 40px 38px)',
    transition: {
      delay: 0.2,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]
</script>

<template>
  <motion.nav
    :initial="false"
    :animate="isOpen ? 'open' : 'closed'"
    class="fixed inset-0 z-50 pointer-events-none"
  >
    <!-- Expanding background -->
    <motion.div
      :variants="sidebarVariants"
      class="absolute inset-0 w-screen h-screen  pointer-events-auto transition"
      :class="isOpen ? 'pointer-events-auto bg-off-white' : 'pointer-events-none bg-off-white delay-300'"
    />

    <!-- Nav items -->
    <motion.ul
      :variants="navVariants"
      class="absolute inset-0 flex flex-col items-center justify-center list-none m-0 p-0"
      :class="isOpen ? 'pointer-events-auto' : 'pointer-events-none'"
    >
      <motion.li
        v-for="link in links"
        :key="link.href"
        :variants="itemVariants"
        :whilePress="{ scale: 0.95 }"
        :whileHover="{ scale: 1.08 }"
        class="my-3 cursor-pointer"
      >
        <NuxtLink
          :to="link.href"
          class="text-2xl font-bold text-brown tracking-tight hover:text-neutral-500 transition-colors"
          @click="isOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </motion.li>
    </motion.ul>

    <!-- Toggle button -->
    <button
      class="absolute top-[15px] left-[15px] w-[50px] h-[50px] rounded-full bg-transparent border-none outline-none cursor-pointer select-none z-10 pointer-events-auto"
      @click="toggle"
    >
      <svg width="23" height="23" viewBox="0 0 23 23" class="mx-auto">
        <motion.path
          fill="transparent"
          stroke-width="3"
          stroke="hsl(25.8, 84.75%, 23.14%)"
          stroke-linecap="round"
          :variants="{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }"
        />
        <motion.path
          fill="transparent"
          stroke-width="3"
          stroke="hsl(25.8, 84.75%, 23.14%) "
          stroke-linecap="round"
          d="M 2 9.423 L 20 9.423"
          :variants="{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }"
          :transition="{ duration: 0.1 }"
        />
        <motion.path
          fill="transparent"
          stroke-width="3"
          stroke="hsl(25.8, 84.75%, 23.14%) "
          stroke-linecap="round"
          :variants="{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }"
        />
      </svg>
    </button>
  </motion.nav>
</template>
