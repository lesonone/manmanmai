$(function(){
    // 获取url中的参数
//    function urlTool(urlStr){
//        var str = urlStr.split("?")[1];
//        var urlArr = str.split("&");
//        var param = {};
//        param[urlArr.split("=")[0]]=urlArr.split("=")[1];
//        return param;
//    }
   $(".tagList li").click(function(){
       $(this).addClass("active").siblings().removeClass("active");
       $(this).children(".triAngle").show().parent().siblings().children(".triAngle").hide();
   })
   $(".tagList .active .triAngle").show();
   var param = getUrl();
   $(".categoryName").click(function(){
       window.history.back();
   })
   $(".categoryName").html(decodeURI(param.categoryName));
   if(param){
    renderProduct(param.productid);
   renderComment(param.productid);
   }else {
    renderProduct(1);
    renderComment(1);
   }
   
//    渲染商品详情
   function renderProduct(id){
    $.ajax({
        url:"http://mmb.ittun.com/api/getproduct",
        type:"get",
        data:{productid:id},
        success:function(res){
             var html = template("productData",res);
             $(".products").html(html);
             var record = template("recordData",res);
             $(".record").html(record);
        }
    })
   }
// 渲染商品评论
   function renderComment(id){
    $.ajax({
        url:"http://mmb.ittun.com/api/getproductcom",
        type:"get",
        data:{productid:id},
        success:function(res){
         var html = template("commentData",res);
         $(".commentList").html(html);
        }
    })
   }
})