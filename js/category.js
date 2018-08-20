
$(function () {
    function result() {
        $.ajax({
            url: "http://mmb.ittun.com/api/getcategorytitle",
            type: "GET",
            success: function (res) {
                //    console.log(res);
                var html = template("title", res)
                $(".liebiao").html(html);


            }
        })
    }
    result();


    $(".liebiao").on("tap", ".love", function () {

        var th = $(this).data("id");
        // console.log(th);
        function render(sid) {
            $.ajax({
                url: "http://mmb.ittun.com/api/getcategory",
                type: "GET",
                data: { titleid: sid },
                success: function (res) {
                    console.log(res);
                    var html = template("category", res);
                    $(".hate").html(html);
                    $(".hate").on("tap",".subMenu",function(){
       
                        location.href="./subCategory.html?categoryid="+$(this).data("id");
                
                    })
                }
            })
        }
        render(th);

    })

    
})

