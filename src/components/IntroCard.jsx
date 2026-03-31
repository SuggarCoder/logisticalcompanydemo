import { createMemo, createSignal } from 'solid-js';
import { assetPath } from '~/libs/paths';

const hoverImages = {
  0: 'imgs/fast.png',
  1: 'imgs/tracking.png',
  2: 'imgs/team.png'
};

export default function IntroCard({ card, index, isVisible }) {
  const [hovered, setHovered] = createSignal(false);
  const hoverImage = createMemo(() => hoverImages[index()] ? assetPath(hoverImages[index()]) : null);

  return (
    <div
      style={{
        'animation-delay': `${index() * 0.1}s`,
        'background-image': hovered() && hoverImage() ? `url(${hoverImage()})` : 'none',
        'background-position': hovered() ? '115% 15%' : 'center',
        'background-repeat': hovered() ? 'no-repeat' : 'repeat',
        'background-size': hovered() ? '40%' : 'auto'
      }}
      class={`rounded-2xl bg-white transition-all duration-300 p-[50px_30px] shadow-[7px_7px_50px_#0000001a] ${isVisible() ? 'animate__animated animate__fadeInUp' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={assetPath(card.img)} class="w-14 h-14" alt={card.title} />
      <h3 class="font-bold my-4" innerHTML={card.title} />
      <p class="text-stone-400 text-size-sm">{card.description}</p>
      <div class="flex justify-between"></div>
    </div>
  );
}
