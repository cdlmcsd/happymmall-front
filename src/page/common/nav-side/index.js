/*
* @Author: cdl
* @Date:   2018-10-03 20:31:37
* @Last Modified by:   cdl
* @Last Modified time: 2018-10-03 21:53:39
*/

'use strict';

require('./index.css');

var _mm = require('util/mm.js');
var templateIndex = require('./index.string');
//通用页面头部
var navSide = {
	option: {
		name: '',
		navList: [
			{name: 'user-center', desc: '个人中心', 	href: './user-center.html'},
			{name: 'pass-update', desc: '修改密码', 	href: './pass-update.html'},
			{name: 'order-list', desc: '我的订单', 	href: './order-list.html'},
			{name: 'about', desc: '关于MMALL', 	href: './about.html'}
		]
	},
	init: function(option) {
		//合并选项
		$.extend(this.option, option);
		this.renderNav();
	},
	renderNav: function() {
		//计算active数据
		for(var i=0; i<this.option.navList.length; i++){
			if (this.option.name === this.option.navList[i].name){
				this.option.navList[i].isActive = true;
			}
		}
		//渲染list数据
		var navHtml = _mm.renderHtml(templateIndex , {
			navList : this.option.navList
		});
		$('.nav-side').html(navHtml);
	}
}

module.exports = navSide;