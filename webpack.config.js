const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTemplate = require('html-webpack-template')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: HtmlWebpackTemplate,
      appMountId: 'app',
    }),
  ],
}
