import {
  onMount,
  onCleanup,
  createSignal,
  createEffect,
} from 'solid-js';

/**
 * 防泄露 Flickity Hook
 * @param {() => HTMLElement|undefined} getEl 目标元素 accessor
 * @param {Object} opts                    Flickity 参数；可附带 refreshKey: () => any
 * @returns {[() => Flickity|null, (evt, fn) => void]}
 *
 * 用法：
 *   const [flkty, on] = useFlickity(() => el, { refreshKey });
 *   on('change', i => setIdx(i));
 */
export function useFlickity(getEl, opts = {}) {
  const [inst, setInst] = createSignal(null);

  /** 记录给当前实例绑过的监听器，便于统一解绑 */
  const listenerCache = new WeakMap(); // { Flickity => [{evt, fn}, ...] }

  /** 创建或重建实例 */
  async function init() {
    const Flickity = (await import('flickity')).default;
    await import('flickity-fade')

    // —— 清理旧实例 ——
    const old = inst();
    if (old) {
      // 1) 解绑自定义监听
      (listenerCache.get(old) || []).forEach(({ evt, fn }) =>
        old.off(evt, fn),
      );
      listenerCache.delete(old);
      // 2) 销毁
      old.destroy();
      setInst(null);
    }

    // —— 新实例 ——
    const el = getEl();
    if (!el) return;

    const flkty = new Flickity(el, opts);
    setInst(flkty);
  }

  /** 安全绑定自定义事件；组件卸载或实例重建时自动 off */
  function safeOn(evt, fn) {
    createEffect(() => {
      const flkty = inst();
      if (!flkty) return;

      flkty.on(evt, fn);

      // 记录到 cache，方便下一次 destroy 统一 off
      let bucket = listenerCache.get(flkty);
      if (!bucket) listenerCache.set(flkty, (bucket = []));
      bucket.push({ evt, fn });

      // 当前 effect 清理时 off
      onCleanup(() => flkty.off(evt, fn));
    });
  }

  // ——— 生命周期 ———
  onMount(init);
  onCleanup(() => inst()?.destroy());

  // —— refreshKey: 依赖变动即重建 ——
  if (typeof opts.refreshKey === 'function') {
    createEffect(() => {
      opts.refreshKey(); // 追踪依赖
      init();
    });
  }

  return [inst, safeOn];
}
