$(function() {

    function back() {
        window.history.back();
    }

    // 获取标题数据
    function title() {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getcoupon',
            type: 'GET',
            dataType: 'json',
            success: function(obj) {
                console.log(obj);
                var html = template('coupontitle', obj);
                //console.log(html);
                $('#srtitle').html(html);
            }
        })
    };

    // 进度条
    function progress() {

        var demo1 = 0;
        var timeID = setInterval(function() {
            demo1 += 20;
            mui("#demo1").progressbar({ progress: demo1 }).show();
            if (demo1 == 100) {
                $('#demo1').hide(500);
                clearInterval(timeID);
                title();
            }
            //console.log(demo1);
        }, 200)
    }

    mui.toast('欢迎光临');

    progress();








})