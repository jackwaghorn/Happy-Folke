<script setup>
import { Rive, Layout, Fit, Alignment } from "@rive-app/canvas";

const canvas = ref(null);
let riveInstance = null;
let travelTween = null;

const props = defineProps({
  src: { type: String, default: "./walker.riv" },
  stateMachine: { type: String, default: "State Machine 1" },
  duration: { type: Number, default: 20 }, // seconds to cross the screen
});

onMounted(() => {
  riveInstance = new Rive({
    src: props.src,
    canvas: canvas.value,
    autoplay: true,
    stateMachines: props.stateMachine,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
      scale: 8,
    }),
    
    onLoad: () => {
      // resize canvas to match its actual pixel size (Rive needs this)
      riveInstance.resizeDrawingSurfaceToCanvas();
      startTravel();
    },
  });

  window.addEventListener("resize", handleResize);
});

function handleResize() {
  riveInstance?.resizeDrawingSurfaceToCanvas();
}

async function startTravel() {
  const gsap = (await import("gsap")).default;
  const wrapper = canvas.value.parentElement;
  const width = window.innerWidth;

  gsap.set(wrapper, { x: -500 });

  travelTween = gsap.to(wrapper, {
    x: width - 500,
    duration: props.duration,
    ease: "none",
    repeat: -1,
  });
}

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  riveInstance?.cleanup();
  travelTween?.kill();
});
</script>

<template>
  <div class="left-0 bottom-10 w-[1000px] h-[700px] rounded-xl">
    <canvas ref="canvas" class="w-full h-full" />
  </div>
</template>
