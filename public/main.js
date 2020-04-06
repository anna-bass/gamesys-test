"use strict";

var lorem = document.getElementsByClassName("lorem")[0];
var popup = document.getElementsByClassName("popup")[0];
var fab = document.getElementsByClassName("fab")[0];

var openBtn;

var closeBtn;
var toggleBtn;
var popupText;

var shortText;
var longText;

var shortTextShown = true;

function loadFile(pathToFile, cb) {
  var req = new XMLHttpRequest();
  req.open('GET', pathToFile, true);
  req.onload = function () {
    if (req.status >= 200 && req.status < 400) {
      cb(req);
    }
  };
  req.send();
}

function showModal() {
  if (!shortText) {
    loadFile("public/txt/lorem_s.txt", function (req) {
      shortText = req.responseText;
      popupText.textContent = shortText;
    });
  }

  popup.style.display = "block";
  document.body.style.overflow = "hidden";
}

function hideModal() {
  popup.style.display = "none";
  document.body.style.overflow = "auto";
}

function showLongText() {
  if (!longText) {
    loadFile("public/txt/lorem_l.txt", function (req) {
      longText = req.responseText;
      popupText.textContent = longText;
    });
  }

  popupText.textContent = longText;
  shortTextShown = false;
}

function showShortText() {
  popupText.textContent = shortText;
  shortTextShown = true;
}

function toggleText() {
  shortTextShown ? showLongText() : showShortText();
}

loadFile("public/txt/lorem_xl.txt", function (req) {
  lorem.textContent = req.responseText;
});

loadFile("public/partials/fab/fab.html", function (req) {
  fab.innerHTML = req.responseText;
  openBtn = document.getElementsByClassName("fab__btn")[0];
  openBtn.addEventListener("click", showModal);
});

loadFile("public/partials/popup/popup.html", function (req) {
  popup.innerHTML = req.responseText;
  closeBtn = popup.getElementsByClassName("popup__close")[0];
  toggleBtn = popup.getElementsByClassName("popup__bottom-btn")[0];
  popupText = popup.getElementsByClassName("popup__text")[0];
  closeBtn.addEventListener("click", hideModal);
  toggleBtn.addEventListener("click", toggleText);
});
