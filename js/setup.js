'use strict';

(function () {

  var setupPopup = document.querySelector('.setup');
  var setupOpenBtn = document.querySelector('.setup-open');
  var setupOpenIcon = document.querySelector('.setup-open-icon');
  var setupCloseBtn = setupPopup.querySelector('.setup-close');
  var userNameInput = setupPopup.querySelector('.setup-user-name');
  var userPic = setupPopup.querySelector('.setup-user-pic');
  var setupSaveBtn = setupPopup.querySelector('.setup-submit');
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var wizardEyes = setupPopup.querySelector('.setup-wizard .wizard-eyes');
  var fireball = setupPopup.querySelector('.setup-fireball-wrap');

  var openPopup = function () {
    setupPopup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    setupCloseBtn.addEventListener('click', closePopup);
    setupCloseBtn.addEventListener('keydown', onCloseBtnEnterPress);
    setupSaveBtn.addEventListener('click', window.wizardSettings.onSaveBtnClick);
    setupSaveBtn.addEventListener('keydown', window.wizardSettings.onSaveBtnEnterPress);
    userNameInput.addEventListener('keydown', window.wizardSettings.onInputEscPress);
    wizardEyes.addEventListener('click', window.wizardSettings.onWizardEyesClick);
    fireball.addEventListener('click', window.wizardSettings.onFireballClick);
    userPic.addEventListener('mousedown', window.dialog.onUserPicMove);
    setupPopup.addEventListener('mousedown', window.wizardSettings.onArtifactMove);
    shopElement.addEventListener('dragstart', window.wizardSettings.onshopElementDragStart);
    artifactsElement.addEventListener('dragover', window.wizardSettings.onArtifactsElementDragOver);
    artifactsElement.addEventListener('drop', window.wizardSettings.onArtifactsElementDrop);
    artifactsElement.addEventListener('dragenter', window.wizardSettings.onArtifactsElementDragEnter);
    artifactsElement.addEventListener('dragleave', window.wizardSettings.onArtifactsElementDragLeave);
  };

  var closePopup = function () {
    setupPopup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    setupCloseBtn.removeEventListener('click', closePopup);
    setupCloseBtn.removeEventListener('keydown', onCloseBtnEnterPress);
    setupSaveBtn.removeEventListener('click', window.wizardSettings.onSaveBtnClick);
    setupSaveBtn.removeEventListener('keydown', window.wizardSettings.onSaveBtnEnterPress);
    userNameInput.removeEventListener('keydown', window.wizardSettings.onInputEscPress);
    wizardEyes.removeEventListener('click', window.wizardSettings.onWizardEyesClick);
    fireball.removeEventListener('click', window.wizardSettings.onFireballClick);
    userPic.removeEventListener('mousedown', window.dialog.onUserPicMove);
    setupPopup.removeEventListener('mousedown', window.wizardSettings.onArtifactMove);
    shopElement.removeEventListener('dragstart', window.wizardSettings.onshopElementDragStart);
    artifactsElement.removeEventListener('dragover', window.wizardSettings.onArtifactsElementDragOver);
    artifactsElement.removeEventListener('drop', window.wizardSettings.onArtifactsElementDrop);
    artifactsElement.removeEventListener('dragenter', window.wizardSettings.onArtifactsElementDragEnter);
    artifactsElement.removeEventListener('dragleave', window.wizardSettings.onArtifactsElementDragLeave);

    setupPopup.style.top = '';
    setupPopup.style.left = '';
  };

  /* Закрытие окна */
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  var onCloseBtnEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      closePopup();
    }
  };

  /* Открыте попап-окна */
  var onSetupEvent = function () {
    setupOpenBtn.addEventListener('click', function () {
      openPopup();
    });
    setupOpenIcon.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        openPopup();
      }
    });
  };

  onSetupEvent();

})();
