window.onload=function(){
    var cx=document.documentElement.clientWidth;
    var cy=document.documentElement.clientHeight;
var scene=document.querySelector(".scene");
var room=document.querySelector(".room");
var panel3=document.querySelector(".room .panel:nth-child(3)");
room.style.transformOrigin="center center "+cx/2+"px";
var floor=document.querySelector(".panel1");
var ceil=document.querySelector(".panel5");
ceil.style.top=-(cx-cy)+"px";
floor.style.width=floor.style.height=ceil.style.width=ceil.style.height=cx+"px";
var lastpanel=document.querySelector(".room .panel:nth-child(6)");
    lastpanel.style.transform="translate3d(0,0,"+cx+"px)";
    //

    panel3.onclick=function(){
        room.style.transition="transform 2s ease ";
        room.style.transform="translate3d(0,0,-500px) rotate3d(0,1,0,180deg)";
    }

    var angle1=0,angle=0;
    var flag1=false;
    document.onmousedown=function(e) {
        var ex = e.clientX;
        var ey = e.clientY;
        document.onmousemove = function (e) {
            flag1=true;
            room.style.transition="none";
            var movex = e.clientX;
            var movey = e.clientY;
             e.preventDefault();
            angle=Math.abs(movex-ex)>Math.abs(movey-ey)?movex-ex:movey-ey;
            room.style.transform="translate3d(0,0,-500px) rotate3d(0,1,0,"+(angle1+angle)+"deg)";
        }
          document.onmouseup=function(){
            if(flag1){
                angle1+=angle;
            }
            flag1=false;
            document.onmousemove=null;
            document.onmouseup=null;
        }
        e.preventDefault();
    }
     var panels=document.querySelectorAll(".panel");
    var flag=true;
    for(var i=0;i<panels.length;i++){
        if(i<(panels.length-1)){
            panels[i].ondblclick=function(){
                room.style.transition="transform 2s ease";
                if(flag){
                    room.style.transform="translate3d(0,0,200px) rotate3d(0,1,0,"+angle1+"deg)";
                    flag=false;
                }else{
                    room.style.transform="translate3d(0,0,-500px) rotate3d(0,1,0,"+angle1+"deg)";
                    flag=true;
                }

            }
        }
    }
}