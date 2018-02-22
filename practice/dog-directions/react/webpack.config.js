var config = {
  entry: {
    path: __dirname+'/src/main.js',
  },
  output: {
    path: __dirname+'/../public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'eval-source-map'
}

module.exports = config;
