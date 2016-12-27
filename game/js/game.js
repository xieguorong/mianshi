function person(canvas,cobj,run,jump){
	this.canvas=canvas;
	this.cobj=cobj;
	this.run=run;
	this.jump=jump;
	this.x=0;
	this.y=460;
	this.width=120;
	this.height=120;
	this.speedx=6;
    this.status="run";
    this.state=0;
    this.num=0;
    this.life=3;
}
person.prototype={
	draw:function(){
		this.cobj.save();
		this.cobj.translate(this.x,this.y);
		this.cobj.drawImage(this[this.status][this.state],0,0,200,200,0,0,this.width,this.height);
		this.cobj.restore();
	},
	  update:function () {
        this.x+=this.speedx;
    }
}
//创建障碍物
function  hinder(canvas,cobj,hinders){
	this.canvas=canvas;
	this.cobj=cobj;
	this.hinders=hinders;
	this.x=this.canvas.width-20;
	this.y=520;
	this.width=56;
	this.height=40;
	this.state=0;
}
hinder.prototype={
	draw:function(){
		this.cobj.save();
		this.cobj.translate(this.x,this.y);
		this.cobj.drawImage(this.hinders[this.state],0,0,56,40,0,0,this.width,this.height);
		this.cobj.restore();
	}
}
//子弹
function zidan(canvas,cobj,zhi) {
    this.canvas=canvas;
    this.cobj=cobj;
    this.zhi=zhi;
    this.x=0;
    this.y=0;
    this.width=45;
    this.height=30;
    this.color="green";
    this.speedx=5;
    this.jia=1;
    this.state=0;
}
zidan.prototype = {
    draw:function () {
        // var cobj=this.cobj;
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.drawImage(this.zhi[this.state],0,0,450,300,0,0,this.width,this.height);
        this.cobj.restore();
    }
}
//血
function lizi(canvas,cobj,person) {
    this.canvas=canvas;
    this.cobj=cobj;
    this.x=person.x+person.width/2;
    this.y=person.y+person.height/2;
    this.r=1+2*Math.random();
    this.sheepx=6*Math.random()-3;
    this.sheepy=6*Math.random()-3;
    this.zhongli=0.3;
    this.sheepr=0.1;
    this.color="red";
}
lizi.prototype={
    draw:function () {
        var cobj=this.cobj;
        cobj.save();
        cobj.beginPath();
        cobj.translate(this.x,this.y);
        cobj.fillStyle=this.color;
        cobj.arc(0,0,this.r,0,2*Math.PI);
        cobj.fill();
        cobj.restore();
    },
    update:function () {
        this.x+=this.sheepx;
        this.sheepy+=this.zhongli;
        this.y+=this.sheepy;
        this.r-=this.sheepr;
    }
}
function xue(canvas,cobj,person) {
    var arr=[];
    for(var i=0;i<30;i++){
        var obj=new lizi(canvas,cobj,person)
        arr.push(obj);
    }
    var t=setInterval(function () {
        for(var i=0;i<arr.length;i++){
            arr[i].draw();
            arr[i].update();
            if(arr[i].r<0){
                arr.splice(i,1)
            }
        }
        if(arr.length==0){
            clearInterval(t)
        }
    },40)
}

//游戏主类
function game(canvas,cobj,run,jump,hinders,jifen,zhi,lif,runa,hita){
    this.canvas=canvas;
	this.cobj=cobj;
	this.hinders=hinders;
    this.lif=lif;
    this.runa=runa;
    this.hita=hita;
    this.jifen=jifen;  
    this.width=this.canvas.width;
    this.height=this.canvas.height;
    this.num=0;
    this.num1=0;
    this.num2=0;
    this.back=0;
    this.backspeed=6;
	this.score=0;    
	this.person=new person(canvas,cobj,run,jump);
	this.hinderArr=[];
	this.isfire=false;
    this.flag=true;
	this.zidan=new zidan(canvas,cobj,zhi);
    this.rand=(4+Math.ceil(6*Math.random()))*1000;
    this.isrun=false;
}
game.prototype={
   play:function(mask){
         this.key();
          this.mouse();
          this.runa.play();
		  var that=this;	
		setInterval(function(){
			that.num++;
			  that.num1+=6;
              that.num2+=50;
			that.cobj.clearRect(0,0,that.width,that.height);
			if(that.person.status=="run"){
				that.person.state=that.num%6;
			}else{
				that.person.state=0;
			}
		 //人物的x发生变化,
        that.person.x+=that.person.speedx;
        if(that.person.x>that.width/3){
            that.person.x=that.width/3;
        }
        that.person.draw();
          // 背景图
        that.back-=that.backspeed;
        that.canvas.style.backgroundPositionX=that.back+"px";
         // 操作子弹
            if(that.isfire){
            that.zidan.speedx+=that.zidan.jia;
            that.zidan.x+=that.zidan.speedx;
            that.zidan.draw();
        }
			//判断障碍物
		   if( that.num2%that.rand==0){
            that.num2=0;
            // 障碍物出现的时间			
				var obj=new hinder(that.canvas,that.cobj,that.hinders);
			     obj.state=Math.floor(Math.random()*that.hinders.length);
				that.hinderArr.push(obj);		
			}
			for(var i=0;i<that.hinderArr.length;i++){
				that.hinderArr[i].x-=that.backspeed;
				that.hinderArr[i].draw();
				if(hitPix(that.canvas,that.cobj,that.person,that.hinderArr[i])){
			            if(!that.hinderArr[i].flag){
			            	xue(that.canvas,that.cobj,that.person);
							that.person.life--;
                            that.lif.style.width=100-(that.person.life)*33+"%";
							 if(that.person.life==0){
                                that.lif.style.width=0+"%";
                        that.runa.pause();
                        that.hita.play();
                        that.canvas.style.backgroundPositionX="0px";
                         mask.css({display:"block",animation:"mask 0.5s ease forwards"});
                    };

                    that.hinderArr[i].flag=true;

						}	

				}

				if(that.person.x>that.hinderArr[i].x+that.hinderArr[i].width){
					if(!that.hinderArr[i].flag&&!that.hinderArr[i].flag1){
						that.score++;
						  that.jifen.innerHTML=that.score;
                    that.hinderArr[i].flag1=true;
					}

				}
                // 子弹碰到障碍物
            if(hitPix(that.canvas,that.cobj,that.zidan,that.hinderArr[i])){
                if(!that.hinderArr[i].flag){
                    that.hinderArr[i].splice(i,1)
                    that.score++;
                    that.jifen.innerHTML=that.score;
                    // that.finderarr[i].flag=true;
                }
            }
        }
        
               
		},50)

	},
	  mouse:function (canvas) {
        var that=this;       
        document.querySelector("canvas").onclick=function () {
            that.zidan.x=that.person.x+that.person.height*0.8;
            that.zidan.y=that.person.y+that.person.height/1.8;
            that.zidan.speedx=10;
            that.isfire=true;
        }
    },
	key:function () {
		var that=this;
		var flag=true;
		document.onkeydown=function(e){
			if(!flag){
				return;
			}
			flag=false;
			if(e.keyCode==32){
				that.person.status="jump";
				var inita=0;
				var speeda=5;
				var r=100;
				var initY =that.person.y;
			  var t=setInterval(function(){
					inita+=speeda;
				if(inita>=180){
					clearInterval(t);
					that.person.y=initY ;
					that.person.status="run";
					flag=true;
				}else{
					var top=Math.sin(inita*Math.PI/180)*r;
					that.person.y=initY -top;
				}
				},50)
			}
		}
	}

}