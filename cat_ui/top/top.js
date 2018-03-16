/**
 * goTop 组件
 * author jerry_liang
 * 功能: goto top功能 qrcode等
 */
!function() { 
    /**
     * @class GoTop
     *
     */
    function GoTop(options) {
        var me = this;
        var defaultOptions = {
            // 可传入特定的对象绑定gototop事件，若无，使用默认对象
            duration: 1000,
            pageHeight: 300,
            showSuggest: true,
            showQrcode: true,
            showPhone: true,
            showQQ: true
        };
        me.topOptions = $.extend(defaultOptions, options);
        me.init();
    }

    GoTop.prototype.init = function() {
        var me = this;
        me._initStructure();
        me._initStatus();
        me._initEvents();
    }

    GoTop.prototype._initStructure = function() {
        var topOptions = this.topOptions;
        var topTpl = '<li class="top">';
        topTpl +=      '<a href="javascript:void(0)" class="btn_gotop"></a>';
        topTpl +=    '</li>';

        var suggestTpl = '<li class="suggest">';
        suggestTpl +=      '<a href="javascript:void(0)" class="btn_suggest"></a>';
        suggestTpl +=    '</li>';

        var qrcodeTpl = '<li class="qrcode">';
        qrcodeTpl +=      '<a href="javascript:void(0)" class="btn_qrcode"></a>';
        qrcodeTpl +=      '<div class="qrcode_show"></div>';
        qrcodeTpl +=    '</li>';

        var phoneTpl = '<li class="phone">';
        phoneTpl +=      '<a href="javascript:void(0)" class="btn_phone"></a>';
        phoneTpl +=      '<div class="phone_show"></div>';
        phoneTpl +=    '</li>';

        var QQTpl = '<li class="qq">';
        QQTpl +=      '<a href="http://crm2.qq.com/page/portalpage/wpa.php?uin=800016576&cref&ref=&f=1&ty=1&ap=&as=&v=" class="btn_qq" target="_blank"><p>在线客服</p></a>';
        QQTpl +=    '</li>';
      
        var containerTpl = '<ul class="gotop">';
        if (topOptions.showSuggest) {
            containerTpl += suggestTpl;
        }
        if (topOptions.showQrcode) {
            containerTpl += qrcodeTpl;
        }
        if (topOptions.showPhone) {
            containerTpl += phoneTpl;
        }
        if (topOptions.showQQ) {
            containerTpl += QQTpl;
        }

        containerTpl += topTpl;
        containerTpl +=    '</ul>';

        $('body').append(containerTpl);
    }

    GoTop.prototype._initStatus = function() {
        var topOptions = this.topOptions;

        if ($(window).scrollTop() > topOptions.pageHeight) {
            $('.gotop .top').fadeIn('slow');
        }

        var height = 0;
        if (topOptions.showSuggest) {
            height += $('.gotop .suggest').outerHeight(true);
        }
        if (topOptions.showQrcode) {
            height += $('.gotop .qrcode').outerHeight(true);
        }
        if (topOptions.showPhone) {
            height += $('.gotop .phone').outerHeight(true);
        }
        if (topOptions.showQQ) {
            height += $('.gotop .qq').outerHeight(true);
        }
        height += $('.gotop .top').outerHeight(true);
        $('.gotop').css('height', height + 'px'); 
    }

    GoTop.prototype._initEvents = function() {
        var me = this;
        var topOptions = this.topOptions;
        $('.gotop .btn_gotop').on('click', function () {
            $(this).click(function(){
                $('html,body').stop(true,true);
            })
            $('html,body').animate({scrollTop:0}, topOptions.duration);
        });

        $('.gotop .btn_qrcode').mouseenter(function(){
            $(this).next().show();
        }).mouseleave(function(){
            $(this).next().hide();
        });

        $('.gotop .btn_phone').mouseenter(function(){
            $(this).next().show();
        }).mouseleave(function(){
            $(this).next().hide();
        });

        $(".gotop .btn_suggest").click(function(){$(".hm-t-feedback-trigger").trigger("click")});

        $(window).scroll(function () {
            if ($(window).scrollTop() > topOptions.pageHeight) {
                $('.gotop .top').fadeIn('slow');
            }
            else {
                $('.gotop .top').fadeOut('slow');   
            }
        });
    }

    goTop = GoTop;
}();