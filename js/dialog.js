'use strict';

(function () {

  var setupPopup = document.querySelector('.setup');
  var userUploadAvatarInput = setupPopup.querySelector('.upload input');

  /* Перетаскивание */
  var onUserPicMove = function (evt) {
    evt.preventDefault();
    var mouseMoved = false;
    var startCoords = {
      x: evt.clintX,
      y: evt.clintY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      mouseMoved = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupPopup.style.top = (setupPopup.offsetTop - shift.y) + 'px';
      setupPopup.style.left = (setupPopup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (!mouseMoved) {
        userUploadAvatarInput.click();
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.dialog = {
    'onUserPicMove': onUserPicMove
  };

})();
