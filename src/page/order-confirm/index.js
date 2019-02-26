/*
* @Author: Administrator
* @Date:   2019-02-14 13:53:06
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-20 17:28:57
*/

'use strict';

require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _mm 				= require('util/mm.js');
var _order      		= require('service/order-service.js');
var _address      		= require('service/address-service.js');
var templateAddress 	= require('./address-list.string');
var templateProduct 	= require('./product-list.string');
var addressModal		= require('./address-modal.js');

var page = {
	data : 			{
		selectAddressId : null
	},
	init: 			function() {
		this.onLoad();
		this.bindEvent();
	},
	onLoad: 		function() {
		this.loadAddressList();
		this.loadProductList();
	},
	bindEvent: 		function() {
		var _this = this;
		$(document).on('click','.address-item', function() {
			$(this).addClass('active')
				.siblings('.address-item').removeClass('active');
			_this.data.selectAddressId = $(this).data('id');
		});

		$(document).on('click','.order-submit', function() {
			var shippingId = _this.data.selectAddressId;
			if(shippingId){
				_order.createOrder({
					shippingId : shippingId
				}, function(res) {
					window.location.href = './payment.html?orderNumber=' + res.orderNo;
				}, function(errMsg) {
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips('请选择地址后，再提交');
			}
		});

		$(document).on('click','.address-add', function() {
			addressModal.show({
				isUpdate : false,
				onSuccess : function (){
					_this.loadAddressList();
				}
			});
		});

		$(document).on('click','.address-update', function(e) {
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId, function(res) {
				addressModal.show({
					isUpdate : true,
					data : res,
					onSuccess : function (){
						_this.loadAddressList();
					}
			});
			}, function(errMsg) {
				_mm.errorTip(errMsg);
			});
			
		});

		$(document).on('click','.address-delete', function(e) {
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');
			if(window.confirm('确认要删除该地址？')){
				_address.delete(shippingId, function(res) {
					_this.loadAddressList();
				}, function(errMsg) {
					_mm.errorTip(errMsg);
				});
			}
		});
	},
	loadAddressList: function() {
		var _this = this;
		$('.address-con').html('<div class="loading"></div>');
		_address.getAddressList(function(res){
			_this.filterAddress(res);
			var AddressListHtml = _mm.renderHtml(templateAddress, res);
			$('.address-con').html(AddressListHtml);
		}, function(errMsg){
			$('.address-con').html('<p class="err-tip">地址加载失败，请稍后重试</p>');
		});
	},
	filterAddress : function(data) {
		if(this.data.selectAddressId) {
			var selectAddressIdFlag = false;
			for (var i = 0, length = data.list.length; i < length; i++) {
				if(data.list[i].id === this.data.selectAddressId){
					data.list[i].isActive = true;
					selectAddressIdFlag = true;
				}
			}
			//如果以前选中的地址不在列表中了，将其删除
			if(!selectAddressIdFlag){
				this.data.selectAddressId = null;
			}
		}
	},
	loadProductList: function() {
		var _this = this;
		$('.product-con').html('<div class="loading"></div>');
		_order.getProductList(function(res){
			var ProductListHtml = _mm.renderHtml(templateProduct, res);
			$('.product-con').html(ProductListHtml);
		}, function(errMsg){
			$('.product-con').html('<p class="err-tip">商品信息加载失败，请稍后重试</p>');
		});
	},
	
}

$(function(){
	page.init();
});
