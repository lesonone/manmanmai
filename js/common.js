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