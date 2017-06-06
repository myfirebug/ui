/*
*tab
*日期：2017-3-24
*config参数说明
*---------
*defaultIndex:默认项  
*event:事件  
*activeClass:选中class  
*is_slide:是否可滑动  
*/
;(function($){
	$.fn.extend({
		tab:function(options){
			var config 		= {
				defaultIndex : 0,
				event:'click',
				activeClass : 'active',
				is_slide : false
			};
			var options 	= $.extend(true, config, options),
				window_h	=$(window).outerWidth();
			//选项卡this指通过当前选择器获取的jQuery对象
			var tab 		= $(this).find('.ui-tab-nav-item'),
				tabContent 	= $(this).find('.ui-tab-content');
			/*判断是否有默认选项值*/
			if(	config.defaultIndex	){
				tab.removeClass(config.activeClass).eq(config.defaultIndex).addClass(config.activeClass)
				tabContent.children('div').eq(config.defaultIndex).show().siblings().hide();
			}
			/*判断是否可滑动*/
			if( options.is_slide ){
				tabContent.addClass('swiper-wrapper').children('div').show();
			}
			/*操作*/
			tab.on(options.event,function(){
				var index = $(this).index();
				$(this).addClass( options.activeClass ).siblings().removeClass( options.activeClass );
				if( options.is_slide ){
					tabContent.css({
						'transform':'translate3D(' + (-window_h * index) + 'px,0,0)',
						'-webkit-transform':'translate3D(' + (-window_h * index) + 'px,0,0)'
					});
				}else{
					tabContent.children('div').eq(index).show().siblings().hide();
				}
			});
			//return this 使jquery方法可链式操作
			return this;
		}
	});
})(window.jQuery || $);