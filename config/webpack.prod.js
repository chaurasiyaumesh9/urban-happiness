const webpack = require("webpack");
const merge = require("webpack-merge");

const helpers = require("./helpers");
const commonConfig = require("./webpack.common");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const AssetsPlugin = require("assets-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: "production",

  output: {
    filename: "js/[name].[hash].js",
    chunkFilename: "[id].[hash].chunk.js"
  }
  /*optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  }
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      },
      output: {
        comments: false
      }
    })
  ]*/
});
