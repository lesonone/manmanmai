$(function(){
    renderCategory(1);
    function renderCategory(categoryId){
        $.ajax({
            url:"http://mmb.ittun.com/api/getcategorybyid",
            type:"get",
            data:{categoryid:categoryId},
            success:function(res){
                var html = template("categoryId",res);
                $(".categoryName").html(html);
            }
        })
    }
    var data = {categoryid:1,pageid:1};
    renderProduct(data);
    function renderProduct(data){
        $.ajax({
            url:"http://mmb.ittun.com/api/getproductlist",
            type:"get",
            data:data,
            success:function(res){
                var html = template("productData",res);
                $(".products").html(html);
            }
        })
    };
    $(".paging .mui-previous a").click(function(){
        data.pageid--;
        renderProduct(data);
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);
    });
    $(".paging .mui-next a").click(function(){
        data.pageid++;
        renderProduct(data);
        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);
    })
 
})