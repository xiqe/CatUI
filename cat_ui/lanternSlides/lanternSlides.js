/**
 * lanternSlides
 * author  jerry.liang
 * 功能: lanternSlides 地址选择器
*  更新时间: 2016/07/05
 */

!(function (window) {

    function lanternSlides(options) {
        var me = this;
        me.options = options || {};
        me.data = [];                   //json数据格式
        me.width = 600;                 //图片宽度
        me.height = 400;                //图片高度
        me.closeBtn = true;            //是否需要关闭按钮
        me.title = true;               //是否带标题
        me.index = 1;                   //初始化图片
        $.extend(me, me.options);
    }

    lanternSlides.prototype = {
        init: function(){
            var me = this;
            me._display();
            me._event();
        },

        _display: function(){
            var me = this,
                _index = me.index,
                _width = me.width,
                _height = me.height,
                _len = me.data.length;
            var _slideWidth = _width + 100,
                _slideHeight = _height + 100;

            var temp = '<div class="lanternSlides_mask"></div>' +
                '<div class="lanternSlides_slide" style="width: ' + _slideWidth + 'px; height: ' + _slideHeight + 'px; margin-left:' + -_slideWidth/2 + 'px; margin-top: ' + -_slideHeight/2 + 'px;">';
            if(me.closeBtn){
                temp += '<a href="javascript:void(0)" class="close">×</a>'
            }
            temp += '<div class="tit">';
            if(_len > 1){
                temp += '<span class="count"><i class="cur">' + _index + '</i>/<i class="all">' + _len + '</i></span>';
            }
            if(me.title){
                temp += '<span class="name">' + me.data[_index - 1].name + '</span>';
            }
            temp += '</div><img src="' + me.data[_index - 1].imgSrc + '" alt="" style="width: ' + _width + 'px; height: ' + _height + 'px;"/>';
            if(_len > 1){
                temp += '<a href="javascript:void(0)" class="prev"></a><a href="javascript:void(0)" class="next"></a>';
            }
            temp += '</div>';
            $('body').append(temp);
        },

        _event: function(){
            var me = this;

            var prevBtn = $('.prev'),
                nextBtn = $('.next'),
                closeBtn = $('.close');

            nextBtn.on('click',function(){
                var _current = me.index + 1;
                me.loadImg(_current);
            })

            prevBtn.on('click',function(){
                var _current = me.index - 1;
                me.loadImg(_current);
            })

            closeBtn.on('click',function(){
                me.close();
            })
        },

        loadImg: function(num){
            var me = this,
                _data = me.data[num - 1],
                _len = me.data.length;

            if(num < _len + 1 && num > 0){
                $('.lanternSlides_slide .count .cur').text(num);
                $('.lanternSlides_slide .name').text(_data.name);
                $('.lanternSlides_slide img').attr('src',_data.imgSrc);
                me.index = num;
            }
        },

        close: function(){
            $('.lanternSlides_slide').prev().remove();
            $('.lanternSlides_slide').remove();
        }
    }

    CatLanternSlides = lanternSlides;
})();
