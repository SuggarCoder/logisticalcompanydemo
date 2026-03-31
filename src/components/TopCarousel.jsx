import { For } from 'solid-js';
import { useI18n } from '~/libs/i18n';
import { assetPath } from '~/libs/paths';
import { Carousel } from '~/components/Carousel';

const CAROUSEL_IMAGES = [
  'imgs/carrerbg02.jpg',
  'imgs/s2.jpg',
  'imgs/s3.jpg',
  'imgs/s4.jpg'
].map(assetPath);

const FLICKITY_OPTIONS = {
  cellAlign: 'center',
  autoPlay: 4000,
  wrapAround: false,
  selectedAttraction: 0.01,
  friction: 0.15,
  fade: true,
  pageDots: false,
  prevNextButtons: false
};

export default function TopCarousel() {
  const [t] = useI18n();

  return (
    <div id="home" class="w-full relative h-full">
      <div class="absolute inset-0">
        <Carousel options={FLICKITY_OPTIONS}>
          <For each={CAROUSEL_IMAGES}>
            {src => (
              <div class="carousel-cell w-full h-225">
                <img src={src} class="w-full h-full object-cover" alt="carousel item" />
              </div>
            )}
          </For>
        </Carousel>
      </div>

      <div class="relative inset-0 bg-[#0000001a]">
        <div class="flex items-center w-full max-w-[1140px] mx-auto min-h-[900px] px-[15px]">
          <div class="w-full max-w-[625px]">
            <h1 class="text-white mb-10 text-7xl leading-[1.2]">{t('hero.heading')}</h1>
            <p class="text-base text-white mb-2 leading-[1.7]">{t('hero.description')}</p>
            <div class="mt-10">
              <For
                each={[
                  { text: t('hero.buttons.ourServices'), classes: 'bg-red-600 hover:bg-red-500 text-red-100' },
                  { text: t('hero.buttons.aboutUs'), classes: 'bg-white hover:bg-red-600 hover:text-white text-stone-9 ml-4' }
                ]}
              >
                {({ text, classes }) => (
                  <button type="button" class={`px-8 py-5 no-underline transition rounded-full duration-300 ${classes}`}>
                    {text}
                  </button>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
