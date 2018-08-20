$(function(){
        $.ajax({
            url: "http://mmb.ittun.com/api/getinlanddiscount",
            type:'get',
            dataType: 'json',
            success: function (res) {
                pagesize=res.pagesize;
                var htmlList=template("introduceTpl",res);
                console.log(res);
                $('.gbq').html(htmlList);
            }
        })
        $('.jiantou').click(function(){
            location.href="login.html";
        })
    
})