const webpack = require("webpack");
const merge = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");

const helpers = require("./helpers");
const commonConfig = require("./webpack.common");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(commonConfig, {
  mode: "production",

  output: {
    filename: "js/[name].[hash].js",
    chunkFilename: "[id].[hash].chunk.js"
  },
  optimization: {
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: !isWsl,
        cache: true,
        sourceMap: false
      })
    ],

    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "all"
        },
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    },
    minimize: true,
    runtimeChunk: {
      name: "runtime"
    }
  },
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
  ]
});
