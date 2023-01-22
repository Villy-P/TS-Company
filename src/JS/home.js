"use strict";
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
const activitiesAbout = [
    "DNA",
    "RNA",
    "Amino Acids",
    "Genotypes",
    "Phenotypes",
    "Atoms",
    "Protons",
    "Neutrons",
    "Electrons",
];
shuffleArray(activitiesAbout);
console.log(activitiesAbout);
let currentIndex = 0;
const activitiesAboutText = document.querySelector(".activities-about-text");
activitiesAboutText.innerHTML = activitiesAbout[0];
function moveLeft() {
    currentIndex = currentIndex == 0 ? activitiesAbout.length - 1 : currentIndex -= 1;
    activitiesAboutText.innerHTML = activitiesAbout[currentIndex];
}
function moveRight() {
    currentIndex = currentIndex == activitiesAbout.length - 1 ? 0 : currentIndex += 1;
    activitiesAboutText.innerHTML = activitiesAbout[currentIndex];
}
