$(function(){
    //1.发起请求获取分类菜单数据
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

    //2.分类菜单的显示与隐藏
    $('.drop').click(function () {  
        $('.menu').toggle();
        if($('.menu').css('display') == 'none'){
            $('.upDown').addClass("mui-icon-arrowdown").removeClass("mui-icon-arrowup");           
        }else{
            $('.upDown').addClass("mui-icon-arrowup").removeClass("mui-icon-arrowdown");
        }
    });
    //收起分类按钮
    $('.menu-content').on('click','.close',function () {  
        $(".menu").hide();
    })
    $('.mask').click(function () { 
        $(".menu").hide();
    });

    //3.获取页面跳转传递过来的id值
    var obj = getUrl();
    console.log(obj); 
    //按照不同的id渲染数据
    renderData({
        url : 'http://mmb.ittun.com/api/getbaicaijiaproduct',
        data : {titleid : obj.titleid},
        id : 'goodListtpl',
        cl : '.goodList'
    })
});
