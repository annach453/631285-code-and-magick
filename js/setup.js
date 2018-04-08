'use strict';

// Возвращает случайный элемент массива
var getRandomElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

// Генерирует случайные данные волшебников
var createWizards = function (quantity, names, lastNames, coatColors, eyesColors) {
  var wizards = [];
  for (var i = 0; i < quantity; i++) {
    var wizard = {};
    wizard.name = getRandomElement(names) + ' ' + getRandomElement(lastNames);
    wizard.coatColor = getRandomElement(coatColors);
    wizard.eyesColor = getRandomElement(eyesColors);
    wizards[i] = wizard;
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
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var lastNames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var quantity = 4; // Количество волшебников

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list'); // Находит блок, в который нужно добавить волшебников
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'); // Получает шаблон вывода волшебника
var wizardsData = createWizards(quantity, names, lastNames, coatColors, eyesColors); // Генерирует случайные данные волшебников


userDialog.classList.remove('hidden');

// Создает фрагмент с похожими волшебниками
var fragment = document.createDocumentFragment();
for (var i = 0; i < quantity; i++) {
  fragment.appendChild(createWizard(wizardsData[i]));
}

similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
