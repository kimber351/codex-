const path = require('path')
const { spawnSync } = require('child_process')
const cli = require.resolve('@tarojs/cli/bin/taro')
const localHome = path.resolve(__dirname, '..', '.taro-home')
const targetIndex = process.argv.indexOf('--type')
const target = targetIndex >= 0 ? process.argv[targetIndex + 1] : 'h5'
const result = spawnSync(process.execPath, [cli, ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: { ...process.env, HOME: localHome, TW_TARGET: target }
})
process.exit(result.status ?? 1)
