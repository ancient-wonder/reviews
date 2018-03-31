const webpack = require('webpack');
const path = require('path');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

const client = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'app.js',
    path: DIST_DIR,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const server = {
  entry: `${SRC_DIR}/index-server.jsx`,
  output: {
    filename: 'app-server.js',
    path: DIST_DIR,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = [
    // Object.assign({}, common, client),
    // Object.assign({}, common, server),
    client, server
  ];