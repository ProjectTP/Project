		var gameInterval=0;
		var canvas;
		var ctx;
		var width 		= 400; 				
		var height 		= 400; 				
		var bgColor 	= "black";	
		var objectColor = "white";	
		var roboX; 					
		var roboY; 					
		var roboWidth;				
		var roboHeight;				
		var roboColor 	= "red";	
		var radian;		
		var degrees;
		var speed;
		var start		= true;
		var crash		= false;
		var lWheelPosX;
		var lWheelPosY;
		var rWheelPosX;
		var rWheelPosY;
		var distance    =0;
		var motorA		=false;
		var motorB		=false;
		var last_step   =0;
		var temp        =new Array();
		var get_path    =false;
		var pause_ 		=false;

		function init(speed_) {
			if (start) {
				canvas = document.getElementById('my_canvas');
				ctx = canvas.getContext("2d");
				width = canvas.width;
				height = canvas.height;
				roboWidth = 50;
				roboHeight = 53;
				lWheelWidth = 7;
				lWheelHeight = 40;
				rWheelWidth = 7;
				rWheelHeight = 40;
				roboX = width/2;
				roboY = height/2;
				lWheelX  = roboX;
				lWheelY = roboY;
				rWheelX = roboX;
				rWheelY = roboY;
				radian=(Math.PI/180)*0;
				start = false;
				lWheelPosX = -roboWidth/2 - 7;
				lWheelPosY = -roboHeight/2 + roboHeight/8;
				rWheelPosX = roboWidth/2;
				rWheelPosY = -roboHeight/2 + roboHeight/8;
				motorA=false;
				motorB=false;
				last_step=0;
				distance=0;
				crash=false;
				pause_=false;
				document.getElementById('play').disabled=true;	
				document.getElementById('pause').disabled=true;	
				document.getElementById('stop').disabled=true;
			}			
			speed=speed_;
			clearInterval(gameInterval);
			gameInterval = setInterval(draw, 20);
		}

		// resizing the canvas width and height
		function resize() {

 			if (start) {
 				init(6);
 				resize();
 			}

			if (document.getElementById('width1').value >= 150 || document.getElementById('height1').value >= 150) {
				if (document.getElementById('width1').value >= 150 && document.getElementById('width1').value <= 1000) {
					canvas.width  = document.getElementById('width1').value;
					width = canvas.width;
				}
				if (document.getElementById('height1').value >= 150 && document.getElementById('height1').value <= 1000) {
					canvas.height = document.getElementById('height1').value;
					height = canvas.height;
				}
			} else if (start == false) {
				popup('<img src="img/w.png" height="60" width="60"/> <br/> Please enter width/height higher than 150 and less than 1000.');
			}

			roboX = width/2;
			roboY = height/2;
			radian=(Math.PI/180)*0;
		}
		// reseting the canvas width and height
		function reset() {
			width = 450;
			canvas.width = width;
			height = 450;
			canvas.height = height;

			if (start) {
				roboX = width/2;
				roboY = height/2;
				radian=(Math.PI/180)*0;
 			}
 			document.getElementById('width1').value = "";
			document.getElementById('height1').value = "";
		}

		function resetpos() {
			roboX = width/2;
			roboY = height/2;
			radian=(Math.PI/180)*0;
		}

		// resizing the robot width and height
		function robo_resize() {
			if (document.getElementById('width_r').value >= 1 || document.getElementById('height_r').value >= 1) {
				if (document.getElementById('width_r').value >= 1 && document.getElementById('width_r').value < 100) {
					roboWidth = document.getElementById('width_r').value;
					lWheelPosX = -roboWidth/2 - 7;
					rWheelPosX = roboWidth/2;
				}
				if (document.getElementById('height_r').value >= 1 && document.getElementById('height_r').value < 100) {
					roboHeight = document.getElementById('height_r').value;
				}
				if (document.getElementById('height_r').value > 100 && document.getElementById('width_r').value > 100) {
					popup('<img src="img/w.png" height="60" width="60"/> <br/> Please enter height and width for the robot less than 100');
				} else if (document.getElementById('height_r').value > 100) {
					popup('<img src="img/w.png" height="60" width="60"/> <br/> Please enter height for the robot less than 100');
				} else if (document.getElementById('width_r').value > 100) {
					popup('<img src="img/w.png" height="60" width="60"/> <br/> Please enter width for the robot less than 100');
				}
			} else if (start == false) {
				popup('<img src="img/w.png" height="60" width="60"/> <br/> Please enter width/height for the robot higher than 1');
			}
			lWheelPosX = -roboWidth/2 - 7;
			rWheelPosX = roboWidth/2;
			lWheelPosX -= lWheelWidth -7;
			roboX = width/2;
			roboY = height/2;
			radian=(Math.PI/180)*0;
		}

		// resetting the robot width and height
		function robo_reset() {
			roboWidth = 50;
			roboHeight = 53;
			lWheelPosX = -roboWidth/2 - 7;
			lWheelPosX -= lWheelWidth -7;
			rWheelPosX = roboWidth/2;
			roboX = width/2;
			roboY = height/2;
			radian=(Math.PI/180)*0;
			document.getElementById('width_r').value = "";
			document.getElementById('height_r').value = "";
		}

		// resizing the robot wheels
		function wheel_resize() {
			if (document.getElementById('width_w').value >= 1 || document.getElementById('height_w').value >= 1) {
				if (document.getElementById('width_w').value >= 1 && document.getElementById('width_w').value <= 35) {
					lWheelWidth = document.getElementById('width_w').value;
					lWheelPosX = -roboWidth/2 - 7;
					lWheelPosX -= document.getElementById('width_w').value - 7;
					rWheelWidth = document.getElementById('width_w').value;
				}
				if (document.getElementById('height_w').value >= 1 && document.getElementById('height_w').value <= 100) {
					lWheelHeight = document.getElementById('height_w').value;
					rWheelHeight = document.getElementById('height_w').value;
				}
				if (document.getElementById('width_w').value > 35) {
					popup('<img src="img/w.png" height="60" width="60"/> <br/> Please enter width for the robot wheels less than 35');
				}
				if (document.getElementById('height_w').value > 100 && document.getElementById('width_w').value > 35) {
					if (document.getElementById('height_w').value > 100) {
						popup('<img src="img/w.png" height="60" width="60"/> <br/> Please enter height for the robot less than 100');
					}
					if (document.getElementById('width_w').value > 35) {
						popup('<img src="img/w.png" height="60" width="60"/> <br/> Please enter width for the robot wheels less than 35');
					}
				}
			roboX = width/2;
			roboY = height/2;
			}
		}

		// resetting the robot wheels
		function wheel_reset() {
			lWheelWidth = 7;
			lWheelHeight = 40;
			rWheelWidth = 7;
			rWheelHeight = 40;
			lWheelPosX = -roboWidth/2 - 7;
			lWheelPosX -= lWheelWidth -7;
			rWheelPosX = roboWidth/2;
			document.getElementById('width_w').value = "";
			document.getElementById('height_w').value = "";
		}

		function draw() {
			if(!pause_){
				document.getElementById('play').disabled=true;	
				display();
				check_rect_angles();

				if (roboX + roboWidth/2 < width && roboX > roboWidth/2) {						
					if (motorA && !motorB && distance>0) {						
						radian+=(Math.PI/180)*speed;
						recalc_distance();
					} else if (!motorA && motorB && distance>0) {	
						radian-=(Math.PI/180)*speed;
						recalc_distance();						
					}			
				}

				if (roboY + (roboHeight/2) < height && roboY > roboHeight/2) {
					if (motorA && motorB && distance>0) {
						recalc_distance();
						calc_coord();	
						if (roboX + roboWidth/2 > width) {
							crash=true;		
						}
						if (roboX < roboWidth/2) {
							crash=true;
						}
					} 
				} else if (roboHeight/2 + roboY < height) {
					crash=true;					
				} else if (roboHeight/2 + roboY > height + rWheelHeight) {
					ctx.font = "bold 50pt Calibri,Times New Roman";
					ctx.fillText("TESTING", width/2-100, height/2 + 10);	
				} else {			 	
					crash=true;	
				}	
			}				
		}

		// recalculate distance
		function recalc_distance(){
			if(distance>speed){
				distance-=speed;
			}else{
				distance=0;							
			}
		}

		// check if any angle of the robo is out of the table
		function check_rect_angles() {
			if ( roboX+check_angleX(1) > width || roboX+check_angleX(2) > width || roboX+check_angleX(3) > width || roboX+check_angleX(4) > width || 
				roboX+check_angleX(1) < 0 || roboX+check_angleX(2) < 0 || roboX+check_angleX(3) < 0 || roboX+check_angleX(4) < 0 ||
				roboY+check_angleY(1) > height || roboY+check_angleY(2) > height || roboY+check_angleY(3) > height || roboY+check_angleY(4) > height ||
				roboY+check_angleY(1) < 0 || roboY+check_angleY(2) < 0 || roboY+check_angleY(3) < 0 || roboY+check_angleY(4) < 0 ) {
				crash=true;
			} else {
				crash=false;	
			}
		}

		function check_angleX(angle) {
			var x=0;
			degrees=make_degrees();

			if (angle==1) {
				x=Math.cos((Math.PI/180)*90-(Math.PI/180)*degrees)*roboHeight/2;
				return x-( Math.cos((Math.PI/180)*degrees)*roboWidth/2);
			} else if (angle==2) {
				x=Math.cos((Math.PI/180)*90-(Math.PI/180)*degrees)*roboHeight/2;
				return x+( Math.cos((Math.PI/180)*degrees)*roboWidth/2);
			} else if (angle==3) {
				x= -Math.sin((Math.PI/180)*degrees)*roboHeight/2;
				return x+( Math.cos((Math.PI/180)*degrees)*roboWidth/2);
			} else if (angle==4) {				
				x=Math.sin((Math.PI/180)*degrees)*roboHeight/2;
				return -(x+( Math.sin((Math.PI/180)*90-(Math.PI/180)*degrees)*roboWidth/2));
			}
		}

		function check_angleY(angle) {
			var y=0;
			degrees=make_degrees();

			if (angle==1) {
				y= -Math.sin((Math.PI/180)*90-(Math.PI/180)*degrees)*roboHeight/2;
				return y-( Math.sin((Math.PI/180)*degrees)*roboWidth/2);
			} else if (angle==2) {
				y= -Math.sin((Math.PI/180)*90-(Math.PI/180)*degrees)*roboHeight/2;
				return y+( Math.sin((Math.PI/180)*degrees)*roboWidth/2);
			} else if (angle==3) {
				y= Math.cos((Math.PI/180)*degrees)*roboHeight/2;
				return y+( Math.sin((Math.PI/180)*degrees)*roboWidth/2);
			} else if (angle==4) {				
				y= -Math.cos((Math.PI/180)*degrees)*roboHeight/2;
				return -(y+( Math.cos((Math.PI/180)*90-(Math.PI/180)*degrees)*roboWidth/2));
			}
		}

		function calc_coord() {			
			degrees=make_degrees();

			if (degrees >= 0 && degrees <= 90) {
				if (motorA && motorB) {
					roboX+=calc_distance_cos(90);
					roboY-=calc_distance_sin(90);
				} 
			} else if (degrees > 90 && degrees <= 180) {
					if (motorA && motorB) {
						roboX+=calc_distance_sin(180);
						roboY+=calc_distance_cos(180);
					}
			} else if (degrees > 180 && degrees <= 270) {
					if (motorA && motorB) {
						roboX-=calc_distance_cos(270);
						roboY+=calc_distance_sin(270);
					} 
			} else if (degrees > 270 && degrees <= 360) {
					if (motorA && motorB) {
						roboX-=calc_distance_sin(360);
						roboY-=calc_distance_cos(360);
					}
			}			
		}

		function calc_distance_sin(val) {
			return Math.sin( ((Math.PI/180)*val)-((Math.PI/180)*degrees) ) * speed;
		}

		function calc_distance_cos(val) {
			return Math.cos( ((Math.PI/180)*val)-((Math.PI/180)*degrees) ) * speed;
		}

		function make_degrees() {
			var val=radian/(Math.PI/180);	

			while(val>360 || val<-360) {				
					if (val>360)
						val-=360;			
					else val+=360;
			}
			if (val<0)
				val=360+val;		
			return val;
		}

		// get the robo path
		function robo_path(){

			if(!get_path){
				temp=document.getElementById('robo_path').value.split(/\r\n|\r|\n|\s/);
				document.getElementById('path').disabled=true;	
				document.getElementById('replace_path').disabled=true;	
				document.getElementById('out_path').value = "";
				document.getElementById('out_path').style.color="green";
				get_path=true;	
				start=true;
				init(speed);	
			}

			if(temp[last_step+1]*1>0){ // check if there is more steps
				motorA=false;
				motorB=false;
				if(temp[last_step]=="A"){
					motorA=true;
				}else if(temp[last_step]=="B"){
					motorB=true;
				}else if(temp[last_step]=="AB"){
					motorA=true;
					motorB=true;
				}
				distance=temp[last_step+1] * 1;		
				calc_distacne();		
				document.getElementById('out_path').value += temp[last_step] + ' ' + temp[last_step+1] + '\n';							
				last_step+=2;
			}else{
				stop_simulation();
			}						
		}

		function calc_distacne(){
			distance=(360/(rWheelHeight*3.14))*distance;
		}

		function display() {						
			ctx.beginPath();
			ctx.fillStyle = bgColor;						
			clear();					
			
			if (crash) {
				ctx.fillStyle= "white";
				
				if ( width < 200) {
					ctx.font = "bold 30pt Calibri,Times New Roman";
					ctx.fillText("CRASH!", width/2-65, height/2 + 10);
				} else {
				ctx.font = "bold 50pt Calibri,Times New Roman";
				ctx.fillText("CRASH!", width/2-100, height/2 + 10);

				crash_mess();
				}
			}
			ctx.fillStyle = objectColor;
			ctx.save();		
			ctx.translate(roboX,roboY);
			
			// robot
			ctx.rotate(radian);			
			ctx.rect(-roboWidth/2,-roboHeight/2,roboWidth,roboHeight);
			ctx.font = "bold 19pt Calibri,Times New Roman";

			// get new step 
			
			if(get_path && distance==0 ){
				robo_path();
			}
			
			// left wheel
			
			ctx.rect(lWheelPosX,lWheelPosY,lWheelWidth,lWheelHeight);
			
			// right wheel
			
			ctx.rect(rWheelPosX,rWheelPosY,rWheelWidth,rWheelHeight);
			
			ctx.font = "bold 30pt Calibri";
			ctx.fillText("*",-roboWidth/6,-roboHeight/3);	
			ctx.restore();
			ctx.fillStyle = "white";
    		ctx.fill();
    		ctx.lineWidth = 3;
    		ctx.strokeStyle = "black";
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

		function replace_path(){
			document.getElementById('robo_path').value = document.getElementById('out_path').value;	
		}

		function crash_mess(){
			last_step-=2;	
			document.getElementById('out_path').value += "Crash on line " + (last_step/2+1)+ " ("+ temp[last_step]+ ' ' + temp[last_step+1] + ')' + '\n';
			last_step+=2;

			for(;temp[last_step+1]*1>0;last_step+=2){
				document.getElementById('out_path').value += temp[last_step] + ' ' + temp[last_step+1] + '\n';	
			}

			stop_simulation();
		}

		function play(){
			pause_=false;
			document.getElementById('play').disabled=true;	
			document.getElementById('pause').disabled=false;	
			document.getElementById('stop').disabled=false;
		}

		function pause(){
			pause_=true;
			document.getElementById('play').disabled=false;	
			document.getElementById('pause').disabled=true;	
			document.getElementById('stop').disabled=false;
		}

		function stop(){
			document.getElementById('out_path').value +='\n' + "Stoped!";			
			stop_simulation();
		}

		function stop_simulation(){
			document.getElementById('path').disabled=false;	
			document.getElementById('replace_path').disabled=false;
			document.getElementById('play').disabled=true;	
			document.getElementById('pause').disabled=true;	
			document.getElementById('stop').disabled=true;
			get_path=false;
			clearInterval(gameInterval);
		}