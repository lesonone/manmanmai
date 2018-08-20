$(function () {
    //需要获取到地址栏中的id;
    var href = location.href;
    //console.log(href);//file:///D:/%E5%9F%BA%E7%A1%80%E7%8F%AD%E4%B8%8A%E8%AF%BE%E7%AC%94%E8%AE%B0/MMB
    //manmanmai/brandSublist.html?id=1
    //把这个地址切割;  

    //把
    function url(href) {
        // 先用问号分割 然后截取第二位 如果有多个参数 就应该再用&分割;
        var arr = href.split('?').pop().split("&");
        //console.log(arr);
        var query = {};
        arr.forEach(function (v) {
        var param = v.split('=');
        //取对象里面的key = value;
        query[param[0]] = param[1];
        });
        return query;
    };

    // 获取品牌id的数据 brandtitleid 定义一个全局变量id;
    var id = url(href);
    //返回的是对象 , 需要取值 那么直接可以用对象点出来
    //{id: 2} id.id;

    var str = decodeURI(href);
    //console.log(str);
    //file:D:/基础班上课笔记/MMB/manmanmai/brandSublist.html
    //?id=1&brandTitle=液晶电视十大品牌

    var strArr = url(str);
    //console.log(strArr);


    // 截取获取到的字符串;
    var title = strArr.brandTitle;
    //console.log(title);

    // 把字符串截取
    title = title.substr(0, title.indexOf('十'));
    //console.log(title);

    // 直接替换里面的内容就好了
    $('.update,#goodBrand,#product-up,#userComment').html(title);
    // $('#goodBrand').html(title);
    // $('#product-up').html(title);
    





    // 十条产品展示;
    function brandtitleid(id) {
        var id = url(href);
        var str = window.title;
       // console.log(str);        
        $.ajax({
            url: 'http://mmb.ittun.com/api/getbrand',
            dataType: 'json',
            data: { brandtitleid: id.id },
            success: function (res) {
                //console.log(res);
                var html = template('product', res);
                $('.prList').html(html);
            }
        })
    }

    // 渲染数据 十条
    brandtitleid(id);


    // 产品销量 4条
    function salve(id) {
        var id = url(href);
        $.ajax({
            url: 'http://mmb.ittun.com/api/getbrandproductlist',
            data: { brandtitleid: id.id, pagesize: 4 },
            type: 'get',
            success: function (res) {
               // console.log(res);
                var html = template('salveList', res);
                $('.salveList').html(html);
            }
        })

    }
    salve(id);


    // 产品 用户评论五条

    function conmment(id) {
        var id = url(href);
        $.ajax({
            url: 'http://mmb.ittun.com/api/getproductcom',
            data: { productid: id.id },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var html = template('comment', res);
                $('.conmment .pd').html(html);
            }

        })
    }

    conmment(id);

})