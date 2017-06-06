<h1>UI组件</h1>
<hr>
<h2>简介</h2>
<p>移动端基于jquery,zepto的UI组件库，目前实现</p>
<p>JS Components：Toast、Action、Tips、Dialog、Swiper、CityPicker、DatetimePicker、Tab、Range</p>
<p>Css Component：oneborder、Loading、button</p>
<p>From Component：switch、Radio、Checkbox</p>
<p>Plug Components：Turntable、Lottery</p>
<h2>演示</h2>
<p><a href="https://myfirebug.github.io/ui/dist/html/index.html">https://myfirebug.github.io/ui/dist/html/index.html</a></p>
<h2>使用</h2>
<h3>Toast用法</h3>
<pre>
<code>
/*config参数说明
*---------
*text:内容  
*icon:icon样式 
*delay:延迟时间 
---------*/
Toast({
  message: '提示',
  icon:'fails',
  duration: 5000
});
</code>
</pre>
<h3>Action用法</h3>
<pre>
<code>
<span style="color:#999">/*config参数说明</span>
<span style="color:#999">*---------</span>
<span style="color:#999">*title:标题</span>
<span style="color:#999">*mask:是否有遮罩</span>
<span style="color:#999">*actions:列表</span>
<span style="color:#999">---------*/</span>
Actions({
  title: '选择操作',
  mask:true,
  actions:[
		{
			text:'列表1',
			callBack:function(){
				alert('我是列表1');
			}
		},
		{
			text:'列表2',
			callBack:function(){
				alert('我是列表2');
			}
		},
		{
			text:'列表3',
			callBack:function(){
				alert('我是列表3');
			}
		}
	]

});
</code>
</pre>
<h3>Tips用法</h3>
<pre>
<code>
/*config参数说明
*---------
*text:内容  
*delay:延迟时间  
---------*/
Tips({
  test: '提示',
  delay: 5000
});
</code>
</pre>
<h3>Dialog用法</h3>
<pre>
<code>
/*config参数说明
*---------
*title:标题
*message:内容
*buttons:按钮列表
---------*/
Dialog({
  title: '提示',
  message: '出错了',
  buttons: [
		{
			text :'我已经了解了',
			callback: function(){
				alert(122);
			}
		}
	]
});
</code>
</pre>
<h3>Swiper用法</h3>
<pre>
<code>
/*config参数说明
*---------
*container：必填项操作的DOM
*wrapper：操作父dom
*slide：滚动列表
*initialSlide:从第几项开始
*direction：滚动方向(horizontal(横向),vertical(纵向))
*autoplay: 自由滚动
*pagination：索引
*startFn：开始函数
*endFn: 滚动结束函数
---------*/
new Swiper('#swiper-container',{
	wrapper: '.swiper-wrapper',
	slide: '.swiper-slide',
	initialSlide:5,
	direction: 'horizontal',
	autoplay: 5000,
	pagination: '.swiper-pagination',
	startFn: function(){},
	endFn: function(){}
});
</code>
</pre>
<h3>CityPicker用法</h3>
<pre>
<code>
/*config参数说明
*---------
*container：必填项操作的DOM
*url:地址数据来源
*eventName:事件类型
*value:返回的数据
*coordinates[]返回的数据坐标
---------*/
new CityPicker('#js-datetitmepicker',{
	eventName:'click',
	url:'../js/address.min.js',
	value:[],
	selectedClass:'.c-gray',
	coordinates:[0,0,0]
});
</code>
</pre>
<h3>DatetimePicker用法</h3>
<pre>
<code>
/*config参数说明
*---------
*container：必填项操作的DOM
*type:类型（date：日期，datetime:时间，custom:自定义数据）
*eventName:事件类型
*cols:数据
*selectedClass 有值时按钮的样式
*value:返回的数据
*connector:连接符号
*callback:返回的函数
---------*/
new DatetimePicker('#js-datetitmepicker',{
	type:'date',
	eventName:'click',
	cols: cols,
	selectedClass:'',
	connector:'-',
	callBack:function(){}
});
</code>
</pre>

<h3>Tab用法</h3>
<pre>
<code>
/*config参数说明
*---------
*defaultIndex:默认项  
*event:事件  
*activeClass:选中class  
*is_slide:是否可滑动  
---------*/
$('#js-tab1').tab({
	defaultIndex : 0,
	activeClass : 'ui-tab-red',
	is_slide : true
});
</code>
</pre>

<h3>Range用法</h3>
<pre>
<code>
/*config参数说明
*---------
*min:最大值 
*max:最小值 
*step:步长
*defaltValue:默认值 
*disable:是否可滑动
*starFn:callback
*moveFn:callback
*endFn:callback 
---------*/
$('#slider1').range({
	min: 0,
	max: 36,
	step: 1,
	defaultValue: 12,
	startFn:function(value){$('.text1').text(value + '月');},
	moveFn: function(value){$('.text1').text(value + '月');},
	endFn: function(value){}
})
</code>
</pre>


