import { defineConfig, presetUno, presetIcons, presetAttributify, presetTypography, transformerCompileClass, presetWebFonts  } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography(),
    presetAttributify({
        // Enable hash mode
        prefix: 'un-',
        hash: true  // This will generate random hashed class names
      }),
    presetIcons({ /* options */ }),
    presetWebFonts({
      provider: 'bunny', // 使用 Google 字体代理（推荐国内使用）
      fonts: {
        sans: [
          {
            name: 'Righteous',
            weights: ['400']      // Righteous 默认只有 400
          },
          {
            name: 'Noto Sans SC',
            weights: ['400', '700'], // 正常与加粗
          },
          {
            name: 'Microsoft YaHei', // 备用字体
            weights: ['400', '700'],
          },
        ],
        serif: [
          {
            name: 'Noto Serif SC',
            weights: ['400', '700'],
          },
        ],
        mono: [
          {
            name: 'Source Code Pro',
            weights: ['400', '700'],
          },
        ],
      },
    })
  ],
  transformers: [
    transformerCompileClass(),
  ]
})