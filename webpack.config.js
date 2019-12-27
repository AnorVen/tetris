let path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');

module.exports = (env, argv) => {
  let isDev = argv.mode === 'development';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './dist/'),
      filename: 'main.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-transform-runtime",
                "babel-plugin-styled-components",
                "@babel/plugin-transform-react-jsx",
                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                ["@babel/plugin-proposal-class-properties", { "loose": true }]
              ]
            }
          }
        },
        {
          test: /\.module\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
              },
            },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: {
                  localIdentName: '[local]__[sha1:hash:hex:7]'
                }
              }
            }
          ]
        },
        {
          test: /^((?!\.module).)*css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDev,
              },
            },
            'css-loader'
          ]
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader?classPrefix'
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ]
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'main.css'
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({template: path.resolve(__dirname, './src/index.html')}),
      new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
      contentBase: path.join(__dirname, './dist'),
      compress: false,
      port: 10888,
      historyApiFallback: true,
      https: true
    },
    devtool: isDev ? 'cheap-module-eval-source-map' : false,
  }
};