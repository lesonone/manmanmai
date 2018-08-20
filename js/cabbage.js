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


    //5.主页商家优惠信息处,显示全部的列表信息
    renderData({
        url : 'http://mmb.ittun.com/api/getbaicaijiaproduct',
        data : {titleid : 10},
        id : 'goodlist',
        cl : '.goodList'
    });

    //6.超级人气榜
    renderData({
        url : 'http://mmb.ittun.com/api/getbaicaijiaproduct',
        data : {titleid : 12},
        id : 'superList',
        cl : '.superHot .mui-scroll'
    });  

    //7.回到顶部
    $('.anchor').click(function () {
        mui('.anchorTop').scroll().scrollTo(0,0,1000);
    });

    
});