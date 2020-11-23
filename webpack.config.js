const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env = {}) => ({
  mode: env.prod ? 'production' : 'development',
  devtool: env.prod ? false : 'eval-cheap-module-source-map',
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    filename: env.prod ? 'js/[name].js' : 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: env.prod ? './' : '/'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'css/index',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          'vue-loader',
          {
            loader: 'eslint-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 1024 * 100,
            outputPath: 'images',
            publicPath: '../images',
            name: '[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024 * 1000,
            name: env.prod
              ? 'fonts/[name].[hash:8].[ext]'
              : '[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.(sa|sc|c|le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          },
          'eslint-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),

    new CleanWebpackPlugin()
  ],
  devServer: {
    inline: true,
    hot: true,
    stats: 'minimal',
    clientLogLevel: 'silent',
    contentBase: __dirname,
    overlay: true
  }
})
