(function(doc, win) {
    var docEl = doc.documentElement,
        isIOS = navigator.userAgent.match(/iphone|ipod|ipad|android/gi),
        dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    /*docEl.dataset.dpr = dpr;
    var meta = doc.getElementsByTagName('meta'),
        head = doc.getElementsByTagName('head')[0];
    
    *判断是否有vierport;
    *如果有则删除
    
    function removeViewport(){
       for(var i = 0; i < meta.length; i++){
            if(meta[i].getAttribute('name') === 'viewport' ){
                head.removeChild(meta[i]);
            }
        } 
    };
    removeViewport();
    
    //创建节点
    function createViewport(){
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'initial-scale=' + 1/dpr + ', maximum-scale=' + 1/dpr + ', minimum-scale=' + 1/dpr + ', user-scalable=no');
        head.insertBefore(metaEl,head.children[0]);
    };
    createViewport();
    */
    var recalc = function() {
        var width = docEl.clientWidth;
        if (width / dpr > 750) {
            width = 750 * dpr;
        }
        docEl.style.fontSize = 100 * (width / 750) + 'px';
    };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
})(document, window);