/**
 * placeholder 组件
 * author jerry_liang
 * 功能: 解决placeholder属性在ie的兼容问题
 */
;(function ($) {
    $.fn.extend({
        "placeholder":function () {
            var options ={
                placeholderColor:'#ACA899'
            };
            $('.wrap-placeholder').remove();    //解决重置执行多次placeholder效果问题
            $(this).each(function () {
                var me = this;
                var supportPlaceholder = 'placeholder' in document.createElement('input');
                if(!supportPlaceholder){
                    if($(me).attr('placeholder')){
                        var defaultValue = $(me).attr('placeholder');
                    } else {
                        var defaultValue = '';
                    }
                    var $imitate = $('<span class="wrap-placeholder" style="position:absolute; display:inline-block; overflow:hidden; color:'+options.placeholderColor+'; height:'+$(me).outerHeight()+'px;">' + defaultValue + '</span>');
                    var _offset = $(me).offset();
                    $imitate.css({
                        'top': _offset.top,
                        'left': _offset.left,
                        'font-size':$(me).css('font-size'),
                        'font-family':$(me).css('font-family'),
                        'font-weight':$(me).css('font-weight'),
                        'padding-left':parseInt($(me).css('padding-left')) + 2 + 'px',
                        'width': parseInt($(me).outerWidth()) - parseInt($(me).css('padding-left')) - 2 +'px',
                        'line-height':me.nodeName.toLowerCase() == 'textarea' ? $(me).css('line-weight') : $(me).outerHeight() + 'px',
                        'padding-top':me.nodeName.toLowerCase() == 'textarea' ? parseInt($(me).css('padding-top')) + 2 : 0
                    });
                    $(me).before($imitate.click(function () {
                        $(me).trigger('focus');
                    }));
                    $(me).val().length != 0 && $imitate.hide();

                    $(me).focus(function () {
                        $imitate.hide();
                    }).blur(function () {
                        /^$/.test($(me).val()) && $imitate.show();
                    });
                }
            });
            return this;
        }
    });
})(jQuery);