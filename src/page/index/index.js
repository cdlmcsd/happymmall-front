/*
* @Author: Administrator
* @Date:   2018-09-23 16:02:50
* @Last Modified by:   cdl
* @Last Modified time: 2018-10-22 22:09:10
*/

'use strict';

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');

navSide.init({
	name: 'pass-update'
});
