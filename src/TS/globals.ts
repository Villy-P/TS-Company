function getLocalStorage(key: string): number {
    return parseInt(localStorage.getItem(key) || "0");
}

function getSessionStorage(key: string): number {
    return parseInt(sessionStorage.getItem(key) || "0");
}

function clearData(): void {
    localStorage.clear();
    sessionStorage.clear();
}

let globalAttempts: number = getLocalStorage("global_attempts");
let globalRight: number = getLocalStorage("global_right");

let sessionAttempts: number = getLocalStorage("session_attempts");
let sessionRight: number = getLocalStorage("session_right");

console.log(globalAttempts, globalRight, sessionAttempts, sessionRight)