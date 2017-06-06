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
			type:'click',
			value: [today.getFullYear(), formatNumber(today.getMonth()+1), formatNumber(today.getDate())],
			callBack:function(){}
		};
		//默认参数扩展
		if(config && $.isPlainObject(config)){
			$.extend(this.config , config);
		};
		var containerVal 		=  $(this.container).attr('value'),
			_this  				= this;
		if(containerVal){
			this.config.value = containerVal.split(',');
		}
		$(container).on(this.config.type,function(e){
			e.stopPropagation();
			e.preventDefault();
			_this.lock();
			_this.init();
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
				$(_this.container).attr('value',_this.config.value.join(','));
				$(_this.container).text(_this.formatValue(_this.config.value));
				if(_this.config.callBack){
					_this.config.callBack(_this.formatValue(_this.config.value));
				}
				_this.hide();
			});
		},
		created: function(){
			var _this = this,
				parent = '',
				$body = $('body'),
				dateArr = [],
				arr = _this.config.value;
			for(var i=0; i < arr.length; i++){
				parent += '<div class="ui-picker-slot"id="date-'+ i +'"><ul class="ui-picker-list">'+ _this.itemTemplate(i) +'</ul></div>';
			};
			_this.pickerbody.append(parent);
			$body.append(this.pickerWrap);
			for(var i=0; i<arr.length;i++){
				(function(i){
					dateArr[i] = new Swiper('#date-'+i,{
						wrapper : '.ui-picker-list',
						slide: '.ui-picker-item',
						direction:'vertical',
						initialSlide:1,
						endFn:function(num){
							_this.config.value[i] = $('#date-'+i).find('.swiper-slide-active').text();
							if(i == 2){
								var len = getDaysByMonthAndYear(arr[1],arr[0]).length;
								dateArr[2].len = len;
								if(arr[2] && arr[2] > len-1 ){
									dateArr[2]._initialSlide(len-1);
								}
								$('#date-2 li').show();
								$('#date-2 li:gt('+ (len-1) +')').hide();
							}
						}
					});
					if(i == 0){
						dateArr[i]._initialSlide(_this.config.value[i] - cols[0].value[0]);
					}else if(i == 1){
						dateArr[i]._initialSlide(_this.config.value[i] -1);
					}else if(i == 2){
						dateArr[i]._initialSlide(_this.config.value[i] -1);
					}else{
						dateArr[i]._initialSlide(_this.config.value[i]);
					}
					
				})(i);
			};
		},
		itemTemplate: function(num){
			var html = '',
				arr = cols[num].value;
			for(var i = 0; i<arr.length;i++){
				html+= '<li class="ui-picker-item" index="' + i + '" value="' + arr[i] + '">'+arr[i]+'</li>';
			};
			return html;
		},
		formatValue: function (arr){
			if(arr.length === 3){
				return arr[0] + '-' + arr[1] + '-' + arr[2];
			}else{
        		return arr[0] + '-' + arr[1] + '-' + arr[2] + ' ' + arr[3] + ':' + arr[4];
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