/**
 * addressSelect
 * author  jerry.liang
 * 功能: addressSelect 地址选择器
*  更新时间: 2016/06/01
 */
!(function (window) {
    function AddressSelect(options) {
        var me = this;
        var defaultOptions = {
            container: '',
            data: '',
            targetDom:'',
            callback: function () {
                return false;
            }
        };
        me.options = $.extend(defaultOptions, options);
        me.init();
    }

    AddressSelect.prototype.init = function() {
        var me = this;
        me._temp();
        me._area();
        me._events();
        me._complete();
    }

    AddressSelect.prototype._temp = function() {
        var me = this;
        var _data = me.options.data;

        var templ = '',
            templ_recent = '',
            templ_hot = '',
            templ_A = '',
            templ_B = '',
            templ_C = '',
            templ_D = '',
            templ_E = '',
            templ_F = '',
            templ_G = '',
            templ_H = '',
            templ_I = '',
            templ_J = '',
            templ_K = '',
            templ_L = '',
            templ_M = '',
            templ_N = '',
            templ_P = '',
            templ_Q = '',
            templ_R = '',
            templ_S = '',
            templ_T = '',
            templ_U = '',
            templ_V = '',
            templ_W = '',
            templ_X = '',
            templ_Y = '',
            templ_Z = '';

        templ += '<div class="addressSelect" id="' + me.options.targetDom + '">';
        templ += '<div class="addressSelect_tab">' +
            '<span class="on">常用</span>' +
            '<span>ABCDEF</span>' +
            '<span>GHIJ</span>' +
            '<span>KLMN</span>' +
            '<span>PQRSTUVW</span>' +
            '<span>XYZ</span>' +
            '</div>' +
            '<div class="addressSelect_tabBox">';

        $(_data).each(function(i, item) {
            if(item.hot){
                templ_hot += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
            } else if(item.recent){
                templ_recent += '<dd data-code="' + item.code + '" class="select">' + item.city_name + '-' + item.area_name + '</dd>';
            } else {
                switch(item.initial){
                    case 'A':
                        templ_A += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'B':
                        templ_B += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'C':
                        templ_C += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'D':
                        templ_D += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'E':
                        templ_E += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'F':
                        templ_F += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'G':
                        templ_G += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'H':
                        templ_H += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'I':
                        templ_I += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'J':
                        templ_J += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'K':
                        templ_K += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'L':
                        templ_L += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'M':
                        templ_M += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'N':
                        templ_N += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'P':
                        templ_P += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'Q':
                        templ_Q += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'R':
                        templ_R += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'S':
                        templ_S += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'T':
                        templ_T += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'U':
                        templ_U += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'V':
                        templ_V += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'W':
                        templ_W += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'X':
                        templ_X += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'Y':
                        templ_Y += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                    case 'Z':
                        templ_Z += '<dd data-code="' + item.code + '" class="toArea">' + item.city_name + '</dd>';
                        break;
                }
            }

        });

        templ +=  '<div class="addressSelect_tabContent" style="display: block">';
        if(templ_recent !== '')templ += '<dl class="list"><dt>历史</dt>' + templ_recent + '</dl>';
        if(templ_hot !== '')templ += '<dl class="list"><dt>热门</dt>' + templ_hot + '</dl>';
        templ +=  '</div><div class="addressSelect_tabContent">';
        if(templ_A !== '')templ += '<dl class="list"><dt>A</dt>' + templ_A + '</dl>';
        if(templ_B !== '')templ += '<dl class="list"><dt>B</dt>' + templ_B + '</dl>';
        if(templ_C !== '')templ += '<dl class="list"><dt>C</dt>' + templ_C + '</dl>';
        if(templ_D !== '')templ += '<dl class="list"><dt>D</dt>' + templ_D + '</dl>';
        if(templ_E !== '')templ += '<dl class="list"><dt>E</dt>' + templ_E + '</dl>';
        if(templ_F !== '')templ += '<dl class="list"><dt>F</dt>' + templ_F + '</dl>';
        templ +=  '</div><div class="addressSelect_tabContent">';
        if(templ_G !== '')templ += '<dl class="list"><dt>G</dt>' + templ_G + '</dl>';
        if(templ_H !== '')templ += '<dl class="list"><dt>H</dt>' + templ_H + '</dl>';
        if(templ_I !== '')templ += '<dl class="list"><dt>I</dt>' + templ_I + '</dl>';
        if(templ_J !== '')templ += '<dl class="list"><dt>J</dt>' + templ_J + '</dl>';
        templ +=  '</div><div class="addressSelect_tabContent">';
        if(templ_K !== '')templ += '<dl class="list"><dt>K</dt>' + templ_K + '</dl>';
        if(templ_L !== '')templ += '<dl class="list"><dt>L</dt>' + templ_L + '</dl>';
        if(templ_M !== '')templ += '<dl class="list"><dt>M</dt>' + templ_M + '</dl>';
        if(templ_N !== '')templ += '<dl class="list"><dt>N</dt>' + templ_N + '</dl>';
        templ +=  '</div><div class="addressSelect_tabContent">';
        if(templ_P !== '')templ += '<dl class="list"><dt>P</dt>' + templ_P + '</dl>';
        if(templ_Q !== '')templ += '<dl class="list"><dt>Q</dt>' + templ_Q + '</dl>';
        if(templ_R !== '')templ += '<dl class="list"><dt>R</dt>' + templ_R + '</dl>';
        if(templ_S !== '')templ += '<dl class="list"><dt>S</dt>' + templ_S + '</dl>';
        if(templ_T !== '')templ += '<dl class="list"><dt>T</dt>' + templ_T + '</dl>';
        if(templ_U !== '')templ += '<dl class="list"><dt>U</dt>' + templ_U + '</dl>';
        if(templ_V !== '')templ += '<dl class="list"><dt>V</dt>' + templ_V + '</dl>';
        if(templ_W !== '')templ += '<dl class="list"><dt>W</dt>' + templ_W + '</dl>';
        templ +=  '</div><div class="addressSelect_tabContent">';
        if(templ_X !== '')templ += '<dl class="list"><dt>X</dt>' + templ_X + '</dl>';
        if(templ_Y !== '')templ += '<dl class="list"><dt>Y</dt>' + templ_Y + '</dl>';
        if(templ_Z !== '')templ += '<dl class="list"><dt>Z</dt>' + templ_Z + '</dl>';
        templ +=  '</div>';

        templ += '</div><ul class="addressSelect_list"  data-index="0"></ul></div>';
        $('body').append(templ);
    }

    AddressSelect.prototype._area = function(){
        var me = this;
        var options = me.options;

        var target = $('.addressSelect'),
            trigger =$(options.container);
        var targetLeft = trigger.offset().left,
            targetTop = trigger.offset().top + trigger.outerHeight();

        target.attr('style','position:absolute;top:' + targetTop + 'px;left:' + targetLeft +'px;');
    }

    AddressSelect.prototype._events = function(){
        var me = this;
        var options = me.options;
        var _data = me.options.data;

        $(document).click(function (e) {
            var obj = document.getElementById(options.targetDom);
            var container = $(obj);

            if (!container.is(e.target)
                && !$(options.container).is(e.target)
                && container.has(e.target).length === 0) {
                me._close();
            }
        });

        //tab切换
        $('.addressSelect_tab span').on('click',function() {
            me._closeArea();
            var _index = $(this).index();
            $(this).addClass('on').siblings().removeClass('on');
            $('.addressSelect_tabContent').eq(_index).show().siblings().hide();
        });

        //市区联动
        $('body').on('click', '.addressSelect_tabContent .toArea', function(e) {
            e.stopImmediatePropagation();
            var _code = $(this).attr('data-code');
            $(this).parents('.addressSelect_tabBox').hide();
            var templ = '',
                templ_area = '';
            $.each(_data,function(i, item) {
                if(item.code == _code && item.hot !== true){
                    $(item.area).each(function(i,item) {
                        templ_area += '<span data-code="' + item.code + '">' + item.area_name + '</span>';
                    })
                }
            })
            templ += '<div class="addressSelect_area"><div class="back"><span>' +  $(this).html() + '</span><i>×</i></div><div class="area_list">' + templ_area + '</div></div>';
            $('.addressSelect').append(templ);
        });

        $('body').on('click', '.addressSelect_area .back', function(e) {
            e.stopImmediatePropagation();
            me._closeArea();
        });

        //赋值
        $('body').off('click', '.addressSelect_tabContent .select').on('click', '.addressSelect_tabContent .select', function() {
            var _val = $(this).text();
            var _code = $(this).attr('data-code');
            me._voluation(_code,_val);
        });

        $('body').off('click', '.area_list span').on('click','.area_list span', function() {
            var _val = $(this).parents('.addressSelect_area').find('.back span').text() + '-' + $(this).text();
            var _code = $(this).attr('data-code');
            me._voluation(_code,_val);
        });

    }

    AddressSelect.prototype._complete = function(){
        var me = this;
        var options = me.options;
        var _data = me.options.data;

        var obj = document.getElementById(options.targetDom);
        var listBox = $(obj).find('.addressSelect_list');

        $(options.container).on('keyup',function(e){
            var _val = $.trim($(this).val().toLocaleLowerCase());
            if(_val == ''){
                listBox.hide().siblings().show();
                listBox.next().remove();
            } else {
                listBox.empty();
                var templ_match = '';
                $.each(_data,function(i, item) {
                    if(item.hot !== true){
                        $(item.area).each(function(i,item) {
                            if(item.match.indexOf(_val) > -1) {
                                templ_match += '<li data-code="' + item.code + '">' + item.city_name + '-' + item.area_name + '</li>'
                            }
                        })
                    }
                });
                listBox.append(templ_match);
                listBox.show().siblings().hide();
            }
        })

        //$(options.container).on('keyup',function(e){
        //    if(e.keyCode==38){
        //        e.stopImmediatePropagation();
        //        var _index = listBox.attr('data-index');
        //        console.log(_index);
        //        listBox.find('li').eq(_index - 1).addClass('checked').siblings().removeClass('checked');
        //    } else if(e.keyCode==40){
        //        e.stopImmediatePropagation();
        //        if(listBox.attr('data-index') !== "0"){
        //            var _index = listBox.attr('data-index');
        //            listBox.find('li').eq(_index + 1).addClass('checked').siblings().removeClass('checked');
        //        } else {
        //            listBox.find('li').eq(0).addClass('checked');
        //        }
        //    } else if(e.keyCode==13){
        //        e.preventDefault();
        //        var _index = listBox.attr('data-index');
        //        var _li = listBox.find('li').eq(_index);
        //        var _code = _li.attr('data-code');
        //        var _val = _li.text();
        //        me._voluation(_code,_val);
        //    }
        //})

        $('body').off('click','.addressSelect_list li').on('click','.addressSelect_list li',function(e){
            var _code = $(this).attr('data-code');
            var _val = $(this).text();
            me._voluation(_code,_val);
        })
        $('body').on('hover','.addressSelect_list li',function(e){
            $(this).addClass('checked').siblings().removeClass('checked');
            $(this).parent().attr('data-index',$(this).index());
        })
    }

    AddressSelect.prototype._voluation = function(code,value){
        var me = this;
        var options = me.options;

        var trigger = $(options.container),
            triggerVal = value,
            triggerCode = code;
        trigger.val(triggerVal);
        trigger.attr('data-code', triggerCode);
        me._close();
        options.callback();
    }

    AddressSelect.prototype._closeArea = function(){
        $('.addressSelect_area').remove();
        $('.addressSelect_tabBox').show();
    }

    AddressSelect.prototype._close = function(){
        var me = this;
        var options = me.options;

        var obj = document.getElementById(options.targetDom);
        $(obj).remove();
    }

    CatAddressSelect = AddressSelect;
})();