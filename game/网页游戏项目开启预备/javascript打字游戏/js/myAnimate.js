function css (obj,attr,val) {
		if (obj.nodeType!==1) {
			return;
		}
		var attr=attr.replace(/^\s*|\s*$/g,"");

		if (arguments.length ==2) {
			//���Ԫ�ص�͸��ֵ
			if (attr=="opacity") {
				return parseFloat(obj.currentStyle ? obj.currentStyle[attr] || 1 : getComputedStyle(obj,null)[attr] || 1)*100
			}
			//���Ԫ�ص�offset����
			if (attr=="width" || attr=="height" || attr=="left" || attr=="top") {
				var attr="offset"+attr.replace(attr.charAt(0),attr.charAt(0).toUpperCase());
				return obj[attr];
			}
			if(attr=="scrollTop" || attr=="scrollLeft"){
				return obj[attr]; 
			}
			return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,null)[attr]
		}
		//��Ԫ�ظ�ֵ
		if (arguments.length == 3) {
			switch(attr){
				case "width":
				case "height":
				case "left":
				case "right":
				case "top":
				case "bottom":
				obj.style[attr]=val+"px";
				break;
				case "opacity":
				obj.style[attr]=val/100;
				obj.style.filter="alpha(opacity="+val+")";
				break;
				case "scrollTop":
				case "scrollLeft":
				obj[attr]=val;
				break;
				default:
				obj.style[attr]=val;
			}
		}
	}
	//���Ķ��� ѭ���ƶ�
	function myflash (obj,attr,stop,speed) {
		var start = css(obj,attr);
		var end=start;
		var tmp = 0;
		obj.time = setInterval(function () {
				if(tmp <= stop){
					tmp+=speed
					start+=speed;
					if(start>stop){
						start=stop;
					}
					css(obj,attr,start);
					
					
				}else{
					start-=speed;
					if(start<end){
						start=end;
					}
					css(obj,attr,start);
					if (start==end) {
						tmp = 0;
					}
				
				}

				
		},60)
	}
	//���Ķ��� �ݱ�ڶ���
	function myflash1 (obj,myobj,speed) {
		obj.time = setInterval(fun,60)
		function fun() {
			for (var i in myobj) {
				var start=css(obj,i);
				var end=myobj[i];
				var onOff=true;
				if(start>end){
					onOff=false;
				}
				if(onOff){
					if(start==end){
						clearInterval(obj.time);
					}else{
						start+=speed;
						if (start>end) {
							start=end;
						}
						css(obj,i,start);
					}
				}
				if(!onOff){
					if(start==end){
						clearInterval(obj.time);
					}else{
						start-=speed;
						if (start<end) {
							start=end;
						}
						css(obj,i,start)
					}
				}
			}
		}
	}
	//���ĺ��� �ݱ������
	function myAnim(obj,myobj,speed,callback) {
		obj.time=setInterval(fun,60);
		function fun() {
			for (var i in myobj) {
				var start=css(obj,i);
				var end=myobj[i];
				var onOff = true;
				if(start!==end){
					onOff=false;
					if(start<end){
						start+=speed;
						if(start>end){
							start=end;
						}
					}
					if(start>end){
						start-=speed;
						if(start<end){
							start=end;
						}
					}
					css(obj,i,start);
				}
				if(onOff){
					clearInterval(obj.time);
					if(callback){
						callback();
					}
				}
			}
		}
	}
/*************************************���Ķ�������***********************************************/
//    t--- current time����ǰʱ�䣩��0 +=60
//	  b--- beginning value����ʼֵ����
//	  c--- change in value���仯������end-start
//	  d---duration������ʱ�䣩  5000

	function myAnimate (obj,myobj,dur,ween,callback) {
		var callfun,tween
		if(arguments.length==4){
			if(ween.length>=4){
				tween=ween;
				callfun=null;
			}else{
				callfun=ween;
				tween=Tween.Linear;
			}
		}else{
			tween=ween ? ween : Tween.Linear;
			callfun=callback ? callback : null;
		}
		var start=[],change=[],time=0;
		for (var i in myobj) {
			//��ó�ʼֵ
			start[i]=css(obj,i);
			//��ñ仯��
			change[i]=myobj[i]-start[i];
		}
		obj.time=setInterval(function(){
			var onOff = true;
			if(time<dur){
				onOff = false;
				for (var i in myobj) {
					css(obj,i,tween(time,start[i],change[i],dur))
				}
			time+=60;
			}
			if(onOff){
				clearInterval(obj.time);
				for (var i in myobj) {
					css(obj,i,myobj[i]);
				}
				if(callfun){
					callfun();
				}
			}
			
		},60);
	}



  //�����㷨
            /*
		    Linear���޻���Ч��(�����˶�)��
			Quad�����η��Ļ�����
			Cubic�����η��Ļ���
			Quartic���Ĵη��Ļ�����
			Quintic����η��Ļ�����
			Sinusoidal���������ߵĻ�����
			Exponential��ָ�����ߵĻ�����
			Circular��Բ�����ߵĻ�����
			Elastic��ָ��˥�����������߻�����
			Back��������Χ�����η���������
			Bounce��ָ��˥���ķ���������
			

			ÿ��Ч����������������ʽ�����������ֱ��ǣ�
			easeIn����0��ʼ���ٵ��˶���
			easeOut�����ٵ�0���˶���
			easeInOut��ǰ��δ�0��ʼ���٣����μ��ٵ�0���˶���
			


			�������ĸ������ֱ����
				t--- current time����ǰʱ�䣩��0 +=60
				b--- beginning value����ʼֵ����
				c--- change in value���仯������end-start
				d---duration������ʱ�䣩  5000
			Tween.Quad.easeInt()
	     	����Ľ�����ǵ�ǰ���˶�·�̡�
           
		   ������:Code����
		   �������Ͳ��Եĵط�ϣ����λ������������
		   50
          */
  
 Tween = {  
    Linear: function(t,b,c,d){ return c*t/d + b; },
    Quad: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c*(t/=d)*(t-2) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    },
    Quart: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        }
    },
    Quint: {
        easeIn: function(t,b,c,d){
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOut: function(t,b,c,d){
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        }
    },
    Sine: {
        easeIn: function(t,b,c,d){
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOut: function(t,b,c,d){
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function(t,b,c,d){
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOut: function(t,b,c,d){
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOut: function(t,b,c,d){
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function(t,b,c,d){
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOut: function(t,b,c,d){
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOut: function(t,b,c,d){
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
        },
        easeInOut: function(t,b,c,d,a,p){
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        }
    },
    Back: {
        easeIn: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158; 
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function(t,b,c,d){
            return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
        },
        easeOut: function(t,b,c,d){
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOut: function(t,b,c,d){
            if (t < d/2) return Tween.Bounce.easeIn(t*2, 0, c, d) * .5 + b;
            else return Tween.Bounce.easeOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
        }
    }
 }