/*
*miniJquery
*日期：2017-3-24
*/

/*基本模块*/
;(function(){
	var mod = {};
	mod.getByClass = function(className, parentObj){
	    var parentObj = parentObj || document;
	    if (document.getElementsByClassName) {
	        return parentObj.getElementsByClassName(className);
	    } else {
	        var tag = parentObj.getElementsByTagName("*");
	        //遍历className
	        var nodelist = [];
	        for (var i = 0; i < tag.length; i++) {
	            if (tag[i].className == className) {
	                nodelist.push(tag[i]);
	                console.log(1);
	            }
	        }
	        return nodelist;
	    }
	};
	/*类数组转化成数组*/
	mod.toArray = function(elems){
		var arr = [];
		for(var i = 0 ; i< elems.length; i++){
			arr[i] = elems[i];
		};
		return arr;
	};
	/*事件*/
	mod.addEventListener = function(ele, type, fn) { //事件监听
	    if (ele.addEventListener) { //事件捕获阶段发生
	        ele.addEventListener(type, fn, false);
	    } else if (ele.attachEvent) {
	        ele.attachEvent('on' + type, fn);
	    } else {
	        ele['on' + type] = fn;
	    }
	};
	mod.removeEventListener = function(ele, type, fn) { //事件监听
	    if (ele.removeEventListener) { //事件捕获阶段发生
	        ele.removeEventListener(type, fn, false);
	    } else if (ele.detachEvent) {
	        ele.detachEvent('on' + type, fn);
	    } else {
	        ele['on' + type] = null;
	    }
	};
	/*获取样式*/
	mod.getStyle = function(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	};
	/*判断是否有某样式*/
	mod.hasClass = function(obj,cls){
		return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
	};
	window.mod = mod;
})();
/*vjquery开始*/
function v(o){
	this.elements = [];
	//v:function
	switch(typeof o){
		case 'function':
			this.ready(o);
			break;
		//字符串
		case 'string':
			switch (o.charAt(0)){
				//id
				case '#':
					this.elements.push(document.getElementById(o.substring(1)));
					break;
				case '.':
				//class
					this.elements = mod.getByClass(o.substring(1),document);
					break;
				default:
				//标签
					this.elements = mod.toArray(document.getElementsByTagName(o));
					break;
			};
			break;
		//对象
		case 'object':
			if(o.constructor == Array){
				this.elements = o;
			}else{
				this.elements.push(o);
			}
			break;
	};
};
v.prototype = {
	//ready
	ready: function(fn){
		//对于现代浏览器，对DOMContentLoaded事件的处理采用标准的事件绑定方式
	    if ( document.addEventListener ) {
	        document.addEventListener("DOMContentLoaded", fn, false);
	    } else {
	        IEContentLoaded(fn);
	    }
	    //IE模拟DOMContentLoaded
	    function IEContentLoaded (fn) {
	        var d = window.document;
	        var done = false;
	        //只执行一次用户的回调函数init()
	        var init = function () {
	            if (!done) {
	                done = true;
	                fn();
	            }
	        };
	        (function () {
	            try {
	                // DOM树未创建完之前调用doScroll会抛出错误
	                d.documentElement.doScroll('left');
	            } catch (e) {
	                //延迟再试一次~
	                setTimeout(arguments.callee, 50);
	                return;
	            }
	            // 没有错误就表示DOM树创建完毕，然后立马执行用户回调
	            init();
	        })();
	        //监听document的加载状态
	        d.onreadystatechange = function() {
	            // 如果用户是在domReady之后绑定的函数，就立马执行
	            if (d.readyState == 'complete') {
	                d.onreadystatechange = null;
	                init();
	            }
	        }
	    }
	},
	//css
	css: function(attr,value){
		if(arguments.length == 2){
			for(var i=0,len = this.elements.length; i<len; i++){
				this.elements[i].style[attr] = value;
			}
		}else if(arguments.length == 1){
			if(typeof attr == 'object'){
				for(var j in attr){
					for(var i=0,len = this.elements.length; i<len; i++){
						this.elements[i].style[j] = attr[j];
					}
				};
			}else{
				return mod.getStyle(this.elements[0],attr);
			}
		}
		return this;
	},
	addClass: function(cls){
		for(var i=0,len = this.elements.length; i<len; i++){
			if (!mod.hasClass(this.elements[i], cls)) this.elements[i].className += " " + cls;
		};
		return this;
	},
	removeClass: function(cls){
		for(var i=0,len = this.elements.length; i<len; i++){
			if (mod.hasClass(this.elements[i], cls)) {  
		        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
		        this.elements[i].className = this.elements[i].className.replace(reg, ' ');  
		    }
		};
		return this;
	},
	html: function(str){
		if(str){
			for(var i=0,len = this.elements.length; i<len; i++){
				this.elements[i].innerHTML = str;
			}
		}else{
			return this.elements[0].innerHTML;
		}
		return this;
	},
	on: function(events,fn){
		for(var i=0,len = this.elements.length; i<len; i++){
			mod.addEventListener(this.elements[i],events, fn);
		};
		return this;
	},
	off: function(events,fn){
		for(var i=0,len = this.elements.length; i<len; i++){
			mod.removeEventListener(this.elements[i],events, fn);
		};
		return this;
	},
	click: function(fn){
		var _this =this;
		this.on('click',fn);
		return this;
	},
	mouseover: function(fn){
		this.on('mouseover',fn);
		return this;
	},
	hide: function(){
		for(var i=0,len = this.elements.length; i<len; i++){
			this.elements[i].style.display = "none";
		};
		return this;
	},
	show: function(){
		for(var i=0,len = this.elements.length; i<len; i++){
			this.elements[i].style.display = "block";
		};
		return this;
	},
	hover: function(fnOver,fnOut){
		this.on('mouseover',fnOver);
		this.on('mouseout',fnOut);
		return this;
	},
	attr: function(attr,value){
		if(arguments.length == 2){
			for(var i=0,len = this.elements.length; i<len; i++){
				this.elements[i].setAttribute(attr,value);
			};
		}else if(arguments.length == 1){
			return this.elements[0].getAttribute(attr);
		};
		return this;
	},
	removeAttr: function(attr){
		for(var i=0,len = this.elements.length; i<len; i++){
			this.elements[i].removeAttribute(attr);
		};
		return this;
	},
	eq: function(num){
		return $(this.elements[num]);
	},
	index: function(){
		var elems = this.elements[0].parentNode.children;
		for(var i = 0; i<elems.length;i++){
			if(elems[i] == this.elements[0]){
				return i;
			}
		};
		return this;
	},
	find: function(ele){
		var arr = [];
		if(ele.charAt(0) == '.'){
			for(var i = 0; i<this.elements.length;i++){
				arr = arr.concat(mod.toArray(mod.getByClass(ele.substring(1) , this.elements[i])));
			}
		}else{
			
		};
		return $(arr);
	},
	first: function(){
		return this.eq(0);
	},
	last: function(){
		return this.eq(this.elements.length-1);
	},
	width: function(){
		if(this.elements[0] === window){
			return window.innerWidth;
		}else{
			return this.elements.length > 0 ?this.elements[0].clientWidth : null;
		}
	},
	height: function(){
		if (this.elements[0] === window) {
		    return window.innerHeight;
		} else if (this.elements[0] === document) {
		    var body = document.body,
		        html = document.documentElement;

		    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
		} else {
		    return this.elements.length > 0 ?this.elements[0].clientHeight : null;
		}
	},
	append: function(content){
		if(typeof content == 'object'){
			content = content.join('');
		};
		for(var i=0,len = this.elements.length; i<len; i++){
			this.elements[i].innerHTML += content;
		};
		return this;
	},
	length:function(){
		return this.elements.length;
	},
	siblings: function(ele){
		var arr = [];
		if(ele){

		}else{
			var p = this.elements[0].parentNode.children;
			for(var i = 0,p1 = p.length; i < p1; i++){
				if(p[i] !== this.elements[0] ){
					arr.push(p[i])
				};
			}
		return $(arr);
		}
	},
}

function $(o){
	return new v(o);
};
/*仿jqeury $.extend*/
$.extend = function(json){
	for(var attr in json){
		$[attr] = json[attr];
	}
};
/*仿jqeury $.fn.extend*/
$.fn = {};
$.fn.extend = function(json){
	for(var attr in json){
		v.prototype[attr] = json[attr];
	}
}