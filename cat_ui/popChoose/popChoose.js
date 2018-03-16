/**
 * PopChoose
 * author  luxi.zhang
 * 功能: PopChoose 货物选择器
*  更新时间: 2016/05/25
 */
!(function (window) {

    function PopChoose(options) {
      var defaultOptions = {
        container: '',    // 触发器
        width: 380,         // 默认宽度
        closebtn: true,     // 是否需要关闭按钮
        data: '',           // 数据来源
        targetDom:'',
        callback: function() {}
      };
      this.options = $.extend(defaultOptions, options);
      this.init();
    }

    PopChoose.prototype.init = function() {
        this._temp();
        this._area();
        this._events();
    }

    PopChoose.prototype._temp = function() {
        var options = this.options;

        this.close();
        var templ = '';

        templ += '<div class="popChoose" id="' + options.targetDom + '">';

        if(options.closebtn){
            templ += '<div class="close">×</div>';
        }
        templ += '<div class="popChoose_list">';

        $(options.data).each(function(i, item) {
            templ += '<span data-code="' + item.code + '">' + item.name + '</span>';
        });

       templ += '</div></div>';

        $('body').append(templ);
    }

    PopChoose.prototype._area = function(){
      var options = this.options;

      var target = $('.popChoose'),
          trigger =$(options.container);
      var targetWidth = options.width,
          targetLeft = trigger.offset().left,
          targetTop = trigger.offset().top + trigger.outerHeight();

      target.attr('style','position:absolute;top:' + targetTop + 'px;left:' + targetLeft +'px;width:' + targetWidth + 'px;');
    }

    PopChoose.prototype._events = function(){
        var me = this;
        var options = this.options;

        //关闭
        $('.popChoose .close').click(function(){
            me.close();
        })
        //点击空白处关闭
        $(document).mouseup(function (e) {

          var obj = document.getElementById(options.targetDom);
          var container = $(obj);
          if (!container.is(e.target)
              && !$(options.container).is(e.target)
              && container.has(e.target).length === 0) {
              me.close();
          }
      });

      //赋值
      $('.popChoose_list span').click(function(e) {
        var trigger = $(options.container),
            triggerVal = $(this).text(),
            triggerCode = $(this).data('code');

        trigger.val(triggerVal);
        trigger.attr('data-code', triggerCode);
        options.callback();

        me.close();
      });



    }

    PopChoose.prototype.close = function(){
      var me = this;
      var options = me.options;
      var obj = document.getElementById(options.targetDom);
            $(obj).remove();

    }

    CatPopChoose = PopChoose;
})();