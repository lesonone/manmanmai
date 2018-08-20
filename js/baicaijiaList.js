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
        $('.upDown').addClass("mui-icon-arrowdown").removeClass("mui-icon-arrowup");
    })

    $('.mask').click(function () { 
        $(".menu").hide();
        $('.upDown').addClass("mui-icon-arrowdown").removeClass("mui-icon-arrowup");
    });

    

    //3.获取页面跳转传递过来的id值
    var obj = getUrl(); 
    //console.log(decodeURI(obj.title));
    //decodeURI()函数可以将编码过的URL解码
    if(obj){
        //4.按照不同的id渲染数据
        renderData({
            url : 'http://mmb.ittun.com/api/getbaicaijiaproduct',
            data : {titleid : obj.titleid},
            id : 'goodListtpl',
            cl : '.goodList'
        });
        $('.drop span').html(decodeURI(obj.title));
    }else{
        //5.如果直接从cabbageList页面进来,就显示"全部部分"的数据
        renderData({
            url : 'http://mmb.ittun.com/api/getbaicaijiaproduct',
            data : {titleid : 0},
            id : 'goodListtpl',
            cl : '.goodList'
        })
        $('.drop span').html("全部");
    }

    //6.分类菜单的每个分类的点击事件
    $('.menu-content').on('click',".category",function () {  
        //获取到自定义属性data-id中的titleid
        var id = $(this).parent().data('id');
        //console.log(id);
        renderData({
            url : 'http://mmb.ittun.com/api/getbaicaijiaproduct',
            data : {titleid : id},
            id : 'goodListtpl',
            cl : '.goodList'
        })
        //隐藏下拉菜单,改变下拉框的title和箭头
        $(".menu").hide();
        $('.drop span').html($(this).text());
        $('.upDown').addClass("mui-icon-arrowdown").removeClass("mui-icon-arrowup");
    });   

    //7.回到顶部
    $('.anchor').click(function () {
        mui('.anchorTop').scroll().scrollTo(0,0,1000);
    });

    
});