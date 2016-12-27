
$(function(){
	function size(origin,type){
		var type=type ||"x";
		if(type=="x"){
			var widths=document.documentElement.clientWidth;
			var sizes=widths/origin*100;
		}else if(type=="y"){
			var heights=document.documentElement.clientHeight;
			var sizes=heights/origin*100;
		}
			document.getElementsByTagName("html")[0].style.fontSize=sizes+"px";
			
		}

size(1134,"y");
	
	
	
	
	
	var mySwiper = new Swiper ('.swiper-container', {
        pagination: '.swiper-pagination',
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }
    })
   $(".swiper-pagination>span").css({"width":"8px ","height":"8px","background":"#ccc"});
   
   
   /*侧拉菜单*/
  $(".nav1 div").click(function(){
  	$(".ce").animate({width:"70%"},300)	
  })
  $(".zuihou").click(function(){
  	$(".ce").css("width","0%");
  })
  $(".b").click(function(){
  	
  	$(".erji").fadeIn(300)
  })
  $(".f").click(function(){
  	$(".erji").fadeOut(300)
  })
})
