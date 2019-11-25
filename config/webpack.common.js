const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const helpers = require("./helpers");

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === "production";

module.exports = {
  entry: {
    app: [helpers.root("client/app/index.js")]
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
      //IMAGES
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: "url-loader",
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024
        }
      },
      //SVG's
      {
        test: /\.svg$/,
        loader: "svg-url-loader",
        options: {
          // Inline files smaller than 10 kB (10240 bytes)
          limit: 10 * 1024,
          // Remove the quotes from the url
          // (they’re unnecessary in most cases)
          noquotes: true
        }
      },
      // JS files
      {
        test: /\.jsx?$/,
        include: helpers.root("client"),
        loader: "babel-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        loader: "image-webpack-loader",
        // This will apply the loader before the other ones
        enforce: "pre"
      },
      // SCSS files
      {
        test: /\.scss$/,
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
      disable: !isProd
    }),

    new CopyWebpackPlugin([
      {
        from: helpers.root("client/public")
      }
    ])
  ]
};
