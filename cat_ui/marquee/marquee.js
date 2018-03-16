/**
 * scroll 组件
 * author jerry_liang
 * update: 2016/05/09
 * 功能: 可自定义的marquee 无缝滚动UI组件
 */
!(function (window) {
    $.fn.marquee = function (options) {
        var defaultOptions = {
            speed: 40,          //滚动速度
            dir:'top'           //滚动方向
        };
        var obj = $.extend(defaultOptions,options);

        return this.each(function () {
            //初始化
            var _li = $("li", this);
            var _ul = _li.parent();
            _ul.css({overflow: "hidden", position: "relative", cursor: 'pointer'});
            var _li_size = 0;
            for(var i=0; i<_li.length; i++){
                _li_size += (obj.dir == "left" ? _li.eq(i).outerWidth() : _li.eq(i).outerHeight());
            }
            var disGoScroll = false;
            if(obj.dir == "left" && $(this).width() < _li_size){
                disGoScroll = true;
            } else if(obj.dir == "top" && $(this).height() < _li_size) {
                disGoScroll = true;
            } else {
                disGoScroll = false;
            }

            if(disGoScroll){
                if(obj.dir == "left") _ul.css({width: (_li_size*2)+"px"});
                _ul.append(_li.clone());
                _li = $("li", this);

                //滚动事件
                var _scroll = 0;
                function goScroll(){
                    _scroll += 1;
                    if(_scroll > _li_size){
                        _scroll = 0;
                        _ul.css(obj.dir == "left" ? { left : -_scroll } : { top : -_scroll });
                        _scroll += 1;
                    }
                    _ul.animate(obj.dir == "left" ? { left : -_scroll } : { top : -_scroll }, 0);
                }

                //开始
                var move = setInterval(function(){ goScroll(); }, obj.speed);
                _ul.hover(function(){
                    clearInterval(move);
                },function(){
                    clearInterval(move);
                    move = setInterval(function(){ goScroll(); }, obj.speed);
                });
            }
        });
    }
})();
