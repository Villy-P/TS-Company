const buttonAnswers: string[] = [
    "Mitochondria",  "Peroxisome",  "Ribosome",  "Vacuole", 
    "Centrosome", "Centriole", "Microtubule", "Plasma Membrane",
    "Cytoplasm", "Chromatin", "Nucleolus", "Nucleus", "Rough ER", 
    "Smooth ER", "Golgi Apparatus", "Golgi Vesicle", "Lysosome",
];

const currentButtonAnswers: string[] = [
    "Mitochondria",  "Peroxisome",  "Ribosome",  "Vacuole", 
    "Centrosome", "Centriole", "Microtubule", "Plasma Membrane",
    "Cytoplasm", "Chromatin", "Nucleolus", "Nucleus", "Rough ER", 
    "Smooth ER", "Golgi Apparatus", "Golgi Vesicle", "Lysosome",
];

const radioButtons: NodeListOf<Element> = document.querySelectorAll(".radio-button");

const matchingSelectText: HTMLDivElement = document.querySelector(".matching-select-text")!;

function generateNewMatchingProblem(): void {
    const index: number = getRandomValue(0, currentButtonAnswers.length - 1);
    const choice: string = currentButtonAnswers[index];
    currentButtonAnswers.splice(index, 1);
    matchingSelectText.innerHTML = `Select the ${choice}`;
}

generateNewMatchingProblem();