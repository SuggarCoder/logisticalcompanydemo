import { createForm, required, maxLength, pattern } from '@modular-forms/solid';
import { Show, createSignal, onMount, onCleanup, createEffect } from 'solid-js';
import { useI18n } from '~/libs/i18n';
import { assetPath } from '~/libs/paths';

export default function IndexForm() {
  const [t] = useI18n();
  const [isVisible, setIsVisible] = createSignal(false);
  const [submitted, setSubmitted] = createSignal(false);

  let customer;
  const circleRefs = [createSignal(null), createSignal(null), createSignal(null)];

  const [, { Form: QueryForm, Field: QueryField }] = createForm({
    initialValues: {
      name: '',
      phone: '',
      comments: ''
    }
  });

  const animateProgress = (element, index) => {
    if (!element) return;

    const circle = element.querySelector('.progress-circle');
    const percentageSpan = element.querySelector('.percentage-text span');
    const duration = 1500;
    const circleCircumference = 2 * Math.PI * 15;
    const finalPercentages = [99, 97, 95];
    const finalPercentage = finalPercentages[index];
    const startTime = performance.now();
    const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

    const updateProgress = currentTime => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOut(progress);
      const currentPercentage = Math.round(easedProgress * finalPercentage);

      percentageSpan.textContent = currentPercentage;

      const dashLength = (circleCircumference * currentPercentage) / 100;
      circle.style.strokeDasharray = `${dashLength}, ${circleCircumference - dashLength}`;

      if (progress < 1) requestAnimationFrame(updateProgress);
    };

    requestAnimationFrame(updateProgress);
  };

  onMount(() => {
    if (typeof IntersectionObserver === 'undefined' || !customer) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setIsVisible(entry.isIntersecting));
    });

    observer.observe(customer);
    onCleanup(() => observer.disconnect());
  });

  createEffect(() => {
    if (!isVisible()) return;

    circleRefs.forEach(([getRef], index) => {
      const element = getRef();
      if (element) animateProgress(element, index);
    });
  });

  return (
    <div
      id="services"
      class="bg-center bg-no-repeat bg-cover bg-fixed mt-50"
      style={{ 'background-image': `url(${assetPath('imgs/c04.jpg')})` }}
    >
      <div class="bg-[#121c45e6]">
        <div class="relative mx-auto px-4 max-w-[1140px] -top-30">
          <div class="bg-[#001d67] rounded-t-2xl">
            <div class="bg-transparent align-top text-left cursor-pointer px-4 py-0 no-underline inline-block relative lg:px-30 [border-bottom:4px_solid_#ff3f39] text-[#ff3f39]">
              <div class="py-6 text-base">{t('form.query.tab')}</div>
            </div>
          </div>
          <div class="block relative overflow-hidden">
            <div class="flex flex-col lg:flex-row">
              <div class="w-full bg-white lg:w-[70%] p-10">
                <QueryForm onSubmit={() => setSubmitted(true)}>
                  <h6 class="mb-5">{t('form.quotation.labeltop')}</h6>
                  <div class="flex gap-4">
                    <QueryField
                      name="name"
                      validate={[
                        required(() => t('form.notNull')),
                        maxLength(30, () => t('form.notLong')),
                        pattern(/^(?!.*[<>]).*$/, () => t('form.illegal'))
                      ]}
                    >
                      {(field, props) => (
                        <>
                          <input {...props} type="text" class="text-[#333] px-3 py-2 font-normal text-sm block border border-[#0000001a] w-full h-[45px] mb-6" placeholder={t('form.query.name')} />
                          {field.error && <p class="text-red-500 text-sm w-1/3 text-center">{field.error}</p>}
                        </>
                      )}
                    </QueryField>
                    <QueryField
                      name="phone"
                      validate={[
                        required(() => t('form.notNull')),
                        maxLength(30, () => t('form.notLong')),
                        pattern(/^(?!.*[<>]).*$/, () => t('form.illegal'))
                      ]}
                    >
                      {(field, props) => (
                        <>
                          <input {...props} type="tel" class="text-[#333] px-3 py-2 font-normal text-sm block border border-[#0000001a] w-full h-[45px] mb-6" placeholder={t('form.query.phone')} />
                          {field.error && <p class="text-red-500 text-sm w-1/3 text-center">{field.error}</p>}
                        </>
                      )}
                    </QueryField>
                  </div>
                  <QueryField name="comments">
                    {(field, props) => <textarea {...props} placeholder={t('form.query.description')} maxlength="500" class="text-[#333] px-3 py-2 font-normal text-sm block border border-[#0000001a] w-full mb-6 h-[200px]" />}
                  </QueryField>
                  <div class="mb-6 flex items-center justify-between border border-[#0000001a] bg-[#f7f7f7] px-4 py-3 text-sm text-stone-500">
                    <span>{t('form.lang.label')}</span>
                    <span class="rounded-full bg-white px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-stone-400">Static</span>
                  </div>
                  <button type="submit" class="cursor-pointer text-white w-full text-center px-8 py-5 bg-[#ff3f39e6] hover:bg-[#001d67] duration-300">
                    {t('form.query.submit')}
                  </button>
                  <Show when={submitted()}>
                    <p class="mt-4 text-sm text-green-600">{t('form.response')}</p>
                  </Show>
                </QueryForm>
              </div>
              <div
                class="bg-center bg-no-repeat bg-cover w-full mx-auto max-w-xl lg:w-[30%] mt-10 lg:mt-0"
                style={{ 'background-image': `url(${assetPath('imgs/warehouse06.jpg')})` }}
              >
                <div class="bg-[#ff3f39e6] flex flex-col w-full p-10 items-stretch h-full">
                  <h2 class="text-white text-center font-bold mb-10">{t('form.query.sidetitle')}</h2>
                  <p class="text-white text-base">{t('form.query.sidedescription')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-[1140px] mx-auto px-4 pb-50" ref={customer}>
          <div class="flex flex-col lg:flex-row items-center justify-between">
            <div>
              <h1 class="text-white font-bold text-4xl text-center md:text-left" innerHTML={t('chart.title')} />
            </div>
            <div class="flex justify-between">
              {[[circleRefs[0], 'chart.one'], [circleRefs[1], 'chart.two'], [circleRefs[2], 'chart.three']].map(([circleRef, chartKey]) => (
                <div class={`max-w-60 relative ${isVisible() ? 'animate__animated animate__fadeInUp' : ''}`}>
                  <div class="relative m-5" ref={el => circleRef[1](el)}>
                    <div class="flex justify-center items-center circle-progress">
                      <svg viewBox="0 0 33 33" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle fill="none" cx="16" cy="16" r="15" />
                        <circle class="progress-circle" stroke="#ff3f39" stroke-dasharray="0, 94.2" fill="none" cx="16" cy="16" r="15" />
                      </svg>
                    </div>
                    <div class="flex flex-col justify-center items-center w-full max-w-[300px] absolute inset-0">
                      <div class="text-sm text-white md:text-4xl font-bold percentage-text">
                        <span>0</span>
                        <span>%</span>
                      </div>
                    </div>
                  </div>
                  <h5 class="text-white text-xl font-bold text-center">{t(chartKey)}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
