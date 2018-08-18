$(function(){
    //1.调用轮播图插件
    //获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:3000//自动轮播周期，若为0则不自动播放，默认为0；
    });

    //2.分类菜单的显示与隐藏事件
    $('.category').click(function () {  
        $(".menu").toggle();
    });
    //收起分类按钮
    $('.menu-content').on('click','.close',function () {  
        $(".menu").hide();
    })
    $('.mask').click(function () { 
        $(".menu").hide();
    });

    //3.发起请求获取分类菜单数据
    $.ajax({
        url : 'http://mmb.ittun.com/api/getbaicaijiatitle',
        type : 'get',
        dataType : 'json',
        success : function (obj) {  
            //console.log(obj);
            var html = template('menuList',obj);
            $('.menu-content').html(html);
        }
    });

    //4.封装一个显示各分类列表的函数
    function render(id) {  
        $.ajax({
            url : 'http://mmb.ittun.com/api/getbaicaijiaproduct',
            type : 'get',
            data : {titleid : id},
            dataType : 'json',
            success : function (obj) {  
                console.log(obj);
                var html = template('goodlist',obj);
                $('.goodList').html(html);
            }
        })
    };

    //5.主页商家优惠信息处,显示全部的列表信息
    render(10);

    //6.超级人气榜
    $.ajax({
        url : 'http://mmb.ittun.com/api/getbaicaijiaproduct',
        type : 'get',
        data : {titleid : 12},
        dataType : 'json',
        success : function (obj) {  
            console.log(obj);
            var html = template('superList',obj);
            $('.superHot .mui-scroll').html(html);
        }
    })
});