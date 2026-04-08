"use strict";
let stars = document.querySelectorAll(".star");
let clear = document.querySelector(".clear");
for (let star of stars) {
  star.addEventListener("click", function () {
    star.parentNode.dataset.valueTotal = star.dataset.itemValue;
  });
}
clear.addEventListener("click", function () {
  for (let star of stars) {
    star.parentNode.dataset.valueTotal = 0;
  }
});
