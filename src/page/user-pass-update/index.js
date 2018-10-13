/*
* @Author: cdl
* @Date:   2018-10-13 21:18:23
* @Last Modified by:   cdl
* @Last Modified time: 2018-10-13 22:07:02
*/

'use strict';


require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide 		= require('page/common/nav-side/index.js');
var _mm 			= require('util/mm.js');
var _user 			= require('service/user-service.js');

var page = {
	init: 			function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: 		function() {
		navSide.init({
			name: 'user-pass-update'
		});
	},
	bindEvent: 		function() {
		var _this = this;
		//点击提交按钮后的动作
		$(document).on('click', '.btn-submit', function() {
			var userInfo = {
				passwordNew : $.trim($('#newPass').val()),
				passwordOld : $.trim($('#oldPass').val()),
				confirmPass : $.trim($('#confirmPass').val()),
			}
			var validateResult = _this.formValidate(userInfo);
			if (validateResult.status) {
				_user.password_update(userInfo, function(res, msg) {
					_mm.successTip(msg);
					window.location.href = './result.html?type=pass-update';
				}, function(errMsg) {
					_mm.errorTip(errMsg);
				});
			}
			else{
				_mm.errorTip(validateResult.msg);
			}
		});
	},
		//表单字段的验证
	formValidate : function(formData) {
		var result = {
			status 	: false,
			msg 	: ''
		};
		if (!_mm.validate(formData.passwordOld, 'require')){
			result.msg = '原密码不能为空';
			return result;
		}
		if (!formData.passwordNew || formData.passwordNew.length < 6){
			result.msg = '新密码长度不能小于6位';
			return result;
		}
		if (formData.confirmPass != formData.passwordNew){
			result.msg = '确认密码与新密码不一致';
			return result;
		}
		result.status 	= true;
		result.msg 		= '验证通过';
		return result;
	}
}

$(function(){
	page.init();
});
