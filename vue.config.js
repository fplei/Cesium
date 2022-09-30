let cesiumSource = "./node_modules/cesium/Source";
let cesiumWorkers = "../Build/Cesium/Workers";
const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
  // publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  publicPath: "./",
  assetsDir: "static",
  outputDir: process.env.outputDir,

  // 避免Eslint报错
  lintOnSave: false,
  devServer: {
    host: "0.0.0.0",
    port: 8089,
    https: false,
    disableHostCheck: true, // 处理host不识别问题
    open: true, //自动打开浏览器
    proxy: {
      "/api": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        ws: true, //是否启用websocket
        pathRewrite: {
          "^/api": "", // 重写路径
        },
      },
      "/dataManage": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        ws: true, //是否启用websocket
        pathRewrite: {
          "^/dataManage": "", // 重写路径
        },
      },
    },
    hotOnly: true, //是否热更新
    compress: true, // 是否开启gzip压缩
    // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
    historyApiFallback: {
      index: "/index.html", //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
    },
    watchOptions: {
      // 监听模式选项
      // 不监听的文件或文件夹，支持正则匹配。默认为空
      ignored: /node_modules/,
      // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
      // 默认为300ms
      aggregateTimeout: 300,
      // 判断文件是否发生变化是不停的去询问系统指定文件有没有变化，默认每秒问 1000 次
      poll: 1000,
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Cesium学习";
      return args;
    });
    //  让webpack正确处理多行字符串
    config.output.sourcePrefix = " ";
    config.amd.toUrlUndefined = true;

    config.resolve.alias
      .set("@", path.resolve("src"))
      .set("assets", path.resolve("src/assets"))
      .set("components", path.resolve("src/components"))
      .set("js", path.resolve("src/assets/js"))
      .set("imgs", path.resolve("src/assets/imgs"))
      .set("network", path.resolve("src/network"))
      .set("static", path.resolve("src/static"))
      .set("utils", path.resolve("src/utils"))
      .set("public", path.resolve("public"))
      .set("cesium", path.resolve(__dirname, cesiumSource + "/Cesium"));

    //   小图片压缩成 base64 格式
    //10kb以内的图片会被打包成内联元素
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => Object.assign(options, { limit: 1024 * 10 }));
  },
  // configureWebpack: {
  //   output: {
  //     sourcePrefix: " ", // 让webpack正确处理多行字符串
  //   },
  //   amd: {
  //     toUrlUndefined: true,
  //   },
  //   resolve: {
  //     alias: {
  //       vue$: "vue/dist/vue.esm.js",
  //       "@": path.resolve("src"),
  //       cesium: path.resolve(__dirname, cesiumSource),
  //     },
  //   },
  //   plugins: [
  //     new CopyWebpackPlugin([
  //       { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
  //     ]),
  //     new CopyWebpackPlugin([
  //       { from: path.join(cesiumSource, "Assets"), to: "Assets" },
  //     ]),
  //     new CopyWebpackPlugin([
  //       { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
  //     ]),
  //     new CopyWebpackPlugin([
  //       {
  //         from: path.join(cesiumSource, "ThirdParty/Workers"),
  //         to: "ThirdParty/Workers",
  //       },
  //     ]),
  //     new webpack.DefinePlugin({
  //       // Define relative base path in cesium for loading assets
  //       CESIUM_BASE_URL: JSON.stringify("/"),
  //     }),
  //   ],
  //   module: {
  //     unknownContextCritical: /^.\/.*$/,
  //     unknownContextCritical: false,
  //   },
  // },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
      //打包文件大小配置
      config["performance"] = {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000,
      };
      config.optimization.splitChunks = {
        cacheGroups: {
          commons: {
            name: "commons", //提取出来的文件命名
            chunks: "initial", //initial表示提取入口文件的公共部分
            minChunks: 2, //表示提取公共部分最少的文件数
            minSize: 0, //表示提取公共部分最小的大小
          },
        },
      };
      config.plugins.push(
        ...[
          // moment/locale 上下文里符合 /zh-cn|zh-hk|en/ 表达式的文件，因此也只会打包这几种本地化内容
          new webpack.ContextReplacementPlugin(
            /moment[/\\]locale$/,
            /zh-cn|zh-hk|en/
          ),
        ]
      );
    }
    config.plugins.push(
      ...[
        new CopyWebpackPlugin([
          { from: path.join(cesiumSource, cesiumWorkers), to: "Workers" },
          { from: path.join(cesiumSource, "Assets"), to: "Assets" },
          { from: path.join(cesiumSource, "Widgets"), to: "Widgets" },
          {
            from: path.join(cesiumSource, "ThirdParty/Workers"),
            to: "ThirdParty/Workers",
          },
        ]),
        new webpack.DefinePlugin({
          CESIUM_BASE_URL: JSON.stringify("./"),
        }),
      ]
    );
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin 生产环境下是true,开发环境下是false
    extract: true,
    sourceMap: true, // 开启 CSS source maps 否则浏览器中无法查看样式归属
    requireModuleExtension: true, // 是否仅对文件名包含module的css相关文件使用 CSS Modules
    // css预设器配置项
    loaderOptions: {
      // 给 sass-loader 传递选项
      scss: {
        // sass-loader版本V8以上
        prependData: '@import "~@/assets/css/theme/themeMixin.scss";',
        // sass-loader版本V8以下
        // additionalData: '@import "~@/assets/css/scss/common.scss";'
      },
      css: {
        // css modules 暂时未用到
        modules: {
          localIdentName: "[path][name]---[local]---[hash:base64:5]",
          camelCase: true,
        },
      },
    },
  },
  // 第三方插件配置
  pluginOptions: {},
  pwa: {
    iconPaths: {
      favicon32: "./favicon.ico",
      favicon16: "./favicon.ico",
      appleTouchIcon: "./favicon.ico",
      maskIcon: "./favicon.ico",
      msTileImage: "./favicon.ico",
    },
  },

  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  productionSourceMap: false,
  css: {
    sourceMap: true, // 开启 CSS source maps 否则浏览器中无法查看样式归属
  },
};
