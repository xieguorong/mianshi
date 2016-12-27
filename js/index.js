$(function(){
	$(".jiantou").mouseover(function(){
		$(".jiantou").css("animation","one 5s running 2s")
	})
	/*fangzi*/
	/*楼层跳转*/

jQuery(document).ready(function($){
	$(".fix li a").click(function(event){
		var index=this.title
		var id='#'+'index'+index
		$("html,body").animate({scrollTop:$(id).offset().top},1000);
	});
})
// $(".fix li a").click(function(){
// 	location.reload();
// })
// $(window).scroll(function () {
//         var scrollTop = $(this).scrollTop();
//         // alert(scrollTop)
//         // var scrollHeight = $(document).height();
//         // alert(scrollHeight)
//         var windowHeight = $(this).height();
//         // alert(windowHeight)
//         if (scrollTop  == windowHeight+68||scrollTop  == 2*windowHeight+68) {
//          location.reload()
// }
// })
$(".gifs").hover(function(){

	$(".gifa").css("animation","onee 1s ease forwards")
},function(){
	$(".gifa").css("animation","one 1s ease forwards")
})
/*楼层*/
$("#fullpage").fullpage({
	 navigation: true,
    navigationTooltips: ['首页', '关于我', '工作经历', '我的技能', '所作项目']
});

var flag2=true;
$(".menu2").click(function () {
	if(flag2){
		$(".menutop").css({"transform":"translate(0,6px) rotate(45deg)"})
		$(".menubottom").css({"transform":"translate(0,-6px) rotate(-45deg)"})
		$(".erji ul li").each(function (index,obj){
          $(obj).css({
          	opacity:"0",
          	transform:"rotateX(90deg)",
          	animation:"menu 1.5s linear forwards"+index*0.2+"s",
          })
		})
		flag2=false;
	}else{
		$(".menutop").css("transform","translate(0,0px) rotate(0deg)");
		$(".menubottom").css("transform","translate(0,0px) rotate(0deg)");
		$(".erji ul li").each(function (index,obj){
          $(obj).css({
          	opacity:"1",
          	transform:"rotateX(0deg)",
          	animation:"menu1 1.5s linear forwards"+(1.2-index*0.2)+"s",
          })
		})
		flag2=true;
	}
})

	
})