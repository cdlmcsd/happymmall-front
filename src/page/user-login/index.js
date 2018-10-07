/*
* @Author: cdl
* @Date:   2018-09-22 22:21:00
* @Last Modified by:   cdl
* @Last Modified time: 2018-10-06 11:41:32
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
	init: function() {
		this.bindEvent();
	} ,
	bindEvent: function() {
		var _this = this;
		$('#submit').click(function(){
			_this.submit();
		});
		$('.user-content').keyup(function(e){
			if(e.keyCode === 13){
				_this.submit();
			}
		});
	},
	submit: function() {
		var formData = {
			username : $.trim($('#username').val()),
			password : $.trim($('#password').val())
			},
			validateResult = this.formValidate(formData);
		//验证成功
		if (validateResult.status) {
			//提交
			_user.login(formData, function(res) {
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			}, function(errMsg) {
				formError.show(errMsg);
			});
		}
		//验证失败
		else{
			// 错误提示
			formError.show(validateResult.msg);
		}
	},
	//表单字段的验证
	formValidate : function(formData) {
		var result = {
			status 	: false,
			msg 	: ''
		};
		if (!_mm.validate(formData.username, 'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_mm.validate(formData.password, 'require')){
			result.msg = '密码不能为空';
			return result;
		}
		result.status 	= true;
		result.msg 		= '验证通过';
		return result;
	}
};

$(function(){
	page.init();
});