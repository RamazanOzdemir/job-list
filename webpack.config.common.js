const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const paths = require('path');

module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': paths.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader'
        ]
      },
      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  optimization: {
    usedExports: true
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: './src/assets', to: './assets' }]
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
