import { useFlickity } from '~/libs/flickity';
import { createMemo,createEffect, onCleanup} from 'solid-js';

export function Carousel(props) {
  let el;

  const [flkty, on] = useFlickity(
    () => el,
    {
      ...props.options,
      refreshKey: createMemo(() => props.refreshKey),
    },
  );

  createEffect(() => props.onInstance?.(flkty() || null));
  onCleanup(() => props.onInstance?.(null));
  on('change', idx => props.onChange?.(idx));

  return (
    <section ref={node => (el = node)}  class="relative overflow-hidden" 
    classList={{
      'pointer-events-none': !!props.disablePointerEvents,
    }}>
      {props.children}
    </section>
  );
}