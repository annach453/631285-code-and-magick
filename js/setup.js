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
