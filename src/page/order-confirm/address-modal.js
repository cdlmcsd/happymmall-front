/*
* @Author: Administrator
* @Date:   2019-02-18 15:36:46
* @Last Modified by:   Administrator
* @Last Modified time: 2019-02-20 15:49:11
*/

'use strict';

var _mm 					= require('util/mm.js');
var _cities      			= require('util/cities/index.js');
var _address      			= require('service/address-service.js');
var templateAddressModal 	= require('./address-modal.string');

var addressModal = {
	show : function (option) {
		//option的绑定
		this.option 		= option;
		this.option.data 	= option.data || {};
		this.$modalWrap 	= $('.modal-wrap');
		this.loadModal();
		this.bindEvent();
	},
	bindEvent : function() {
		var _this = this;
		//省份和城市的二级联动
		this.$modalWrap.find('#receive-province').change(function(){
			var selectPorvince = $(this).val();
			_this.loadCities(selectPorvince);
		});

		this.$modalWrap.find('.address-btn').click(function(){
			var receiveInfo = _this.getReceiveInfo(),
				isUpdate	= _this.option.isUpdate;
			$('.address-btn').hide();
			//是新增，并且验证通过了
			if(! isUpdate && receiveInfo.status){
				_address.save(receiveInfo.data, function(res){
					_mm.successTip('地址添加成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function'
						&& _this.option.onSuccess(res);
					$('.address-btn').show();
				}, function(errMsg) {
					_mm.errorTip(errMsg);
					$('.address-btn').show();
				});
			}
			//更新地址，并且验证通过
			else if ( isUpdate && receiveInfo.status){
				_address.update(receiveInfo.data, function(res){
					_mm.successTip('地址添加成功');
					_this.hide();
					typeof _this.option.onSuccess === 'function'
						&& _this.option.onSuccess(res);
					$('.address-btn').show();
				}, function(errMsg) {
					_mm.errorTip(errMsg);
					$('.address-btn').show();
				});
			}
			//验证不通过
			else {
				_mm.errorTip(receiveInfo.errMsg || '好像哪里不对了');
				$('.address-btn').show();
			}

		});
		//为保证点击内容区时，不关闭弹窗
		this.$modalWrap.find('.modal-container').click(function(e) {
			e.stopPropagation();
		});
		//点叉叉，点空白区，关闭弹窗
		this.$modalWrap.find('.close').click(function() {
			_this.hide();
		});
	},
	loadModal : function() {
		var addressModalHtml = _mm.renderHtml(templateAddressModal, {
				isUpdate : this.option.isUpdate,
				data : this.option.data
			} );
		this.$modalWrap.html(addressModalHtml);

		//加载省份
		this.loadProvinces();
	},
	loadProvinces : function() {
		var provinces 			= _cities.getProvinces() || [],
			$provinceSelect		= this.$modalWrap.find('#receive-province'),
			isUpdate			= this.option.isUpdate;
		$provinceSelect.html(this.getSelectOption(provinces));
		//如果是更新地址，并且有省份，作省份的回填
		if(isUpdate && this.option.data.receiverProvince){
			$provinceSelect.val(this.option.data.receiverProvince);
			this.loadCities(this.option.data.receiverProvince);
		}
	},
	loadCities : function(provinceName) {
		var cities 		= _cities.getCities(provinceName) || [],
			$citySelect	= this.$modalWrap.find('#receive-city'),
			isUpdate			= this.option.isUpdate;
		$citySelect.html(this.getSelectOption(cities));
		//如果是更新地址，并且有城市，作城市的回填
		if(isUpdate && this.option.data.receiverCity){
			$citySelect.val(this.option.data.receiverCity);
		}
	},
	getReceiveInfo : function() {
		var receiverInfo = {},
			result		= {
				status : false
			};
		receiverInfo.receiverName 	= $.trim(this.$modalWrap.find('#receive-name').val());
		receiverInfo.receiverProvince = this.$modalWrap.find('#receive-province').val();
		receiverInfo.receiverCity 	= this.$modalWrap.find('#receive-city').val();
		receiverInfo.receiverPhone 	= $.trim(this.$modalWrap.find('#receive-phone').val());
		receiverInfo.receiverAddress 	= $.trim(this.$modalWrap.find('#receive-address').val());
		receiverInfo.receiverZip 		= $.trim(this.$modalWrap.find('#receive-zip').val());
		if(this.option.isUpdate){
			receiverInfo.id = this.$modalWrap.find('#receive-id').val();
		}
		if(! receiverInfo.receiverName) {
			result.errMsg = '请输入收件人姓名';
		}else if(! receiverInfo.receiverProvince) {
			result.errMsg = '请选择收件人省份';
		}else if(! receiverInfo.receiverCity) {
			result.errMsg = '请选择收件人城市';
		}else if(! receiverInfo.receiverPhone) {
			result.errMsg = '请输入收件人电话';
		}else if(! receiverInfo.receiverAddress) {
			result.errMsg = '请输入收件人详细地址';
		}else {
			result.status = true;
			result.data = receiverInfo;
		}
		return result;
	},
	getSelectOption : function(optionArray) {
		var html = '<option value="">请选择</option>';
		for(var i = 0, length = optionArray.length; i < length; i++) {
			html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
		}
		return html;
	},
	hide : function() {
		this.$modalWrap.empty();
	}
	
}

module.exports = addressModal;
