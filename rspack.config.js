const { VueLoaderPlugin } = require("vue-loader");
const components = require("unplugin-vue-components/rspack");
const { ElementUiResolver } = require("unplugin-vue-components/resolvers");

/** @type {import('@rspack/cli').Configuration} */
const config = {
  context: __dirname,
  entry: {
    main: "./src/main.js",
  },
  output: {
    clean: true,
  },
  builtins: {
    html: [
      {
        template: "./index.html",
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 3000,
  },
  devtool: false,
  plugins: [
    new VueLoaderPlugin(),
    components({
      dts: false,
      dirs: [],
      resolvers: [
        ElementUiResolver({
          importStyle: false,
        }),
      ],
    }),
  ],
  experiments: {
    css: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {
              experimentalInlineMatchResource: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: "sass-loader",
        type: "css",
      },
      {
        test: /\.svg$/,
        type: "asset/resource",
      },
    ],
  },
};
module.exports = config;
