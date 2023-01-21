const nameInputs:      NodeListOf<HTMLInputElement> = document.querySelectorAll(".name-input");
const finalizeCreate:  HTMLDivElement = document.querySelector(".finalizeCreate")!;
const neverMind:       HTMLDivElement = document.querySelector(".neverMind")!;
const invalidArgs:     HTMLDivElement = document.querySelector(".invalid-args")!;
const personContainer: HTMLDivElement = document.querySelector(".person-container")!;
const noPeople:        HTMLDivElement = document.querySelector(".no-people")!;
const selecterText:    HTMLDivElement = document.querySelector(".selecter-text")!;
const babyContainer:   HTMLDivElement = document.querySelector(".baby-container")!;
const okBabyText:      HTMLDivElement = document.querySelector(".ok-baby")!;

let selecter: string = "none";
let male: Person;
let female: Person;

function okBaby(): void {
    okBabyText.style.display = "none";
    babyContainer.children[0].remove();
    babyContainer.children[0].remove();
}

function pressCreateRandomPerson(): void {
    nameInputs.forEach((e: HTMLInputElement) => {
        e.setAttribute("style", "display: inline;");
    });
    finalizeCreate.setAttribute("style", "display: inline;");
    neverMind.setAttribute("style", "display: inline;");
    noPeople.setAttribute("style", "display: none");
    selecterText.setAttribute("style", "display: none");
    selecter = "none";
}

function pressNeverMind(): void {
    nameInputs.forEach((e: HTMLInputElement) => {
        e.setAttribute("style", "display: none;");
    });
    finalizeCreate.setAttribute("style", "display: none;");
    neverMind.setAttribute("style", "display: none;");
    invalidArgs.setAttribute("style", "display: none;");
}

function randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickBetweenTwoValues(first: string, second: string): string {
    return randomInRange(0, 1) == 0 ? first : second;
}

function makeGenotype(capital: string, lower: string): string {
    const genotype: string = pickBetweenTwoValues(capital, lower) + pickBetweenTwoValues(capital, lower);
    if (genotype == lower + capital)
        return capital + lower;
    return genotype;
}

const people: Person[] = [];

function pressFinalizeCreate(): void {
    if (nameInputs[0].value == "" || nameInputs[1].value == "") {
        invalidArgs.setAttribute("style", "display: inline;");
        return;
    }
    pressNeverMind();
    const newPerson: Person = new Person(nameInputs[0].value, nameInputs[1].value);
    people.push(newPerson);
    const personDiv: HTMLButtonElement = document.createElement("button");
    makePersonContainer(personContainer, personDiv, newPerson);
    personDiv.addEventListener("click", function() {
        const content = personDiv.nextElementSibling! as HTMLParagraphElement;
        if (selecter == "none") {
            personDiv.classList.toggle("person-btn-active");
            if (content.style.maxHeight === "0px")
                content.style.maxHeight = content.scrollHeight + "px";
            else
                content.style.maxHeight = "0px";
        }
        if (selecter == "m" && newPerson.isMale) {
            male = newPerson;
            selecter = "f";
            selecterText.innerHTML = "Select the Female";
        } else if (selecter == "f" && !newPerson.isMale) {
            female = newPerson;
            selecter = "none";
            selecterText.setAttribute("style", "display: none");
            selecterText.innerHTML = "Select the Male";
            const babyDiv: HTMLButtonElement = document.createElement("button");
            makePersonContainer(babyContainer, babyDiv, male.haveBabyWith(female));
            okBabyText.style.display = "inline";
            babyDiv.addEventListener("click", function() {
                const content = babyDiv.nextElementSibling! as HTMLParagraphElement;
                babyDiv.classList.toggle("person-btn-active");
                if (content.style.maxHeight === "0px")
                    content.style.maxHeight = content.scrollHeight + "px";
                else
                    content.style.maxHeight = "0px";
            });
        }
    });
}

function makePersonContainer(container: HTMLDivElement, personDiv: HTMLButtonElement, person: Person): void {
    const personContent: HTMLParagraphElement = document.createElement("p");
    const personContentDiv: HTMLDivElement = document.createElement("div");
    personContentDiv.className = "person-btn-content";
    personContent.innerHTML = person.getData();
    personContentDiv.style.textAlign = "left";
    personDiv.classList.add(person.isMale ? "male" : "female");
    personDiv.classList.add("person-btn");
    personDiv.innerHTML = person.firstName + " " + person.lastName;
    personContentDiv.style.maxHeight = "0px";
    container.appendChild(personDiv);
    personContentDiv.appendChild(personContent);
    container.appendChild(personContentDiv);
}

function hasMale(): boolean {
    for (const person of people)
        if (person.isMale)
            return true;
    return false;
}

function hasFemale(): boolean {
    for (const person of people)
        if (!person.isMale)
            return true;
    return false;
}

function pressSeeBaby(): void {
    pressNeverMind();
    if (!hasMale() || !hasFemale()) {
        noPeople.setAttribute("style", "display: inline");
        return;
    }
    selecterText.setAttribute("style", "display: inline");
    selecter = "m";
}

