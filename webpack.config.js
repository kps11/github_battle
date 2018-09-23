// var path = require('path');
// var HtmlWebPackPlugIn = require('html-webpack-plugin');
//
// module.exports = {
//     entry: "./src/index.js",
//     output: {
//         path: path.resolve(__dirname,'dist'),
//         filename: "index-bundle.js"
//
//     },
//     module: {
//         rules: [
//             {test:/\.js$/,exclude:/node_modules/, use: {loader: "babel-loader"}},
//             {test:/\.css$/, use: {loader: ["style-loader","css-loader"]}}
//         ]
//     },
//     plugins: [new HtmlWebPackPlugIn({
//         template:'./src/index.html'
//     })]
// }

var path = require('path');
var HtmlWebpackPlugIn = require('html-webpack-plugin');


module.exports ={
    entry : './src/index.js',
    output:{
        path : path.resolve(__dirname,'dist'),
        filename:'index-bundle.js'

    },
    devServer: {
        historyApiFallback: true
    },
    module:{
        rules: [
            { test: /\.js$/, exclude: /node_modules/,
                use:  "babel-loader"  },
            {
                test: /\.css$/, use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins:[new HtmlWebpackPlugIn({
        template: './src/index.html'
    })]
}