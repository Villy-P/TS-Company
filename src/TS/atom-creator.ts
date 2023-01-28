const protonAmount: HTMLSpanElement = document.querySelector('.proton-amount')!;
const neutronAmount: HTMLSpanElement = document.querySelector('.neutron-amount')!;
const electronAmount: HTMLSpanElement = document.querySelector('.electron-amount')!;

const atomRings: NodeListOf<HTMLDivElement> = document.querySelectorAll(".atom-ring");

let molecules: NodeListOf<HTMLDivElement> = document.querySelectorAll(".molecule");
const nucleus: HTMLDivElement = document.querySelector(".nucleus")!;

const protonSelector: HTMLInputElement = document.querySelector(".proton-selector")!;

const periodicTable = JSON.parse(periodicTableData).elements;

const otherInfo: HTMLDivElement = document.querySelector('.other-info')!;

const problemTextAtom: HTMLParagraphElement = document.querySelector(".problem-text")!;

function selector(e: KeyboardEvent, max: number, selector: HTMLInputElement): boolean {
    const key: string = e.key;
    if (key == "Backspace" || key == "Enter")
        return true;
    if (parseInt(selector.value + key) > max) {
        selector.value = max.toString();
        return false;
    }
    if (parseInt(selector.value + key) == 0)
        return false;
    return /[0-9]/i.test(e.key);
}

protonSelector.onkeydown = (e: KeyboardEvent) => {
    return selector(e, 118, protonSelector);
};

const elementBox: HTMLDivElement = document.querySelector(".element-box")!;

