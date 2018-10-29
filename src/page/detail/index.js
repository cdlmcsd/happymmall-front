/*
* @Author: cdl
* @Date:   2018-10-28 09:25:50
* @Last Modified by:   cdl
* @Last Modified time: 2018-10-29 23:37:26
*/

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _mm 			= require('util/mm.js');
var _product 			= require('service/product-service.js');
var _cart      = require('service/cart-service.js');
var templateIndex 	= require('./index.string');

var page = {
	data : 			{
		productId	: _mm.getUrlParam('productId') || ''
	},
	init: 			function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: 		function() {
		//如果没有传productId,跳回首页
		if(!this.data.productId) {
			_mm.goHome();
		}
		this.loadDetail();
	},
	bindEvent: 		function() {
		var _this = this;
	},
	// 加载商品信息
	loadDetail: 		function() {
		var _this = this,
			html 		= '',
			$pageWrap 	= $('.page-wrap');
		// loading
		$pageWrap.html('<div class="loading></div>');
		_product.getProductDetail(this.data.productId, function(res) {
			_this.filter(res);
			html = _mm.renderHtml(templateIndex, res);
			$pageWrap.html(html);
		}, function(errMsg) {
			$pageWrap.html('<p class="err-tip">此商品太淘气,找不到</p>');
		});
	},
	filter : function(data) {
		data.subImages = data.subImages.split(',');
	}
}

$(function(){
	page.init();
});
