'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Возвращает случайный элемент массива
  var getRandomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  window.util = {
    'ESC_KEYCODE': ESC_KEYCODE,
    'ENTER_KEYCODE': ENTER_KEYCODE,
    'getRandomElement': getRandomElement
  };

})();
