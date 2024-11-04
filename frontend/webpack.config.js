const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/app.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    clean: true,
  },
  devServer: {
    static: "./public",
    hot: true,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./public/product.html",
      filename: "product.html",
    }),
    new HtmlWebpackPlugin({
      template: "./public/cart.html",
      filename: "cart.html",
    }),
    new HtmlWebpackPlugin({
      template: "./public/checkout.html",
      filename: "checkout.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development",
};
