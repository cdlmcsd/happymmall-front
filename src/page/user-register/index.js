/*
* @Author: cdl
* @Date:   2018-10-06 08:09:00
* @Last Modified by:   cdl
* @Last Modified time: 2018-10-06 11:20:22
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
		//验证username
		$('#username').blur(function() {
			var username = $.trim($(this).val());
			if (!username){
				return;
			}
			//异步验证用户名是否存在
			_user.checkUsername(username, function(res){
				formError.hide();
			},function(errMsg){
				formError.show(errMsg);
			});
		});
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
			username 			: $.trim($('#username').val()),
			password 			: $.trim($('#password').val()),
			passwordConfirm 	: $.trim($('#password-confirm').val()),
			phone 				: $.trim($('#phone').val()),
			email 				: $.trim($('#email').val()),
			question 			: $.trim($('#question').val()),
			answer 				: $.trim($('#answer').val())
			},
			validateResult = this.formValidate(formData);
		//验证成功
		if (validateResult.status) {
			//提交
			_user.register(formData, function(res) {
				window.location.href = './result.html?type=register';
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
		if (formData.password.length < 6){
			result.msg = '密码长度不能小于6位';
			return result;
		}
		if (formData.password != formData.passwordConfirm){
			result.msg = '两次输入密码不一致';
			return result;
		}
		if (!_mm.validate(formData.phone, 'phone')){
			result.msg = '电话号码输入不正确';
			return result;
		}
		if (!_mm.validate(formData.email, 'email')){
			result.msg = '电子邮箱格式不正确';
			return result;
		}
		if (!_mm.validate(formData.question, 'require')){
			result.msg = '密码提示问题不能不空';
			return result;
		}
		if (!_mm.validate(formData.answer, 'require')){
			result.msg = '密码提示答案不能为空';
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