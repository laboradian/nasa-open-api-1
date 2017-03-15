//process.traceDeprecation = true
process.noDeprecation = true

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
    rules: [
      /*{
        test: /\.css$/,
        loader: "style!css"
      },*/
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          configFile: './.eslintrc'
        }
      },
      {
        test: /\.less$/,
        /*exclude: /(node_modules\/fonts)/,*/
        use: ["style-loader", "css-loader", "less-loader"]
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
    extensions: ['.js', '.css']
  }
};

