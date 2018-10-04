/*
* @Author: cdl
* @Date:   2018-09-22 22:07:40
* @Last Modified by:   cdl
* @Last Modified time: 2018-10-03 22:09:25
*/
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

//环境变量配置, online or dev
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html-webpack-plugin的参数的方法
var getHtmlConfig = function(name,title) {
    return  {
                template:   './src/view/' + name + '.html',
                filename:   'view/' + name + '.html',
                title:      title, 
                inject:     true, 
                hash:       true, 
                chunks:     ["common",  name]
            };
}

var config = { 
	entry: {
		common: ['./src/page/common/index.js'],
		index: ['./src/page/index/index.js'],
		login: ['./src/page/login/index.js'],
        result: ['./src/page/result/index.js'],
	},
	output: {
		path: './dist',
        publicPath: '/dist',
		filename: 'js/[name].js'
	},
	externals: {
		jquery: 'window.jQuery'
	},
	module: {
		loaders: [
            // { test: /\.css$/, loader: "style-loader!css-loader" }
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader' },
        ]
	},
    resolve: {
        alias: {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            service         : __dirname + '/src/service',
            page            : __dirname + '/src/page',
            view            : __dirname + '/src/view',
            image           : __dirname + '/src/image'
        }
    },
	plugins: [
		//把通用模块打包到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        }),
        //把css	单独打包到文件
        new ExtractTextPlugin('css/[name].css'),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index' ,'首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login' ,'登陆')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;