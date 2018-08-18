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

    // 获取优惠券展示信息
    //参数1:传入的id 参数2:模板id 参数3:在哪生成模板
    function discount(cid, muban, addres) {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getcouponproduct',
            type: 'GET',
            data: { couponid: cid },
            dataType: 'json',
            success: function(obj) {
                console.log(obj);
                var html = template(muban, obj);
                //console.log(html);
                addres.html(html);
            }

        })
    }


    mui.toast('欢迎光临');

    progress();



    // 定义变量存标题id
    var lunbosum = 0;
    // 点击标题弹出对应优惠券
    $('#srtitle').on('click', 'a', function() {

        lunbosum = $(this).data('id');
        //alert($(this).data('tit'));
        // 标题栏隐藏
        $('.mui-content').hide();
        // 优惠券显示
        $('#refreshContainer').show();

        discount($(this).data('id'), 'commodity', $('#commoditys'));

        $('.mui-title').html($(this).data('tit') + '优惠券');

    });



    // 点击图片弹出轮播图
    $('#commoditys').on("click", 'img', function() {
        //alert(1);
        //var mask = mui.createMask(callback); //callback为用户点击蒙版时自动执行的回调；
        //mask.show(); //显示遮罩
        $('.mui-backdrop').show();
        //alert(lunbosum);
        //console.log($('#lunbo1'));
        discount(lunbosum, 'couponlunbo', $('#lunbo1'));
        console.log($(this).parent().data('num'));
    })












})