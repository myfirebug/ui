/*
*Actions
*日期：2017-3-24
*config参数说明
*---------
*title:标题
*mask:是否有遮罩
*actions:列表
*/

;(function($){
	function Actions(config){
		this.config = {
			title:'选择操作',
			mask:true,
			actions:null
		};
		//默认参数扩展
		if(config && $.isPlainObject(config)){
			$.extend(this.config , config);
		};

		this.init();
	};

	Actions.prototype.init = function(){
		var _this = this;
		_this.body = $('body');
		/*创建actions窗口*/
		_this.actionsWrap = $('<div class="ui-action"></div>');
		//创建遮罩层
		_this.mask=$('<div class="ui-action-mask"></div>');
		//创建actions wapper
		_this.actionssheet=$('<div class="ui-action-sheet"></div>');
		//创建actions header
		_this.actionssheetHd=$('<div class="ui-action-sheet-hd ui-border-b"></div>');
		//创建actions body
		_this.actionssheetBd=$('<div class="ui-action-sheet-bd"></div>');
		//创建actions footer
		_this.actionssheetFt=$('<div class="ui-action-sheet-ft"><a href="javascript:;" class="ui-action-sheet-cancel ui-border-t">取消</a></div>');

		/*渲染dom*/
		_this._creact();
		_this.close();
		_this.show();

	}
	Actions.prototype._creact = function(){
		var _this = this,
			config=this.config,
			actionsWrap=this.actionsWrap,
			mask=this.mask,
			actionssheet=this.actionssheet,
			actionssheetHd=this.actionssheetHd,
			actionssheetBd=this.actionssheetBd,
			actionssheetFt=this.actionssheetFt,
			body=this.body;
		/*判断标题是否存在 */
		if(config.title){
			actionssheet.append(actionssheetHd.html(config.title));
		}
		/*判断actions*/
		if(config.actions){
			_this._creactActions(config.actions , actionssheetBd);
			actionssheet.append(actionssheetBd);
		}
		//遮罩层
		if(config.mask){
			actionsWrap.append(mask);
			mask.click(function(){
				_this.hide();
			});
		}

		actionssheet.append(actionssheetFt);

		actionsWrap.append(actionssheet);
		body.append(actionsWrap);
	};
	Actions.prototype._creactActions = function(actions,body){
		var _this = this;
		$(actions).each(function(index){
			var text = this.text ? this.text : '列表' + index++,
				callBack = this.callBack ? this.callBack : '',
				action = $('<a href="javascript:;" class="ui-action-sheet-item ui-border-b">' + text + '</a>');
			if(callBack){
				action.on('click',function(){
					callBack();
				});
			}else{
				action.click(function(){
					_this.hide();
				});
			}
			body.append(action);
		});
	};
	Actions.prototype.close = function(){
		var _this = this,
			actionssheetFt = _this.actionssheetFt;
		actionssheetFt.on('click',function(){
			_this.hide();
		});
	},
	Actions.prototype.hide = function(){
		var _this=this;
		_this.actionsWrap.removeClass('show').addClass('hide');
		window.setTimeout(function(){
			_this.actionsWrap.remove();
		},450)
	};
	Actions.prototype.show = function(){
		var _this=this;
		window.setTimeout(function(){
			_this.actionsWrap.removeClass('hide').addClass('show');
		},50)
	};

	window.Actions=Actions;
	$.action=function(config){
		return new Actions(config);
	}

})(window.jQuery || $);