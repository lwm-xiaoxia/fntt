import { resolve, join } from 'path';
import babel from 'rollup-plugin-babel'; // bable插件
import { terser } from "rollup-plugin-terser"; // 压缩js插件
import typescript from 'rollup-plugin-typescript2'; // ts插件

/**
 * @description 获取输出配置
 * @param {type} types 打包类型 
 * @param {string} path 输出路径 
 */
const getOutput = (types, path) => {
  return types.map(type => {
    return {
      file: join(path, `./index_${type}.js`),
      format: type,
      name: `dist_${type}`,
    };
  });
};

// 编译模式
const _MODE_ = process.env.NODE_ENV;

const _IS_MIN = _MODE_ === 'production-min';

const _FILE_TYPES_ = ['amd', 'cjs', 'esm', 'iife', 'umd', 'system'];

// 入口路径配置
const _ENTRY_ = {
  'development-js': resolve(__dirname, './dev-test/script/index.js'),
  'development-ts': resolve(__dirname, './dev-test/script/index.ts'),
  'production': resolve(__dirname, './src/index.ts'),
  'production-min': resolve(__dirname, './src/index.ts'),
};

// 出口路径
const _OUTPUT_ = {
  'development-js': getOutput(['iife'], resolve(__dirname, './dev-test/dist-js')),
  'development-ts': getOutput(['iife'], resolve(__dirname, './dev-test/dist-ts')),
  'production': getOutput(_FILE_TYPES_, resolve(__dirname, './dist')),
  'production-min': getOutput(_FILE_TYPES_, resolve(__dirname, './dist')),
};

const _PLUGINS_ = [
  typescript(),
  _IS_MIN ? terser() : null,
  _IS_MIN 
    ? babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true, 
    }) 
    : null,
].filter(plugin => plugin !== null);


// rollup配置
export default {
  input: _ENTRY_[_MODE_],
  output:  _OUTPUT_[_MODE_],
  watch: { // 监听
    include: ['src/**', 'dev-test/**'],
    exclude: 'node_modules/**',
  },
  plugins: _PLUGINS_,
};