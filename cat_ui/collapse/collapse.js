/**
 * collapse 组件
 * author luxi.zhang
 * update: 2016/04/26
 * 功能: 可自定义的collapse UI组件
 */


(function($) {

  function Collapse(selector,options) {
    this.selector = selector;
    this.type = options.type || 'single';
    this.templ = options.templ || [];
  }

  Collapse.prototype.init = function(){
    var $collapseBox = this.selector,
        self = this;

    var len = self.templ.length;
        templet = '';

    for(var i = 0; i < len; i++){
      var collapseTitle = '<li class="'+self.templ[i].status + '"><div class="collapse-title">' + self.templ[i].title + '</div>';
      var collapseCnt = '<div class="collapse-cnt">' + self.templ[i].content +'</div></li>';

      templet += collapseTitle + collapseCnt;

    }

    $collapseBox.append(templet);



    $collapseBox.on('click', '.collapse-title', function(e) {
      e.preventDefault();
      var $panel = $(this).parent();
      if(self.type == 'single') $collapseBox.find('.open').removeClass('open');
      $panel.toggleClass('open');
    });

    }


  CatCollapse = Collapse;

})(jQuery);