/**
 * steps 组件
 * author jerry_liang
 * update: 2016/04/05
 * 功能: 可自定义的steps UI组件
 */
!(function (window) {

    function Steps(container,options) {
        var me = this;
        me.container = container;
        me.options = options || {};
        me.widths = '';
        me.type = 0;
        me.current = 1;
        me.args = [];
        $.extend(me, me.options);
    }

    Steps.prototype = {
        init: function(){
            var me = this;
            me._display();
        },

        _display: function(){
            var me = this,
                _len = me.args.length,
                _content = '';
            var _width = parseInt(me.widths/_len);
            var _yen = parseInt(me.widths%_len);
            if(me.type == 0){
                var _header = '<ul class="ui_steps" style="width:' + me.widths + 'px">';
                var _footer = '</ul>';
                for(var i=0; i<_len;i++){
                    if(i == _len - 1){_width = _width + _yen}
                    var _temp = '<li style="width:' + _width + 'px">' +
                        '<div class="tit">' + me.args[i] + '</div>' +
                        '<b class="arrow_bg"></b>' +
                        '<b class="arrow"></b>' + '</li>';
                    _content += _temp;
                }
                _content = _header + _content + _footer;
            } else {
                var _header = '<ul class="ui_steps_round" style="width:' + me.widths + 'px">';
                var _footer = '</ul>';
                for(var i=0; i<_len;i++){
                    if(i == _len - 1){_width = _width + _yen}
                    var _num = i + 1;
                    var b_left = _width/2 + 12 + 5;
                    var b_width = _width - 24 - 10;
                    var _temp = '<li style="width:' + _width + 'px">' +
                        '<div class="tit">' + me.args[i] + '</div>' +
                        '<i>' + _num + '</i>' +
                        '<b style="left:' + b_left + 'px; width:' + b_width + 'px;"></b>' + '</li>';
                    _content += _temp;
                }
                _content = _header + _content + _footer;
            }
            me.container.append(_content);
            me.container.find('li').last().addClass('last');
            me.setStep(me.current);
        },

        setStep: function(n){
            var me = this,
                _len = me.args.length;
            if(n > 0 && n <= _len){
                me.current = n;
                me.container.find('li').each(function(){
                    var _index = $(this).index();
                    if(_index < me.current - 1) {
                        $(this).attr('class','finish');
                    } else if(_index == me.current - 1){
                        $(this).attr('class','active');
                    } else {
                        $(this).attr('class','');
                    }
                })
                me.container.find('li').last().addClass('last');
            }
        },

        nextStep: function(){
            var me = this,
                _len = me.args.length;
            if(me.current < _len){
                me.current++;
            }
            me.setStep(me.current);
        },

        prevStep: function(){
            var me = this;
            if(me.current > 1){
                me.current--;
            }
            me.setStep(me.current);
        }
    }

    CatSteps = Steps;
})();
