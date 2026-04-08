
let minVal = document.querySelector(".min-val");
let maxVal = document.querySelector(".max-val");
let priceInputMin = document.querySelector(".min-input");
let priceInputMax = document.querySelector(".max-input");
let minGap = 100;
let range = document.querySelector(".slider-track");
let sliderMinVal = minVal.min;
let sliderMaxVal = maxVal.max;

function rangeMin() {
  let gap = maxVal.value - minVal.value;
  if (gap <= minGap) {
    minVal.value = parseInt(maxVal.value) - minGap;
  }
  priceInputMin.innerHTML = minVal.value;
  priceInputMin.value = minVal.value;
}
function rangeMax() {
  let gap = maxVal.value - minVal.value;
  if (gap <= minGap) {
    maxVal.value = parseInt(minVal.value) + minGap;
  }
  priceInputMax.innerHTML = maxVal.value;
  priceInputMax.value = maxVal.value;
}

function setMinInp() {
  let minPrice = priceInputMin.value;
  if (minPrice < sliderMinVal) {
    priceInputMin.value = sliderMinVal;
  }
  minVal.value = priceInputMin.value;
  rangeMin();
}
function setMaxInp() {
  let maxPrice = priceInputMax.value;
  if (maxPrice <= sliderMaxVal) {
    priceInputMax.value = sliderMaxVal;
  }
  maxVal.value = priceInputMax.value;
  rangeMax();
}
