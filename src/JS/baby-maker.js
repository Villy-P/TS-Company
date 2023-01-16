"use strict";
const nameInputs = document.querySelectorAll(".name-input");
const finalizeCreate = document.querySelector(".finalizeCreate");
const neverMind = document.querySelector(".neverMind");
const invalidArgs = document.querySelector(".invalid-args");
const personContainer = document.querySelector(".person-container");
const noPeople = document.querySelector(".no-people");
const selecterText = document.querySelector(".selecter-text");
const babyContainer = document.querySelector(".baby-container");
const okBabyText = document.querySelector(".ok-baby");
let selecter = "none";
let male;
let female;
function okBaby() {
    okBabyText.style.display = "none";
    babyContainer.children[0].remove();
}
function pressCreateRandomPerson() {
    nameInputs.forEach((e) => {
        e.setAttribute("style", "display: inline;");
    });
    finalizeCreate.setAttribute("style", "display: inline;");
    neverMind.setAttribute("style", "display: inline;");
    noPeople.setAttribute("style", "display: none");
    selecterText.setAttribute("style", "display: none");
    selecter = "none";
}
function pressNeverMind() {
    nameInputs.forEach((e) => {
        e.setAttribute("style", "display: none;");
    });
    finalizeCreate.setAttribute("style", "display: none;");
    neverMind.setAttribute("style", "display: none;");
    invalidArgs.setAttribute("style", "display: none;");
}
function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pickBetweenTwoValues(first, second) {
    return randomInRange(0, 1) == 0 ? first : second;
}
function makeGenotype(capital, lower) {
    const genotype = pickBetweenTwoValues(capital, lower) + pickBetweenTwoValues(capital, lower);
    if (genotype == lower + capital)
        return capital + lower;
    return genotype;
}
const people = [];
function pressFinalizeCreate() {
    if (nameInputs[0].value == "" || nameInputs[1].value == "") {
        invalidArgs.setAttribute("style", "display: inline;");
        return;
    }
    pressNeverMind();
    const newPerson = new Person(nameInputs[0].value, nameInputs[1].value);
    people.push(newPerson);
    const personDiv = document.createElement("button");
    makePersonContainer(personContainer, personDiv, newPerson);
    personDiv.addEventListener("click", function () {
        const content = personDiv.nextElementSibling;
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
        }
        else if (selecter == "f" && !newPerson.isMale) {
            female = newPerson;
            selecter = "none";
            selecterText.setAttribute("style", "display: none");
            selecterText.innerHTML = "Select the Male";
            const babyDiv = document.createElement("button");
            makePersonContainer(babyContainer, babyDiv, male.haveBabyWith(female));
            okBabyText.style.display = "inline";
            babyDiv.addEventListener("click", function () {
                const content = babyDiv.nextElementSibling;
                babyDiv.classList.toggle("person-btn-active");
                if (content.style.maxHeight === "0px")
                    content.style.maxHeight = content.scrollHeight + "px";
                else
                    content.style.maxHeight = "0px";
            });
        }
    });
}
function makePersonContainer(container, personDiv, person) {
    const personContent = document.createElement("p");
    const personContentDiv = document.createElement("div");
    personContentDiv.className = "person-btn-content";
    personContent.innerHTML = person.getData();
    personDiv.classList.add(person.isMale ? "male" : "female");
    personDiv.classList.add("person-btn");
    personDiv.innerHTML = person.firstName + " " + person.lastName;
    personContentDiv.style.maxHeight = "0px";
    container.appendChild(personDiv);
    personContentDiv.appendChild(personContent);
    container.appendChild(personContentDiv);
}
function hasMale() {
    for (const person of people)
        if (person.isMale)
            return true;
    return false;
}
function hasFemale() {
    for (const person of people)
        if (!person.isMale)
            return true;
    return false;
}
function pressSeeBaby() {
    pressNeverMind();
    if (!hasMale() || !hasFemale()) {
        noPeople.setAttribute("style", "display: inline");
        return;
    }
    selecterText.setAttribute("style", "display: inline");
    selecter = "m";
}
