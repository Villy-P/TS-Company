function shuffleArray(array: string[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const activitiesAbout: string[] = [
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

let currentIndex: number = 0;

const activitiesAboutText: HTMLDivElement = document.querySelector(".activities-about-text")!;

activitiesAboutText.innerHTML = activitiesAbout[0];

function moveLeft(): void {
    currentIndex = currentIndex == 0 ? activitiesAbout.length - 1 : currentIndex -= 1;
    activitiesAboutText.innerHTML = activitiesAbout[currentIndex];
}

function moveRight(): void {
    currentIndex = currentIndex == activitiesAbout.length - 1 ? 0 : currentIndex += 1;
    activitiesAboutText.innerHTML = activitiesAbout[currentIndex];
}

const globalAttemptsDiv: HTMLDivElement = document.querySelector('.globalAttempt')!;
globalAttemptsDiv.innerHTML = "Attempts: " + getLocalStorage('global_attempts').toString();
const globalAccuracyDiv: HTMLDivElement = document.querySelector('.globalAccuracy')!;
globalAccuracyDiv.innerHTML = "Accuracy: " + (getLocalStorage('global_right') != 0 ? (getLocalStorage('global_right') / getLocalStorage('global_attempts') * 100).toFixed(2) + "%" : "0%");

const sessionAttemptsDiv: HTMLDivElement = document.querySelector('.sessionAttempt')!;
sessionAttemptsDiv.innerHTML = "Attempts: " + getSessionStorage('session_attempts').toString();
const sessionAccuracyDiv: HTMLDivElement = document.querySelector('.sessionAccuracy')!;
sessionAccuracyDiv.innerHTML = "Accuracy: " +  (getSessionStorage('session_right') != 0 ? (getSessionStorage('session_right') / getSessionStorage('session_attempts') * 100).toFixed(2) + "%" : "0%");