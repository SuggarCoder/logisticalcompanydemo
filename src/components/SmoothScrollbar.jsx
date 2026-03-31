// src/components/SmoothScrollbar.tsx
import { onMount, onCleanup, createEffect } from 'solid-js'
import { useI18n } from '~/libs/i18n'

export function SmoothScrollbar(props) {
  let container
  let scrollbar
  
  // 从 i18n 上拿到当前 locale 信号
  const [translate, i18n] = useI18n(); 

  onMount(async () => {
    const Scrollbar = (await import('smooth-scrollbar')).default
    scrollbar = Scrollbar.init(container, {
      damping: 0.1,
      alwaysShowTracks: false,
      renderByPixels: true,
    })
  })

  // 每当 locale 变化，就调用 update() 重新计算滚动条
  createEffect(() => {
    const currentLocale = i18n.locale();
    // 只有等 scrollbar 已经初始化后才调用
    if (scrollbar) {
      // 微小延迟保证内容已经渲染完毕
      queueMicrotask(() => {
        scrollbar.update();
      });
    }
  });

  onCleanup(() => scrollbar?.destroy())

  return (
    <div ref={container} style={{ height: '100vh', overflow: 'hidden' }}>
      {props.children}
    </div>
  )
}
