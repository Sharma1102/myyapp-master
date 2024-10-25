const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const devMode = argv.mode === 'development';

  return {
    entry: path.resolve(__dirname, 'index.web.js'), // Your web entry point
    output: {
      path: path.resolve(__dirname, 'build'), // Output directory
      filename: '[name].[hash].bundle.js',
      publicPath: '/', // Ensures correct loading of assets
    },
    resolve: {
      extensions: ['.web.js', '.js', '.web.tsx', '.tsx', '.ts'], // Ensure TypeScript files are recognized
      alias: {
        'react-native$': 'react-native-web', // Alias to map React Native imports to React Native Web
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-react', '@babel/preset-typescript'],
              },
            },
            'ts-loader', // Using ts-loader for TypeScript files
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'], // Loaders for CSS files
        },
        {
          test: /\.(gif|jpe?g|png|webp)$/i,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8192, // Inline files smaller than 8KB
              name: '[name].[hash].[ext]', // Output file naming
              esModule: false,
            },
          },
        },
        {
          test: /\.(woff(2)?|ttf|eot)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[hash].[ext]',
                outputPath: 'config/custom/fonts', // Output directory for fonts
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'), // Path to your HTML template
      }),
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(devMode), // Define development mode
      }),
    ],
    devServer: {
      hot: true,
      port: 4000, // Webpack dev server port
      historyApiFallback: true, // Supports client-side routing
    },
  };
};
