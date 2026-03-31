import { createMemo, createSignal, For } from 'solid-js'
import { A, useLocation } from "@solidjs/router";
import { useI18n } from '~/libs/i18n'
import { assetPath } from '~/libs/paths';

export default function Nav() {
  const [menuOpen, setMenuOpen] = createSignal(false)
  const [t] = useI18n()
  const location = useLocation();
  const isActive = href => location.pathname === href;
  const data = createMemo(() => t('menu') || [])

  return (
    <>
      <nav
        id="navbar"
        class="text-white w-full flex duration-300 z-5 border-b-1 border-b-solid border-b-[#fff3] min-h-[88px] fixed inset-y-0 inset-t-0 inset-b-auto transition-all"
      >
        <div class="mx-auto flex items-center justify-between container">
          <img class="object-cover w-20 ml-4" src={assetPath('imgs/logo.png')} alt="Logo" />

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
          <button id="close-menu" class="mb-8" onClick={() => setMenuOpen(false)} />

          <div class="flex flex-col h-full">
            <div class="flex flex-col space-y-8">
              <For each={data()?.slice(0, -1) || []}>
                {item => (
                  <div
                    class="flex justify-between items-center text-white duration-[250ms] menu-item transition-opacity group"
                    onClick={() => setMenuOpen(false)}
                  >
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

            <img
              src={assetPath('imgs/logo-white.png')}
              class="h-auto self-center w-1/4 mt-auto filter opacity-50"
              alt="Logo"
            />
          </div>
        </div>
      </div>

      <div
        class={`z-5 fixed inset-0 bg-black bg-opacity-80 transition-opacity duration-300 ease-in-out ${
          menuOpen() ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      />
    </>
  )
}
