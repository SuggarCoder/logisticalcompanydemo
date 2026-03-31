import { For, createMemo, createSignal, onMount, onCleanup} from 'solid-js'
import { useI18n } from '~/libs/i18n'
import { Carousel } from '~/components/Carousel';

export default function CaseShow() {
    let viewer;
    const [page, setPage] = createSignal(0);
    const [flkty, setFlkty] = createSignal(null);
    const [activeSlide, setActiveSlide] = createSignal(0)
    const [t, { locale }] = useI18n()
    const data = createMemo(() => t('carSection'))

    const FLICKITY_OPTIONS = {
        cellAlign: 'left',
        cellSelector: '.slide',
        autoPlay: 4000,
        pageDots: false,
        wrapAround: true,
        draggable: true,
        prevNextButtons: false
    }
    
    onMount(async () => {
        await customElements.whenDefined('spline-viewer');
        // 1) 监听官方事件：load-complete
        viewer.addEventListener('load-complete', () => {
            // a. 禁掉配置，防止之后又把 logo 显示回来
            viewer['_spline']?.data?.scene?.publish?.settings?.web &&
            (viewer['_spline'].data.scene.publish.settings.web.logo = false);

            // b. 删除已插入的 logo 节点
            viewer.shadowRoot?.querySelector('#logo')?.remove();
        });
    });

    const switchSlide = dir => {
        const inst = flkty();
        if (!inst) return;
        dir === 'next' ? inst.next(true) : inst.previous(true)
    };

    onCleanup(() => setFlkty(null)); 

    const handleThumbnailClick = (targetSlide) => {
        flkty().select(targetSlide)
    };
    

    return(
        <>
            <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.98/build/spline-viewer.js"></script>
            <div class='relative overflow-hidden'>
                <spline-viewer ref={el => (viewer = el)} loading-anim-type="spinner-small-light" url="https://prod.spline.design/WqwqkqSETbMSbVRt/scene.splinecode" class="absolute inset-0 w-full h-full"/>
                <Carousel
                    refreshKey={locale()}
                    onChange={setPage}
                    options={FLICKITY_OPTIONS}
                    onInstance={setFlkty}
                    disablePointerEvents={true}
                >
                    <h1 class="text-center font-bold text-6xl pt-20">{data()?.title}</h1>            
                    <For each={data()?.content}>
                        {item => (
                            <div class="slide w-full top-0 left-0">
                                <div class="container px-5 py-24 mx-auto flex flex-col">
                                    <div class="mx-auto">
                                        <div class="flex flex-col sm:flex-row mt-10 gap-10 justify-center items-center">
                                            <div class="sm:w-2/3 sm:py-8 mt-4 pt-4 sm:mt-0 text-center sm:text-right">
                                                <p innerHTML={item.name} class="text-4xl font-bold"></p>
                                                <p class="leading-relaxed text-lg mb-4">{item.description}</p>
                                            </div>
                                            <div class="sm:w-1/3 text-center sm:py-8">
                                                <div class="w-full inline-flex items-center justify-center text-gray-400">
                                                    <img src={item.img} alt={item.name} class='object-cover w-full' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </For>              
                </Carousel>
                <button onClick={() => switchSlide('prev')} class="slider-control prev absolute top-1/2 left-2 flex items-center justify-center -translate-y-1/2 h-40px w-40px bg-#eee bg-opacity-50 cursor-pointer z-2">
                        <div class="i-ant-design:left-outlined"></div>
                </button>
                <button onClick={() => switchSlide('next')} class="slider-control next absolute top-1/2 left-auto flex items-center justify-center -translate-y-1/2 h-40px w-40px bg-#eee bg-opacity-50 cursor-pointer z-2 right-2">
                    <div class="i-ant-design:right-outlined"></div>
                </button>      
            </div>
            <div class="flex justify-center mt-4 space-x-4 mb-4">
                    <For each={data()?.content}>
                        {(item, index) => (
                            <button
                                onClick={() => handleThumbnailClick(index())}
                                class={`w-20 h-20 rounded-full overflow-hidden transition-all duration-300 ${
                                    index() === page() ? 'ring-4 ring-blue-500' : 'opacity-50 hover:opacity-75'
                                }`}
                            >
                                <img 
                                    src={item.img} 
                                    alt={item.name}
                                    class="object-cover w-full h-full"
                                />
                            </button>
                        )}
                    </For>
            </div>                 
        </>
    )
}