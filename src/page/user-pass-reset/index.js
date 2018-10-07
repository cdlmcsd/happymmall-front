/*
* @Author: cdl
* @Date:   2018-10-07 10:45:23
* @Last Modified by:   cdl
* @Last Modified time: 2018-10-07 20:19:12
*/

'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//表单里的错误指示
var formError = {
	show : function(errMsg) {
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function() {
		$('.error-item').hide().find('.err-msg').text('');
	}
};

var page = {
	data: {
		username : '',
		question : '',
		answer	 : '',
		forgetToken	 : '',
		passwordNew	 : ''
	},
	init: function() {
		this.onLoad();
		this.bindEvent();
	} ,
	onLoad: function() {
		var _this = this;
		_this.loadSetpUsername();
	},
	bindEvent: function() {
		var _this = this;
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			//检查用户名
			if (username) {
				_user.getQuestion(username ,
					//用户名存在
					function (res){
						_this.data.username = username;
						_this.data.question = res;
						_this.loadQuestion();
					}, 
					//用户名不存在
					function(errMsg) {
						formError.show(errMsg);
					});
			}else{
				formError.show('请输入用户名');
			}
		});
		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			_this.data.answer = answer;
			//检查用户名
			if (answer) {
				_user.getToken(_this.data ,
					//用户名存在
					function (res){
						_this.data.forgetToken = res;
						_this.loadPassword();
					}, 
					//用户名不存在
					function(errMsg) {
						formError.show(errMsg);
					});
			}else{
				formError.show('请输入答案');
			}
		});
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			_this.data.passwordNew = password;
			//检查用户名
			if (password && password.length >= 6) {
				_user.resetPassword(_this.data ,
					//用户名存在
					function (res,msg){
						window.location.href = './result.html?type=pass-reset';
					}, 
					//用户名不存在
					function(errMsg) {
						formError.show(errMsg);
					});
			}else{
				formError.show('请输入不小于6位新密码');
			}
		});
	},
	loadSetpUsername: function() {
		$('.step-username').show();
	},
	loadQuestion: function() {
		var _this = this;
		formError.hide();
		$('.step-con').hide();
		$('.step-question').show().find('#txtQuestion').text(_this.data.question);
	},
	loadPassword: function() {
		formError.hide();
		$('.step-con').hide();
		$('.step-password').show();
	},
};

$(function(){
	page.init();
});