/*
*Tip
*日期：2017-3-24
*config参数说明
*---------
*text:内容  
*delay:延迟时间  
*/
;(function($){
	function Tip(config){
		this.config = {
			text:'出错了',
			delay : 3000
		};
		//默认参数扩展
		if(config && $.isPlainObject(config)){
			$.extend(this.config , config);
		};
		this.wrap = $('<div class="ui-tips"></div>');
		this.init();
	};
	Tip.prototype.init = function(){
		var _this = this;
		$('body').append(_this.wrap.html(_this.config.text));
		_this.show();
		
	};
	Tip.prototype.show = function(){
		var _this=this;
		setTimeout(function(){
			_this.wrap.css({
				'-webkit-transform':'translateY(0)',
				'transform':'translateY(0)'
			});
		},100);
		_this.hide();
	};
	Tip.prototype.hide = function(){
		var _this=this;
		setTimeout(function(){
			_this.wrap.css({
				'-webkit-transform':'translateY(-100%)',
				'transform':'translateY(-100%)'
			});
		},_this.config.delay);
		setTimeout(function(){
			_this.wrap.remove();
		},_this.config.delay + 250);
	};
	window.Tip=Tip;
	$.tip=function(config){
		return new Tip(config);
	}
})(window.jQuery || $);