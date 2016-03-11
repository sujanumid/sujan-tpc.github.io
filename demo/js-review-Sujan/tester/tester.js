window.Tester = {
  expected: function expected(expression, message) {
      if (expression) {
        return {
          message: message,
          result: 'PASSED'
        }
      } else {
        return {
          message: message,
          result: 'FAILED',
      }
    }
  },
  run: function test(element, tests) {
    tests.forEach(function(t) {
      var result = t();
      element.innerHTML += '<li class="test-name"> ' + t.toString().match(/function ([^\(]+)/)[1] + '()</li>';
      element.innerHTML += '<li class="test-message">' + result.message + '</li>';
      element.innerHTML +='<li class="test-result ' + result.result +'">' + result.result + '</li>';
    });
  }
};



