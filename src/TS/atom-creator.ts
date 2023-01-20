const molecules: NodeListOf<HTMLDivElement> = document.querySelectorAll(".molecule");
const nucleus: HTMLDivElement = document.querySelector(".nucleus")!;

function randomIntFromInterval(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function moveMolecule(): void {
    for (const molecule of molecules) {
        const boundingRect: DOMRect = nucleus.getBoundingClientRect();
        const width: number = boundingRect.width - (boundingRect.width * .2);
        const height: number = boundingRect.height - (boundingRect.height * .2);
        molecule.style.left = randomIntFromInterval((boundingRect.width * .1), width).toString() + "px";
        if (height > 0)
            molecule.style.top = randomIntFromInterval((boundingRect.height * .1), height).toString() + "px";
        else
            molecule.style.top = "-10px";
    }
}

window.addEventListener("resize", () => { moveMolecule(); });

moveMolecule();