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


