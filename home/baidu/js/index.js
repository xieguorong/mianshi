$(function () {
   $(document).mousedown(function (e) {
       e.preventDefault()
   });
    $(document).mouseover(function (e) {
        e.preventDefault()
    });
    var clientH=$(window).height();

    var num=0;
    
    var flag=true;
    function up() {
        if (!flag){
            return
        }
        num++;
        if (num>=$("#fullpage>section").length){
            num=$("#fullpage>section").length-1;
            return
        }
        flag=false;
        $("#fullpage").css({
            marginTop:-num*clientH
        })
        if (num!==0){
            $("section").eq(num).find(".title").css({
                transform:"translate(0,0)"
            });
            $("section").eq(num).find(".obj-transition").css({
                transform:"translate(0,0)"
            });
            $("section").not($("section").eq(num)).find(".obj-transition").css({
                transform:"translate(50px,0)"
            });
            $("section").not($("section").eq(num)).find(".title").css({
                transform:"translate(-50px,0)"
            })
        }
    }
    function down() {

        if (!flag){
            return
        }
        num--;
        if (num==-1){
            num=0;
            return
        }
        flag=false;
        $("#fullpage").css({
            marginTop:-num*clientH
        })
        if (num!==0){
            $("section").eq(num).find(".title").css({
                transform:"translate(0,0)"
            });
            $("section").eq(num).find(".obj-transition").css({
                transform:"translate(0,0)"
            })
            $("section").not($("section").eq(num)).find(".obj-transition").css({
                transform:"translate(50px,0)"
            })
            $("section").not($("section").eq(num)).find(".title").css({
                transform:"translate(-50px,0)"
            })
        }
        if (num==0){
            $(".bg-bottom .obj-ship").css({
                left:350
            })
        }else {
            $(".bg-bottom .obj-ship").css({
                left:300
            })
        }
    }
    touch.on("body","swipeup","#fullpage",function () {
        up()
    });
    touch.on("body","swipedown","#fullpage",function () {
        down()
    });
        $("#fullpage")[0].addEventListener("webkitTransitionEnd",function () {
            flag=true;
        });
    $("#fullpage")[0].addEventListener("mozTransitionEnd",function () {
        flag=true;
    });

    //滚轮事件
    $(document).bind("mousewheel",function (e) {
        var delta=e.wheelDelta>0?"Up":"Down";
        if (delta=="Up"){
            down()

        }
        if (delta=="Down"){
            up()
        }
    });



    // 小屏菜单
    var flag1=true;
    $(".menu-small").click(function () {

        if (flag1){
            $(".menu-small span").eq(0).css({
                transform:"translate(0,5px) rotate(45deg)"
            });
            $(".menu-small span").eq(1).css({
                transform:"translate(0,-5px) rotate(-45deg)"
            });
            $(".nav-bar").css("height","auto");
            $(".nav-bar a").css({
                transition:"transform .5s ease,opacity .5s ease,height .5s ease",
                height:"100%",
                opacity: 1,
                transform: "rotateX(0deg)"
            });
            $(".nav-bar a").each(function (index,obj) {
               $(obj).css({
                   transitionDelay:50*index+"ms"
               });
            });
            flag1=false
        }else {
            $(".menu-small span").eq(0).css({
                transform:"translate(0,0) rotate(0)"
            });
            $(".menu-small span").eq(1).css({
                transform:"translate(0,0) rotate(0)"
            });
            $(".nav-bar a").css({
                opacity: 0,
                transform: "rotateX(90deg)",
                height:0
            });
            $(".nav-bar a").each(function (index,obj) {
                $(obj).css({
                    transitionDelay:(350-50*index)+"ms"
                });

            });
            flag1=true;
        }
    });

    $(window).resize(function () {
        var clientW=$(window).width();
        clientH=$(window).height();
        $("#fullpage").css({
            marginTop:-num*clientH
        });
        if (clientW>=1000){
            $(".nav-bar a").css({
                transition:"none",
                opacity: 0,
                transform: "rotateX(90deg)",
                height:0

            });
            flag1=true;

            $(".menu-small span").eq(0).css({
                transform:"translate(0,0) rotate(0)"
            });
            $(".menu-small span").eq(1).css({
                transform:"translate(0,0) rotate(0)"
            });
        }

    })

});
