$(function () {
    $.ajax({
        url:"http://mmb.ittun.com/api/getdiscountproduct",
        data:{productid:0},
        type:"get",
        success:function(res){
            var htmlStr = template("gooddetail",res);
            $(".inner").html(htmlStr);
            console.log(htmlStr)
        }
    })
})