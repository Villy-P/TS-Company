"use strict";
const molecules = document.querySelectorAll(".molecule");
const nucleus = document.querySelector(".nucleus");
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function moveMolecule() {
    for (const molecule of molecules) {
        const boundingRect = nucleus.getBoundingClientRect();
        const width = boundingRect.width - (boundingRect.width * .2);
        const height = boundingRect.height - (boundingRect.height * .2);
        molecule.style.left = randomIntFromInterval((boundingRect.width * .1), width).toString() + "px";
        if (height > 0)
            molecule.style.top = randomIntFromInterval((boundingRect.height * .1), height).toString() + "px";
        else
            molecule.style.top = "-10px";
    }
}
window.addEventListener("resize", () => { moveMolecule(); });
moveMolecule();
