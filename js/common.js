 //使用媒体查询,设置rem大小
 document.querySelector('html').style.fontSize = window.screen.width / 10 + 'px';
 if (window.screen.width >= 500) {
     document.querySelector('html').style.fontSize = "50px";
 }



 //入口函数
 $(function() {
     //初始化内部滚动插件
     mui('.mui-scroll-wrapper').scroll({
         deceleration: 0.0005
     });
 })


 //封装一个用来发送请求的函数(需要传参数)(LY)
 function renderData(msg) {
     $.ajax({
         url: msg.url,
         type: 'get',
         data: msg.data,
         dataType: 'json',
         success: function(obj) {
             //console.log(obj);
             var html = template(msg.id, obj);
             $(msg.cl).html(html);
         }
     })
 };

 //封装一个获取url中参数的工具函数(LY)
 function getUrl() {
     //1.获取到地址
     var urlStr = window.location.href;
     //2.将网址按?进行分割
     var urlArr = urlStr.split('?');
     //如果没有参数,就退出程序
     if (urlArr[0] == urlStr) return;
     //3.有参数,就再按&进行分割
     var arr = urlArr[1].split('&');
     //4.将分割后的数组进行遍历,将每个元素存入到一个对象中
     var obj = {};
     for (var i = 0; i < arr.length; i++) {
         //6.将每个元素再按 = 进行分割成数组
         var arg = arr[i].split('=');
         //7.此时arg[0]即为key值,arg[1]即为对应的value值
         obj[arg[0]] = arg[1];
     }
     return obj;
 }

 $(".back-top").click(function () {
    mui('.mui-scroll-wrapper').scroll().scrollTo(0, 0, 1000);//100毫秒滚动到顶
})