var gameInterval=0;
		var canvas;
		var ctx;
		var width = 400; 				
		var height = 400; 				
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
		var start		= true;
		var crash		= false;


		function init(speed_) {
			if (start) {
				canvas = document.getElementById('my_canvas');
				ctx = canvas.getContext("2d");
				width = canvas.width;
				height = canvas.height;
				padWidth = 50;
				padHeight = 50;
				padX = width/2;
				padY = height/2;
				radian=(Math.PI/180)*0;
				start = false;
			}			
			speed=speed_;
			clearInterval(gameInterval);
			gameInterval = setInterval(draw, 20);
		}

		// resizing the canvas width and height
		function resize() {

 			if(start) {
 				init(6);
 				resize();
 			}

			if(document.getElementById('width1').value >= 150 || document.getElementById('height1').value >= 150) {
				if(document.getElementById('width1').value > 150 && document.getElementById('width1').value < 1000) {
					canvas.width  = document.getElementById('width1').value;
					width = canvas.width;
				}
				if(document.getElementById('height1').value > 150 && document.getElementById('height1').value < 1000) {
					canvas.height = document.getElementById('height1').value;
					height = canvas.height;
				}
			} else if(start == false) {
				alert('Please enter width/height higher than 150');
			}
			padX = width/2;
			padY = height/2;
			radian=(Math.PI/180)*0;
		}
		// reseting the canvas width and height
		function reset() {

			width = 450;
			canvas.width = width;
			height = 450;
			canvas.height = height;
			if(start) {
			padX = width/2;
			padY = height/2;
			radian=(Math.PI/180)*0;
 			}
		}

		// resizing the robot width and height
		function robo_resize() {
			if(document.getElementById('width_r').value >= 1 || document.getElementById('height_r').value >= 1) {
				if(document.getElementById('width_r').value >= 1 && document.getElementById('width_r').value < 100) {
					padWidth = document.getElementById('width_r').value;
				}
				if(document.getElementById('height_r').value >= 1 && document.getElementById('height_r').value < 100) {
					padHeight = document.getElementById('height_r').value;
				}
			} else if(start == false) {
				alert('Please enter width/height for the robot higher than 1');
			}
			padX = width/2;
			padY = height/2;
			radian=(Math.PI/180)*0;
		}

		// resetting the robot width and height
		function robo_reset() {
			padWidth = 50;
			padHeight = 50;
			padX = width/2;
			padY = height/2;
			radian=(Math.PI/180)*0;
		}

		function draw() {
			disply();
			check_rect_angles();
			if (padX + padWidth/2 < width && padX > padWidth/2) {						
				if (rightDown) {						
					radian+=(Math.PI/180)*speed;							
				}else if (leftDown) {					
					radian-=(Math.PI/180)*speed;					
				}			
			}

			if (padY + (padHeight/2) < height && padY > padHeight/2){
				if (upDown){
					calc_coord();	
					if(padX + padWidth/2 > width){
						crash=true;
						padX-=speed+1;			
					}
					if(padX < padWidth/2){
						crash=true;
						padX+=speed+1;
					}
				}else if (downDown){
					calc_coord();
					if(padX + padWidth/2 > width)
						padX-=speed+1;			
					if(padX < padWidth/2)
						padX+=speed+1;		
				}
			}else if (padHeight/2 + padY < height) {
				padY += speed + 1;
				crash=true;	
			}else{
				padY -= speed + 1;   	
				crash=true;						
			}
		}

		function check_rect_angles(){
			if( padX+check_angleX(1) > width || padX+check_angleX(2) > width || padX+check_angleX(3) > width || padX+check_angleX(4) > width || 
				padX+check_angleX(1) < 0 || padX+check_angleX(2) < 0 || padX+check_angleX(3) < 0 || padX+check_angleX(4) < 0 ||
				padY+check_angleY(1) > height || padY+check_angleY(2) > height || padY+check_angleY(3) > height || padY+check_angleY(4) > height ||
				padY+check_angleY(1) < 0 || padY+check_angleY(2) < 0 || padY+check_angleY(3) < 0 || padY+check_angleY(4) < 0 ){
				crash=true;
			}else{
				crash=false;	
			}
		}

		function check_angleX(angle){
			var x=0;
			degrees=make_degrees();

			if(angle==1){
				x=Math.cos((Math.PI/180)*90-(Math.PI/180)*degrees)*padHeight/2;
				return x-( Math.cos((Math.PI/180)*degrees)*padWidth/2);
			}else if(angle==2){
				x=Math.cos((Math.PI/180)*90-(Math.PI/180)*degrees)*padHeight/2;
				return x+( Math.cos((Math.PI/180)*degrees)*padWidth/2);
			}else if(angle==3){
				x= -Math.sin((Math.PI/180)*degrees)*padHeight/2;
				return x+( Math.cos((Math.PI/180)*degrees)*padWidth/2);
			}else if(angle==4){				
				x=Math.sin((Math.PI/180)*degrees)*padHeight/2;
				return -(x+( Math.sin((Math.PI/180)*90-(Math.PI/180)*degrees)*padWidth/2));
			}
		}

		function check_angleY(angle){
			var y=0;
			degrees=make_degrees();

			if(angle==1){
				y= -Math.sin((Math.PI/180)*90-(Math.PI/180)*degrees)*padHeight/2;
				return y-( Math.sin((Math.PI/180)*degrees)*padWidth/2);
			}else if(angle==2){
				y= -Math.sin((Math.PI/180)*90-(Math.PI/180)*degrees)*padHeight/2;
				return y+( Math.sin((Math.PI/180)*degrees)*padWidth/2);
			}else if(angle==3){
				y= Math.cos((Math.PI/180)*degrees)*padHeight/2;
				return y+( Math.sin((Math.PI/180)*degrees)*padWidth/2);
			}else if(angle==4){				
				y= -Math.cos((Math.PI/180)*degrees)*padHeight/2;
				return -(y+( Math.cos((Math.PI/180)*90-(Math.PI/180)*degrees)*padWidth/2));
			}
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
			if(crash){
				ctx.fillStyle= "red";
				ctx.font = "bold 25pt Calibri";
				ctx.fillText("CRASH", width/2-45, height/2);
			}
			ctx.fillStyle = objectColor;
			ctx.save();		
			ctx.translate(padX,padY);	
			ctx.rotate(radian);			
			ctx.rect(-padWidth/2,-padHeight/2,padWidth,padHeight);	
			ctx.font = "bold 30pt Calibri";
			ctx.fillText("*",-padWidth/6,-padHeight/3);	
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