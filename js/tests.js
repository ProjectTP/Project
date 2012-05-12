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
  return val == (Math.PI/180) * 0;;
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
  return val < 100 && val > 20
}

function rHeight(val)
{
  return val < 150 && val > 20
}

function wWidth(val)
{
  return val < 15 && val > 5
}

function wHeight(val)
{
  return val < 100 && val > 10
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

  test('roboX Value', function () {
    equal(roboX, width/2, 'roboX value is OK');
  })

  test('Left wheel X Value', function () {
    equal(lWheelPosX, -roboWidth/2 - lWheelWidth, 'Left wheel X value is OK');
  })

  test('Left wheel Y Value', function () {
    equal(lWheelPosY, -roboHeight/2 + roboHeight/8, 'Left wheel Y value is OK');
  })

  test('Right Wheel X Value', function () {
    equal(rWheelPosX, roboWidth/2, 'Right Wheel X value is OK');
  })

  test('Right Wheel Y Value', function () {
    equal(rWheelPosY, -roboHeight/2 + roboHeight/8, 'Right Wheel Y value is OK');
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

}