protonSelector.onchange = (evt: Event) => {
    nucleus.innerHTML = "";
    for (const ring of atomRings) {
        for (let i = ring.children.length - 1; i >= 0; i--) {
            if (ring.children[i].classList.contains("electron"))
                ring.removeChild(ring.children[i]);
        }
    }
    const protonValue: number = parseInt(protonSelector.value);
    const element = periodicTable[protonValue - 1];
    const neutronNum: number = Math.round(element.atomic_mass) - protonValue;
    protonAmount.innerHTML = `${protonValue} Protons`;
    neutronAmount.innerHTML = `${neutronNum} Neutrons`;
    electronAmount.innerHTML = `${protonValue} Electrons`;
    for (let i = 0; i < protonValue; i++) {
        const proton: HTMLDivElement = document.createElement("div");
        proton.classList.add("proton");
        proton.classList.add("molecule");
        nucleus.appendChild(proton);
    }
    for (let i = 0; i < neutronNum; i++) {
        const neutron: HTMLDivElement = document.createElement("div");
        neutron.classList.add("neutron");
        neutron.classList.add("molecule");
        nucleus.appendChild(neutron);
    }
    for (let i = 0; i < protonValue; i++) {
        const electron: HTMLDivElement = document.createElement("div");
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
}

function randomIntInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function moveMolecule(): void {
    molecules = document.querySelectorAll(".molecule");
    for (const molecule of molecules) {
        if (molecule.classList.contains("electron"))
            continue;
        const boundingRect: DOMRect = nucleus.getBoundingClientRect();
        const width: number = boundingRect.width - (boundingRect.width * .2);
        const height: number = boundingRect.height - (boundingRect.height * .2);
        molecule.style.left = randomIntInterval((boundingRect.width * .1), width).toString() + "px";
        if (height > 0)
            molecule.style.top = randomIntInterval((boundingRect.height * .1), height).toString() + "px";
        else
            molecule.style.top = "-10px";
    }
}

window.addEventListener("resize", () => { moveMolecule(); displayElectrons()});

moveMolecule();

function displayElectrons(): void {
    for (let i = 0; i < atomRings.length; i++) {
        const electrons: NodeListOf<HTMLDivElement> = atomRings[i].querySelectorAll(":scope > .electron");
        for (let j = 0; j < electrons.length; j++)
            electrons[j].style.transform = `rotate(${((j * (360 / electrons.length))).toFixed(0)}deg) translateX(${atomRings[i].getBoundingClientRect().width / 2}px)`;
    }
}

displayElectrons();

const trySomeProblem: HTMLButtonElement = document.querySelector(".transition-btn")!;
const atomGen: HTMLDivElement = document.querySelector(".atom-gen")!;
const problemSection: HTMLDivElement = document.querySelector(".problem-section")!;

let currentlyProblem: boolean = false;

function pressTrySomeProblems(): void {
    trySomeProblem.innerHTML = currentlyProblem ? "Try Some Problems" : "Go Back";
    atomGen.style.display = currentlyProblem ? "inline" : "none";
    problemSection.style.display = currentlyProblem ? "none" : "inline";
    currentlyProblem = !currentlyProblem;
}

function generateAtomProblem(): (string|number)[] {
    // Types of Problems:
    // 1 Neutrons from protons and mass
    // 2 Neutrons from electrons and mass
    // 3 Electrons from protons
    // 4 Protons from electrons
    // 5 Mass from electrons and neutrons
    // 6 Mass from protons and neutrons
    // 7 Protons from mass and neutrons
    // 8 Electrons from mass and neutrons
    const rand: number = randomIntInterval(0, 7);
    const atomNum: number = randomIntInterval(1, 118);
    const atom = periodicTable[atomNum - 1];
    switch (rand) {
        case 0:
            return [`${atom.name} has ${atomNum} protons and has a mass of ${atom.atomic_mass}. How many neutrons does it have?`, Math.round(atom.atomic_mass - atomNum)];
        case 1:
            return [`${atom.name} has ${atomNum} electrons and has a mass of ${atom.atomic_mass}. How many neutrons does it have?`, Math.round(atom.atomic_mass - atomNum)];
        case 2:
            return [`${atom.name} has ${atomNum} electrons. How many protons does it have?`, atomNum];
        case 3:
            return [`${atom.name} has ${atomNum} protons. How many electrons does it have?`, atomNum];
        case 4:
            return [`${atom.name} has ${atomNum} electrons and has ${Math.round(atom.atomic_mass - atomNum)} neutrons. What is it's mass?`, Math.round(atom.atomic_mass)];
        case 5:
            return [`${atom.name} has ${atomNum} protons and has ${Math.round(atom.atomic_mass - atomNum)} neutrons. What is it's mass?`, Math.round(atom.atomic_mass)];
        case 6:
            return [`${atom.name} has ${Math.round(atom.atomic_mass - atomNum)} neutrons and has a mass of ${atom.atomic_mass}. How many protons does it have?`, atomNum];
        case 7:
            return [`${atom.name} has ${Math.round(atom.atomic_mass - atomNum)} neutrons and has a mass of ${atom.atomic_mass}. How many electrons does it have?`, atomNum];
    }
    throw new Error(`Num ${rand} out of range 0-7`);
}

let atomProblem: (string|number)[] = generateAtomProblem();

problemTextAtom.innerHTML = atomProblem[0].toString();

const problemAtomText: HTMLParagraphElement = document.querySelector(".problem-text")!;
const submitAtomButton: HTMLButtonElement = document.querySelector(".submit")!;
const answerAtom: HTMLSelectElement = document.querySelector(".answer")!;

let attemptsAtom: number = 0;
let correctAtom: number = 0;
let wrongAtom: number = 0;

const attemptsAtomText: HTMLParagraphElement = document.querySelector('.attempts')!;
const accuracyAtomText: HTMLParagraphElement = document.querySelector(".accuracy")!;

function pressAtomSubmit(): void {
    attemptsAtom++;
    if (answerAtom.value === atomProblem[1].toString().trim()) {
        correctAtom++;
        atomProblem = generateAtomProblem();
        answerAtom.classList.remove('wrong');
        problemAtomText.innerHTML = atomProblem[0] as string;
        answerAtom.value = "";
    } else {
        answerAtom.classList.add("wrong");
        wrongAtom++;
    }
    attemptsAtomText.innerHTML = "Attempts: " + attemptsAtom;
    accuracyAtomText.innerHTML = "Accuracy: " + (correctAtom / attemptsAtom * 100).toFixed(2) + "%";
}