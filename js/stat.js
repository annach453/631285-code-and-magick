'use strict';

(function () {
  var CLOUD_WIDTH = 420;
  var CLOUD_HEIGHT = 270;
  var CLOUD_X = 100;
  var CLOUD_Y = 10;
  var GAP = 10;
  var TEXT_GAP = 30;
  var LINE_GAP = 20;
  var CLOUD_COLOR = 'rgba(255, 255, 255, 1)';
  var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
  var TEXT_COLOR = 'rgba(0, 0, 0, 1)';
  var MAX_BAR_HEIGHT = 150;
  var BAR_WIDTH = 40;
  var BAR_GAP = 50;
  var MY_BAR_COLOR = 'rgba(255, 0, 0, 1)';
  var NAME_Y = 265;
  var MAX_BAR_Y = 95;
  var TIME_GAP = 10;

  // Рисует облако
  var renderCloud = function (ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  };

  // Находит максимальное время
  var getMaxTime = function (array) {
    var maxTime = array[0];
    for (var i = 1; i < array.length; i++) {
      if (array[i] > maxTime) {
        maxTime = array[i];
      }
    }
    return maxTime;
  };

  window.renderStatistics = function (ctx, names, times) {

    // Добавляет облако с тенью
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_SHADOW_COLOR);
    renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

    // Добавляет в облако текст
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP);
    ctx.fillText('Список результатов:', CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP + LINE_GAP);

    // Добавляет гистограмму
    var maxTime = getMaxTime(times);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      var time = times[i].toFixed(0);
      var barX = CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH);
      var barHeight = MAX_BAR_HEIGHT * time / maxTime;
      var barY = MAX_BAR_Y + MAX_BAR_HEIGHT - barHeight;
      // Добавляет имя
      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(name, barX, NAME_Y);
      // Добавляет цветную колонку
      if (name === 'Вы') {
        ctx.fillStyle = MY_BAR_COLOR;
      } else {
        ctx.fillStyle = 'hsl(240, ' + Math.random().toFixed(2) * 100 + '%, 50%)';
      }
      ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
      // Добавляет значение времени
      ctx.fillStyle = TEXT_COLOR;
      ctx.fillText(time, barX, barY - TIME_GAP);
    }

  };
})();
