const isAppearanceTransition = typeof document !== 'undefined'
  && document.startViewTransition
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

let isDark = false;
// 将常量移到组件外部

const ANIMATION_DURATION = 400
const ANIMATION_EASING = 'ease-in'

export default function DarkSwitcher() {
    const toggleDark = (e) => {
        
      
        if (!isAppearanceTransition || !e) {
          isDark = !isDark
          return
        }

    
      
        const x = e.clientX
        const y = e.clientY
        const endRadius = Math.hypot(
          Math.max(x, innerWidth - x),
          Math.max(y, innerHeight - y),
        )
        
        
        const transition = document.startViewTransition(async () => {
           isDark = !isDark
           document.documentElement.classList.toggle('dark', isDark)
        })

        
        transition.ready.then(() => {
          const clipPath = [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ]
          const animation = document.documentElement.animate(
            {
              clipPath: !isDark
                ? clipPath
                : [...clipPath].reverse(),
            },
            {
              duration: ANIMATION_DURATION,
              easing: ANIMATION_EASING,
              pseudoElement: !isDark
                ? '::view-transition-new(root)'
                : '::view-transition-old(root)',
            },
          )
             // 清理动画

             animation.onfinish = () => {
                animation.cancel()
            }
          
        })
      }      
    
    return(
        <button
            icon-button
            dark:i-ant-design-moon-outlined i-ant-design-sun-outlined
            onClick={toggleDark}/>
    )
}