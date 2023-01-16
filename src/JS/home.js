"use strict";
const activitiesAbout = [
    "DNA",
    "RNA",
    "Amino Acids",
    "Genotypes",
    "Phenotypes"
];
let currentIndex = 0;
const activitiesAboutText = document.querySelector(".activities-about-text");
function moveLeft() {
    currentIndex = currentIndex == 0 ? activitiesAbout.length - 1 : currentIndex -= 1;
    activitiesAboutText.innerHTML = activitiesAbout[currentIndex];
}
function moveRight() {
    currentIndex = currentIndex == activitiesAbout.length - 1 ? 0 : currentIndex += 1;
    activitiesAboutText.innerHTML = activitiesAbout[currentIndex];
}
