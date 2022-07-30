let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'
const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    publicPath: './',
    assetsDir: 'static',
    outputDir: process.env.outputDir,

    // 避免Eslint报错
    lintOnSave: false,
    devServer: {
        host: "0.0.0.0",
        port: 8089,
        https: false,
        disableHostCheck: true, // 处理host不识别问题
        open: true, //自动打开浏览器

    },
    configureWebpack: {
        output: {
            sourcePrefix: ' ' // 让webpack正确处理多行字符串
        },
        amd: {
            toUrlUndefined: true
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve('src'),
                'cesium': path.resolve(__dirname, cesiumSource)
            }
        },
        plugins: [
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Assets'), to: 'Assets' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }]),
            new CopyWebpackPlugin([{ from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }]),
            new webpack.DefinePlugin({
                // Define relative base path in cesium for loading assets
                CESIUM_BASE_URL: JSON.stringify('/')
            }),
            
        ],
        module: {
            unknownContextCritical: /^.\/.*$/,
            unknownContextCritical: false
        }
    },
    pwa: {
        iconPaths: {
            favicon32: './favicon.ico',
            favicon16: './favicon.ico',
            appleTouchIcon: './favicon.ico',
            maskIcon: './favicon.ico',
            msTileImage: './favicon.ico'
        }
    },
    
    /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
    productionSourceMap: false,
    css: {
        sourceMap: true, // 开启 CSS source maps 否则浏览器中无法查看样式归属
    }
}