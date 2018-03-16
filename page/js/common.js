var CommonJs = {
    init: function(){
        CommonJs.topNav();
        CommonJs.subNav();
    },

    topNav: function(){
        var _iso = $('#CatUI_nav').val();
        $('.nav li a').each(function(){
            var _val = $(this).attr('data-val');
            if(_val==_iso){
                $(this).parent().addClass('current');
            }
        });
    },

    subNav: function(){
        var _iso = $('#CatUI_sub_nav').val();
        $('.aside_container li a').each(function(){
            var _val = $(this).attr('data-val');
            if(_val==_iso){
                $(this).addClass('current');
            }
        });
    }
}

$(function(){
    CommonJs.init();
})