/*
* @Author: cdl
* @Date:   2018-10-07 20:21:51
* @Last Modified by:   cdl
* @Last Modified time: 2018-10-07 21:46:10
*/

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide 		= require('page/common/nav-side/index.js');
var _mm 			= require('util/mm.js');
var _user 			= require('service/user-service.js');
var templateIndex 	= require('./index.string');

var page = {
	init: 			function() {
		this.onLoad();
	},
	onLoad: 		function() {
		navSide.init({
			name: 'user-center'
		});
		this.loadUserInfo();
	},
	//加载用户信息
	loadUserInfo: 	function() {
		var userHtml = '';
		_user.getUserInfo(function(res) {
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		}, function(errMsg) {
			_mm.errorTip(errMsg);
		});
	}
}

$(function(){
	page.init();
});
