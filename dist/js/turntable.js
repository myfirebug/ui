/*
*Turntable
*config参数说明
*---------
*container：必填项操作的DOM
*turntable:转动盘子
*pointer:转动指针
*rotateAngle:角度
*num:抽奖机会值
*flag：转盘转动过程中不可再次触发
*resultIndex：最终要旋转到哪一块，对应this.config.data的下标
*data:转盘样式，a：旋转角度，p：概率（1代表100%），t：需要显示的其它信息（文案or分享）
*type:转动类型 0：指针  1:盘子
*during:转动时长
*/
;(function(){
	function Turntable(container,config){
		if(!container && !(typeof container == 'string')){
			alert('参数不对！');
			return false;
		};
		this.container = container;
		this.config = {
			turntable: $(this.container).find('#turntable'),
			pointer: $(this.container).find('#pointer'),
			rotateAngle:0,
			num: 5,
			flag:true,
			resultIndex: 1,
			data:[{a:0,p:0.1,t:'30元话费'},{a:45,p:0.1,t:'500M省内流量'},{a:90,p:0.1,t:'100M省内流量'},{a:135,p:0.3,t:'300M省内流量'},{a:180,p:0.1,t:'30元话费'},{a:225,p:0.1,t:'500M省内流量'},{a:270,p:0.1,t:'100M省内流量'},{a:315,p:0.1,t:'300M省内流量'}],
			type:0,
			during:3,
			callback:function(num,msg){}

		};
		//默认参数扩展
		if(config && $.isPlainObject(config)){
			$.extend(this.config , config);
		};
		this.init();
	};
	Turntable.prototype = {
		init: function(){
			this.event();
		},
		setStyle:function(ele,rotate,during){
			$(ele).css({
				'transform': 'rotate('+rotate+'deg)',
				'-ms-transform': 'rotate('+rotate+'deg)',
				'-webkit-transform': 'rotate('+rotate+'deg)',
				'-moz-transform': 'rotate('+rotate+'deg)',
				'-o-transform': 'rotate('+rotate+'deg)',
				'transition': 'transform ease-out '+during+'s',
				'-moz-transition': '-moz-transform ease-out '+during+'s',
				'-webkit-transition': '-webkit-transform ease-out '+during+'s',
				'-o-transition': '-o-transform ease-out '+during+'s'
			});
		},
		event:function(){
			var _this 	= this;
			   pointer  = _this.config.pointer;

			 $(pointer).on('click',function(){
			 	if(parseInt(_this.config.num)<= 0){
			 		$(_this.config.pointer).addClass('point-disable');
					return false;
				}
				if(_this.config.flag){
			 	 	_this.result();
				}
			 });

		},
		result: function(){
			/*
			*randNum：用来判断的随机数，1-100
			*resultIndex：最终要旋转到哪一块，对应this.config.data的下标
			*startPos:判断的角度值起始位置
			*endPos:判断的角度值结束位置
			*randCircle：// 附加多转几圈，2-3
			*/
			var _this 			= this,
				data 			= _this.config.data,
				rotateAngle 	= _this.config.rotateAngle,
				randNum 		= Math.ceil(Math.random() * 100),
				resultIndex    	= _this.config.resultIndex,
				startPos 		= 0,
				endPos 			= 0,
				randCircle		= Math.ceil(Math.random() * 2) + 1,
				type 			= _this.config.type,
				turntable 		= _this.config.turntable,
				pointer 		= _this.config.pointer,
				during 			= _this.config.during;

			// 旋转结束前，不允许再次触发
			_this.config.flag 	= false;
			for(var i in data){
				startPos = endPos + 1; // 区块的起始值
				endPos = endPos + 100 * data[i].p; // 区块的结束值
				if(randNum >= startPos && randNum <= endPos){ // 如果随机数落在当前区块，那么获取到最终要旋转到哪一块
					resultIndex = i;
					break;
				}
			};
			switch (type) {
				case 0:
					_this.config.rotateAngle = rotateAngle + randCircle * 360 + data[resultIndex].a - rotateAngle % 360;
					this.setStyle(pointer,_this.config.rotateAngle,during);
					break;
				case 1:
					_this.config.rotateAngle =  rotateAngle - randCircle * 360 - data[resultIndex].a - rotateAngle % 360;
					this.setStyle(turntable,_this.config.rotateAngle,during);
					break;
			};
			// 旋转结束后，允许再次触发
			setTimeout(function(){
				_this.config.flag = true;
				_this.config.num--;
				// 告诉结果
				if(data[resultIndex].t)
				{
					_this.config.callback(_this.config.num,data[resultIndex].t);
				}
				if(parseInt(_this.config.num)<= 0){
					$(_this.config.pointer).addClass('point-disable');
					alert('您已经没有抽奖机会了');
		            return false;
	            }
			},during*1000);
		}
	};
	window.Turntable = Turntable;
})(window.jQuery || $);