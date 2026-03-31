import { createEffect, createMemo, createSignal, For, onCleanup, onMount, Show } from 'solid-js';
import { createStore } from 'solid-js/store';
import { useI18n } from '~/libs/i18n';
import { assetPath } from '~/libs/paths';
import { IconCar, IconPath } from '~/libs/const';

const loadedImagesCache = new Map();

function preloadImage(src) {
  return new Promise(resolve => {
    if (loadedImagesCache.has(src)) {
      resolve();
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedImagesCache.set(src, true);
      resolve();
    };
    img.onerror = () => resolve();
  });
}

function LazyImage(props) {
  const [isIntersecting, setIntersecting] = createSignal(false);
  let imgRef;

  onMount(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.unobserve(entry.target);
        }
      });
    });

    if (imgRef) observer.observe(imgRef);
    onCleanup(() => observer.disconnect());
  });

  return <img ref={imgRef} src={isIntersecting() ? props.src : ''} loading="lazy" class={props.class} alt={props.alt} onLoad={props.onLoad} />;
}

export default function Warehouse() {
  const [activeTab, setActiveTab] = createSignal(0);
  const [store, setStore] = createStore({ indicatorStyle: { left: '0px', width: '0px', top: '0px' } });
  const [t] = useI18n();
  const data = createMemo(() => t('warehouse'));
  const [imagesLoaded, setImagesLoaded] = createSignal(false);

  let tabsContainerRef;
  let indicatorRef;

  const updateIndicator = () => {
    if (!tabsContainerRef || !indicatorRef) return;
    const activeTabElement = tabsContainerRef.querySelector(`[data-index="${activeTab()}"]`);
    if (activeTabElement) {
      const containerRect = tabsContainerRef.getBoundingClientRect();
      const { left, width, top, height } = activeTabElement.getBoundingClientRect();
      setStore('indicatorStyle', {
        left: `${left - containerRect.left}px`,
        width: `${width}px`,
        top: `${top - containerRect.top + height}px`
      });
    }
  };

  createEffect(() => {
    activeTab();
    updateIndicator();
  });

  createEffect(() => {
    const onResize = () => updateIndicator();
    window.addEventListener('resize', onResize);
    onCleanup(() => window.removeEventListener('resize', onResize));
  });

  onMount(() => {
    const images = data()?.map(item => assetPath(`imgs/${item.img}`)) || [];
    images.forEach(src => preloadImage(src));
  });

  const handleTabChange = index => {
    setActiveTab(index);
    const src = assetPath(`imgs/${data()[index].img}`);
    preloadImage(src).then(() => setImagesLoaded(true));
  };

  const handleTabMouseEnter = tab => {
    preloadImage(assetPath(`imgs/${tab.img}`));
  };

  const ImageSection = () => {
    const currentData = createMemo(() => data()?.[activeTab()]);
    return (
      <div class="overflow-hidden sm:px-12 md:w-1/2 -m-4 sm:-mx-12 md:mx-0 md:overflow-visible md:px-0">
        <div class="relative">
          <LazyImage src={assetPath(`imgs/${currentData()?.img}`)} alt={currentData()?.name} class={`mx-auto w-full border object-cover dark:border-transparent min-h-[28rem] transition-opacity duration-300 ${imagesLoaded() ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setImagesLoaded(true)} />
          {!imagesLoaded() && (
            <div class="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div class="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Show when={data() && data().length > 0} fallback={<div class="text-white text-center p-8">Loading warehouse data...</div>}>
      <div id="about" class="bg-center bg-no-repeat bg-cover bg-fixed text-white" style={{ 'background-image': `url(${assetPath('imgs/w00.webp')})` }}>
        <div class="bg-[#121c45e6] pb-25">
          <div class="mx-auto px-4 sm:px-12 xl:max-w-6xl xl:px-0">
            <div class="pt-40 text-center">
              <h2 class="text-3xl font-bold md:text-4xl xl:text-5xl">{t('warehouseSection.heading')}</h2>
            </div>
            <div class="relative mt-20">
              <div ref={tabsContainerRef} class="grid grid-cols-3 sm:flex justify-between sm:flex-wrap sm:gap-4 pb">
                <For each={data()}>
                  {(tab, index) => (
                    <button data-index={index()} role="tab" aria-selected={activeTab() === index()} tabIndex={activeTab() === index() ? 0 : -1} onMouseEnter={() => handleTabMouseEnter(tab)} onClick={() => handleTabChange(index())} class={`text-center py-4 px-4 text-sm font-medium transition-colors duration-200 sm:border-none focus:outline-none ${activeTab() === index() ? 'text-white' : 'text-blue-400 hover:text-red-600'}`}>
                      {tab.name}
                    </button>
                  )}
                </For>
              </div>
              <div ref={indicatorRef} class="absolute transition-all duration-300 hidden h-0.5 bg-blue-400 ease-in-out sm:block" style={store.indicatorStyle} />
            </div>
            <div class="mt-20">
              <div class="md:flex gap-6 space-y-12 md:space-y-0">
                <div class="relative md:w-1/2">
                  <h3 class="text-2xl font-bold text-white md:text-3xl pl-4 border-l-4 border-red-500">{t('warehouseSection.extra')}</h3>
                  <p class="text-stone-400 mt-8">{t('warehouseSection.description')}</p>
                  <div class="mt-12 space-y-6">
                    <div class="flex items-center gap-6">
                      <IconCar size="w-6" color="#ffffff" />
                      <p>{data()?.[activeTab()]?.capacity} <sup>cars/units</sup></p>
                    </div>
                    <div class="flex items-center gap-6">
                      <IconPath size="w-6" color="#ffffff" />
                      <p>{data()?.[activeTab()]?.extra}</p>
                    </div>
                  </div>
                </div>
                <ImageSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Show>
  );
}
