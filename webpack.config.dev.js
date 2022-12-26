const webpack = require('webpack');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');
const path = require('path');
const port = 3000;

module.exports = (env, options) => {
  return merge(common, {
    mode: 'development',
    devServer: {
      port,
      static: path.join(__dirname, 'dist'),
      hot: true,
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
          loader: 'file-loader',
          options: {
            publicPath: `http://localhost:${port}/assets`,
            name: '[path][name].[ext]',
            context: path.resolve(__dirname, 'src/assets'),
            emitFile: false
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.VERSION': JSON.stringify(0),
        'process.env.WEB_SOCKET': JSON.stringify('ws://localhost:8080'),
        'process.env.BUCKET': JSON.stringify('staging'),
        'process.env.GATEWAY': JSON.stringify(
          'http://gateway-dev.crowdsol.co/api/v1/'
        )
      })
    ]
  });
};
