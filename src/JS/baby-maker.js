"use strict";
const nameInputs = document.querySelectorAll(".name-input");
const finalizeCreate = document.querySelector(".finalizeCreate");
const neverMind = document.querySelector(".neverMind");
const invalidArgs = document.querySelector(".invalid-args");
const personContainer = document.querySelector(".person-container");
const noPeople = document.querySelector(".no-people");
function pressCreateRandomPerson() {
    nameInputs.forEach((e) => {
        e.setAttribute("style", "display: inline;");
    });
    finalizeCreate.setAttribute("style", "display: inline;");
    neverMind.setAttribute("style", "display: inline;");
    noPeople.setAttribute("style", "display: none");
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
    const personContent = document.createElement("p");
    const personContentDiv = document.createElement("div");
    personContentDiv.className = "person-btn-content";
    personContent.innerHTML = newPerson.getData();
    personDiv.classList.add(newPerson.isMale ? "male" : "female");
    personDiv.classList.add("person-btn");
    personDiv.innerHTML = newPerson.firstName + " " + newPerson.lastName;
    personContentDiv.style.maxHeight = "0px";
    personContainer.appendChild(personDiv);
    personContentDiv.appendChild(personContent);
    personContainer.appendChild(personContentDiv);
    personDiv.addEventListener("click", function () {
        personDiv.classList.toggle("person-btn-active");
        const content = personDiv.nextElementSibling;
        if (content.style.maxHeight === "0px")
            content.style.maxHeight = content.scrollHeight + "px";
        else
            content.style.maxHeight = "0px";
    });
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
}
