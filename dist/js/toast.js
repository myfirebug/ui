/*
*Toast
*日期：2017-3-24
*config参数说明
*---------
*text:内容  
*icon:icon样式 
*delay:延迟时间 
*/
;(function($){
	function Toast(config){
		this.config = {
			text:'我是toast提示',
			icon:'',
			delay : 3000
		};
		//默认参数扩展
		if(config && $.isPlainObject(config)){
			$.extend(this.config , config);
		};
		this.init();
	};
	Toast.prototype.init = function(){
		var _this = this;
		_this.body 		= $('body');
		_this.toastWrap = $('<div class="ui-toast">');
		_this.toastIcon = $('<i class="icon"></i>');
		_this.toastText = $('<span class="ui-toast-text">' + _this.config.text + '</span>');

		_this._creatDom();
		_this.show();
		_this.hide();
	};
	Toast.prototype._creatDom = function(){
		var _this = this;
		if(_this.config.icon){
			_this.toastWrap.append(_this.toastIcon.addClass(_this.config.icon));
		}
		_this.toastWrap.append(_this.toastText);
		_this.body.append(_this.toastWrap);
	};
	Toast.prototype.show = function(){
		var _this = this;
		setTimeout(function(){
			_this.toastWrap.removeClass('hide').addClass('show');
		},50);
	};
	Toast.prototype.hide = function(){
		var _this = this;
		setTimeout(function(){
			_this.toastWrap.removeClass('show').addClass('hide');
		},_this.config.delay);
		setTimeout(function(){
			_this.toastWrap.remove();
		},_this.config.delay + 250 );
	};

	window.Toast=Toast;
	$.toast=function(config){
		return new Toast(config);
	}
})(window.jQuery || $);