const webpack = require('webpack')
const path = require('path')
const neat = require('bourbon-neat').includePaths
const bourbon = require('node-bourbon').includePaths[1]
const globImporter = require('node-sass-glob-importer')
const CopyWebpackPlugin = require('copy-webpack-plugin')

require('dotenv').config()

module.exports = {
  devtool: 'eval',
  entry: {
    application: './src/index.js',
    authentication: './src/auth.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: [{
          loader: 'babel-loader'
        }],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [ neat, bourbon ],
              importer: globImporter()
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.join(__dirname, 'src', 'assets'), to: 'assets' },
      { from: path.join(__dirname, 'src', 'index.html'), to: 'index.html'}
    ]),
    new webpack.DefinePlugin({
      'process.env.SERVER_URL': JSON.stringify(process.env.SERVER_URL)
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
  resolve: {
    alias: {
      '@redux': path.resolve(__dirname, 'src', 'redux'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@containers': path.resolve(__dirname, 'src', 'containers'),
      '@helpers': path.resolve(__dirname, 'src', 'helpers')
    }
  }
}
