const path = require('path');
const WebpackHtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const isDevMode = process.env.MODE === 'development';

const filename = (ext) => isDevMode ? `[name].${ext}` : `[hash].${ext}`;

const minimize = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (!isDevMode) {
    config.minimizer = [
      new TerserWebpackPlugin(),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  }

  return config;
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  devServer: {
    port: 4200,
    hot: true,
  },
  entry: {
    main: ['@babel/polyfill', './index.js'],
    analytics: './analytics.js',
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  devtool: isDevMode ? 'source-map' : false,
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles')
    }
  },
  optimization: minimize(),
  plugins: [
    new WebpackHtmlPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: !isDevMode,
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDevMode,
            reloadAll: isDevMode
          }
        }
          , 'css-loader']
      },
      {
        test: /\.(png|gif|jpg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        loader: 'file-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          },
          isDevMode ? 'eslint-loader' : '']
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
            ]
          }
        }
      }
    ]
  }
}