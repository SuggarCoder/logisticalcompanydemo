import { createMemo, For } from 'solid-js';
import { A } from '@solidjs/router';
import { useI18n } from '~/libs/i18n';
import { assetPath } from '~/libs/paths';
import BossTalkSection from '~/components/BossTalkSection';
import ChooseUs from '~/components/Us';

const aboutCardBackgrounds = {
  uscargo: 'imgs/u04.jpg',
  uswarehouse: 'imgs/w02.jpg',
  usdepots: 'imgs/warehouse05.jpg',
  usfinance: 'imgs/fintec.jpg'
};

export default function AboutPage() {
  const [t] = useI18n();
  const about = createMemo(() => t('about') || {});
  const services = createMemo(() => about().services || []);

  return (
    <div class="bg-no-repeat bg-cover overflow-x-hidden" style={{ 'background-image': `url(${assetPath('imgs/WorlMap.png')})` }}>
      <section class="relative overflow-hidden bg-[#121c45] text-white">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,63,57,0.28),_transparent_45%)]"></div>
        <div class="relative mx-auto max-w-7xl px-4 pb-24 pt-32 md:pb-32 md:pt-40">
          <div class="max-w-3xl">
            <p class="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#ffaea9]">SJIUS</p>
            <h1 class="text-4xl font-bold leading-tight md:text-6xl">{about().title}</h1>
            <p class="mt-8 max-w-2xl text-base leading-8 text-stone-300 md:text-lg" innerHTML={about().description} />
            <div class="mt-10 flex flex-wrap gap-4">
              <A href="/" class="rounded-full bg-[#ff3f39] px-8 py-4 text-sm font-semibold text-white no-underline transition duration-300 hover:bg-[#ff6b66]">{t('menu.0.label')}</A>
              <button type="button" class="rounded-full border border-white/30 bg-transparent px-8 py-4 text-sm font-semibold text-white transition duration-300">{t('menu.5.label')}</button>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-24">
        <BossTalkSection t={t} />
        <div class="mt-16 grid gap-8 md:grid-cols-2">
          <For each={services()}>
            {(item, index) => (
              <article class="rounded-[28px] bg-cover bg-center shadow-[7px_7px_50px_#0000001a]" style={{ 'background-image': `url(${assetPath(aboutCardBackgrounds[item.img])})` }}>
                <div class="flex min-h-[340px] flex-col justify-between rounded-[28px] bg-[#121c45e8] p-8 text-white md:p-10">
                  <div>
                    <p class="text-sm font-semibold uppercase tracking-[0.3em] text-[#ffaea9]">0{index() + 1}</p>
                    <h2 class="mt-6 text-3xl font-bold leading-snug" innerHTML={item.title} />
                    <p class="mt-6 text-sm leading-7 text-stone-300" innerHTML={item.description} />
                  </div>
                  <div class="mt-8 inline-flex w-fit items-center rounded-full bg-white/10 px-5 py-3 text-xs uppercase tracking-[0.25em] text-white/80">Service Overview</div>
                </div>
              </article>
            )}
          </For>
        </div>
      </section>

      <ChooseUs />
    </div>
  );
}
