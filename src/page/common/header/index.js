/*
* @Author: cdl
* @Date:   2018-10-03 10:20:16
* @Last Modified by:   Administrator
* @Last Modified time: 2018-10-25 11:25:48
*/

'use strict';
require('./index.css');

var _mm = require('util/mm.js');
//通用页面头部
var header = {
	init: function() {
		this.onload();
		this.bindEvent();
	},
	onload: function() {
		var keyword = _mm.getUrlParam('keyword');
		if(keyword){
			$('#search-input').val(keyword);
		}
	},
	bindEvent: function () {
		var _this = this;
		//点击搜索按钮后,作搜索提交
		$('.search-btn').click(function(){
			_this.searchSubmit();
		});
		//输入回车之后,作搜索提交
		$('.search-input').keyup(function(e){
			if (e.keyCode === 13) {
				_this.searchSubmit();
			}
		});
	},
	//搜索的提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		//如果提交的时候keyword有内容,正常提交到List页
		if (keyword){
			window.location.href = './List.html?keyword=' + keyword;
		}
		//如果keyword为空,直接返回首页
		else{
			_mm.goHome();
		}
	}
}

header.init();