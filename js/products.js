$(function () {
    var obj = getUrl();
    // console.log(obj);
    $.ajax({
        url: "http://mmb.ittun.com/api/getdiscountproduct",

        data: { productid: obj.productid },
        type: "get",
        success: function (res) {
            var htmlStr = template("gooddetail", res);
            $(".inner").html(htmlStr);
        }
    })
    // 发射弹幕
    var $container = $('.container');

    var getRandomColor = function () {
        /*0-255*/
        var r = Math.floor(256 * Math.random());
        var g = Math.floor(256 * Math.random());
        var b = Math.floor(256 * Math.random());
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    var getRandomTop = function () {
        /*height() jquery方法  0-视频高度 */
        var containerHeight = $container.height();
        return containerHeight * Math.random();
    }

    /*点击发送*/
    $('.inner').on("click", ".tjdp", function () {
        var text = $.trim($('textarea').val());

        /*没有输入内容就停止执行*/
        if (!text) return false;
        /*弹幕*/
        $('<span></span>').text(text).css({
            'position': 'absolute',
            'width': 150,
            'height': 30,
            'font-size': '24px',
            'font-weight': 'bold',
            'right': -150,
            'z-index': 200,
            'color': getRandomColor(),
            'top': getRandomTop()
        }).animate({ 'right': 500 }, 10000, 'linear', function () {
            /*动画结束之后需要删除  自杀*/
            $(this).remove();
        }).appendTo($container);
        /*清空输入框*/
        $('textarea').val('');
    })
})