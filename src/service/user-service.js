/*
* @Author: cdl
* @Date:   2018-10-05 21:43:45
* @Last Modified by:   cdl
* @Last Modified time: 2018-10-13 22:09:17
*/

'use strict';
var _mm = require('util/mm.js');

var _user = {
	//用户登陆
	login : function(userInfo, resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/user/login.do'),
			data 	: userInfo,
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	checkUsername : function(username, resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/user/check_valid.do'),
			data 	: {
				type	: 'username',
				str 	: username
			},
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	register	: function(userInfo, resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/user/register.do'),
			data 	: userInfo,
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	    // 检查登录状态
    checkLogin : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    getUserInfo : function(resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    //获取用户密码提示问题
    getQuestion : function(username,  resolve, reject) {
    	_mm.request({
            url     : _mm.getServerUrl('/user/forget_get_question.do'),
            data 	: {
				username 	: username
			},
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    getToken : function(userInfo, resolve, reject) {
    	_mm.request({
            url     : _mm.getServerUrl('/user/forget_check_answer.do'),
            data 	: userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    resetPassword: function(userInfo, resolve, reject) {
    	_mm.request({
            url     : _mm.getServerUrl('/user/forget_reset_password.do'),
            data 	: userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    password_update: function(userInfo, resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    updateUserInfo: function(userInfo, resolve, reject) {
        _mm.request({
            url     : _mm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    logout : function() {
        _mm.request({
            url     : _mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    }
};

module.exports = _user;