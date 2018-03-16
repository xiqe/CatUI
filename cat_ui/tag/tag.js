/**
 * tag 组件
 * author luxi.zhang
 * update: 2016/05/06
 * 功能: 可自定义的tag UI组件
 */

;(function($) {
  $.fn.tag = function(arr) {
    var self = this;
    $(arr).each(function(i, item) {
      self.append(tag(item));
    });
    return this;
  };

  function tag(options) {
    var defaults = {
      closable: false,
      callback: function() {},
      title: ''
    };

    $.extend(defaults, options);

    var $tag = '<span class="tag">' + options.title + (options.closable ? ' <i class="tag-close">&times;</i>' : '') + '</span>';
    //tag字符串变成dom操作
    $tag = $('<div/>').html($tag).contents();

    $tag.on('click', '.tag-close', function(e) {
      $tag.hide();
      //若关闭的回调是一样的，这里提供被关闭的dom信息$tag[0]
      options.callback($tag[0]);
    });

    return $tag;
  }


})(jQuery);

