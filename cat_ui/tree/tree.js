/**
 * tree 组件
 * author Angular Peng
 * update: 2016/04/27
 * 功能: 实现多级树形分类可折叠菜单特效代码
 */

;(function ($) {
    $.fn.catTree = function (options) {
        //默认参数
        var defaults = {
            hideCheckbox: true,   //是否隐藏复选框
            showSon:true         //初始是否展开树
        };

        var settings = $.extend(defaults, options || {});

        //定义相关数据
        var wrapper = $(this),
            ss = wrapper.find("s"),
            ulson = wrapper.find("ul").find("ul");

        var init = function () {

            telescopic();

            //判断有没有子集
            ulson.parent().find("> s").addClass("show");

            //是否隐藏子集
            if(!settings.showSon){
                ulson.hide();

            }else{
                ulson.parent().find("> s").addClass("hide");
            }

            //配置复选框
            if (!settings.hideCheckbox) {
                ss.after($('<i>'));
                var ii = wrapper.find("i");
                ii.on("click", function () {
                    if ($(this).hasClass("check")) {
                        $(this).removeClass("check");
                        $(this).parent().find("i").removeClass("check");
                    } else {
                        $(this).addClass("check");
                        $(this).parent().find("i").addClass("check");
                    }

                    //子集全部选中父集自动勾上
                    var ilen = $(this).parent().parent().find("> li > i").length;
                    var clen = $(this).parent().parent().find("> li > i.check").length;

                    if(ilen == clen){
                        $(this).parent().parent().parent().find("> i").addClass("check");
                    }
                    else if(ilen != clen){
                        $(this).parent().parent().parent().find("> i").removeClass("check");
                    }


                })
            }
        };

        var telescopic = function(){
            //+号操作
            $(this).on("click","s.show",function(e){
                if ($(this).hasClass("show")) {
                    $(this).removeClass("show").addClass("hide");
                    $(this).parent().find("> ul").show('fast');
                }else{
                    $(this).addClass('show').removeClass("hide");
                    $(this).parent().find("> ul").hide('fast');
                }
                e.stopPropagation();
            });

            //-号操作
            $(this).on("click","s.hide",function(e){
                if ($(this).hasClass("hide")) {
                    $(this).removeClass("hide").addClass("show");
                    $(this).parent().find("> ul").hide('fast');
                }else{
                    $(this).addClass('hide').removeClass("show");
                    $(this).parent().find("> ul").show('fast');
                }
                e.stopPropagation();
            });

        }

        init();
    }
})(jQuery);