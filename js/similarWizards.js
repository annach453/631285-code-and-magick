'use strict';

(function () {

  // Генерирует случайные данные волшебников
  var createWizards = function (quantity, names, lastNames, coatColors, eyesColors) {
    var wizards = [];
    for (var i = 0; i < quantity; i++) {
      wizards.push({
        name: window.util.getRandomElement(names) + ' ' + window.util.getRandomElement(lastNames),
        coatColor: window.util.getRandomElement(coatColors),
        eyesColor: window.util.getRandomElement(eyesColors)
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

})();
