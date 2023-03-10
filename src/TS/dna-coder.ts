let displayTranslationChart: boolean = false;
let valueSetting: number = 1;
let currentProblem: string[] = [];

const chart: HTMLDivElement = document.querySelector(".container")!;
const chartButton: HTMLDivElement = document.querySelector(".activateChart")!;

function clickDisplayTranslationChart(): void {
    displayTranslationChart = !displayTranslationChart;
    chart.setAttribute("style", `display: ${displayTranslationChart ? "grid" : "none"};`);
    chartButton.innerHTML = displayTranslationChart ? "Hide Translation Chart" : "Show Translation Chart";
}

const activitiesDropdown: HTMLSelectElement = document.querySelector(".activities")!;
const settingsDropdown: HTMLSelectElement = document.querySelector(".settings")!;

settingsDropdown.onchange = function(): void {
    const text = settingsDropdown.options[settingsDropdown.selectedIndex].text;
    valueSetting = text !== "Random" ? text.split(" ")[0] as unknown as number : getRandomValue(1, 10);
    generateProblem();
}

activitiesDropdown.onchange = function () {
    hint.innerHTML = getHint();
    generateProblem();
};

function getHint() {
    switch (activitiesDropdown.value) {
        case "match-dna":
            return "<pre>A turns to T\nT turns to A\nG turns to C\nC turns to G\n</pre>";
        case "dna-to-rna":
            return "<pre>A turns to U\nT turns to A\nG turns to C\nC turns to G\n</pre>";
        case "rna-to-amino-acid":
            return "<pre>Use the translation chart.\nEither use the name or the\nshortened version of the name.\n</pre>";
        default:
            throw new Error("ID not found for: " + activitiesDropdown.value);
    }
}

const hintButton: HTMLElement = document.querySelector(".activateHint")!;
const hint: HTMLDivElement = document.querySelector(".content")!;

function clickDisplayHint() {
    hint.innerHTML = getHint();
}

function swap(s: string): string {
    let str: string = "";
    for (let i of s.split("")) {
        switch (i) {
            case 'T':
                if (activitiesDropdown.value === "match-dna")
                    str += 'A';
                break;
            case 'U':
                if (activitiesDropdown.value !== "match-dna")
                    str += 'A';
                break;
            case 'A':
                str += 'T';
                break;
            case 'C':
                str += 'G';
                break;
            case 'G':
                str += 'C';
                break;
        }
    }
    return str;
}

function getName(s: string): string {
    switch (s) {
        case "UUU":
        case "UUC":
            return "phenylalanine phe";
        case "UAG":
        case "UUG":
        case "UUA":
        case "CUU":
        case "CUC":
        case "CUA":
        case "CUG":
            return "leucine leu";
        case "AUU":
        case "AUC":
        case "AUA":
            return "isoleucine ile";
        case "AUG":
            return "methionine met";
        case "GUU":
        case "GUC":
        case "GUA":
        case "GUG":
            return "valine val";
        case "UCU":
        case "UCC":
        case "UCA":
        case "UCG":
        case "AGU":
        case "AGC":
            return "serine ser";
        case "CCU":
        case "CCA":
        case "CCC":
        case "CCG":
            return "proline pro";
        case "ACU":
        case "ACA":
        case "ACG":
        case "ACC":
            return "threonine thr";
        case "GCU":
        case "GCC":
        case "GCG":
        case "GCA":
            return "alanine ala";
        case "UAU":
        case "UAC":
            return "tyrosine tyr";
        case "UAA":
        case "UAG":
        case "UGA":
            return "stop stop";
        case "CAU":
        case "CAC":
            return "histidine his";
        case "CAA":
        case "CAG":
            return "glutamine glu";
        case "AAU":
        case "AAC":
            return "lysine lys";
        case "GAU":
        case "GAC":
            return "aspartic acid asp";
        case "GAA":
        case "GAG":
            return "glutamic acid glu";
        case "UGU":
        case "UGC":
            return "cysteine cys";
        case "UGG":
            return "tryptophan trp";
        case "CGU":
        case "CGA":
        case "CGC":
        case "CGG":
        case "AGA":
        case "AGG":
            return "arginine arg";
        case "GGU":
        case "GGG":
        case "GGC":
        case "GGA":
            return "glycine gly";
        default:
            throw new Error("Invlaid sequence: " + s);
    }
}

