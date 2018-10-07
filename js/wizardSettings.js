'use strict';

(function () {

  var setupPopup = document.querySelector('.setup');
  var wizardEyes = setupPopup.querySelector('.setup-wizard .wizard-eyes');
  var wizardEyesInput = document.querySelector('input[name="eyes-color"]');
  var wizardEyesColors = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ];
  var fireball = setupPopup.querySelector('.setup-fireball-wrap');
  var fireballInput = document.querySelector('input[name="fireball-color"]');
  var fireballColors = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];
  var artifactsCell = setupPopup.querySelector('.setup-artifacts-cell img');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var setupSaveBtn = setupPopup.querySelector('.setup-submit');

  /* Изменение цвета глаз волшебника */
  var onWizardEyesClick = function () {
    var wizardEyesColor = window.util.getRandomElement(wizardEyesColors);
    wizardEyes.style.fill = wizardEyesColor;
    wizardEyesInput.value = wizardEyesColor;
  };

  /* Изменение цвета фаербола волшебника */
  var onFireballClick = function () {
    var fireballColor = window.util.getRandomElement(fireballColors);
    fireball.style.backgroundColor = fireballColor;
    fireballInput.value = fireballColor;
  };

  /* Перетаскивание предметов */
  var makeArtifactsCellDraggable = function () {
    for (var i = 0; i < artifactsCell.length; i++) {
      artifactsCell[i].draggable = 'true';
    }
  };

  var onArtifactMove = function (evt) {
    for (var i = 0; i < artifactsCell.length; i++) {
      if (artifactsCell[i] === evt.target) {
        var currentArtifact = artifactsCell[i];
        i = artifactsCell.length;
      }
    }

    if (currentArtifact) {
      evt.stopPropagation();
      var startCoords = {
        x: evt.clintX,
        y: evt.clintY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

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

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  var onshopElementDragStart = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.style.outline = '2px dashed red';
    }
  };

  var onArtifactsElementDragOver = function (evt) {
    artifactsElement.style.outline = '2px dashed red';
    evt.preventDefault();
    return false;
  };

  var onArtifactsElementDrop = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    artifactsElement.style.outline = '';
    evt.preventDefault();
  };

  var onArtifactsElementDragEnter = function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  };

  var onArtifactsElementDragLeave = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  };

  makeArtifactsCellDraggable();
  var draggedItem = null;

  /* Сохранение профиля волшебника */
  var onSaveBtnClick = function () {
    setupSaveBtn.click();
  };

  var onSaveBtnEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      setupSaveBtn.click();
    }
  };

  var onInputEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      evt.stopPropagation();
    }
  };

  window.wizardSettings = {
    'onshopElementDragStart': onshopElementDragStart,
    'onArtifactsElementDragOver': onArtifactsElementDragOver,
    'onArtifactsElementDrop': onArtifactsElementDrop,
    'onArtifactsElementDragEnter': onArtifactsElementDragEnter,
    'onArtifactsElementDragLeave': onArtifactsElementDragLeave,
    'onFireballClick': onFireballClick,
    'onArtifactMove': onArtifactMove,
    'onWizardEyesClick': onWizardEyesClick,
    'onSaveBtnClick': onSaveBtnClick,
    'onInputEscPress': onInputEscPress,
    'onSaveBtnEnterPress': onSaveBtnEnterPress
  };

})();
