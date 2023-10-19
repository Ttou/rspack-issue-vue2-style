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
    host: "localhost",
    port: 3000,
    async onListening(devServer) {
      const address = devServer.server.address();

      console.log(
        "Rspack Listening on:",
        `http://${address.address}:${address.port}`
      );
    },
  },
  devtool: false,
  infrastructureLogging: {
    level: "error",
  },
  plugins: [
    new VueLoaderPlugin(),
    components({
      dts: false,
      dirs: [],
      resolvers: [
        ElementUiResolver({
          importStyle: "sass",
        }),
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          experimentalInlineMatchResource: true,
        },
      },
      {
        test: /\.scss$/,
        loader: "sass-loader",
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
