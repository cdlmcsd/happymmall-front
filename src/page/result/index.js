/*
* @Author: cdl
* @Date:   2018-10-03 22:02:03
* @Last Modified by:   cdl
* @Last Modified time: 2018-10-03 22:41:44
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success').show();
		$element.show();
});