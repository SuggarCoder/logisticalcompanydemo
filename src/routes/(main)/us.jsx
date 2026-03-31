import { createMemo, createSignal, For, Show } from 'solid-js';
import { A } from '@solidjs/router';
import { useI18n } from '~/libs/i18n';
import { assetPath } from '~/libs/paths';

export default function ContactPage() {
  const [t] = useI18n();
  const contact = createMemo(() => t('contact') || {});
  const address = createMemo(() => contact().address || []);
  const services = createMemo(() => contact().services || []);
  const fields = createMemo(() => contact().form?.fields || {});
  const [submitted, setSubmitted] = createSignal(false);

  return (
    <div class="bg-no-repeat bg-cover overflow-x-hidden" style={{ 'background-image': `url(${assetPath('imgs/WorlMap.png')})` }}>
      <section class="relative overflow-hidden bg-[#121c45] text-white">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,63,57,0.28),_transparent_45%)]"></div>
        <div class="relative mx-auto max-w-7xl px-4 pb-24 pt-32 md:pb-32 md:pt-40">
          <div class="max-w-4xl">
            <p class="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#ffaea9]">SJIUS</p>
            <h1 class="text-4xl font-bold leading-tight md:text-6xl">{contact().title || t('menu.5.label')}</h1>
            <p class="mt-8 max-w-3xl text-base leading-8 text-stone-300 md:text-lg">{contact().message || ''}</p>
            <div class="mt-10 flex flex-wrap gap-4">
              <A href="/" class="rounded-full bg-[#ff3f39] px-8 py-4 text-sm font-semibold text-white no-underline transition duration-300 hover:bg-[#ff6b66]">{t('menu.0.label')}</A>
              <a href={`tel:${contact().phone || ''}`} class="rounded-full border border-white/30 bg-transparent px-8 py-4 text-sm font-semibold text-white no-underline transition duration-300">
                {contact().phone || ''}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-24">
        <div class="grid gap-8 md:grid-cols-3">
          <div class="rounded-[28px] bg-white p-8 shadow-[7px_7px_50px_#0000001a]">
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f39]">Address</p>
            <div class="mt-6 space-y-3 text-sm leading-7 text-stone-500">
              <For each={address()}>{line => <p>{line}</p>}</For>
            </div>
          </div>
          <div class="rounded-[28px] bg-white p-8 shadow-[7px_7px_50px_#0000001a]">
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f39]">Phone</p>
            <p class="mt-6 text-3xl font-bold text-[#121c45]">+86 {contact().phone || ''}</p>
            <p class="mt-4 text-sm leading-7 text-stone-500">Fast direct contact for quotations and business consultation.</p>
          </div>
          <div class="rounded-[28px] bg-white p-8 shadow-[7px_7px_50px_#0000001a]">
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f39]">Email</p>
            <p class="mt-6 break-all text-2xl font-bold text-[#121c45]">{contact().email || ''}</p>
            <p class="mt-4 text-sm leading-7 text-stone-500">Send your inquiry and our team will respond with the relevant logistics support information.</p>
          </div>
        </div>
      </section>

      <section class="bg-center bg-no-repeat bg-cover bg-fixed mt-10" style={{ 'background-image': `url(${assetPath('imgs/c04.jpg')})` }}>
        <div class="bg-[#121c45e6]">
          <div class="relative mx-auto px-4 max-w-[1140px] -top-20 pt-20">
            <div class="bg-[#001d67] rounded-t-2xl">
              <div class="bg-transparent align-top text-left px-4 py-0 no-underline inline-block relative lg:px-30 [border-bottom:4px_solid_#ff3f39] text-[#ff3f39]">
                <div class="py-6 text-base">{contact().title || t('menu.5.label')}</div>
              </div>
            </div>
            <div class="block relative overflow-hidden">
              <div class="flex flex-col lg:flex-row">
                <div class="w-full bg-white lg:w-[70%] p-10">
                  <form onSubmit={event => { event.preventDefault(); setSubmitted(true); }}>
                    <h6 class="mb-5 text-[#121c45]">{contact().form?.label || ''}</h6>
                    <div class="grid gap-4 md:grid-cols-3">
                      <input type="text" class="text-[#333] px-3 py-2 font-normal text-sm block border border-[#0000001a] w-full h-[45px] mb-2" placeholder={fields().area || ''} />
                      <input type="text" class="text-[#333] px-3 py-2 font-normal text-sm block border border-[#0000001a] w-full h-[45px] mb-2" placeholder={fields().name || ''} />
                      <input type="tel" class="text-[#333] px-3 py-2 font-normal text-sm block border border-[#0000001a] w-full h-[45px] mb-2" placeholder={fields().phone || ''} />
                    </div>
                    <textarea placeholder={fields().comments || ''} maxlength="500" class="text-[#333] px-3 py-2 font-normal text-sm block border border-[#0000001a] w-full mt-4 mb-6 h-[200px]"></textarea>
                    <button type="submit" class="cursor-pointer text-white w-full text-center px-8 py-5 bg-[#ff3f39e6] hover:bg-[#001d67] duration-300">
                      {fields().submit || t('form.query.submit')}
                    </button>
                    <Show when={submitted()}>
                      <p class="mt-4 text-sm text-green-600">{t('form.response')}</p>
                    </Show>
                  </form>
                </div>
                <div class="bg-center bg-no-repeat bg-cover w-full mx-auto max-w-xl lg:w-[30%] mt-10 lg:mt-0" style={{ 'background-image': `url(${assetPath('imgs/warehouse06.jpg')})` }}>
                  <div class="bg-[#ff3f39e6] flex flex-col w-full p-10 items-stretch h-full text-white">
                    <h2 class="text-center font-bold mb-8">{contact().title || t('menu.5.label')}</h2>
                    <p class="text-base leading-7">{contact().message || ''}</p>
                    <div class="mt-8 space-y-5 text-sm leading-7">
                      <div>
                        <p class="font-semibold uppercase tracking-[0.2em] text-white/70">Address</p>
                        <For each={address()}>{line => <p>{line}</p>}</For>
                      </div>
                      <div>
                        <p class="font-semibold uppercase tracking-[0.2em] text-white/70">Phone</p>
                        <p>+86 {contact().phone || ''}</p>
                      </div>
                      <div>
                        <p class="font-semibold uppercase tracking-[0.2em] text-white/70">Email</p>
                        <p class="break-all">{contact().email || ''}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="max-w-[1140px] mx-auto px-4 pb-30">
            <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <For each={services()}>
                {(item, index) => (
                  <article class="rounded-[28px] bg-white p-8 shadow-[7px_7px_50px_#0000001a]">
                    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff3f39]">0{index() + 1}</p>
                    <h3 class="mt-5 text-xl font-bold text-[#121c45]" innerHTML={item.title} />
                    <p class="mt-5 text-sm leading-7 text-stone-500" innerHTML={item.description} />
                  </article>
                )}
              </For>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
