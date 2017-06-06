/*
*datetime,date,custom
*日期：2017-3-24
*config参数说明
*---------
*container：必填项操作的DOM
*type:类型（date：日期，datetime:时间，custom:自定义数据）
*eventName:事件类型
*cols:数据
*selectedClass 有值时按钮的样式
*value:返回的数据
*connector:连接符号
*callback:返回的函数
*/
;(function($){
	var today  			= new Date(),
		initMonthes 	= ('01 02 03 04 05 06 07 08 09 10 11 12').split(' ');

	/*年*/
	function initYears(max,min) {
        var arr = [];
        for (var i = (min || 1950); i <= (max || 2030); i++) { arr.push(i); }
        return arr;
	};
	/*天*/
	function getDays(max){
		var days = [];
		for(var i=1;i <= (max || 31);i++){
			days.push(i<10 ? "0"+i : i );
		};
		return days;
	};
	function getDaysByMonthAndYear(month,year){
		var int_d = new Date(year, parseInt(month)+1-1, 1);
	    var d = new Date(int_d - 1);
		return getDays(d.getDate());
	};
	/*格式化数字*/
	function formatNumber(n){
		return n < 10 ? "0" + n : n;
	};
	/*判断数组值得到相应的下标*/
	function isHasElementOne(arr,value){
		for(var i = 0,vlen = arr.length; i < vlen; i++){
			if(arr[i] == value){
				return i;
			}
		}
		return -1;
	};
	var cols 			= [
		{
			value: initYears()
		},
		{
			value: initMonthes
		},
		{
			value: getDays()
		},
		{
			value: (function () {
				var arr = [];
				for (var i = 0; i <= 23; i++) { arr.push(i < 10 ? '0' + i : i); }
				return arr;
			})()
		},
		{
			value: (function () {
				var arr = [];
				for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
				return arr;
			})()
		}
	];

	function DatetimePicker(container , config){
		if(!container && !(typeof container == 'string')){
			alert('参数不对！');
			return false;
		};
		this.container 			= container;
		this.config = {
			type:'date', //date,datetime,custom
			eventName:'click',
			cols: cols,
			value: [],
			selectedClass:'',
			connector:'-',
			callBack:function(){}
		};
		//默认参数扩展
		if(config && $.isPlainObject(config)){
			$.extend(this.config , config);
		};
		var _config 		= this.config;
		switch (_config.type) {
			case 'datetime':
				_config.value = [today.getFullYear(), formatNumber(today.getMonth()+1), formatNumber(today.getDate()), formatNumber(today.getHours()), formatNumber(today.getMinutes())];
				break;
			case 'custom':
				_config.value = [];
				for(var i = 0; i< _config.cols.length;i++){
					_config.value.push(_config.cols[i].value[0]);
				}
				break;
			default:
				_config.value = [today.getFullYear(), formatNumber(today.getMonth()+1), formatNumber(today.getDate())];
				break;
		}
		console.log(_config.value);
		var _this  				= this,
			containerVal;
		$(container).each(function(){
			$(this).on(_this.config.eventName,function(e){
				e.stopPropagation();
				e.preventDefault();
				_this.element = e.target;
				if($(this).attr('value')){
					containerVal 		=  $(this).attr('value');
				}
				if(containerVal){
					_this.config.value 	= containerVal.split(',');
				}
				_this.lock();
				_this.init();
			});
		});
	};
	DatetimePicker.prototype = {
		init: function(){
			this.pickerWrap 				= $('<div class="ui-picker-wrap hide" style="display:none"></div>');
			this.pickerMask 				= $('<div class="mask"></div>');
			this.picker 					= $('<div class="ui-picker"></div>');
			this.pickerHeader 				= $('<div class="ui-picker-hd ui-border-b"></div>');
			this.cancel 					= $('<span class="ui-picker-cancel">取消</span>');
			this.confirm 					= $('<span class="ui-picker-confirm">确定</span>');
			this.pickerbody 				= $('<div class="ui-picker-bd"></div>');
			this.pickerFooter 				= $('<div class="ui-picker-ft ui-border-tb"></div>');
			this.pickerWrap.append(this.pickerMask);
			this.pickerWrap.append(this.picker);
			this.picker.append(this.pickerHeader);
			this.pickerHeader.append(this.cancel);
			this.pickerHeader.append(this.confirm);
			this.picker.append(this.pickerbody);
			this.picker.append(this.pickerFooter);
			this.created();
			this.show();
			this.event();
		},
		event: function(){
			var _this = this;
			this.cancel.on('touchend',function(){
				_this.hide();
			});
			this.pickerMask.on('touchend',function(){
				_this.hide();
			});
			this.confirm.on('touchend',function(){
				$(_this.element).attr('value',_this.config.value);
				$(_this.element).text(_this.formatValue(_this.config.value));
				if(_this.config.callBack){
					_this.config.callBack(_this.formatValue(_this.config.value));
					if(_this.config.selectedClass){
						$(_this.element).addClass(_this.config.selectedClass);
					}
				}
				_this.hide();
			});
		},
		created: function(){
			var _this 		= this;
			_this._template();
		},
		_template: function(){
			var _this 		= this,
				parent 		= '',
				$body 		= $('body'),
				dateArr 	= [],
				config 		= _this.config,
				arr 		= config.value;
			for(var i=0; i < arr.length; i++){
				parent += '<div class="ui-picker-slot"id="picker-'+ i +'"><ul class="ui-picker-list">'+ _this.itemTemplate(i) +'</ul></div>';
			};
			_this.pickerbody.append(parent);
			$body.append(this.pickerWrap);
			for(var i=0; i<arr.length;i++){
				(function(i){
					dateArr[i] = new Swiper('#picker-'+i,{
						wrapper : '.ui-picker-list',
						slide: '.ui-picker-item',
						direction:'vertical',
						endFn:function(num){
							config.value[i] = $('#picker-'+i).find('.swiper-slide-active').text();
							if(config.type == 'date' || config.type == 'datetime'){
								if(i < 2){
									var len = getDaysByMonthAndYear(arr[1],arr[0]).length;
									dateArr[2].len = len;
									if(arr[2] && arr[2] > len-1 ){
										dateArr[2]._initialSlide(len-1);
									}
									$('#picker-2 li').show();
									$('#picker-2 li:gt('+ (len-1) +')').hide();
								}
							}
						}
					});
					dateArr[i]._initialSlide(isHasElementOne(config.cols[i].value,config.value[i]));
				})(i);
			};
		},
		itemTemplate: function(num){
			var html 		= '',
				_this 		= this;
				arr 		= _this.config.cols[num].value;
			for(var i = 0; i<arr.length;i++){
				html+= '<li class="ui-picker-item" index="' + i + '" value="' + arr[i] + '">'+arr[i]+'</li>';
			};
			return html;
		},
		formatValue: function (arr){
			var _this 		= this,
				connector   = _this.config.connector,
				type  		= _this.config.type;
			switch ( type ) {
				case 'date':
					return arr.join(connector);
					break;
				case 'datetime':
					return arr[0] + connector + arr[1] + connector + arr[2] + ' ' + arr[3] + ':' + arr[4];
					break;
				case 'custom':
					return arr.join(connector);
					break;
			}
        },
        lock:function(){
        	$("body").on("touchmove",function(event){
				event.preventDefault;
			}, false);
        },
        unLock:function(){
        	$("body").off("touchmove");
        },
		show: function(){
			var _this = this;
			$('.ui-picker-wrap').show();
			setTimeout(function(){
				$('.ui-picker-wrap').removeClass('hide').addClass('show');
			},100);
		},
		hide: function(){
			var _this = this;
			$('.ui-picker-wrap').removeClass('show').addClass('hide');
			setTimeout(function(){
				_this.unLock();
				$('.ui-picker-wrap').remove();
			},250);
		}
	}


	window.DatetimePicker = DatetimePicker;
	$.datetimePicker = function(config){
		return new DatetimePicker(config);
	}
})(window.jQuery || $);