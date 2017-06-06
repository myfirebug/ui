/*
*Dialog
*日期：2017-3-24
*config参数说明
*---------
*title:标题
*message:内容
*buttons:按钮列表
*/
;(function($){
	function Dialog(config){
		this.config = {
			title: '',
			message:'出错了',
			buttons: null
		};
		//默认参数扩展
		if(config && $.isPlainObject(config)){
			$.extend(this.config , config);
		};
		this.init();
	}		
	Dialog.prototype.init = function(){
		this.body=$('body');
		//创建弹出窗口
		this.dialogWrap=$('<div class="ui-dialog-wrap"></div>');
		//创建遮罩层
		this.mask=$('<div class="mask"></div>');
		//创建弹出窗口dialog
		this.dialog=$('<div class="ui-dialog"></div>');
		//创建弹出窗口body
		this.dialogHd=$('<div class="ui-dialog-hd"></div>');
		//创建弹出窗口body
		this.dialogBd=$('<div class="ui-dialog-bd"></div>');
		//创建弹出窗口footer
		this.dialogFt=$('<div class="ui-dialog-ft ui-border-t"></div>');
		//渲染DOM
		this.creact();
		this.show();
		this.event();
	};
	Dialog.prototype.event = function(){
		var _this = this,
			mask = this.mask;
		mask.on('click',function(){
			_this.hide();
		});
	};
 	Dialog.prototype.creact = function(){
		var _this = this,
			body = $('body'),
			config = this.config,
			dialogWrap = this.dialogWrap,
			mask = this.mask,
			dialog = this.dialog,
			dialogHd = this.dialogHd,
			dialogBd = this.dialogBd,
			dialogFt = this.dialogFt;
		dialogWrap.append(mask);
		//如果传了标题
		if(config.title){
			dialog.append(dialogHd.html(config.title));
		};
		//如果传了信息文本
		if(config.message){
			dialog.append(dialogBd.html(config.message));
		};
		if(config.buttons){
			_this.creactButton(config.buttons,dialogFt);
			dialog.append(dialogFt);
		}
		dialogWrap.append(dialog);
		body.append(dialogWrap);
	};
	Dialog.prototype.creactButton = function(buttons,footer){
		var _this = this;
		$(buttons).each(function(){
			var text=this.text ? this.text : '按钮' + index++,
				callback=this.callback ? this.callback : null;
				button=$('<a class="btn-item">' + text + '</a>');
			if(callback){
				button.click(function(){
					var isClose=callback();
					if(isClose !== false){
						_this.hide();
					}
				});
			}else{
				button.click(function(){
					_this.hide();
				});
			}
			footer.append(button);
		});
	};
	Dialog.prototype.hide = function(){
		var _this = this;
		_this.dialogWrap.removeClass('show').addClass('hide');
		setTimeout(function(){
			_this.dialogWrap.remove();
		},250);
	};
	Dialog.prototype.show = function(){
		var _this = this;
		setTimeout(function(){
			_this.dialogWrap.removeClass('hide').addClass('show');
		},100);
	};
	window.Dialog=Dialog;
	$.dialog=function(config){
		return new Dialog(config);
	}
})(window.jQuery || $);