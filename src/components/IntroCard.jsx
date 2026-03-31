import { A } from "@solidjs/router"

export default function IntroCard({ card, index, isVisible }) {
  return (
    <div
      style={{ 'animation-delay': `${index() * 0.1}s` }}
      class={`rounded-2xl bg-repeat bg-auto transition-all duration-300 bg-white p-[50px_30px] shadow-[7px_7px_50px_#0000001a] 
              ${isVisible() ? 'animate__animated animate__fadeInUp' : ''}
              ${index() === 0 ? 'fast' : ''} 
              ${index() === 1 ? 'tracking' : ''} 
              ${index() === 2 ? 'team' : ''}`}
    >
      <img src={card.img} class="w-14 h-14" alt={card.title} />
      <h3 class="font-bold my-4" innerHTML={card.title} />
      <p class="text-stone-400 text-size-sm">{card.description}</p>
      <div class="flex justify-between">
        {/* <A
          href={card.href}
          class="text-xs no-underline transition-colors duration-300 flex items-center text-[#ff3f39] pt-6 font-[400]"
        >
          {card.learnMore}
        </A>
        <span class="pt-6 pl-4">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              d="M481.834667 737.834667l60.330666 60.330666L828.330667 512l-286.165334-286.165333-60.330666 60.330666L665.002667 469.333333H256v85.333334h409.002667z"
              fill="#ff3f39"
            />
          </svg>
        </span> */}
      </div>
    </div>
  )
} 