const nonProblemDiv: HTMLDivElement = document.querySelector(".non-problem")!;
const problemDiv: HTMLDivElement = document.querySelector(".problem")!;
const tryProblem: HTMLButtonElement = document.querySelector(".change")!;
let problemPart: boolean = false

function pressTryProblems(): void {
    tryProblem.innerHTML = problemPart ? "Try Some Problems" : "Go Back";
    nonProblemDiv.style.display = problemPart ? "inline" : "none";
    problemDiv.style.display = problemPart ? "none" : "inline";
    problemPart = !problemPart;
}

function getPart(part: string, person: Person): string[] {
    switch (part) {
        case "Hair Body":
            return [person.getHairBody(), person.hairBodyGenotype];
        case "Hair Length":
			return [person.getHairLength(), person.hairLengthGenotype];
        case "Widow's Peak":
			return [person.getWidowsPeak(), person.widowsPeakGenotype];
        case "Eyebrow Size":
			return [person.getEyebrowSize(), person.eyebrowSizeGenotype];
        case "Eyebrow Placement":
			return [person.getEyebrowPlacement(), person.eyebrowPlacementGenotype];
        case "Eye Size":
			return [person.getEyeSize(), person.eyeSizeGenotype];
        case "Eye Shape":
			return [person.getEyeShape(), person.eyeShapeGenotype];
        case "Eye Slant":
			return [person.getEyeSlant(), person.eyeSlantGenotype];
        case "Eyelash":
			return [person.getEyelash(), person.eyelashGenotype];
        case "Face Shape":
			return [person.getFaceShape(), person.faceShapeGenotype];
        case "Nose Size":
			return [person.getNoseSize(), person.noseSizeGenotype];
        case "Ear Type":
			return [person.getEarType(), person.earTypeGenotype];
        case "Lip Type":
			return [person.getLipType(), person.lipTypeGenotype];
        case "Freckles":
			return [person.getFreckle(), person.freckleGenotype];
        case "Dimples":
			return [person.getDimple(), person.dimpleGenotype];
    }
    throw new Error("Invalid person");
}

function generateNewProblem(part: string): (string|number)[] {
    const personOne: Person = new Person("New", "Person");
    const personTwo: Person = new Person("New", "Person");
    const child: Person = personOne.haveBabyWith(personTwo);
    const personOnePart: string[] = getPart(part, personOne);
    const personTwoPart: string[] = getPart(part, personTwo);
    const childPart: string[] = getPart(part, child);
    const answer: number = getGenotypeChance(personOnePart[1], personTwoPart[1], childPart[1]);
    return [`Person One's ${part} is ${personOnePart[0]} (${personOnePart[1]}). 
            Person Two's ${part} is ${personTwoPart[0]} (${personTwoPart[1]}).
            What is the chance that their baby's ${part} will be ${childPart[0]} (${childPart[1]})?`, answer];
}

function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getProblem(): (string|number)[] {
    const rand: number = randomIntFromInterval(0, 14);
    switch (rand) {
        case 0:
            return generateNewProblem("Hair Body");
        case 1:
            return generateNewProblem("Hair Length");
        case 2:
            return generateNewProblem("Widow's Peak");
        case 3:
            return generateNewProblem("Eyebrow Size");
        case 4:
            return generateNewProblem("Eyebrow Placement");
        case 5:
            return generateNewProblem("Eye Size");
        case 6:
            return generateNewProblem("Eye Shape");
        case 7:
            return generateNewProblem("Eye Slant");
        case 8:
            return generateNewProblem("Eyelash");
        case 9:
            return generateNewProblem("Face Shape");
        case 10:
            return generateNewProblem("Nose Size");
        case 11:
            return generateNewProblem("Ear Type");
        case 12:
            return generateNewProblem("Lip Type");
        case 13:
            return generateNewProblem("Freckles");
        case 14:
            return generateNewProblem("Dimples");
    }
    throw new Error("Invalid arg");
}

const problemText: HTMLParagraphElement = document.querySelector(".problem-text")!;
const submitButton: HTMLButtonElement = document.querySelector(".submit")!;
const answer: HTMLSelectElement = document.querySelector(".answer")!;

let currentGeneticProblem: (string | number)[] = getProblem();

let attemptsGen: number = 0;
let correctGen: number = 0;
let wrongGen: number = 0;

const attemptsGenText: HTMLParagraphElement = document.querySelector('.attempts')!;
const accuracyGenText: HTMLParagraphElement = document.querySelector(".accuracy")!;

function pressSubmitButton(): void {
    attemptsGen++;
    if (answer.value === currentGeneticProblem[1].toString().trim()) {
        correctGen++;
        currentGeneticProblem = getProblem();
        answer.classList.remove('wrong');
        problemText.innerHTML = currentGeneticProblem[0] as string;
        answer.value = "";
    } else {
        answer.classList.add("wrong");
        wrongGen++;
    }
    attemptsGenText.innerHTML = "Attempts: " + attemptsGen;
    accuracyGenText.innerHTML = "Accuracy: " + (correctGen / attemptsGen * 100).toFixed(2) + "%";
}

problemText.innerHTML = currentGeneticProblem[0].toString();