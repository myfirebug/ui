<h1>UI组件</h1>
<hr>
<h2>简介</h2>
<p>移动端基于jquery,zepto的UI组件库，目前实现JS Components:Toast、Action、Tips、Dialog、Swiper、CityPicker、DatetimePicker、Tab、Range,Css Component:oneborder,Loading,button,From Component:switch,Radio,Checkbox,Plug Components:Turntable,Lottery</p>
<h2>演示</h2>
<p><a href="https://myfirebug.github.io/ui/dist/html/index.html">https://myfirebug.github.io/ui/dist/html/index.html</a></p>
<h2>使用</h2>
<h3>Toast用法</h3>
<pre>
<code>
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
Tips({
  test: '提示',
  delay: 5000
});
</code>
</pre>
<h3>Dialog用法</h3>
<pre>
<code>
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
Dialog('#swiper-container',{
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
CityPicker('#js-datetitmepicker',{
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
---------*
DatetimePicker('#js-datetitmepicker',{
	type:'date',
	eventName:'click',
	cols: cols,
	selectedClass:'',
	connector:'-',
	callBack:function(){}
});
</code>
</pre>


