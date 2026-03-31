// src/components/SmoothScroll.tsx
import { onMount, onCleanup } from "solid-js";

export default function SmoothScroll(props) {
  let wrapper;
  let content;
  let smoother;

  onMount(async () => {
    if (typeof window === "undefined") return;
    // dynamic‐import so ScrollSmoother only ships to the browser
    const  { default: gsap } = await import("gsap");
    const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
    const { default: ScrollSmoother } = await import("gsap/ScrollSmoother");

    gsap.registerPlugin(ScrollTrigger,ScrollSmoother);

    smoother = ScrollSmoother.create({
      wrapper,
      content,
      smooth: 2,       // adjust as you like
      effects: true,     // enable data-speed/data-lag attrs
      normalizeScroll: ScrollTrigger.isTouch === 1,
      smoothTouch: false,
      ignoreMobileResize: true,
      onUpdate: self => {
        // optional callback
      },
    });
  });

  onCleanup(() => {
    if (smoother) {
      smoother.kill();
      smoother = null;
    }
  });

  return (
    <div ref={wrapper} style={{ overflow: "hidden", position: "relative" }}>
      <div ref={content}>
        {props.children}
      </div>
    </div>
  );
}
