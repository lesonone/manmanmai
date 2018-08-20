$(function() {
    // 点小房子返回首页
    $('.mui-icon-home').click(function() {
        window.location.href = "./index.html";
    })

    // 点击放回刷新
    $('.back').click(function() {
        window.location.href = "./coupon.html";
        //var arr = location.href.split("/").pop();
        // window.location.reload();
        //window.history.back();
    })


    // 获取标题数据
    function title() {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getcoupon',
            type: 'GET',
            dataType: 'json',
            success: function(obj) {
                // console.log(bj);
                // console.log(obj.result);
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

        $('h1').html($(this).data('tit') + '优惠券');





    });



    // 点击图片弹出轮播图
    $('#commoditys').on("click", 'img', function() {
        clearInterval(timeid);

        //var mask = mui.createMask(callback); //callback为用户点击蒙版时自动执行的回调；
        //mask.show(); //显示遮罩
        $('.mui-backdrop').show();


        // 渲染轮播图
        discount(lunbosum, 'couponlunbo', $('.mui-backdrop'));

        // 取得当前点击图片对应的自定义属性zsid
        var now = $(this).parent().data('zsid');
        //var old = $(this).attr("src");
        //console.log($(this).attr("src"));
        var timeid = setInterval(function() {

            // 切换到当前点击的图片
            var slider = mui('#slider').slider();
            slider.gotoItem(now); //切换至第几个轮播
            clearInterval(timeid);

            // 点击关闭遮罩层
            $('.mui-icon-refreshempty').click(function() {
                //$('.mui-backdrop').hide();
                location.reload();
            })

        }, 100);
        //console.log($(this).parent().data('zsid'));

    });



    // 点击左边箭头
    $('.mui-backdrop').on('tap', '.mui-icon-back', function() {
        var slider = mui('#slider').slider();
        slider.prevItem();
    })

    // 点击右边箭头
    $('.mui-backdrop').on('tap', '.mui-icon-forward', function() {
        var slider = mui('#slider').slider();
        slider.nextItem();
    })












})