import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'
import sourcemaps from 'rollup-plugin-sourcemaps'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import typescript from 'rollup-plugin-typescript'
import sass from 'rollup-plugin-sass'
import serve from 'rollup-plugin-serve'
import replace from 'rollup-plugin-replace'
import globals from 'rollup-plugin-node-globals'
import image from 'rollup-plugin-img'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'

// 包配置
const packages = require('./package.json')
// 环境变量
const env = process.env.NODE_ENV
// 路径配置
const paths = {
    input: env === 'example' ? './example/' : './lib/',
    dist: env === 'example' ? './example/dist/' : './dist/',
}

// 文件名
let fileName
switch (env) {
    case 'development':
        fileName = packages.name
        break
    case 'example':
        fileName = `example`
        break
    case 'es':
        fileName = `${packages.name}.es`
        break
    case 'production':
        fileName = `${packages.name}.min`
        break
}

if (fileName.includes('/')) {
    fileName = fileName.split('/')[1]
}

const Config = {
    input: `${paths.input}index`,
    output: {
        file: `${paths.dist}${fileName}.js`,
        format: env === 'es' ? 'es' : 'umd',
        name: 'queryComponents',
        sourcemap: true,
        // 连接 livereload 
        intro: env === 'example' ? `document.write('<script src="http://' + (location.host || "localhost").split(":")[0] + ':35729/livereload.js?snipver=1"></' + "script>")` : '',
        globals: {
            '@amoy/query': 'query',
            'pixi.js': 'PIXI'
        },
        exports: 'named',
    },
    external: env === 'example' ? [] : ['@amoy/query', 'pixi.js'],
    plugins: [
        image({
            output: `${paths.dist}/images`,
            extensions: /\.(png|jpg|jpeg|gif|svg)$/,
            limit: 5000,
            exclude: 'node_modules/**'
        }),
        // babel 编译
        babel({
            exclude: 'node_modules/**', 
            babelrc: false,
            presets: [['@babel/preset-env', { modules: false }]],
            runtimeHelpers: true,
            plugins: [],
          }),
        resolve({
            extensions: [ '.ts', 'tsx', '.js', '.json', '.node' ],
            preferBuiltins: false,
        }),
        commonjs(),
        typescript(),
        sass({
            output: `${paths.dist}/main.css`,
        }),
        replace({
            exclude: 'node_modules/**',
            ENV: JSON.stringify(env || 'development'),
        }),
        // 开发时开启服务
        (env === 'example' && serve({
            contentBase: './example',
            port: 3000,
            open: true,
        })),
        (env === 'production' && uglify()),
        (env === 'production' && sourcemaps()),
        globals(),
        json(),
        builtins(),
    ],
}

export default Config
