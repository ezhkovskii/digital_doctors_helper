const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   entry: './src/app/index.tsx',
   target: 'web',
   mode: 'development',
   stats: {
      errorDetails: true
   },
   output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: '/',
      filename: 'bundle.js'
   },
   resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      extensionAlias: {
         '.js': ['.js', '.ts'],
         '.cjs': ['.cjs', '.cts'],
         '.mjs': ['.mjs', '.mts']
      }
   },
   module: {
      rules: [
         {
            test: /\.([cm]?ts|tsx)$/,
            loader: 'ts-loader'
         },
         {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'source-map-loader'
         },
         {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
         },
         {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
               loader: 'prettier-loader'
            }
         }
      ]
   },
   devServer: {
      historyApiFallback: true
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'src', 'App', 'index.html')
      }),
      new MiniCssExtractPlugin()
   ]
};
