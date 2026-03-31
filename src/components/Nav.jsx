import { createMemo, createSignal, For, createEffect } from 'solid-js'
import { A , useLocation} from "@solidjs/router";
import { useI18n } from '~/libs/i18n'
// import { useGsap } from "~/libs/gsap";

export default function Nav() {

  const [menuOpen, setMenuOpen] = createSignal(false)
  const [t] = useI18n()
  
  const location = useLocation();
  const isActive = (href) => location.pathname === href;

  // 添加默认值防止 undefined
  const data = createMemo(() => t('menu') || [])

  useGsap((gsap, ScrollTrigger) => {
    // 创建ScrollTrigger来监听滚动位置
    ScrollTrigger.create({
      start: "top-=160", // 页面顶部向下160px
      end: "max", // 页面底部
      scrub: true,
      markers: true, // 开启 debug marker
      onEnter: () => gsap.to("#navbar", { 
        backgroundColor: "rgba(255, 255, 255, 0.9)", // 滚动超过160px后的颜色
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        duration: 0.3 
      }),
      onLeaveBack: () => gsap.to("#navbar", { 
        backgroundColor: "transparent", // 回到顶部时的颜色
        boxShadow: "none",
        duration: 0.3 
      })
    });
  });


  return (
    <>
      <nav
        id="navbar"
        class="text-white w-full flex duration-300 z-5 border-b-1 border-b-solid border-b-[#fff3] min-h-[88px] fixed inset-y-0 inset-t-0 inset-b-auto transition-all"
      >
        <div class="mx-auto flex items-center justify-between container">
          <img class="object-cover w-20 ml-4" src="/imgs/logo.png" alt="Logo" />

          {/* Desktop Menu */}
          <div class="md:flex items-center justify-center hidden space-x-14">
            <For each={data()}>
              {(item, index) => (
                <a
                    href={item?.href || '#'}
                    class={`${
                      isActive(item?.href)
                        ? 'text-gray-500 text-gray-100'
                        : index() === (data()?.length || 0) - 1
                        ? 'bg-red-600 px-8 py-5 text-red-100 hover:bg-red-500 transition duration-300 rounded-full'
                        : 'text-inherit transition-opacity duration-[250ms] hover:opacity-70'
                    } no-underline`}
                  >
                    {item?.label || ''}
                </a>
              )}
            </For>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen())}
            id="menu-toggle"
            class="md:hidden mr-4"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </nav>
      <div
        id="mobile-menu"
        class={`fixed top-0 right-0 h-full w-64 bg-[#121c45] text-white md:hidden z-10 transition-transform duration-300 ${
          menuOpen() ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div class="p-4 h-[96%]">
          {/* Close Button */}
          <button id="close-menu" class="mb-8" onClick={() => setMenuOpen(false)}>
            {/* <IconClose color="currentColor" size="w-6 h-6" /> */}
          </button>

          {/* Menu Items */}
          <div class="flex flex-col h-full">
            <div class="flex flex-col space-y-8">
              <For each={data()?.slice(0, -1) || []}>
                {(item) => (
                  <div
                    class="flex justify-between items-center text-white duration-[250ms] menu-item transition-opacity group"
                    onClick={() => {setMenuOpen(false)}}
                  >
                    {item?.icon && (
                      <div></div>
                      // <Icon class="w-8 h-8 group-hover:filter group-hover:brightness-60 text-center pt-2" icon={item.icon} />
                    )}
                    <A
                      href={item?.href || '#'}
                      class="no-underline text-inherit group-hover:text-stone-4"
                    >
                      {item?.label || ''} 
                    </A>
                  </div>
                )}
              </For>
            </div>

            {/* Logo at the Bottom */}
            <img
              src="/imgs/logo-white.png"
              class="h-auto self-center w-1/4 mt-auto filter opacity-50"
              alt="Logo"
            />
          </div>
        </div>
      </div>

      {/* Mask */}
      <div
        class={`z-5 fixed inset-0 bg-black bg-opacity-80  transition-opacity duration-300 ease-in-out ${
          menuOpen() ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  )
}
