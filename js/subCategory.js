$(function () {
    // function urlTool(urlStr){
    //     var str = urlStr.split("?")[1];
    //     var urlArr = str.split("&");
    //     var param = {};
    //     urlArr.forEach(function(v){
    //         var data = v.split("=");
    //         param[data[0]]=data[1];
    //     })
    //     return param;
    // }
    // var urlStr = location.href;
    var param = getUrl();
    renderCategory(param.categoryid);
    var categoryName = "";
    // renderCategory(1);
// 渲染面包屑分类标题
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
                categoryName = res.result[0].category;
            }
        })
    }
    var data = {
        categoryid: param.categoryid,
        // categoryid: 1,
        pageid: 1
    };
    var pagesize = 0;
    var totalCount;
    
    renderProduct(data);
// 渲染列表页面
    function renderProduct(data) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getproductlist",
            type: "get",
            data: data,
            success: function (res) {
                pagesize = res.pagesize;
                totalCount = res.totalCount;
                res.count = Math.ceil(totalCount/pagesize);
                var html = template("productData", res);
                $(".products").html(html);
                var dropHtml = template("dropdownData",res);
                $(".dropdown-menu").html(dropHtml);
                
                console.log(res.count);
            }

        })
    };
    $(".logo,.toindex").on("tap",function(){
        location.href = "./index.html";
    })
    $(".allBrand").on("tap",function(){
        location.href = "./category.html";
    })
    $(".products").on("tap",".product" ,function(){
        location.href = "./good.html?productid="+$(this).data("productid")+"&categoryName="+categoryName;
    })
    //下拉框
    $(".dropdown-menu").on("tap","a",function(){
        
        data.pageid = $(this).data("pageid");
        renderProduct(data);
        mui('.scroll-content').scroll().scrollTo(0, 0, 100);
        $(".dropdown-toggle .name").html($(this).html());
        $(".dropdown-menu").hide();
    })
    $(".down").on("tap",function(){
        $(".dropdown-menu").show();
    })
    // 上一页的点击事件
    $(".paging .previous").on("tap",function () {
        data.pageid--;
        if(data.pageid<1) data.pageid=1;
        renderProduct(data);
        mui('.scroll-content').scroll().scrollTo(0, 0, 100);
        $(".dropdown-toggle .name").html(data.pageid+"/"+totalCount/pagesize);
    });
    // 下一页的点击事件
    $(".paging .next").on("tap",function () {
        data.pageid++;
        console.log(pagesize);
        if(data.pageid>=totalCount/pagesize) data.pageid = totalCount/pagesize;
        renderProduct(data);
        mui('.scroll-content').scroll().scrollTo(0, 0, 100);
        $('.dropdown-toggle .name').html(data.pageid+"/"+totalCount/pagesize);
    })
//侧面导航部分
    $(".filtrate").click(function () {
        mui('.mui-off-canvas-wrap').offCanvas().show();
    })
    $(".close").on("tap",function(){
        mui('.mui-off-canvas-wrap').offCanvas().close();
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