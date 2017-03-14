module.exports = {
  // configuration
  entry: {
    app: "./assets/js/app.js"
  },
  output: {
    path: "./js/",
    publicPath: '/js/',
    filename: "[name].js"
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ],
    loaders: [
      /*{
        test: /\.css$/,
        loader: "style!css"
      },*/
      {
        test: /\.less$/,
        /*exclude: /(node_modules\/fonts)/,*/
        loader: "style!css!less"
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query:{
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.css']
  },
  eslint: {
    configFile: './.eslintrc'
  }
};

