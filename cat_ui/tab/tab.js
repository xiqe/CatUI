/**
 * tab
 * author  angular.peng
 * 功能: tab 切换
*  更新时间: 2016/06/29
 */

(function($) {

    function Tab(tabSelector,contentSelector) {
        this.tabSelector = tabSelector;
        this.contentSelector = contentSelector;
    }

    Tab.prototype.init = function(){
        var tabBox = this.tabSelector,
            contentBox = this.contentSelector

        tabBox.children().each(function(){
            if($(this).hasClass("on")){
                var index = $(this).index();
                contentBox.children().eq(index).show().siblings().hide();
            }
        })

        tabBox.children().on("click",function(){
            var index = $(this).index();
            $(this).addClass("on").siblings().removeClass("on");
            contentBox.children().eq(index).show().siblings().hide();
        })
    };

    CatTab = Tab;

})(jQuery);