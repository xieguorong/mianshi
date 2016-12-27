$(function(){
    var now=0,next=0,time=0;
    var flag=true;
    function move(){
        next++;
        if(next>=$(".banner>div").length){
            next=0;
            flag=false;
        }
        $(".banner>div").eq(now).animate({width:"80%",height:"80%",opacity:"0.5"},1000).css("zIndex",0);
        $(".banner>div").eq(next).animate({left:0},1000,function(){
            $(".banner>div").eq(now).animate({left:"100%",width:"100%",height:"100%",opacity:"1"});
            now=next;
            time=0;
            flag=true;
        }).css("zIndex",1);
    }
    function move1(){
        time+=50;
        var bili=time/3000;
        if(bili>1){bili=1};
        $(".progress").eq(now).css({width:bili*100+"%"});
        if(flag==false){
            $(".progress").css("width",0);
        }
    }
    var t1=setInterval(move,4000);
    var t2=setInterval(move1,50);
    $(window).focus(function(){
        t1=setInterval(move,4000);
        t2=setInterval(move1,50);
    })
    $(window).blur(function(){
        clearInterval(t1,t2);
    })

    $(".point>li").click(function(){
        next=$(this).index(".point>li");
        stop();
    })
    $(".pre").click(function(){
        next--
        if(next==-1){
            next=2;
        }
        stop();
    })
    $(".next").click(function(){
        next++
        if(next==3){
            next=0;
        }
        stop();
    })
    function stop(){
        /*定时器停掉*/
        clearInterval(t1);
        clearInterval(t2);

        /*按钮的变化*/
        $(".point>li").find(".progress").css("width",0);
        $(".point>li").eq(next).find(".progress").css("width","100%");

        /*轮播图发生变化*/
        if(next>now){
            $(".banner>div:eq("+now+")").animate({width:"80%",height:"80%"}).css("zIndex",0);

            $(".banner>div:eq("+next+")").animate({left:0},function(){
                $(".banner>div:eq("+now+")").css({
                    left:"100%",width:"100%",height:"100%"
                })
                now=next;

            }).css("zIndex",1)
        }else{
            $(".banner>div:eq("+now+")").animate({left:"100%"}).css("zIndex",1);
            $(".banner>div").eq(next).css({
                width:"80%",height:"80%",left:0
            }).animate({width:"100%",height:"100%"},function(){
                now=next;
            })


        }
    }

    $(".small_nav").hide();
    $(window).resize(function(){
        if($(window).width()<=735){
            $(".small_nav").hide();

        }else{
            $(".foot_son").show();
        }
    })

    $(".footcen .head").on("click",function(){
        $(this).siblings(".foot_son").slideToggle();
    })
    $(".menu_open").on("click",function(){
        $(".small_nav").slideDown(1000);
        // $(".header").hide(1000);
        // $(".banner").hide();
        // $(".pic").hide();
        // $("footer").hide();
    })
    $(".menu_close").on("click",function(){
        $(".small_nav").slideUp(1000);
        $(".header").show();
        $(".banner").show();
        $(".pic").show();
        $("footer").show();
    })
})