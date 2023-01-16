const activitiesAbout: string[] = [
    "DNA",
    "RNA",
    "Amino Acids",
    "Genotypes",
    "Phenotypes"
];
let currentIndex: number = 0;

const activitiesAboutText: HTMLDivElement = document.querySelector(".activities-about-text")!;

function moveLeft(): void {
    currentIndex = currentIndex == 0 ? activitiesAbout.length - 1 : currentIndex -= 1;
    activitiesAboutText.innerHTML = activitiesAbout[currentIndex];
}

function moveRight(): void {
    currentIndex = currentIndex == activitiesAbout.length - 1 ? 0 : currentIndex += 1;
    activitiesAboutText.innerHTML = activitiesAbout[currentIndex];
}