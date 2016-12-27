window.onload=function(){

var w=document.documentElement.clientWidth;
var h=document.documentElement.clientHeight;
var floor=document.querySelector(".panel:first-child");
var ceil=document.querySelector(".panel:nth-child(4)");
floor.style.width=floor.style.height=ceil.style.width=
ceil.style.height=""+w+"px";
ceil.style.top=-(w-h)+"px";
document.onmousedown=function(e)
}
