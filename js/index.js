$(function(){
    //获取导航菜单数据;
    $.ajax({
        url:"http://mmb.ittun.com/api/getindexmenu",
        type:"GET",
        success:function(res){
            console.log(res);
            var htmlNav = template("navlist",res);
            $('.nav').html(htmlNav);
        }

    });

    //获取超值折扣
    $.ajax({
        url:"http://mmb.ittun.com/api/getmoneyctrl",
        type:"GET",
        success:function(res){
            console.log(res);

            var htmlPro = template("productlist",res);
            $(".products").html(htmlPro);
        }
    });

    //点击按钮跳转到省钱控页面
    $("button").click(function(){
        window.location.href = "./moneyctrl.html"
    });


    //导航点击更多显示下面四个菜单
    $('.nav').on("click","li:nth-child(8)",function(){
        $('.nav li:nth-child(n+9)').stop().slideToggle(400);
    });

    //点击超值折扣栏跳转到省钱控页面
    $(".discount").click(function(){
        window.location.href = "./moneyctrl.html";
    });

    //点击品牌排行栏跳转到口碑页面
    $(".ranking").click(function(){
        window.location.href = "./category.html";
    });

    // var nav = document.querySelector(".main .nav");
    // var lilist = nav.children[6];

    // var newDiv = document.createElement("div");
    // newDiv.innerHTML = "人气";
    // lilist.appendChild(newDiv);
})