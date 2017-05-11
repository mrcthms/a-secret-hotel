const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassLoaders = [
  {
    loader: 'css-loader'
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: [
        autoprefixer({
          browsers: ['last 3 versions']
        })
      ]
    }
  },
  {
    loader: 'sass-loader',
    options: {
      includePaths: [path.resolve(__dirname, './src')]
    }
  }
];

module.exports = {
  entry: [
    'webpack-hot-middleware/client?reload=true',
    // 'webpack-dev-server/client?http://localhost:8080',
    // 'webpack/hot/only-dev-server',
    './src/js/main.js'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.scss'],
    alias: {
      scss: path.resolve('./src/scss'),
      images: path.resolve('./src/images'),
      helpers: path.resolve('./src/js/helpers'),
      quests: path.resolve('./src/js/quests')
    },
    modules: [
      path.join(__dirname, './src'),
      path.join(__dirname, './node_modules')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/i,
        use: [
          'url-loader?limit=10000'
        ]
      },
      {
        test: /\.s?css$/,
        exclude: [
          /components\/[A-z\/]*\.s?css/,
          /views\/Iframe\/Iframe.scss/
        ],
        // loader: 'style-loader!css-loader!postcss-loader!sass-loader',
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: sassLoaders
        })
      },
      {
        test: [
          /components\/[A-z\/]*\.s?css/,
          /views\/Iframe\/Iframe.scss/
        ],
        loader: 'css-loader!postcss-loader!sass-loader'
      },
      {
        test: /fonts\/.*\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [ // <---- postcss configs go here under LoadOptionsPlugin({ options: { ??? } })
          autoprefixer({
            browsers: ['last 3 versions']
          })
        ]
      }
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ],
  node: {
    fs: 'empty',
    net: 'empty'
  },
  devServer: {
    historyApiFallback: true,
    clientLogLevel: 'error',
    compress: true
    // contentBase: path.resolve(__dirname, 'build')
  }
};
