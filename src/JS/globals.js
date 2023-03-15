"use strict";
function getLocalStorage(key) {
    return parseInt(localStorage.getItem(key) || "0");
}
function getSessionStorage(key) {
    return parseInt(sessionStorage.getItem(key) || "0");
}
function clearData() {
    localStorage.clear();
    sessionStorage.clear();
}
let globalAttempts = getLocalStorage("global_attempts");
let globalRight = getLocalStorage("global_right");
let sessionAttempts = getLocalStorage("session_attempts");
let sessionRight = getLocalStorage("session_right");
console.log(globalAttempts, globalRight, sessionAttempts, sessionRight);
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
