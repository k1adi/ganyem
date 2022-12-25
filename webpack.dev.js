const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/images/[name][ext]',
    filename: 'bundle.js',
    clean: true
  },
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'src'),
    open: true,
    port: 9000,
    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    compress: true,
    liveReload: true,
  },
});
