/**
 * mouseTips 组件
 * author jerry_liang
 * update: 2016/04/05
 * 功能: 解决title标签默认样式,可自定义title
 */
!(function (window) {

    $.fn.mouseTips = function (options) {
        var mouseTipsHtml = '<div class="mouseTips"></div>';
        var mouseTipsStyle = '<div id="mouseTipsStyle" style="display:none"></div>';
        if ($('.mouseTips').length <= 0) {
            $('body').append(mouseTipsHtml);
            $('body').append(mouseTipsStyle);
        }

        return this.each(function () {
            var defaultOptions = {
                titleInfo: $(this).attr('title'),
                position:'left',
                bgColor:'#fff',
                borderColor:'#c7d0d9',
                fontColor:'#333',
                width:'200',
                isType:'0'
            };
            var obj = $.extend(defaultOptions,options);
            var _title = $(this).attr("title");
            var $mouseTips = $('.mouseTips');

            $(this).mouseenter(function(){
                showTips($(this));
                $(this).removeAttr("title");
            }).mouseleave(function(){
                hideTips($(this));
                $(this).attr("title",_title);
            })

            var showTips = function(el){
                addStyle();
                $mouseTips.css('width',obj.width + 'px').html(obj.titleInfo);
                var _offset = el.offset();
                switch (obj.position){
                    case 'left':
                        var _offsetTop = _offset.top - 5;
                        var _offsetLeft = _offset.left - obj.width - 22;
                        break;
                    case 'right':
                        var _offsetTop = _offset.top - 5;
                        var _offsetLeft = el.outerWidth() + _offset.left + 10;
                        break;
                    case 'bottom':
                        var _offsetTop = _offset.top + el.outerHeight() + 10;
                        var _offsetLeft = _offset.left - obj.width/2 + el.outerWidth()/2 - 5;
                        break;
                    case 'top':
                        var _offsetTop = _offset.top - $mouseTips.outerHeight() - 10;
                        var _offsetLeft = _offset.left - obj.width/2 + el.outerWidth()/2 - 5;
                        break;
                }
                $mouseTips.css({
                    'display': 'inline-block',
                    'position': 'absolute',
                    'top': _offsetTop,
                    'left': _offsetLeft,
                    'background': obj.bgColor,
                    'border': '1px solid ' +  obj.borderColor,
                    'color': obj.fontColor,
                    'padding':'5px',
                    'box-shadow':'0 0 7px #ccc',
                    'z-index':'99',
                    'border-radius':'3px'
                }).attr('class','mouseTips ' + obj.position);
            }

            var hideTips = function(){
                rmStyle();
                $mouseTips.attr('class','mouseTips');
                $mouseTips.hide();
            }

            var addStyle = function(){
                var _tempStyle ='<style>' +
                    '.mouseTips:after, .mouseTips:before {border: solid transparent; content: "";height: 0;position: absolute; width: 0;}' +
                    '.mouseTips.left:after, .mouseTips.left:before {left: 100%;}' +
                    '.mouseTips.left:after {border-width: 5px; border-left-color:' + obj.bgColor + '; top: 8px;}' +
                    '.mouseTips.left:before {border-width: 6px; border-left-color:' + obj.borderColor + '; top: 7px;}' +
                    '.mouseTips.right:after, .mouseTips.right:before {left: -12px;}' +
                    '.mouseTips.right:after {border-width: 5px;border-right-color:' + obj.bgColor + ';top: 8px;left:-10px;}' +
                    '.mouseTips.right:before {border-width: 6px; border-right-color:' + obj.borderColor + '; top: 7px;}' +
                    '.mouseTips.bottom:after {border-width: 5px; border-bottom-color:' + obj.bgColor + '; left: 50%; margin-left:-5px; top:-10px;}' +
                    '.mouseTips.bottom:before { border-width: 6px; border-bottom-color:' + obj.borderColor + '; left: 50%; margin-left:-6px;top:-12px;}' +
                    '.mouseTips.top:after {border-width: 5px;border-top-color:' + obj.bgColor + '; left: 50%; margin-left:-5px; bottom:-10px;}' +
                    '.mouseTips.top:before {border-width: 6px; border-top-color:' + obj.borderColor + '; left: 50%; margin-left:-6px; bottom:-12px;}' +
                    '</style>'
                $('#mouseTipsStyle').html(_tempStyle);
            }
            var rmStyle = function(){
                $('#mouseTipsStyle').empty();
            }

            if(obj.isType==1){
                showTips($(this));
                $(this).removeAttr("title");
            }

        });
    }

})();
