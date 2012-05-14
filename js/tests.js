function isFalse(val)
{
  return val == false;  
}

function animate(val)
{
  return (w < 5) && (w > -5);
}

function elemDisabled(val)
{
  return document.getElementById(val).disabled == true;
}

function radianValue(val)
{
  return val == (Math.PI/180) * 0;
}

function roboXValue(val)
{
  return val == width/2;
}

function checkBool(val)
{
  return val == true || val == false;
}

function isEmpty(val)
{
  return document.getElementById(val).value == "";
}

function rWidth(val)
{
  return val < 100 && val > 20;
}

function rHeight(val)
{
  return val < 150 && val > 20;
}

function wWidth(val)
{
  return val < 15 && val > 5;
}

function wHeight(val)
{
  return val < 100 && val > 10;
}
function notNull(val)
{
  return val > 0;
}



/* -------------- Tests ------------ */

function runTests() {

  test('isFalse', function() { 
    ok(isFalse(start), 'Start is false.');
  }) 

  test('Animation', function() {
  	ok(animate(start), 'W value is normal.');
  })

  test('Canvas Width', function() {
    equal(width,canvas.width,  'Width is ok.');
  })

  test('Canvas Height', function() {
    equal(height,canvas.height,  'Height is ok.');
  })

  test('Motor A', function() {
    ok(checkBool(motorA), 'Motor A value is Ok.');
  })

  test('Motor B', function() {
    ok(checkBool(motorB), 'Motor B value is Ok.');
  })

  test('get_path', function() {
    ok(checkBool(get_path), 'get_path value is Ok.');
  })

  test('Pause', function() {
    ok(checkBool(pause_), 'Pause value is Ok.');
  })

  test('resetpos', function() {
    ok(checkBool(resetpos_), 'resetpos value is Ok.');
  })
  
  test('resize', function() {
    ok(checkBool(resize_), 'resize value is Ok.');
  })


  test('submit', function() {
    ok(checkBool(submit_), 'submit value is Ok.');
  })

  test('Crash', function() {
    ok(checkBool(crash), 'Crash value is Ok.');
  })

  test('Canvas Value', function () {
    equal(canvas, document.getElementById('my_canvas'), 'Canvas value is OK');
  })
  
  test('Robot Width', function () {
    ok(rWidth(roboWidth), 'Robo Width value is OK');
  })

  test('Robot Height', function () {
    ok(rHeight(roboHeight), 'Robo Height value is OK');
  })

  test('Wheel Width', function () {
    ok(wWidth(lWheelWidth), 'Left Wheel Width value is OK');
    ok(wWidth(rWheelWidth), 'Right Wheel Width value is OK');
  })

  test('Wheel Height', function () {
    ok(wHeight(lWheelHeight), 'Left Wheel Height value is OK');
    ok(wHeight(rWheelHeight), 'Right Wheel Height value is OK');
  })

  test('Window Height and Width', function () {
    ok(notNull($(document).height()), 'Window Height is OK');
    ok(notNull($(window).width()), 'Window Width is OK');
  })


  test('reset_data function', function () {
    reset_data();
    equal(roboX, width/2, 'RoboX is OK');
    equal(roboY, height/2, 'RoboY is OK');
    equal(lWheelPosX, -roboWidth/2 - lWheelWidth, 'Left wheel X value is OK');
    equal(lWheelPosY, -roboHeight/2 + roboHeight/8, 'Left wheel Y value is OK');
    equal(rWheelPosX, roboWidth/2, 'Right Wheel X value is OK');
    equal(rWheelPosY, -roboHeight/2 + roboHeight/8, 'Right Wheel Y value is OK');
    equal(radian, (Math.PI/180) * 0, 'Radian is OK');
    equal(submit_, false, 'submit_ is OK');
    equal(start, false, 'start is OK');
    equal(motorA, false, 'motorA is OK');
    equal(motorB, false, 'motorB is OK');
    equal(crash, false, 'crash is OK');
    equal(pause_, false, 'pause is OK');
    equal(resetpos_, false, 'resetpos_ is OK');
    equal(stop_, false, 'stop_ is OK');
    equal(resize_, false, 'resize_ is OK');
    equal(last_step, 0, 'last_step is OK');
    equal(distance, 0, 'distance is OK');
  })

  test('reset functuon', function() {
    reset();
    equal(resize_, true, 'resize_ is OK');
    equal(width, 450, 'width is OK');
    equal(canvas.width, width, 'canvas width is OK');
    equal(height, 450, 'height is OK');
    equal(canvas.height, height, 'canvas height is OK');
    equal(document.getElementById('width1').value, "", 'width1 input is OK');
    equal(document.getElementById('height1').value, "", 'height1 input is OK');
    equal(document.getElementById('width1-bg').value, "", 'width1-bg input is OK');
    equal(document.getElementById('height1-bg').value, "", 'height1-bg input is OK');
  })

  test('Textareas', function() {
    generate_path('e');
    equal(document.getElementById('out_path').value, "",'out_path is OK');
    equal(document.getElementById('out_path-bg').value, "", 'out_path-bg is OK');
    equal(document.getElementById('path').disabled, true, 'Path is OK');
    equal(document.getElementById('replace_path').disabled, true, 'replace_path is OK');
    equal(document.getElementById('path-bg').disabled, true, 'path-bg is OK');
    equal(document.getElementById('replace_path-bg').disabled, true, 'replace_path-bg is OK');
    equal(document.getElementById('out_path').style.color, "green", 'out_path color is OK');
    equal(document.getElementById('out_path-bg').style.color, "green", 'out_path-bg color is OK');
  })

  test('calc_distance function', function() {
    calc_distance();
    equal(distance, ((rWheelHeight * 3.14)/360) * distance, 'distance is OK');
  })

  test('stop_simulation function', function() {
    stop_simulation();
    equal(document.getElementById('path').disabled, false, 'Path is OK');
    equal(document.getElementById('replace_path').disabled, false, 'replace_path is OK');
    equal(document.getElementById('path-bg').disabled, false, 'path-bg is OK');
    equal(document.getElementById('replace_path-bg').disabled, false, 'replace_path-bg is OK');
    equal(document.getElementById('play').disabled, true, 'play is OK');
    equal(document.getElementById('pause').disabled, true, 'pause is OK');
    equal(document.getElementById('stop').disabled, true, 'stop is OK');
    equal(document.getElementById('play-bg').disabled, true, 'play-bg is OK');
    equal(document.getElementById('pause-bg').disabled, true, 'pause-bg is OK');
    equal(document.getElementById('stop-bg').disabled, true, 'stop-bg is OK');
    equal(get_path, false, 'get_path is OK');
    equal(distance, 0, 'distance is OK');
    equal(pause_, false, 'pause_ is OK');
    equal(stop_, true, 'stop_ is OK');
  })


}