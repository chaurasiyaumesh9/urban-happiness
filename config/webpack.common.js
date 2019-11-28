const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const path = require("path");
const helpers = require("./helpers");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === "production";
const pkg = require("../package.json");

module.exports = {
  entry: {
    app: [helpers.root("client/app/index.js")],
    vendor: ["react", "react-dom", "react-router-dom"]
  },

  output: {
    path: helpers.root("dist"),
    publicPath: "/"
  },

  resolve: {
    extensions: [".jsx", ".js", ".json", ".css", ".scss", ".html"],
    alias: {
      app: "client/app"
    }
  },

  module: {
    rules: [
      // JS files
      {
        test: /\.jsx?$/,
        include: helpers.root("client"),
        loader: "babel-loader"
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[hash:6].[ext]",
              limit: 100000
            }
          }
        ]
      },
      // SCSS files
      {
        test: /\.(scss|css|sass)$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: false,
                importLoaders: 1,
                minimize: true
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [autoprefixer]
              }
            },
            "sass-loader"
          ]
        })
      }
    ]
  },
  performance: {
    hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),

    new HtmlWebpackPlugin({
      template: helpers.root("client/public/index.html"),
      inject: "body"
    }),

    new ExtractTextPlugin({
      filename: "css/[name].[hash].css",
      disable: !isProd,
      allChunks: true
    }),

    new CopyWebpackPlugin([
      {
        from: helpers.root("client/public")
      }
    ])
    // new BundleAnalyzerPlugin()
  ]
};
