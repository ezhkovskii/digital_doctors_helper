const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/index.tsx',
   target: 'web',
   mode: 'development',
   stats: {
      errorDetails: true
   },
   output: {
      path: path.resolve(__dirname, 'build'),
      publicPath: './',
      filename: 'bundle.js'
   },
   resolve: {
      alias: {
         app: path.resolve(__dirname, 'src/app'),
         pages: path.resolve(__dirname, 'src/pages'),
         widgets: path.resolve(__dirname, 'src/widgets'),
         shared: path.resolve(__dirname, 'src/shared')
      },
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
            use: ['style-loader', 'css-loader', 'postcss-loader']
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
         template: path.resolve(__dirname, 'src', 'index.html')
      })
   ]
};
