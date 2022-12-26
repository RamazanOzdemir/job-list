const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const ASSETS_PATH = process.env.ASSETS_PATH || '/';

module.exports = (env, options) => {
  return merge(common, {
    mode: 'production',
    output: {
      publicPath: ASSETS_PATH,
      clean: true
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ],
      splitChunks: {
        chunks: 'all'
      }
    },
    module: {
      rules: [
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
          loader: 'file-loader',
          options: {
            publicPath: `${process.env.ASSETS_PATH}assets/`,
            name: '[path][name].[ext]',
            context: path.resolve(__dirname, 'src/assets'),
            emitFile: false
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.ASSETS_PATH': JSON.stringify(ASSETS_PATH)
      })
    ]
  });
};
