const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(path)
module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    fallback: { "path": false }
  },
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "index_bundle.js",
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html"
      })
  ],
};