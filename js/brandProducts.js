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

});
