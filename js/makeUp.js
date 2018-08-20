$(function () {
    // 获取店铺以及区域的数据
    getSort("http://mmb.ittun.com/api/getgsshop", $(".store"));
    getSort("http://mmb.ittun.com/api/getgsshoparea", $(".region"));

    // 默认根据第一个店铺以及第一地区排序
    var data = {};    

    // 点击导航排序请求对应隐藏数据
    function getSort(url, parentName) {
        $.ajax({
            url: url,
            type: "get",
            success: function (res) {
                var htmlStr = template("sortBarTmp", res);
                parentName.html(htmlStr);
                data.shopid = $(".store").find("li").eq(0).data("shopid");
                data.areaid = $(".region").find("li").eq(0).data("areaid");
                getProducts(data);
            }
        });
    }

    // 请求商品列表
    function getProducts(data) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getgsproduct",
            type: "get",
            data: data,
            success: function (res) {
                // 收起所有隐藏选项
                var htmlStr = template("productTmp", res);
                $(".mui-scroll ul").html(htmlStr);
                $(".hideSort ul").hide();
            }
        });

    }

    // 点击店铺排序
    $(".platform").click(function () {
        // 2.隐藏选项切换        
        $(".store").toggle().siblings().hide();

    });

    // 点击地域
    $(".area").click(function () {
        $(".region").toggle().siblings().hide();
    });

    // 点击价格
    $(".priceBar").click(function () {
        $(".hideSort>.prices").toggle().siblings().hide();
    });

    $(".sortBar .left a").click(function () {
        // 1.箭头样式切换
        if ($(this).find(".iconfont").hasClass("icon-jiantouxia")) {
            $(this).find(".iconfont").addClass("icon-jiantoucushang").removeClass("icon-jiantouxia");
        } else {
            $(this).find(".iconfont").addClass("icon-jiantouxia").removeClass("icon-jiantoucushang");
        }
    });

    $(".hideSort").on("click", "li", function () {
        // 1.样式加标志
        // $(this).find("span").addClass("mui-icon mui-icon-checkmarkempty").end().siblings().find("span").removeClass("mui-icon mui-icon-checkmarkempty");
        $(this).find("span").addClass("mui-icon mui-icon-checkmarkempty");
        $(this).siblings().find("span").removeClass("mui-icon mui-icon-checkmarkempty");
    });

    // 选择价格点击事件
    $(".hideSort>.prices li").click(function() {
        setTimeout(function(){
            $(".hideSort>.prices").hide();
        },1000);
    });

    // 点击隐藏排序项
    $(".hideSort").on("click", ".sortLi", function () {
        $(".store").find("li").find("span").each(function (index, ele) {
            if ($(this).hasClass("mui-icon-checkmarkempty")) {
                data.shopid = $(this).parent().data("shopid");
            }
        });

        $(".region").find("li").find("span").each(function (index, ele) {
            if ($(this).hasClass("mui-icon-checkmarkempty")) {
                data.areaid = $(this).parent().data("areaid");
            }
        });
        getProducts(data);
    });

    // 点击返回箭头,返回上一级页面
    $(".header .back").click(function() {
        history.back();
    });

    // 点击某一商品携带id跳转到上商品详情页
    $(".mui-scroll ul").on("click","li",function() {
        location.href = "./products.html?productid=" + $(this).data("productid");
    });


});