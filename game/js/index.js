$(function(){
    var cx=document.documentElement.clientWidth;
    var cy=document.documentElement.clientHeight;
    //var arr= 
    var canvas=document.getElementsByTagName("canvas")[0];
    canvas.width=cx;
    canvas.height=cy;
    var cobj=canvas.getContext("2d");
    var run=document.querySelectorAll(".run");
    var jump=document.querySelectorAll(".jump");
    var runa=document.querySelector(".runa");
    var jifen=document.querySelector(".jifen")
    var zhi=document.querySelectorAll(".zhi");
     var runa=document.querySelector(".runa")
    var hita=document.querySelector(".hita")
     var lif=document.querySelector(".pres")
    var start=$(".start");
    var mask=$(".mask");
    var hinders=document.querySelectorAll(".hinder");
    //开始按钮
    var startbutton=$(".btn");
    startbutton.click(function(){
      $(".mingg").css("display","none")
        $(".start").css("display","none");
        $(".btn").css("display","none");
        $(".wen").css("display","none");
        $(".jifen").css("display","block");
        $(".life").css("display","block");
        $("canvas").css({background:"url(img/back.jpg) repeat-x",
         backgroundSize:"100% 100%"
        });
         var gamePlay=new game(canvas,cobj,run,jump,hinders,jifen,zhi,lif,runa,hita);
        gamePlay.play(mask);
       
    })
  $(".back").click(function(){
      location.reload();
  })
    $(".wen").click(function(){
        $(".start").css({display:"block",animation:"start 0.5s ease forwards"});
    })
    $(".close").click(function(){
        $(".start").css({display:"block",animation:"start1 0.5s ease forwards"});
    })
//一件事件只执行一次
    $(".active").show();
    $(".onactive").hide();
  $(".active").click(function(){
      $(".active").hide();
      $(".onactive").show();
      runa.pause();
  })
    $(".onactive").click(function(){
        $(".active").show();
        $(".onactive").hide();
        runa.play();
    })
})


	

