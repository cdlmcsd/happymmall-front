/*
* @Author: cdl
* @Date:   2018-09-24 07:51:37
* @Last Modified by:   cdl
* @Last Modified time: 2018-10-04 09:36:13
*/

'use strict';
var conf = {
	serverHost : 		''
};

var hogan = require('hogan');

var _mm = {
	request : function(param) {
		var _this = this;
		$.ajax({
			type		: param.method 		|| 'get' ,
			url			: param.url 		|| '',
			dataType	: param.type 		|| 'json',
			data 		: param.data 		|| '',
			success		: function(res) {
				//请求成功
				if(0 === res.status) {
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				//没有登陆状态,需要强制登陆
				else if(10 === res.status){
					_this.doLogin();
				}
				//请求数据错误
				else if(1 === res.status){
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			error		: function(err) {
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	//获取服务器地址
	getServerUrl : function(path) {
		return conf.serverHost + path;
	},
	//获取url参数
	getUrlParam : function(name) {
		var reg 	= new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result 	= window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	//渲染HTML模板
	renderHtml : function(htmlTemplate, data) {
		var template 	= hogan.compile(htmlTemplate);
		var result 		= template.render(data);
		return result;
	},
	//成功提示
	successTip : function(msg) {
		alert(msg + '操作成功!');
	},
	//错误提示
	errorTip : function(msg) {
		alert(msg + '哪里不对了`');
	},
	//字体段的验证,支持非空,手机号,邮箱的判断
	validate : function(value, type) {
		var value = $.trim(value);
		//非空验证
		if('require' === type){
			return !!value;
		}
		//电话验证
		if('phone' === type){
			return /^1\d{10}$/.test(value);
		}
		//邮箱验证
		if('email' === type){
			return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value);
		}
	},
	//统一登陆处理
	doLogin : function(){
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	//统一跳转
	goHome : function(){
		window.location.href = './index.html';
	},
};

module.exports = _mm;