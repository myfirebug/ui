/*
*cityPicker插件
*日期：2017-3-24
*config参数说明
*---------
*container：必填项操作的DOM
*url:地址数据来源
*eventName:事件类型
*value:返回的数据
*coordinates[]返回的数据坐标
*/
;(function($){
	function CityPicker(container , config){
		if(!container && !(typeof container == 'string')){
			alert('参数不对！');
			return false;
		};
		this.container 			= container;
		this.config = {
			eventName:'click',
			url:'../js/address.min.js',
			value:[],
			selectedClass:'',
			coordinates:[0,0,0]
		};
		//默认参数扩展
		if(config && $.isPlainObject(config)){
			$.extend(this.config , config);
		};

		var containerVal 		=  $(this.container).attr('value'),
			_this  				= this;
		if(containerVal){
			this.config.coordinates 	= containerVal.split(',');
		}

		if(typeof(_this.config.url)=="string"){
			$.getJSON(_this.config.url,function(json){
				_this.data=json.data;
			});
		};

		$(container).on(this.config.eventName,function(e){
			e.stopPropagation();
			e.preventDefault();
			_this.lock();
			_this.init();
		});
	};
	CityPicker.prototype = {
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
				$(_this.container).text(_this.formatValue(_this.config.value));
				$(_this.container).attr('data-coordinates',_this.config.coordinates);
				if(_this.config.selectedClass){
					$(_this.container).addClass(_this.config.selectedClass);
				}
				_this.hide();
			});
		},
		created: function(){
			var _this 		= this,
				$body 		= $('body'),
				itemArr 	= [],
				parent 		= '',
				config 		= _this.config;
			for(var i=0; i < 3; i++){
				parent += '<div class="ui-picker-slot"id="picker-'+ i +'"><ul class="ui-picker-list"></ul></div>';
			};
			_this.pickerbody.append(parent);
			$body.append(_this.pickerWrap);
			_this.itemTemplate(_this.data,0);
			_this.itemTemplate(_this.data[config.coordinates[0]].sub,1);
			_this.itemTemplate(_this.data[config.coordinates[0]].sub[config.coordinates[1]].sub,2);
			for(var i = 0; i< 3; i++){
				(function(i){
					itemArr[i] = new Swiper('#picker-'+i,{
						wrapper : '.ui-picker-list',
						slide: '.ui-picker-item',
						direction:'vertical',
						endFn:function(num){
							config.value[i] = $('#picker-'+i).find('.swiper-slide-active').text();
							switch (i) {
								case 0:
									/*判断市*/
									config.value.splice(1,2);
									_this.config.coordinates[0] = num;
									_this.config.coordinates[1] = 0;
									_this.config.coordinates[2] = 0;
									itemArr[1].len = _this.itemTemplate(_this.data[_this.config.coordinates[0]].sub,1);
									itemArr[1].num = 0;
									itemArr[1].slide = $('#picker-1').find('li');
									itemArr[1]._initialSlide(0);
									/*判断区*/
									if(typeof _this.data[num].sub[0].sub !== 'undefined'){
										itemArr[2].len = _this.itemTemplate(_this.data[num].sub[0].sub,2);
										itemArr[2].num = 0;
										itemArr[2].slide = $('#picker-2').find('li');
										itemArr[2]._initialSlide(0);
									}else{
										$('#picker-2 ul').html('');
									}
									break;
								case 1:
									/*判断区*/
									_this.config.coordinates[1] = num;
									_this.config.coordinates[2] = 0;
									itemArr[2].len = _this.itemTemplate(_this.data[_this.config.coordinates[0]].sub[_this.config.coordinates[1]].sub,2);
									itemArr[2].num = 0;
									itemArr[2].slide = $('#picker-2').find('li');
									itemArr[2]._initialSlide(0);
									itemArr[1]._current(num);
									break;
								case 2:
									itemArr[2].step = itemArr[0].step;
									_this.config.coordinates[2] = num;
									itemArr[2]._initialSlide(num);
									itemArr[2]._current(num);
									break;
							}
						}
					});
					itemArr[i]._initialSlide(config.coordinates[i]);
				})(i);
			};
		},
		itemTemplate: function(data,index){
			var html 		= '',
				_this 		= this,
				config 		= _this.config;
			if(!data){return false};
			config.value[index] = data[0].name;
			$.each(data,function(i,city){
				html+="<li class='ui-picker-item' data-index="+ i +">"+city.name+"</li>";
			});
			$("#picker-" + index + " ul").html(html);
			return data.length;
		},
		formatValue: function(arr){
			return arr.join('-');
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
	window.CityPicker = CityPicker;
})(window.jQuery || $);