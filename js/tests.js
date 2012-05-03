    function isEven(val) {  
      return val == true;  
    }

    function animate(val) {
      return (w < 5) && (w > -5);
    }

    function size(val) {
      return val < 1000 && val > 150;
    }

    /* -------------- Tests ------------ */
    test('isEven', function() { 
      ok(isEven(start), 'Start is true.');
    }) 

    test('Animation', function() {
    	ok(animate(start), 'W value is normal.');
    })

    test('Canvas Width', function() {
      ok(size(width), 'Width is ok.');
    })

    test('Canvas Height', function() {
      ok(size(height), 'Height is ok.');
    })