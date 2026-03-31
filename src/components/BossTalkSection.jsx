export default function BossTalkSection({ t }) {
  return (
    <div class="container mx-auto flex md:flex-row flex-col items-center mt-32">
      <div class="w-full mb-10 md:mb-0 text-center md:text-left md:w-1/3">
        <h1 class="text-4xl font-bold">{t('bossTalk.heading')}</h1>
      </div>
      <div class="flex flex-col md:text-left items-center text-center px-4 md:w-2/3 md:items-start">
        <h5 class="text-stone-400" innerHTML={t('bossTalk.description')} />
        <div class="flex items-center justify-between w-full">
          <div class="text-stone-400 pt-8">
            <p class="font-bold text-xs">{t('bossTalk.signature.name')}</p>
          </div>
        </div>
      </div>
    </div>
  )
} 