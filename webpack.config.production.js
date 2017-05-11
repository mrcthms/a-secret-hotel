const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
      component: path.resolve('./node_modules/@lostmyname/components/lib'),
      chameleon: path.resolve('./node_modules/chameleon-sass/assets/stylesheets'),
      css: path.resolve('./node_modules/@lostmyname/css/scss'),
      fonts: path.resolve('./node_modules/@lostmyname/css/fonts'),
      scss: path.resolve('./src/scss'),
      helpers: path.resolve('./src/js/helpers')
    },
    modules: [
      path.join(__dirname, './'),
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
        test: /images\/.*\.svg$/i,
        loader: 'svg-url-loader'
      },
      {
        test: /\.s?css$/,
        exclude: [
          /components\/[A-z\/]*\.s?css/,
          /views\/Iframe\/Iframe.scss/
        ],
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
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({ minimize: true }),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ],
  node: {
    fs: 'empty',
    net: 'empty'
  }
};
