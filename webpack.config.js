var path = require('path');
var neat = require('bourbon-neat').includePaths;
var bourbon = require('node-bourbon').includePaths[1];

console.log('neat >>>>', neat)

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/build/'
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
              includePaths: [ neat, bourbon ]
            }
          }
        ]
      }
    ]
  }
}
