$(function() {
    function brandList(){
        $.ajax({
            url:'http://mmb.ittun.com/api/getbrandtitle',
            dataType:'json',
            success:function(result) {
                //console.log(result);
                //跳转到下一个页面需要一个id;
                var html = template('product',result);
                $('.productList').html(html);
                //存一下地址
                
                //localStorage.setItem('href',location.href);

            }
        })
    };

    brandList();
})