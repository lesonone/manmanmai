$(function() {

    //点击按钮,显示侧导航栏
  mui(".mui-bar-nav").on("tap", ".mui-action-menu", function() {
    mui(".mui-off-canvas-wrap").offCanvas("show");
  });
    //禁止拖动触发显示侧导航栏
  var offCanvasInner = document.querySelector('.mui-inner-wrap');
  offCanvasInner.addEventListener("drag", function(event) {
    event.stopPropagation();
  });


  //侧滑导航栏的关闭按钮事件
  mui(".mui-bar-nav").on("tap", ".closebtn", function() {
    mui(".mui-off-canvas-wrap").offCanvas("close");
  });


  //顶部栏点击事件

  mui(".mui-inner-wrap").on("tap", ".header", function() {
    window.location.href = "./index.html";
  });

  var obj = {};
  if(getUrl()){
    obj = getUrl();
  }else{
    obj.id = 1;
    obj.pagesize= 1;
  }
  var categoryid = obj.id;
  var pageid = obj.pagesize;
  render(categoryid,pageid);
  

  //导航交互
  mui(".mui-scroll").on("tap", ".listbar .mui-bar-nav span", function() {
    $(this).addClass('active').siblings().removeClass('active');
  });

  //下拉点击事件
  mui('.mui-scroll').on('tap','.slidebox .box .slidelist',function(){
    $(this).parent().find('.hidelist').toggleClass('show');
  })

  //每个品牌点击事件
  mui('.mui-scroll').on('tap','.slidebox .box1 .showlist span',function(){
    $('.box1 .showlist span').removeClass('active');
    $(this).addClass('active');
  } )
  mui('.mui-scroll').on('tap','.slidebox .box2 .showlist span',function(){
    $('.box2 .showlist span').removeClass('active');
    $(this).addClass('active');
  } )
  mui('.mui-scroll').on('tap','.slidebox .box3 .showlist span',function(){
    $('.box3 .showlist span').removeClass('active');
    $(this).addClass('active');
  } )

  //每个商品的点击事件
  mui('.mui-scroll').on('tap','.product',function(){
    var id = $(this).data('id');
    window.location.href = './good.html?productid='+id;
  } )

  //渲染数据函数
  function render(categoryid,pageid){
    $.ajax({
      url:'http://mmb.ittun.com/api/getproductlist',
      type:'get',
      data:{categoryid:categoryid,pageid:pageid},
      success:function(res){
        var pagesize = res.pagesize;
        var totalCount = res.totalCount;
        var pagenum = Math.ceil(totalCount/pagesize);
        $('.mui-input-numbox').val(pageid);
        var html = template('tpl',res);
        $('.productslist .productsinfo').html(html);
      }
    })
  }


  
  
});

