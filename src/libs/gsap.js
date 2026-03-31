// ~/hooks/useGsap.js
import { onMount, onCleanup } from "solid-js";

export function useGsap(initCallback) {
  let gsapInstance;
  let ScrollTriggerInstance;
  
  onMount(async () => {
    const gsapModule = await import('gsap');
    const ScrollTriggerModule = await import('gsap/ScrollTrigger');
    
    gsapInstance = gsapModule.default;
    ScrollTriggerInstance = ScrollTriggerModule.default;
    
    gsapInstance.registerPlugin(ScrollTriggerInstance);
    
    // 执行初始化回调
    if (typeof initCallback === 'function') {
      initCallback(gsapInstance, ScrollTriggerInstance);
    }
  });
  
  onCleanup(() => {
    if (ScrollTriggerInstance) {
      ScrollTriggerInstance.getAll().forEach(trigger => trigger.kill());
    }
  });
}