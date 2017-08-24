//右侧固定栏的div切换
$("#rt_fixed ul li a").on('click',function(){
	$(this).siblings("div").toggle(500);
	$(this).parent().siblings().find("div").css('display','none')
});
//回到顶部逐帧动画
//var timer  = null;
//$("#goTop").on('click',function(){
//	//基于底层的帧动画
//	 cancelAnimationFrame(timer);//取消帧动画
//  timer = requestAnimationFrame(function fn(){//请求帧动画
//      var oTop = document.body.scrollTop || document.documentElement.scrollTop;
//      if(oTop > 0){
//          document.body.scrollTop = document.documentElement.scrollTop = oTop - 50;//每次移动50px
//          timer = requestAnimationFrame(fn);
//      }else{
//          cancelAnimationFrame(timer);
//      }    
//  });
//})
//热销图片的跳转
$('#hot_sell_img img').on('click',function(){
	var hot_sell_img_src = $(this).attr('src');
	//console.log($(this).attr('src'))
	//self.location=wrap_img_src; 
	//window.location.href=wrap_img_src;
	window.open(hot_sell_img_src);    
})
//楼层图片的跳转
$('#floor img').on('click',function(){
	var floor_img_src = $(this).attr('src');
	window.open(floor_img_src);
})







  


