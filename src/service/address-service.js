/*
* @Author: Administrator
* @Date:   2019-02-18 10:32:22
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-20 15:59:22
*/
'use strict';


var _mm = require('util/mm.js');

var _address = {
	//获取地址列表
	getAddressList : function( resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/shipping/list.do'),
			method	: 'POST',
			data	: {
				pageSize : 50
			},
			success : resolve,
			error 	: reject
		});
	},
	//新建地址
	save : function(addressInfo, resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/shipping/add.do'),
			method	: 'POST',
			data	: addressInfo,
			success : resolve,
			error 	: reject
		});
	},
	//更新地址
	update : function(addressInfo, resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/shipping/update.do'),
			method	: 'POST',
			data	: addressInfo,
			success : resolve,
			error 	: reject
		});
	},
	delete : function(shippingId, resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/shipping/del.do'),
			method	: 'POST',
			data	: {
				shippingId : shippingId
			},
			success : resolve,
			error 	: reject
		});
	},
	getAddress : function(shippingId, resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/shipping/select.do'),
			method	: 'POST',
			data	: {
				shippingId : shippingId
			},
			success : resolve,
			error 	: reject
		});
	},
};


module.exports = _address;