const problem: HTMLElement = document.querySelector(".problem")!;
const allGood: HTMLDivElement = document.querySelector(".allGood")!;

function resetGrid() {
    for (let i of problem.children)
        (i as HTMLInputElement).readOnly = false;
    currentProblem = [];
    allGood.setAttribute("style", "display:none");
    problem.innerHTML = "";
    problem.setAttribute("style", `grid-template-columns: ${"minmax(69px, 100px) ".repeat(valueSetting)};`);
}

function generateProblem() {
    resetGrid();
    for (let i = 0; i < valueSetting; i++) {
        const cell = document.createElement("div");
        const input = document.createElement("div");
        const wrapperDiv = document.createElement("div");
        input.contentEditable = "true";
        input.className = "problem-input";
        cell.className = "problem-cell";
        cell.innerHTML = generateRandomSequence();
        currentProblem.push(cell.innerHTML);
        wrapperDiv.appendChild(cell);
        wrapperDiv.appendChild(input);
        problem.appendChild(wrapperDiv);
    }
 
}

function getRandomValueFromArray(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}

const letters = ["G", "C", "A", "T"];
const aminoLetter = ["A", "C", "G", "U"];

function generateRandomSequence() {
    const l: string[] = activitiesDropdown.value === "rna-to-amino-acid" ? aminoLetter : letters;
    return getRandomValueFromArray(l) +
           getRandomValueFromArray(l) +
           getRandomValueFromArray(l);
}

const attemptsDiv: HTMLParagraphElement = document.querySelector(".attempts")!;
const accuracyDiv: HTMLParagraphElement = document.querySelector(".accuracy")!;

let attempts: number = 0;
let correct: number = 0;
let wrong: number = 0;

function solve() {
    const children = problem.children;
    let hadWrong = false;
    for (let i = 0; i < children.length; i++) {
        const child: HTMLDivElement = children[i].children[1] as HTMLDivElement;
        child.classList.remove("correct");
        child.classList.remove("wrong");
        if (child.textContent === null)
            child.classList.add("wrong");
        else
            swap(child.textContent.toUpperCase()) == currentProblem[i] ? child.classList.add("correct") : child.classList.add("wrong");
        if (child.classList.contains("wrong"))
            hadWrong = true;
    }
    for (let i of children)
        if (i.classList.contains("correct"))
            (i as HTMLInputElement).readOnly = true;
    if (!hadWrong) {
        if (allGood.style.display === "none")
            correct++;
        allGood.setAttribute("style", "display: text");
    } else {
        wrong++;
    }
}

function solveAminoAcid() {
    const children = problem.children;
    let hadWrong = false;
    for (let i = 0; i < children.length; i++) {
        const child: HTMLDivElement = children[i].children[1] as HTMLDivElement;
        child.classList.remove("correct");
        child.classList.remove("wrong");
        const name: string = getName(currentProblem[i].toUpperCase());
        const splitName: string[] = name.split(" ");
        console.log(child.textContent)
        if (child.textContent === null || child.textContent === "")
            child.classList.add("wrong")
        else
            splitName.pop() == child.textContent.toLowerCase() || splitName.join(" ") == child.textContent[0].toLowerCase() ? 
                child.classList.add("correct") : 
                child.classList.add("wrong");
        if (child.classList.contains("wrong"))
            hadWrong = true;
    }
    for (let i of children)
        if (i.classList.contains("correct"))
            (i as HTMLInputElement).readOnly = true;
    if (!hadWrong) {
        if (allGood.style.display === "none")
            correct++;
        allGood.setAttribute("style", "display: text");
    } else {
        wrong++;       
    }
}

function solveButtonClicked() {
    if (allGood.style.display === "none")
        attempts++;
    activitiesDropdown.value === "rna-to-amino-acid" ? solveAminoAcid() : solve();
    attemptsDiv.innerHTML = `Attempts: ${attempts}`;
    accuracyDiv.innerHTML = `Accuracy: ${(correct / attempts * 100).toFixed(2)}%`;
}

generateProblem();