"use strict";
const protonAmount = document.querySelector('.proton-amount');
const neutronAmount = document.querySelector('.neutron-amount');
const electronAmount = document.querySelector('.electron-amount');
const atomRings = document.querySelectorAll(".atom-ring");
let molecules = document.querySelectorAll(".molecule");
const nucleus = document.querySelector(".nucleus");
const protonSelector = document.querySelector(".proton-selector");
const periodicTable = JSON.parse(periodicTableData).elements;
const otherInfo = document.querySelector('.other-info');
function selector(e, max, selector) {
    const key = e.key;
    if (key == "Backspace")
        return true;
    if (parseInt(selector.value + key) > max) {
        selector.value = max.toString();
        return false;
    }
    if (parseInt(selector.value + key) == 0)
        return false;
    return /[0-9]/i.test(e.key);
}
protonSelector.onkeydown = (e) => {
    return selector(e, 118, protonSelector);
};
const elementBox = document.querySelector(".element-box");
protonSelector.onchange = (evt) => {
    nucleus.innerHTML = "";
    for (const ring of atomRings) {
        for (let i = ring.children.length - 1; i >= 0; i--) {
            if (ring.children[i].classList.contains("electron"))
                ring.removeChild(ring.children[i]);
        }
    }
    const protonValue = parseInt(protonSelector.value);
    const element = periodicTable[protonValue - 1];
    const neutronNum = Math.round(element.atomic_mass) - protonValue;
    protonAmount.innerHTML = `${protonValue} Protons`;
    neutronAmount.innerHTML = `${neutronNum} Neutrons`;
    electronAmount.innerHTML = `${protonValue} Electrons`;
    for (let i = 0; i < protonValue; i++) {
        const proton = document.createElement("div");
        proton.classList.add("proton");
        proton.classList.add("molecule");
        nucleus.appendChild(proton);
    }
    for (let i = 0; i < neutronNum; i++) {
        const neutron = document.createElement("div");
        neutron.classList.add("neutron");
        neutron.classList.add("molecule");
        nucleus.appendChild(neutron);
    }
    for (let i = 0; i < protonValue; i++) {
        const electron = document.createElement("div");
        electron.classList.add("electron");
        electron.classList.add("molecule");
        if (i < 2)
            atomRings[atomRings.length - 1].appendChild(electron);
        else if (i < 10)
            atomRings[atomRings.length - 2].appendChild(electron);
        else if (i < 28)
            atomRings[atomRings.length - 3].appendChild(electron);
        else if (i < 50)
            atomRings[atomRings.length - 4].appendChild(electron);
        else if (i < 100)
            atomRings[atomRings.length - 5].appendChild(electron);
        else if (i < 172)
            atomRings[atomRings.length - 6].appendChild(electron);
    }
    elementBox.style.display = 'inline-block';
    elementBox.style.backgroundColor = `#${element.hexval}`;
    elementBox.children[0].innerHTML = protonValue.toString();
    elementBox.children[2].innerHTML = element.symbol;
    elementBox.children[4].innerHTML = element.name;
    elementBox.children[5].innerHTML = element.atomic_mass;
    displayElectrons();
    moveMolecule();
    otherInfo.innerHTML = `<pre>` + `<p>Appearance: ${element.appearance}\n</p>`
        + `<p>Bioling Point: ${element.boil}K\n</p>`
        + `<p>Category: ${element.category}\n</p>`
        + `<p>Density: ${element.density}\n</p>`
        + `<p>Melting Point: ${element.melt}K\n</p>`
        + `<p>Phase: ${element.phase}\n</p></pre>`;
};
function randomIntInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function moveMolecule() {
    molecules = document.querySelectorAll(".molecule");
    for (const molecule of molecules) {
        if (molecule.classList.contains("electron"))
            continue;
        const boundingRect = nucleus.getBoundingClientRect();
        const width = boundingRect.width - (boundingRect.width * .2);
        const height = boundingRect.height - (boundingRect.height * .2);
        molecule.style.left = randomIntInterval((boundingRect.width * .1), width).toString() + "px";
        if (height > 0)
            molecule.style.top = randomIntInterval((boundingRect.height * .1), height).toString() + "px";
        else
            molecule.style.top = "-10px";
    }
}
window.addEventListener("resize", () => { moveMolecule(); displayElectrons(); });
moveMolecule();
function displayElectrons() {
    for (let i = 0; i < atomRings.length; i++) {
        const electrons = atomRings[i].querySelectorAll(":scope > .electron");
        for (let j = 0; j < electrons.length; j++)
            electrons[j].style.transform = `rotate(${((j * (360 / electrons.length))).toFixed(0)}deg) translateX(${atomRings[i].getBoundingClientRect().width / 2}px)`;
    }
}
displayElectrons();
const trySomeProblem = document.querySelector(".transition-btn");
const atomGen = document.querySelector(".atom-gen");
const problemSection = document.querySelector(".problem-section");
let currentlyProblem = false;
function pressTrySomeProblems() {
    trySomeProblem.innerHTML = currentlyProblem ? "Try Some Problems" : "Go Back";
    atomGen.style.display = currentlyProblem ? "inline" : "none";
    problemSection.style.display = currentlyProblem ? "none" : "inline";
    currentlyProblem = !currentlyProblem;
}
