/*
* @Author: Administrator
* @Date:   2018-10-25 11:09:19
* @Last Modified by:   Administrator
* @Last Modified time: 2018-10-25 15:08:31
*/

'use strict';
var _mm = require('util/mm.js');

var _product = {
	//用户登陆
	getProductList : function(listParam, resolve, reject) {
		_mm.request({
			url		: _mm.getServerUrl('/product/list.do'),
			data 	: listParam,
			method	: 'POST',
			success : resolve,
			error 	: reject
		});
	},

};

module.exports = _product;