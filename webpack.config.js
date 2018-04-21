const path = require('path'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  devServer: {
    hot: true
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build/resources'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.(s*)css$/,
      use: [
        "style-loader",
        MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
      ]
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        extractCSS: true
      }
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'bundle.css'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
