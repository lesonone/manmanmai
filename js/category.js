
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
                    // console.log(res);
                    var html = template("category", res);
                    $(".hate").html(html);
                    $(".hate").on("tap",".subMenu",function(){
<<<<<<< HEAD
       
=======
<<<<<<< HEAD
<<<<<<< HEAD
       
=======
                        console.log(1);
>>>>>>> 2277726d177688dc7b45696b782a7203f3bd19eb
=======
                        console.log(1);
=======
       
>>>>>>> 7a270ce28770843b1b3b8d9913338025f53f50e6
>>>>>>> 1a8c18553b772be79354ebc22c78acacce84bd20
>>>>>>> 163e824977f68f2ceb72c9d075fba1c941dab0bc
                        location.href="./subCategory.html?categoryid="+$(this).data("id");
                
                    })
                }
            })
        }
        render(th);

    })

    
})

