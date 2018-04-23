'use strict';

// Возвращает случайный элемент массива
var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Генерирует случайные данные волшебников
var createWizards = function (quantity, names, lastNames, coatColors, eyesColors) {
  var wizards = [];
  for (var i = 0; i < quantity; i++) {
    wizards.push({
      name: getRandomElement(names) + ' ' + getRandomElement(lastNames),
      coatColor: getRandomElement(coatColors),
      eyesColor: getRandomElement(eyesColors)
    });
  }
  return wizards;
};

// Создает фрагмент данных одного волшебника
var createWizard = function (wizard) {
  var wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// Пул значений для генерации волшебников
var names = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var lastNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var quantity = 4; // Количество волшебников

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list'); // Находит блок, в который нужно добавить волшебников
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'); // Получает шаблон вывода волшебника
var wizardsData = createWizards(quantity, names, lastNames, coatColors, eyesColors); // Генерирует случайные данные волшебников

// Создает фрагмент с похожими волшебниками
var createWizardsList = function (wizardsDataSrc) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < quantity; i++) {
    fragment.appendChild(createWizard(wizardsDataSrc[i]));
  }
  return fragment;
};

var fillSimilarWizardsList = function () {
  var wizardsList = createWizardsList(wizardsData);
  similarListElement.appendChild(wizardsList);
};

fillSimilarWizardsList();
userDialog.querySelector('.setup-similar').classList.remove('hidden');

/* Обработка событий */
var setupPopup = document.querySelector('.setup');
var setupOpenBtn = document.querySelector('.setup-open');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var setupCloseBtn = setupPopup.querySelector('.setup-close');
var userNameInput = setupPopup.querySelector('.setup-user-name');
var userPic = setupPopup.querySelector('.setup-user-pic');
var setupSaveBtn = setupPopup.querySelector('.setup-submit');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
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
var shopElement = document.querySelector('.setup-artifacts-shop');
var artifactsElement = document.querySelector('.setup-artifacts');

var openPopup = function () {
  setupPopup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupSaveBtn.addEventListener('click', onSaveBtnClick);
  setupSaveBtn.addEventListener('keydown', onSaveBtnEnterPress);
  userNameInput.addEventListener('keydown', onInputEscPress);
  setupCloseBtn.addEventListener('keydown', onCloseBtnEnterPress);
  setupCloseBtn.addEventListener('click', closePopup);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  fireball.addEventListener('click', onFireballClick);
  userPic.addEventListener('mousedown', window.dialog.onUserPicMove);
  setupPopup.addEventListener('mousedown', onArtifactMove);
  shopElement.addEventListener('dragstart', onshopElementDragStart);
  artifactsElement.addEventListener('dragover', onArtifactsElementDragOver);
  artifactsElement.addEventListener('drop', onArtifactsElementDrop);
  artifactsElement.addEventListener('dragenter', onArtifactsElementDragEnter);
  artifactsElement.addEventListener('dragleave', onArtifactsElementDragLeave);
};

var closePopup = function () {
  setupPopup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupSaveBtn.removeEventListener('click', onSaveBtnClick);
  setupSaveBtn.removeEventListener('keydown', onSaveBtnEnterPress);
  userNameInput.removeEventListener('keydown', onInputEscPress);
  setupCloseBtn.removeEventListener('click', closePopup);
  wizardEyes.removeEventListener('click', onWizardEyesClick);
  fireball.removeEventListener('click', onFireballClick);
  userPic.removeEventListener('mousedown', window.dialog.onUserPicMove);
  setupPopup.removeEventListener('mousedown', onArtifactMove);
  shopElement.removeEventListener('dragstart', onshopElementDragStart);
  artifactsElement.removeEventListener('dragover', onArtifactsElementDragOver);
  artifactsElement.removeEventListener('drop', onArtifactsElementDrop);
  artifactsElement.removeEventListener('dragenter', onArtifactsElementDragEnter);
  artifactsElement.removeEventListener('dragleave', onArtifactsElementDragLeave);

  setupPopup.style.top = '';
  setupPopup.style.left = '';
};

/* Закрытие окна */
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onCloseBtnEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

var onInputEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
};

/* Сохранение профиля волшебника */
var onSaveBtnClick = function () {
  setupSaveBtn.click();
};

var onSaveBtnEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setupSaveBtn.click();
  }
};

/* Открыте попап-окна */
var onSetupEvent = function () {
  setupOpenBtn.addEventListener('click', function () {
    openPopup();
  });
  setupOpenIcon.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });
};

onSetupEvent();

/* Изменение цвета глаз волшебника */
var onWizardEyesClick = function () {
  var wizardEyesColor = getRandomElement(wizardEyesColors);
  wizardEyes.style.fill = wizardEyesColor;
  wizardEyesInput.value = wizardEyesColor;
};

/* Изменение цвета фаербола волшебника */
var onFireballClick = function () {
  var fireballColor = getRandomElement(fireballColors);
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
