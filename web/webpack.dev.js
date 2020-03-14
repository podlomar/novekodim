const merge = require("webpack-merge");
const base = require("./webpack.config.js");

module.exports = merge.smart(base, {
  mode: "development",
  devtool: "#source-map"
});
