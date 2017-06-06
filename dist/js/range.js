/*
*range
*日期：2017-3-24
*config参数说明
*---------
*min:最大值 
*max:最小值 
*step:步长
*defaltValue:默认值 
*disable:是否可滑动
*starFn:callback
*moveFn:callback
*endFn:callback
*/
;(function(){
    $.fn.extend({
        range:function(options){
            var defaults = {
                min             : 0,
                max             : 100,
                step            : 1,
                defaultValue    : 50,
                disable         :true,
                startFn         : function(){},
                moveFn          : function(){},
                endFn           : function(){}

            },
            options             = $.extend({},defaults,options),
            $document           = $(document),
            $body               = $('body');
            return this.each(function(){
                /*定义对象*/
                var _this       = this,
                    $this       = $(this),
                    $track      = $('<div class="ui-range-track"></div>'),
                    $hander     = $('<div class="ui-range-hander"></div>');
                /*定义变量*/
                var _api        = {},
                    _value      = options.defaultValue,
                    _offset     = $this.offset().left,
                    _width      = $this.width(),
                    _length     = _width / (options.max - options.min ),
                    _position   = $this.offset().left,
                    isMouseDown = false;
                /*添加节点*/
                $this.append($track);
                $this.append($hander);
                /*共有方法*/
                _api.setValue   = function(value){
                    _value      = value || _value;
                    _value      = Math.min(_value,options.max);
                    _value      = Math.max(_value,options.min);
                    $track.css('width',(_value-options.min)*_length);
                    $hander.css('left',(_value-options.min)*_length);
                };
                _api.setValue();
                options.startFn(_value);
                /*判断是否可移动*/
                if(!options.disable){
                     $track.css('background','#ccc');
                    return false;
                }
                /*添加移动端事件*/
                $hander.on('touchstart',function(e){
                    isMouseDown = true;
                });
                $document.on('touchmove',function(e){
                    if(isMouseDown){
                        e.stopPropagation();
                        e.preventDefault();
                        var move = e.originalEvent.changedTouches[0].pageX - _offset;
                        move = Math.max(0,move);
                        move = Math.min(move,_width);
                        $track.css('width',move);
                        $hander.css('left',move);
                        _value = Math.round(move/(_length*options.step))*options.step+options.min;
                        options.moveFn(_value);
                    }
                });
                $document.on('touchend',function(e){
                    if(isMouseDown){
                        isMouseDown = false;
                        options.endFn(_value);
                    }
                });
            });
        }
    });
})(window.jQuery || $);