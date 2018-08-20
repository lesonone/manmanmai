$(function() {
    $.ajax({
        url:'http://mmb.ittun.com/api/getsitenav',
        dataType:'json',       
        success:function(res){
            //console.log(res);
        var html = template('product',res);
        $('.jd-list').html(html);
        
        }
    })
})