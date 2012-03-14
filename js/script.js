		var gameInterval=0;
		var canvas;
		var ctx;
		var width; 				
		var height; 				
		var bgColor 	= "black";	
		var objectColor = "white";	
		var padX; 					
		var padY; 					
		var padWidth;				
		var padHeight;				
		var padColor 	= "red";	
		var rightDown 	= false;
		var leftDown 	= false;
		var upDown 		= false;
		var downDown 	= false;
		var radian;		
		var degrees;
		var speed;
		var start = true;
		
		function init(speed_) {
			if (start) {
			canvas = document.getElementById('my_canvas');
			ctx = canvas.getContext("2d");			
			width = canvas.width;
			height = canvas.height;
			padWidth = 45;
			padHeight = 45;
			padX = width/2;
			padY = height/2;
			radian=(Math.PI/180)*0;
			start = false;

			}
			speed=speed_;

			clearInterval(gameInterval);
			gameInterval = setInterval(draw, 20);
		}

		function draw() {
			disply();

			if (padX + (padWidth/2) < width && padX > padWidth/2) {						
				if (rightDown) {						
					radian+=(Math.PI/180)*speed;							
				}else if (leftDown) {					
					radian-=(Math.PI/180)*speed;					
				}			
			} else if (padX + padWidth/2 < width) padX += 1;			
			else padX -= 1;

			if (padY + (padHeight/2) < height && padY > padHeight/2){
				if (upDown){
					calc_coord();	
					if(padX + (padWidth/2) > width)
						padX-=speed+1;			
					if(padX < padWidth/2)
						padX+=speed+1;
				}
				else if (downDown){
					calc_coord();
					if(padX + (padWidth/2) > width)
						padX-=speed+1;			
					if(padX < padWidth/2)
						padX+=speed+1;		
				}
			} else if (padHeight/2 + padY < height) padY += 1;			
			else padY -= 1;   				
		}

		function calc_coord(){			
			degrees=make_degrees();
			
			if(degrees >= 0 && degrees <= 90){
				if(upDown){
					padX+=calc_distance_cos(90);
					padY-=calc_distance_sin(90);
				}else if(downDown){
					padX-=calc_distance_cos(90);
					padY+=calc_distance_sin(90);
				}			
			}else if(degrees > 90 && degrees <= 180){
					if(upDown){
						padX+=calc_distance_sin(180);
						padY+=calc_distance_cos(180);
					}else if(downDown){
						padX-=calc_distance_sin(180);
						padY-=calc_distance_cos(180);
					}
			}else if(degrees > 180 && degrees <= 270){
					if(upDown){
						padX-=calc_distance_cos(270);
						padY+=calc_distance_sin(270);
					}else if(downDown){
						padX+=calc_distance_cos(270);
						padY-=calc_distance_sin(270);
					}
			}else if(degrees > 270 && degrees <= 360){
					if(upDown){
						padX-=calc_distance_sin(360);
						padY-=calc_distance_cos(360);
					}else if(downDown){
						padX+=calc_distance_sin(360);
						padY+=calc_distance_cos(360);
					}
			}			
		}

		function calc_distance_sin(val){
			return Math.sin( ((Math.PI/180)*val)-((Math.PI/180)*degrees) ) * speed;
		}

		function calc_distance_cos(val){
			return Math.cos( ((Math.PI/180)*val)-((Math.PI/180)*degrees) ) * speed;
		}
			
		function make_degrees(){
			var val=radian/(Math.PI/180);	
					
			while(val>360 || val<-360){				
					if(val>360)
						val-=360;			
					else val+=360;
			}
			if(val<0)
				val=360+val;		
			return val;
		}

		function disply() {						
			ctx.beginPath();
			ctx.fillStyle = bgColor;						
			clear();					
			ctx.fillStyle = objectColor;
			ctx.save();		
			ctx.translate(padX,padY);	
			ctx.rotate(radian);			
//			ctx.font = "15pt Calibri";
//    		ctx.fillText(make_degrees(), -50, -50);
			a = ctx.rect(-padWidth/2,-padHeight/2,padWidth,padHeight);	
			ctx.restore();
			ctx.fillStyle = "brown";
    		ctx.fill();
    		ctx.lineWidth = 3;
    		ctx.strokeStyle = "white";
    		ctx.stroke(); 	
		}

		function clear() { 				
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			rect(0, 0, width, height);
		}

		function rect(x, y, width, height) {			
			ctx.beginPath();
			ctx.fillRect(x, y, width, height);
			ctx.closePath();
		}

		function onKeyDown(evt) {
			if (evt.keyCode == 39)
				rightDown = true;
			else if (evt.keyCode == 37)
				leftDown = true;
			else if (evt.keyCode == 38)
				upDown = true;
			else if (evt.keyCode == 40)
				downDown = true;
		}

		function onKeyUp(evt) {
			if (evt.keyCode == 39)
				rightDown = false;
			else if (evt.keyCode == 37)
				leftDown = false;
			else if (evt.keyCode == 38)
				upDown = false;
			else if (evt.keyCode == 40)
				downDown = false;
		}

		document.addEventListener('keydown',onKeyDown);
		document.addEventListener('keyup',onKeyUp);
