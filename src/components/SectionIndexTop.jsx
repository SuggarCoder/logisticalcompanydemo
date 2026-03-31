import { createMemo, For, createSignal, onCleanup, onMount } from 'solid-js';
import { useI18n } from '~/libs/i18n';
import { assetPath } from '~/libs/paths';
import BossTalkSection from './BossTalkSection';
import IntroCard from './IntroCard';

const serviceBackgrounds = {
  cargo: 'imgs/s2.jpg',
  warehouse: 'imgs/warehouse.jpg',
  depots: 'imgs/s4.jpg',
  finance: 'imgs/finance.jpg'
};

export default function SectionIndexTop() {
  const [t] = useI18n();
  const data = createMemo(() => t('cardService'));
  const cards = createMemo(() => t('sectionIntro.cards'));

  const [isTopVisible, setIsTopVisible] = createSignal(false);
  const [isCarVisible, setIsCarVisible] = createSignal(false);
  let topRefs;
  let carRefs;

  const setupIntersectionObserver = () => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const setVisibility = entry.target.id === 'topRefs' ? setIsTopVisible : setIsCarVisible;
        setVisibility(entry.isIntersecting);
      });
    });

    observer.observe(topRefs);
    observer.observe(carRefs);
    onCleanup(() => observer.disconnect());
  };

  onMount(setupIntersectionObserver);

  const renderServiceCard = item => (
    <div class="flex items-center transition-colors duration-300 h-full bg-[#121c45] p-[62px_30px] hover:bg-[#ff3f39cc]">
      <img class="max-w-full w-[60px] h-[59px] mr-[20px]" alt={item.title} src={assetPath(item.imageUrl)} />
      <h4 class="text-white font-bold text-3xl" innerHTML={item.title} />
    </div>
  );

  return (
    <div
      class="bg-no-repeat bg-cover w-full relative bgPositionChange -mt-25"
      style={{ 'background-image': `url(${assetPath('imgs/WorlMap.png')})` }}
    >
      <div class="mx-auto relative container max-w-7xl min-h-screen">
        <div id="topRefs" class="grid gap-4 px-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" ref={topRefs}>
          <For each={data()}>
            {(item, index) => (
              <div
                class={`bg-center bg-no-repeat bg-cover ${isTopVisible() ? 'animate__animated animate__fadeInUp' : ''}`}
                style={{
                  'animation-delay': `${index() * 0.1}s`,
                  'background-image': `url(${assetPath(serviceBackgrounds[item.bgUrl])})`
                }}
              >
                <div class="block no-underline">{renderServiceCard(item)}</div>
              </div>
            )}
          </For>
        </div>

        <BossTalkSection t={t} />

        <div id="carRefs" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 px-4 mt-32" ref={carRefs}>
          <For each={cards()}>
            {(card, index) => <IntroCard card={card} index={index} isVisible={isCarVisible} />}
          </For>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-32 mt-24">
          <div class="text-center sm:text-right">
            <p class="text-stone-400">{t('sectionIntro.heading')}</p>
          </div>
          <div class="flex justify-center gap-10">
            <div class="no-underline flex flex-row justify-between w-1/2">
              <p class="text-[#ff3f39] text-sm cursor-pointer">{t('sectionIntro.subtitle')}</p>
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                <path d="M481.834667 737.834667l60.330666 60.330666L828.330667 512l-286.165334-286.165333-60.330666 60.330666L665.002667 469.333333H256v85.333334h409.002667z" fill="#ff3f39" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
