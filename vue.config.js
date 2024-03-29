const webpack = require("webpack");

module.exports = {
  lintOnSave: false,
  publicPath: process.env.VUE_BASE_URL || "/",
  productionSourceMap: false,
  //   updapte tan invalid host header
  devServer: {
    disableHostCheck: true,
    port: 8001,
  },

  configureWebpack: {
    module: {
      // Fix for flot resize
      rules: [
        {
          test: /jquery\.flot\.resize\.js$/,
          use: "imports-loader?this=>window",
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jquery",
        "window.jQuery": "jquery",
        jQuery: "jquery",
      }),
    ],
  },
  transpileDependencies: [
    "resize-detector", // vue-echarts
  ],
};
