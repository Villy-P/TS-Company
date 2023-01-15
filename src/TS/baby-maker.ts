const nameInputs:      NodeListOf<HTMLInputElement> = document.querySelectorAll(".name-input");
const finalizeCreate:  HTMLDivElement = document.querySelector(".finalizeCreate")!;
const neverMind:       HTMLDivElement = document.querySelector(".neverMind")!;
const invalidArgs:     HTMLDivElement = document.querySelector(".invalid-args")!;
const personContainer: HTMLDivElement = document.querySelector(".person-container")!;
const noPeople:        HTMLDivElement = document.querySelector(".no-people")!;
const selecterText:    HTMLDivElement = document.querySelector(".selecter-text")!;

let selecter: string = "none";
let male: Person;
let female: Person;

function pressCreateRandomPerson(): void {
    nameInputs.forEach((e: HTMLInputElement) => {
        e.setAttribute("style", "display: inline;");
    });
    finalizeCreate.setAttribute("style", "display: inline;");
    neverMind.setAttribute("style", "display: inline;");
    noPeople.setAttribute("style", "display: none");
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
    const personContent: HTMLParagraphElement = document.createElement("p");
    const personContentDiv: HTMLDivElement = document.createElement("div");
    personContentDiv.className = "person-btn-content";
    personContent.innerHTML = newPerson.getData();
    personDiv.classList.add(newPerson.isMale ? "male" : "female");
    personDiv.classList.add("person-btn");
    personDiv.innerHTML = newPerson.firstName + " " + newPerson.lastName;
    personContentDiv.style.maxHeight = "0px";
    personContainer.appendChild(personDiv);
    personContentDiv.appendChild(personContent);
    personContainer.appendChild(personContentDiv);
    personDiv.addEventListener("click", function() {
        personDiv.classList.toggle("person-btn-active");
        const content = personDiv.nextElementSibling! as HTMLParagraphElement;
        if (selecter == "none") {
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
        }
    });
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