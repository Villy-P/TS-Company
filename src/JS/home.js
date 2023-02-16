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
const globalAttemptsDiv = document.querySelector('.globalAttempt');
globalAttemptsDiv.innerHTML = "Attempts: " + getLocalStorage('global_attempts').toString();
const globalAccuracyDiv = document.querySelector('.globalAccuracy');
globalAccuracyDiv.innerHTML = "Accuracy: " + (getLocalStorage('global_right') != 0 ? (getLocalStorage('global_right') / getLocalStorage('global_attempts') * 100).toFixed(2) + "%" : "0%");
const sessionAttemptsDiv = document.querySelector('.sessionAttempt');
sessionAttemptsDiv.innerHTML = "Attempts: " + getSessionStorage('session_attempts').toString();
const sessionAccuracyDiv = document.querySelector('.sessionAccuracy');
sessionAccuracyDiv.innerHTML = "Accuracy: " + (getSessionStorage('session_right') != 0 ? (getSessionStorage('session_right') / getSessionStorage('session_attempts') * 100).toFixed(2) + "%" : "0%");
