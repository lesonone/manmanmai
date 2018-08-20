$(function () {
    // function urlTool(urlStr){
    //     var str = urlStr.split("?")[1];
    //     var urlArr = str.split("&");
    //     var param = {};
    //     param[urlArr.split("=")[0]]=urlArr.split("=")[1];
    //     return param;
    // }
    // var urlStr = location.href;
    // var param = urlTool(urlStr);
    // renderCategory(param.categoryId);
    renderCategory(1);

    function renderCategory(categoryId) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getcategorybyid",
            type: "get",
            data: {
                categoryid: categoryId
            },
            success: function (res) {
                var html = template("categoryId", res);
                $(".categoryName").html(html);
            }
        })
    }
    var data = {
        // categoryid: param.categoryId,
        categoryid: 1,
        pageid: 1
    };
    renderProduct(data);

    function renderProduct(data) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getproductlist",
            type: "get",
            data: data,
            success: function (res) {
                var html = template("productData", res);
                $(".products").html(html);
                var dropHtml = template("dropdownData",res);
                $(".dropdown-menu").html(dropHtml);
            }
        })
    };
    $(".dropdown-menu").on("tap","a",function(){
        
        data.pageid = $(this).data("pageid");
        renderProduct(data);
        mui('.scroll-content').scroll().scrollTo(0, 0, 100);
        // $(".dropdown-toggle .name").html($(this).html());
        $(".dropdown-menu").hide();
    })
    $(".down").on("tap",function(){
        $(".dropdown-menu").show();
    })
    $(".paging .previous").on("tap",function () {
        data.pageid--;
        if(data.pageid<1) data.pageid=1;
        renderProduct(data);
        mui('.scroll-content').scroll().scrollTo(0, 0, 100);
    });
    $(".paging .next").on("tap",function () {
        data.pageid++;
        renderProduct(data);
        mui('.scroll-content').scroll().scrollTo(0, 0, 100);
    })
//侧面导航部分
    $(".filtrate").click(function () {
        mui('.mui-off-canvas-wrap').offCanvas().show();
    })
    $(".trademark ul").on("tap","li",function(){
      
        $(this).addClass("active").siblings().removeClass("active");
    })
    
    mui.init();
    //侧滑容器父节点
    var offCanvasWrapper = mui('#offCanvasWrapper');
    //主界面容器
    var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-inner-wrap');
    //菜单容器
    var offCanvasSide = document.getElementById("offCanvasSide");
   
    //移动效果是否为整体移动
    var moveTogether = false;
    //侧滑容器的class列表，增加.mui-slide-in即可实现菜单移动、主界面不动的效果；
    var classList = offCanvasWrapper[0].classList;
    //变换侧滑动画移动效果；
    offCanvasSide.classList.remove('mui-transitioning');
    offCanvasSide.setAttribute('style', '');
    //classList.remove('mui-slide-in');
    classList.remove('mui-scalable');
    classList.add('mui-slide-in');
    offCanvasWrapper.offCanvas().refresh();
    //菜单界面，‘关闭侧滑菜单’按钮的点击事件
    
    //侧滑菜单界面均支持区域滚动；
    mui('#offCanvasSideScroll').scroll();
    //实现ios平台原生侧滑关闭页面；
    if (mui.os.plus && mui.os.ios) {
        mui.plusReady(function () { //5+ iOS暂时无法屏蔽popGesture时传递touch事件，故该demo直接屏蔽popGesture功能
            plus.webview.currentWebview().setStyle({
                'popGesture': 'none'
            });
        });
    }
})