// src/services/lenis.ts
import { createSignal, onCleanup, onMount } from "solid-js";
import Lenis from "@studio-freight/lenis";

const createLenis = () => {
  const [lenis, setLenis] = createSignal(null);

  onMount(() => {
    const instance = new Lenis({
      smooth: true,
      lerp: 0.1, // Adjust for your needs
    });

    setLenis(instance);

    const raf = (time) => {
      instance.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    onCleanup(() => {
      instance.destroy();
      setLenis(null);
    });
  });

  return lenis;
};

export default createLenis;
