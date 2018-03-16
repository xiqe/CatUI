/**
 * switch 组件
 * author luxi.zhang
 * update: 2016/05/09
 * 功能: 可自定义的switch UI组件
 */

;(function($) {
  $.fn.switchBox = function(options) {
    var self = this;
    var defaults = {
       checked: false,
       onchange: function() {}
     };

     $.extend(defaults, options);


     var $switch = '<div class="switch">' + (options.checked ? '<input class="switch_status" type="checkbox" checked=checked/><div class="switch_show switch_checked">' : '<input class="switch_status" type="checkbox" /><div class="switch_show">') + '<i></i></div></div>';

     $switch = $('<div/>').html($switch).contents();

     $('body').on('click', '.switch_status', function() {
        var hasChecked = $(this).is(':checked');

        if (hasChecked) {
           $(this).siblings('.switch_show').addClass('switch_checked');
        } else {
          $(this).siblings('.switch_show').removeClass('switch_checked');
        }

        options.onchange(hasChecked);

      });


     self.append($switch);
     return $switch;

  };


})(jQuery);

