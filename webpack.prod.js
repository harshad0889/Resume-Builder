var path = require('path');
var webpack =require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
require('dotenv').config()
console.log(process.env.NODE_ENV,"-------------------")
module.exports = {
    entry: './src/index.jsx',
     mode: 'production',
       devtool: 'source-map',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',


    },
    optimization: {
     minimize: true
   },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                     "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
                      plugins: ["@babel/transform-runtime",
                       "@babel/plugin-proposal-class-properties"
      

                      ]
                }
            },
            {
        test: /\.css$/,
        use: [
          { loader: "style-loader/url" },
          { loader: "file-loader" }
        ]
      },

            {test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader?name=app/images/[name].[ext]"}
        ]
    },
    plugins: [

    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        inject: 'body'
    }) 
    ,
      new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }

    })


    ],
    devServer: {
        historyApiFallback: true
    },
    externals: {


        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:8989'
        })
    }
}