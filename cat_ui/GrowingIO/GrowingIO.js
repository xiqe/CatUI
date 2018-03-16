/**
 * GrowingIO
 * author  jerry.liang
 * 功能: GrowingIO 统计
*  更新时间: 2016/07/13
 */
var _accountId = getGrowingAccountId('accountId');
var _vds = _vds || [];
window._vds = _vds;
(function(){
    _vds.push(['setAccountId', _accountId]);

    (function() {
        var vds = document.createElement('script');
        vds.type='text/javascript';
        vds.async = true;
        vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(vds, s);
    })();
})();

function getGrowingAccountId(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var _url = $('#data-accountId').attr('src');
    if(_url){
        var subUrl = _url.substring(_url.indexOf('?'),_url.length);
        var r = subUrl.substr(1).match(reg);
        if (r != null)
            return unescape(r[2]);
        return null;
    }
}
