"use strict";
const buttonAnswers = [
    "Mitochondria", "Peroxisome", "Ribosome", "Vacuole",
    "Centrosome", "Centriole", "Microtubule", "Plasma Membrane",
    "Cytoplasm", "Chromatin", "Nucleolus", "Nucleus", "Rough ER",
    "Smooth ER", "Golgi Apparatus", "Golgi Vesicle", "Lysosome",
];
const currentButtonAnswers = [
    "Mitochondria", "Peroxisome", "Ribosome", "Vacuole",
    "Centrosome", "Centriole", "Microtubule", "Plasma Membrane",
    "Cytoplasm", "Chromatin", "Nucleolus", "Nucleus", "Rough ER",
    "Smooth ER", "Golgi Apparatus", "Golgi Vesicle", "Lysosome",
];
const radioButtons = document.querySelectorAll(".radio-button");
const matchingSelectText = document.querySelector(".matching-select-text");
function generateNewMatchingProblem() {
    const index = getRandomValue(0, currentButtonAnswers.length - 1);
    const choice = currentButtonAnswers[index];
    currentButtonAnswers.splice(index, 1);
    matchingSelectText.innerHTML = `Select the ${choice}`;
}
generateNewMatchingProblem();
