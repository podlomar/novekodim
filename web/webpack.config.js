const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

module.exports = {
  target: "node",
  mode: "development",
  entry: "./src/index.js",
  devtool: "#source-map",
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
              resources: "./src/scss/variables.scss"
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
          publicPath: "/img",
          name: "[name]-[hash:6].[ext]"
        }
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
};
