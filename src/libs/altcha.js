import { onMount, onCleanup, createSignal } from "solid-js";

export function useAltcha({
  onVerify,
  onError,
  onInit,
  onReset,
}) {
  const [el, setEl] = createSignal(null);

  const initAltcha = async () => {
    if (!customElements.get("altcha-widget")) {
      await import("altcha");
    }

    const widget = el();
    if (!widget) return;

    const listeners = [
      ["verify", () => onVerify?.(widget.getState())],
      ["error", (e) => onError?.(e.detail)],
      ["init", () => onInit?.()],
      ["reset", () => onReset?.()],
    ];

    for (const [event, handler] of listeners) {
      widget.addEventListener(event, handler);
    }

    // 清理事件
    onCleanup(() => {
      for (const [event, handler] of listeners) {
        widget.removeEventListener(event, handler);
      }
    });
  };

  onMount(initAltcha);

  return {
    el,
    setEl,
    getState: () => el()?.getState(),
    reset: () => el()?.reset(),
  };
}