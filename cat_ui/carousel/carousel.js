/**
 * banner 组件
 * author Angular Peng
 * update: 2016/04/22
 * 功能: 解决广告,滚动,轮播效果
 */

;(function ($) {
    $.fn.carousel = function (options) {
        //默认参数
        var defaults = {
            width: null,            //carousel区域宽度
            height: null,            //carousel区域高度
            direction: 'left',      //滚动方向,left:从右向左,top:从下向上,right:从左向右,bottom:从上向下
            duration: 0.6,          //滚动过程时间，单位：秒
            delay: 3,               //滚动延迟时间，单位：秒
            startIndex: 0,          //初始从第几张图开始滚动
            clickBarSize: 14,       //切换按钮大小
            clickBarRadius: 10,     //切换按钮圆角角度,0:正方形,10:圆形 0-10
            clickBarPosition: 0,    //切换按钮位置
            hideBottomBar: false,   //是否隐藏底部
            hideleftright: false,    //是否隐藏左右点击切换按钮
            hideBottomNums: false,    //是否隐藏底部切换小按钮
            eventType: "mouseover"    //事件,移动上去mouseover,或者点击click
        };

        var settings = $.extend(defaults, options || {});

        //定义相关数据
        var wrapper = $(this),
            ul = wrapper.children('ul.items'),    //ul
            lis = ul.find('li'),                  //li
            nums = wrapper.children('.nums');
        var li_num = lis.size(),                  //li的总数
            li_height = 0,                        //li的高度
            li_width = 0;                         //li的宽度
        //定义滚动顺序:ASC/DESC
        var order_by = 'ASC';

        //初始化
        var init = function () {

            leftbtn();

            rightbtn();

            if (!wrapper.size()) {
                return false;
            }

            //手动设定宽高值优先
            li_height = settings.height ? settings.height : $(".carousel").height();
            li_width = settings.width ? settings.width : $(".carousel").width();

            //左右箭头的高度
            wrapper.find("button").css("margin-top", (li_height / 2) - 30);

            wrapper.css({
                width: li_width + 'px',
                height: li_height + 'px'
            });

            lis.css({
                width: li_width + 'px',
                height: li_height + 'px'
            });

            if (!settings.hideBottomNums) {
                var nums = $('<div class="nums"></div>').appendTo(wrapper);
                nums.css("right", settings.clickBarPosition + 'px');
            }

            if (settings.direction == 'left' || settings.direction == 'right') {
                ul.css('width', li_num * li_width + 'px');   //ul的宽度等于li的总宽度
            } else {
                ul.css('height', li_num * li_height + 'px'); //ul的高度等于li的总高度
            }
            ul.find('li:eq(' + settings.startIndex + ')').addClass('active');  //第几张开始

            lis.each(function (i, n) {
                //li上加超链接打开
                var link = $(this).attr("link");
                if(link){
                    $(this).on("click",function(){
                        window.open(link);
                    })
                };
                var b = $(n).find('b'), text = b.attr('title'), css = '';
                i == settings.startIndex && (css = 'active');
                $('<b>').attr('data-index', i).text(text).addClass(css).css({
                    'borderRadius': settings.clickBarRadius + 'px',
                    'width': settings.clickBarSize + 'px',
                    'height': settings.clickBarSize + 'px'
                }).on(settings.eventType, function () {
                    $(this).addClass('active').siblings().removeClass('active');
                    ul.find('li:eq(' + $(this).index() + ')').addClass('active').siblings().removeClass('active');
                    start();
                    stop();
                }).appendTo(wrapper.find(".nums"));
            });

            if (!settings.hideBottomBar) {
                var tips = $('<div class="tips"></div>').css('opacity', 0.6).appendTo(wrapper);
                var title = $('<div class="title"></div>').html(function () {
                    var active = ul.find('li.active').find('b'), text = active.attr('title');
                    return $('<b>').text(text);
                }).appendTo(tips);
            }
            lis.size() > 1 && start();
        }

        if (!settings.hideleftright) {
            $('<button class="left"><a href="###">向左</a></button><button class="right"><a href="###">向右</a></button>')
                .css('opacity', 0).appendTo(wrapper);
        }

        //停止轮播
        var stop = function () {
            window.clearTimeout(wrapper.data('timeid'));
        };

        //开始轮播
        var start = function (direction) {
            wrapper.find('button').attr("disabled",true);

            var active = ul.find('li.active'), active_a, index = active.index();

            if (direction && order_by != direction) {
                order_by = direction;
                var li = ul.find('li'),
                    liLen = li.length;

                li.removeClass('active');

                if (order_by == 'ASC') {
                    index = (function () {
                        if (index == liLen - 2) {
                            active = ul.find('li:first');
                            index = 0;
                        } else if (index == liLen - 1) {
                            active = ul.find('li:first').next();
                            index = 1;
                        } else {
                            active = active.next().next();
                            index = index + 2;
                        }
                        return index;
                    })();
                } else if (order_by == 'DESC') {
                    index = (function () {
                        if (index == 1) {
                            active = ul.find('li:last');
                            index = liLen - 1;
                        } else if (index == 0) {
                            active = ul.find('li:last').prev();
                            index = liLen - 2;
                        } else {
                            active = active.prev().prev();
                            index = index - 2;
                        }
                        return index;
                    })();
                }
            }

            active_a = active.find('b');

            switch (settings.direction) {
                case 'left':
                    offset = index * li_width * -1;
                    param = {'left': offset + 'px'};
                    break;
                case 'right':
                    offset = index * li_width * -1;
                    param = {'right': offset + 'px'};
                    break;
                case 'top':
                    offset = index * li_height * -1;
                    param = {'top': offset + 'px'};
                    break;
                case 'bottom':
                    offset = index * li_height * -1;
                    param = {'bottom': offset + 'px'};
                    break;
            }

            wrapper.find('.nums').find('b:eq(' + index + ')').addClass('active').siblings().removeClass('active');

            wrapper.find('.title').find('b').text(active_a.attr('title'));

            ul.stop();
            ul.stop(true, false).animate(param, settings.duration * 1000, function () {
                wrapper.find('button').attr("disabled",false);
                active.removeClass('active');
                //自动滚动
                if (order_by == 'ASC') {
                    if (active.next().size()) {
                        active.next().addClass('active');
                    } else {
                        ul.find('li:first').addClass('active');
                    }
                } else if (order_by == 'DESC') {
                    if (active.prev().size()) {
                        active.prev().addClass('active');
                    } else {
                        ul.find('li:last').addClass('active');
                    }
                }
            });

            stop();
            wrapper.data('timeid', window.setTimeout(start, settings.delay * 1000));

        };

        //点击左按钮
        var leftbtn = function(){
            wrapper.find('button.left').on("click",function(){
                start('DESC');
                stop();
            })
        }

        //点击右按钮
        var rightbtn = function(){
            wrapper.find('button.right').on("click",function(){
                start('ASC');
                stop();
            })
        }



        //鼠标经过事件
        wrapper.hover(function () {
            stop();
            wrapper.find("button").stop(true, false).animate({
                opacity: 1
            })
        }, function () {
            wrapper.data('timeid', window.setTimeout(start, settings.delay * 1000));
            wrapper.find("button").stop(true, false).animate({
                opacity: 0
            })
        });

        //初始化
        init();

        $(window).resize(function () {
            window.location.reload();
        })
    };
})(jQuery);