const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/app.js'),
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 5000
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.html',
      appMountId: 'app',
    }),
  ],
}
