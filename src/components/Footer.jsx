import { createMemo, For, onCleanup, onMount, createSignal } from 'solid-js';
import { A } from '@solidjs/router';
import { useI18n } from '~/libs/i18n';
import { LogoSVG } from '~/libs/const';

const ACTIVE_ROUTES = new Set(['/', '/us']);

export default function Footer() {
  const [viewport, setViewport] = createSignal({ width: 0, height: 0 });
  const LINK_CLASSES = 'no-underline text-stone-500 transition-color duration-[250ms] hover:text-white';
  const DISABLED_LINK_CLASSES = 'text-stone-500';

  const [t, { locale }] = useI18n();
  const data = createMemo(() => t('footer'));

  const switchLanguage = language => {
    locale(language);
  };

  const FooterLink = props => {
    if (props.languageCode) {
      return (
        <button
          type="button"
          onClick={() => switchLanguage(props.languageCode)}
          class={`${LINK_CLASSES} border-0 bg-transparent p-0 text-left`}
        >
          {props.label}
        </button>
      );
    }

    if (ACTIVE_ROUTES.has(props.href)) {
      return (
        <A href={props.href} class={LINK_CLASSES}>
          {props.label}
        </A>
      );
    }

    return <span class={`${LINK_CLASSES} ${DISABLED_LINK_CLASSES}`}>{props.label}</span>;
  };

  const SocialLinks = () => (
    <div className=":uno: sm:flex sm:items-center sm:justify-between mt-4">
      <span className="text-xs text-gray-500 sm:text-center">
        © 2025{' '}
        <span className="text-white">SJIUS</span>
        . All Rights Reserved.
      </span>
      <div>
        <a href="https://beian.miit.gov.cn" class="text-stone-500 no-underline text-xs">
          铚€ICP澶?025118242鍙?1 铚€ICP澶?025118242鍙?2
        </a>
      </div>
      <div className="flex mt-4 sm:justify-center sm:mt-0"></div>
    </div>
  );

  const FooterColumn = props => (
    <div className="text-white">
      <h2 className="mb-6 text-sm font-semibold uppercase">{props.item.title}</h2>
      <ul className="font-medium">
        <For each={props.item.links}>
          {subItem => (
            <li className="text-sm mb-4 list-none">
              <FooterLink
                label={subItem.label}
                href={subItem.href}
                languageCode={subItem.code}
              />
            </li>
          )}
        </For>
      </ul>
    </div>
  );

  let svg;
  let wrapper;
  let cursor;
  const mouse = { x: 0, y: 0, smoothX: 0, smoothY: 0, vx: 0, vy: 0, smoothVx: 0, smoothVy: 0, diff: 0 };
  const head = { x: 0, y: 0, vx: 0, vy: 0 };
  const particles = [];
  let particleCnt = 0;
  let frameId;

  const viewBox = () => `0 0 ${viewport().width} ${viewport().height}`;

  const onMouseMove = e => {
    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouse.vx += mouse.x - x;
    mouse.vy += mouse.y - y;
    mouse.x = x;
    mouse.y = y;
  };

  const onResize = () => {
    setViewport({ width: window.innerWidth - 4, height: window.innerHeight / 2 });
    svg.style.width = `${window.innerWidth - 4}px`;
    svg.style.height = `${window.innerHeight / 2}px`;
  };

  class Particle {
    constructor(x, y, vx, vy, size) {
      this.size = size;
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.seed = Math.random() * 1000;
      this.freq = (0.5 + Math.random()) * 0.01;
      this.amplitude = (1 - Math.random() * 2) * 0.5;
      const hue = particleCnt % 360;
      this.color = `hsl(${hue},100%,50%)`;

      this.el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      this.el.setAttribute('cx', this.x);
      this.el.setAttribute('cy', this.y);
      this.el.setAttribute('r', this.size);
      this.el.setAttribute('fill', this.color);
    }

    kill() {
      particles.splice(particles.indexOf(this), 1);
      this.el.remove();
    }

    render(time) {
      this.x += Math.cos((time + this.seed) * this.freq) * this.amplitude + this.vx;
      this.y += Math.sin((time + this.seed) * this.freq) * this.amplitude + this.vy;
      this.vx *= 0.95;
      this.vy *= 0.95;
      this.size += Math.hypot(this.vx, this.vy);
      this.size *= 0.85;

      this.el.setAttribute('cx', this.x);
      this.el.setAttribute('cy', this.y);
      this.el.setAttribute('r', this.size);

      if (this.size < 1) this.kill();
    }
  }

  const emitParticle = () => {
    let x;
    let y;
    let vx;
    let vy;
    let size;

    if (mouse.diff > 0.01) {
      x = mouse.smoothX;
      y = mouse.smoothY;
      vx = mouse.smoothVx * -0.25;
      vy = mouse.smoothVy * -0.25;
      size = mouse.diff * 0.25;
    } else {
      x = head.x;
      y = head.y;
      vx = head.vx * 2;
      vy = head.vy * 2;
      size = Math.hypot(head.vx, head.vy) * 3;
    }

    const particle = new Particle(x, y, vx, vy, size);
    particleCnt += 5;
    particles.push(particle);
    wrapper.prepend(particle.el);
  };

  const renderLoop = time => {
    mouse.smoothX += (mouse.x - mouse.smoothX) * 0.1;
    mouse.smoothY += (mouse.y - mouse.smoothY) * 0.1;
    mouse.smoothVx += (mouse.vx - mouse.smoothVx) * 0.1;
    mouse.smoothVy += (mouse.vy - mouse.smoothVy) * 0.1;

    mouse.vx *= 0.85;
    mouse.vy *= 0.85;
    mouse.diff = Math.hypot(mouse.x - mouse.smoothX, mouse.y - mouse.smoothY);

    emitParticle();

    cursor.style.setProperty('--x', `${mouse.smoothX}px`);
    cursor.style.setProperty('--y', `${mouse.smoothY}px`);

    const headX = viewport().width * 0.5 + viewport().width * 0.375 * Math.cos(time * 0.0006);
    const headY = viewport().height * 0.5 + viewport().width * 0.05 * Math.cos(time * 0.0011);
    head.vx = head.x - headX;
    head.vy = head.y - headY;
    head.x = headX;
    head.y = headY;

    particles.forEach(particle => particle.render(time));
    frameId = requestAnimationFrame(renderLoop);
  };

  onMount(() => {
    onResize();
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    frameId = requestAnimationFrame(renderLoop);

    onCleanup(() => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (frameId) cancelAnimationFrame(frameId);
    });
  });

  return (
    <footer id="contact" className="bg-gray-900 relative overflow-hidden">
      <div className="mx-auto w-full py-6 max-w-screen-xl p-4 lg:py-8 relative">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0 flex flex-col justify-between order-2 md:order-1">
            <A href="/" className="flex items-center">
              <LogoSVG size="7" color1="#eee" color2="#eee" />
            </A>
            <div className="text-white flex flex-col max-w-lg">
              <p className="text-xs text-stone-500"><span className="i-ant-design-environment-twotone">global</span>{t('address')}</p>
              <p className="text-xs text-stone-500"><span className="i-ant-design-phone-outlined">phone</span>+86 400-093-3939</p>
            </div>
          </div>
          <div className="text-white text-center grid grid-cols-3 gap-4 sm:gap-24 order-1 md:order-2 sm:text-right">
            <For each={data()}>
              {(item, index) => (
                <FooterColumn item={item} index={index} />
              )}
            </For>
          </div>
        </div>
        <SocialLinks />
      </div>
      <div className="relative">
        <svg ref={svg} xmlns="http://www.w3.org/2000/svg" viewBox={viewBox()} preserveAspectRatio="none" className="top-0 left-0 z-1 relative">
          <mask id="text">
            <text x="50%" y="105%" dy="0.2em" dominant-baseline="text-after-edge" text-anchor="middle" class="font-medium leading-none [vector-effect:non-scaling-stroke] text-[40rem]" fill="white" font-family="Righteous, sans-serif" font-weight="bold">SJIUS</text>
          </mask>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          </filter>
          <text x="50%" y="105%" dy="0.2em" dominant-baseline="text-after-edge" text-anchor="middle" class="fill-[#111827] stroke-[#2a2a2a] stroke-[1px] font-medium leading-none [vector-effect:non-scaling-stroke] text-[40rem]" font-family="Righteous, sans-serif" font-weight="bold">SJIUS</text>
          <g ref={wrapper} filter="url(#gooey)" mask="url(#text)" class="js-wrappe"></g>
        </svg>
        <div ref={cursor} class="cursor js-cursor"></div>
      </div>
    </footer>
  );
}

