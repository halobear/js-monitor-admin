const path = require("path");
const webpack = require("webpack");

const isDev = process.env.NODE_ENV !== "production";

const publicPath = isDev ? "/" : "/h5/dashboard/super2/";
const outputDir = "dist/dashboard/super2";

// vue.config.js
const vueConfig = {
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: process.env.VUE_APP_PROXY,
        changeOrigin: true
      }
    }
  },
  publicPath,
  outputDir,
  assetsDir: "static",
  configureWebpack: {
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
  },
  productionSourceMap: false,
  chainWebpack: config => {
    // 删除 webpack 插件
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .oneOf("inline")
      .resourceQuery(/inline/)
      .use("vue-svg-icon-loader")
      .loader("vue-svg-icon-loader")
      .end()
      .end()
      .oneOf("external")
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[hash:8].[ext]"
      });

    // 超过10k自动打包成base64
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap(options => Object.assign(options, { limit: 10240 }));
  },

  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, "./src/styles/variables.less")]
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
};

module.exports = vueConfig;
