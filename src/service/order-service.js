/*
* @Author: Administrator
* @Date:   2019-02-14 14:42:54
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-26 10:39:56
*/
'use strict';


var _mm = require('util/mm.js');

var _order = {
	//获取商品列表
	getProductList : function(resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/order/get_order_cart_product.do'),
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	//提交订单
	createOrder : function(orderInfo, resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/order/create.do'),
			data 	: orderInfo,
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},
	//订单列表
	getOrderList :  function(listParam, resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/order/list.do'),
			method	: 'POST',
			data	: listParam,
			success : resolve,
			error 	: reject
		});
	},
	//订单住处
	getOrderDetail : function(orderNumber, resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/order/detail.do'),
			method	: 'POST',
			data	: {
				orderNo : orderNumber
			},
			success : resolve,
			error 	: reject
		});
	},
	//取消订单
	cancelOrder : function(orderNumber, resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/order/cancel.do'),
			method	: 'POST',
			data	: {
				orderNo : orderNumber
			},
			success : resolve,
			error 	: reject
		});
	},
};


module.exports = _order;