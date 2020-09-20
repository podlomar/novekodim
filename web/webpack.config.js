const { VueLoaderPlugin } = require("vue-loader");
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require("path");

module.exports = {
  target: "node",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/",
    filename: "server.js"
  },
  resolve: {
    modules: [path.resolve("./src"), path.resolve("./node_modules")],
    extensions: ["*", ".js", ".vue"],
    mainFiles: ["index"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "sass-resources-loader",
            options: {
              resources: ["./src/scss/variables.scss", "./src/scss/mixins.scss"]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "file-loader",
        options: {
          outputPath: "assets/img",
          name: "[name]-[hash:6].[ext]"
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new WebpackShellPlugin({
      dev: false,
      onBuildEnd: ['docker restart nove.kodim'],
    }),
  ],
};
