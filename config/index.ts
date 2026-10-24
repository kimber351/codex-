import { defineConfig } from '@tarojs/cli'

export default defineConfig({
  projectName: 'tongwei-zhiy药',
  date: '2026-10-24',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: process.env.TW_TARGET === 'weapp' ? 'dist/weapp' : 'dist/h5',
  plugins: ['@tarojs/plugin-framework-react', '@tarojs/plugin-platform-h5', '@tarojs/plugin-platform-weapp'],
  framework: 'react',
  compiler: { type: 'webpack5', prebundle: { enable: false } },
  mini: {},
  h5: { router: { mode: 'hash' }, publicPath: './' }
})
