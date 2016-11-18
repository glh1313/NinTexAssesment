
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, "./application"),
    entry: {
        app: ["./source/entry.js"]
    },
    output: {
        path: path.resolve(__dirname, "./application/build"),
        publicPath: "/",
        filename: "bundle.js"
    },
    // devServer: {
    //     inline: true
    // },
    module: {
        loaders: [
            {
                test: /.*\/application\/.*\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: [
                        "es2015",
                        "react",
                        "stage-2"
                    ]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './source/index.template.ejs',
            inject: 'body',
        })
    ]
};