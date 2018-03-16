/**
 * Popup 组件
 * author jerry_liang
 * 功能: popup自定义弹层
*  更新时间: 2015/09/16
 */
!(function (window) {

    function Popup(options) {
        var me = this;
        var defaultOptions = {          // 可传入特定的对象绑定PopUp事件，若无，使用默认对象
            dom: 'body',                // 相对定位层
            mask: true,                 // 是否需要蒙版
            width: 400,                 // 默认宽度
            height: '',                 // 默认高度
            paddingTB: '10',            // 默认padding纵向距离
            paddingLR: '10',            // 默认padding横向距离
            bgColor: '#fff',            // 默认背景色
            closebtn: true,             // 是否需要关闭按钮
            template: ''                // 模板
        };
        me.Options = $.extend(defaultOptions, options);
        me.init();
    }

    Popup.prototype.init = function() {
        var me = this;
        me._temp();
        me._area();
        me._events();
    }

    Popup.prototype._temp = function() {
        var me = this;
        var Options = this.Options;

        me.close();
        var containerTpl = '';
        if(Options.mask) {
            containerTpl += '<div class="mask"></div>'
        }
        containerTpl += '<div class="popup">';
        if(Options.closebtn){
            containerTpl += '<div class="close">×</div>';
        }
        containerTpl += Options.template;
        containerTpl += '</div>';

        $(Options.dom).append(containerTpl);
    }

    Popup.prototype._area = function(){
        var me = this;
        var Options = this.Options;

        var _mask = $('.mask'),
            _popup = $('.popup'),
            _paddingTB = Options.paddingTB,
            _paddingLR = Options.paddingLR;
        (Options.height=='')?_Height = _popup.height():_Height = Options.height;
        _outerHeight = _Height + _paddingTB*2;
        _outerWidth = Options.width + _paddingLR*2;
        Options.dom == 'body'?_position = "fixed":_position = "absolute";
        _mask.attr('style','position:' + _position);
        _popup.attr('style','position:' + _position + '; width:' + Options.width + 'px; height:' + _Height + 'px; margin-top:-' + _outerHeight/2 + 'px; margin-left:-' + _outerWidth/2 + 'px; padding:' + _paddingTB + 'px ' + _paddingLR + 'px; background:' + Options.bgColor + ';');
    }

    Popup.prototype._events = function(){
        var me = this;
        $('.mask, .popup .close').click(function(){
            me.close();
        })
    }

    Popup.prototype.close = function(){
        $('.mask, .popup').remove();
    }

    CatPopup = Popup;
})();