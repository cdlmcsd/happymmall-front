/*
* @Author: Administrator
* @Date:   2018-10-25 11:09:19
* @Last Modified by:   cdl
* @Last Modified time: 2018-10-29 23:30:45
*/

'use strict';
var _mm = require('util/mm.js');

var _product = {
	//获取商品列表
	getProductList : function(listParam, resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/product/list.do'),
			data 	: listParam,
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	//获取商品详细信息
	getProductDetail : function(productId, resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/product/detail.do'),
			data 	: {productId : productId},
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},

};


module.exports = _product;