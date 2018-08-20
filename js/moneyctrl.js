$(function(){
    var data={ pageid: 1};
    var pagesize;
    renderProduct(data);
    function renderProduct(data) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getmoneyctrl",
            type:'get',
            dataType: 'json',
            data: data,
            success: function (res) {
                pagesize=res.pagesize;
                var htmlList=template("introduceTpl",res);
                $('.gbq').html(htmlList);
                var htmlli=template("dropdownData",res);
                $('.dropdown-menu').html(htmlli);
            }
        })
    }
        $(".dropdown-menu").on("tap","a",function(){
        
            data.pageid = $(this).data("pageid");
            renderProduct(data);
            mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
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
            mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
        });
        $(".paging .next").on("tap",function () {
            data.pageid++;
            if(data.pageid>=pagesize) data.pageid = pagesize;
            renderProduct(data);
            mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 100);
        })
        $('.jiantou').click(function(){
            location.href="./index.html";
        })
})