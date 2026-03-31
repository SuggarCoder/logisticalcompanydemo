import { createMemo, createSignal, onCleanup, onMount } from 'solid-js'
import { useI18n } from '~/i18n/usei18n.hook'

export default function CaseShow() {
  const [t] = useI18n()
  const [currentIndex, setCurrentIndex] = createSignal(0)
  const [isTransitioning, setIsTransitioning] = createSignal(false)

  const data = createMemo(() => t('carSection'))

  const transition = (nextIdx) => {
    if (isTransitioning()) return
    setIsTransitioning(true)
    
    setTimeout(() => {
      setCurrentIndex(nextIdx)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 50)
    }, 300)
  }

  const next = () => {
    const nextIdx = currentIndex() === data().content.length - 1 ? 0 : currentIndex() + 1
    transition(nextIdx)
  }

  const previous = () => {
    const nextIdx = currentIndex() === 0 ? data().content.length - 1 : currentIndex() - 1
    transition(nextIdx)
  }

  // 自动轮播
  onMount(() => {
    const timer = setInterval(next, 3000)
    onCleanup(() => clearInterval(timer))
  })

  const imageSrc = [
    'https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/volvo-fh-electric-cgi-exterior-1?qlt=82&wid=1024&ts=1705312480003&dpr=off&fit=constrain&fmt=png-alpha',
    'img/daf.jpg',
    'img/pngegg.png',
    'img/benz-axor-png.jpg',
  ]

  return (
    <div class="bg-center bg-no-repeat bg-cover w-full relative mb-24">
      <div class="max-w-[1230px] mx-auto px-4">
        <p class="text-center font-bold text-2xl md:text-6xl mb-40">
          {data()?.title}
        </p>
        <div class="text-center bg-transparent">
          <div class="w-full flex flex-col md:flex-row gap-8 p-8">
            <div class="relative flex-1">
              <div class="relative h-[300px] w-[500px]">
                <div
                  class={`absolute w-full h-full transition-opacity duration-300 ease-in-out ${
                    isTransitioning() ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <img
                    src={imageSrc[currentIndex()]}
                    alt="truck"
                    class="w-full h-full object-cover rounded-lg -scale-x-100"
                  />
                </div>
              </div>
              <div class="flex absolute bottom-5 left-5 gap-2.5 z-10">
                <button
                  onClick={previous}
                  class="flex w-10 h-10 bg-black text-white items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <svg class="-scale-x-100 icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path d="M318.73024 836.32128c3.9936 3.9936 9.23648 6.00064 14.47936 6.00064s10.48576-2.00704 14.47936-6.00064l307.2-307.2c8.00768-8.00768 8.00768-20.95104 0-28.95872l-307.2-307.2c-8.00768-8.00768-20.95104-8.00768-28.95872 0s-8.00768 20.95104 0 28.95872l292.72064 292.72064L318.73024 807.36256C310.72256 815.37024 310.72256 828.33408 318.73024 836.32128z" fill="#ffffff" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  class="w-10 h-10 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors"
                >
                  <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                    <path d="M318.73024 836.32128c3.9936 3.9936 9.23648 6.00064 14.47936 6.00064s10.48576-2.00704 14.47936-6.00064l307.2-307.2c8.00768-8.00768 8.00768-20.95104 0-28.95872l-307.2-307.2c-8.00768-8.00768-20.95104-8.00768-28.95872 0s-8.00768 20.95104 0 28.95872l292.72064 292.72064L318.73024 807.36256C310.72256 815.37024 310.72256 828.33408 318.73024 836.32128z" fill="#ffffff" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="relative flex-1">
              <div
                class={`transition-opacity duration-300 ease-in-out ${
                  isTransitioning() ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <h2 class="font-bold text-4xl mb-4 text-gray-800" innerHTML={data()?.content[currentIndex()].name} />
                <p class="text-lg text-stone-400 mb-8 leading-relaxed">
                  {data()?.content[currentIndex()].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
