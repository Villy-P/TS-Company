"use strict";
function getGenotype(genotype) {
    const capitalGenotype = genotype[0].toUpperCase();
    const lowerGenotype = genotype[0].toLowerCase();
    if (genotype == capitalGenotype + capitalGenotype)
        return "homo-dominant";
    if (genotype == lowerGenotype + lowerGenotype)
        return "homo-reccessive";
    return "hetero";
}
function makeGenotypeFrom(fatherGenotype, motherGenotype) {
    const capitalGenotype = fatherGenotype[0].toUpperCase();
    const lowerGenotype = fatherGenotype[0].toLowerCase();
    const fatherGene = getGenotype(fatherGenotype);
    const motherGene = getGenotype(motherGenotype);
    if (fatherGene == "homo-dominant" && motherGene == "homo-dominant")
        return capitalGenotype + capitalGenotype;
    if (fatherGene == "homo-reccessive" && motherGene == "homo-reccessive")
        return lowerGenotype + lowerGenotype;
    if (fatherGene == "homo-reccessive" && motherGene == "homo-dominant" || fatherGene == "homo-dominant" && motherGene == "homo-reccessive")
        return capitalGenotype + lowerGenotype;
    if (fatherGene == "hetero" && motherGene == "hetero") {
        const randomNum = randomInRange(1, 4);
        if (randomNum == 1)
            return capitalGenotype + capitalGenotype;
        if (randomNum == 2)
            return lowerGenotype + lowerGenotype;
        return capitalGenotype + lowerGenotype;
    }
    if (fatherGene == "hetero" && motherGene == "homo-dominant" || fatherGene == "homo-dominant" && motherGene == "hetero")
        return randomInRange(0, 1) == 0 ? capitalGenotype + capitalGenotype : capitalGenotype + lowerGenotype;
    return randomInRange(0, 1) == 0 ? capitalGenotype + lowerGenotype : lowerGenotype + lowerGenotype;
}
function getGenotypeChance(fatherGenotype, motherGenotype, childGenotype) {
    const fatherGene = getGenotype(fatherGenotype);
    const motherGene = getGenotype(motherGenotype);
    const childGene = getGenotype(childGenotype);
    if (fatherGene == "homo-dominant" && motherGene == "homo-dominant")
        return childGene == "homo-dominant" ? 100 : 0;
    if (fatherGene == "homo-reccessive" && motherGene == "homo-reccessive")
        return childGene == "homo-reccessive" ? 100 : 0;
    if (fatherGene == "homo-reccessive" && motherGene == "homo-dominant" || fatherGene == "homo-dominant" && motherGene == "homo-reccessive")
        return childGene == "hetero" ? 100 : 0;
    if (fatherGene == "hetero" && motherGene == "hetero")
        return childGene == "hetero" ? 50 : 25;
    if (fatherGene == "hetero" && motherGene == "homo-dominant" || fatherGene == "homo-dominant" && motherGene == "hetero")
        return childGene == "homo-reccessive" ? 0 : 50;
    return childGene == "homo-dominant" ? 0 : 50;
}
class Person {
    constructor(fName, lName) {
        this.firstName = fName;
        this.lastName = lName;
        this.isMale = randomInRange(0, 1) == 0;
        this.hairColorGenotype1 = makeGenotype("A", "a");
        this.hairColorGenotype2 = makeGenotype("B", "b");
        this.hairBodyGenotype = makeGenotype("C", "c");
        this.hairLengthGenotype = makeGenotype("L", "l");
        this.widowsPeakGenotype = makeGenotype("W", "w");
        this.eyebrowSizeGenotype = makeGenotype("T", "t");
        this.eyebrowPlacementGenotype = makeGenotype("E", "e");
        this.eyeColorGenotype1 = makeGenotype("A", "a");
        this.eyeColorGenotype2 = makeGenotype("B", "b");
        this.eyeSizeGenotype = makeGenotype("L", "l");
        this.eyeShapeGenotype = makeGenotype("H", "h");
        this.eyeSlantGenotype = makeGenotype("H", "h");
        this.eyelashGenotype = makeGenotype("M", "m");
        this.skinColorGenotype1 = makeGenotype("A", "a");
        this.skinColorGenotype2 = makeGenotype("B", "b");
        this.faceShapeGenotype = makeGenotype("F", "f");
        this.noseSizeGenotype = makeGenotype("N", "n");
        this.earTypeGenotype = makeGenotype("E", "e");
        this.lipTypeGenotype = makeGenotype("L", "l");
        this.freckleGenotype = makeGenotype("F", "f");
        this.dimpleGenotype = makeGenotype("D", "d");
    }
    haveBabyWith(other) {
        const baby = new Person("New", "Baby");
        baby.isMale = randomInRange(0, 1) == 0;
        baby.hairColorGenotype1 = makeGenotypeFrom(this.hairColorGenotype1, other.hairColorGenotype1);
        baby.hairColorGenotype2 = makeGenotypeFrom(this.hairColorGenotype2, other.hairColorGenotype2);
        baby.hairBodyGenotype = makeGenotypeFrom(this.hairBodyGenotype, other.hairBodyGenotype);
        baby.hairLengthGenotype = makeGenotypeFrom(this.hairLengthGenotype, other.hairLengthGenotype);
        baby.widowsPeakGenotype = makeGenotypeFrom(this.widowsPeakGenotype, other.widowsPeakGenotype);
        baby.eyebrowSizeGenotype = makeGenotypeFrom(this.eyebrowSizeGenotype, other.eyebrowSizeGenotype);
        baby.eyebrowPlacementGenotype = makeGenotypeFrom(this.eyebrowPlacementGenotype, other.eyebrowPlacementGenotype);
        baby.eyeColorGenotype1 = makeGenotypeFrom(this.eyeColorGenotype1, other.eyeColorGenotype1);
        baby.eyeColorGenotype2 = makeGenotypeFrom(this.eyeColorGenotype2, other.eyeColorGenotype2);
        baby.eyeSizeGenotype = makeGenotypeFrom(this.eyeSizeGenotype, other.eyeSizeGenotype);
        baby.eyeShapeGenotype = makeGenotypeFrom(this.eyeShapeGenotype, other.eyeShapeGenotype);
        baby.eyeSlantGenotype = makeGenotypeFrom(this.eyeSlantGenotype, other.eyeSlantGenotype);
        baby.eyelashGenotype = makeGenotypeFrom(this.eyelashGenotype, other.eyelashGenotype);
        baby.skinColorGenotype1 = makeGenotypeFrom(this.skinColorGenotype1, other.skinColorGenotype1);
        baby.skinColorGenotype2 = makeGenotypeFrom(this.skinColorGenotype2, other.skinColorGenotype2);
        baby.faceShapeGenotype = makeGenotypeFrom(this.faceShapeGenotype, other.faceShapeGenotype);
        baby.noseSizeGenotype = makeGenotypeFrom(this.noseSizeGenotype, other.noseSizeGenotype);
        baby.earTypeGenotype = makeGenotypeFrom(this.earTypeGenotype, other.earTypeGenotype);
        baby.lipTypeGenotype = makeGenotypeFrom(this.lipTypeGenotype, other.lipTypeGenotype);
        baby.freckleGenotype = makeGenotypeFrom(this.freckleGenotype, other.freckleGenotype);
        baby.dimpleGenotype = makeGenotypeFrom(this.dimpleGenotype, other.dimpleGenotype);
        return baby;
    }
    getHairColor() {
        const hairColorGenotype = this.hairColorGenotype1 + this.hairColorGenotype2;
        if (hairColorGenotype == "AABB")
            return "Jet Black";
        if (hairColorGenotype == "AABb")
            return "Dark Brown";
        if (hairColorGenotype == "AaBB")
            return "Medium Brown";
        if (hairColorGenotype == "AaBb")
            return "Brown";
        if (hairColorGenotype == "AAbb")
            return "Auburn Brown";
        if (hairColorGenotype == "aaBB")
            return "Red";
        if (hairColorGenotype == "Aabb")
            return "Light Brown";
        if (hairColorGenotype == "aaBb")
            return "Dirty Blonde";
        return "Golden Blonde";
    }
    getHairBody() {
        if (this.hairBodyGenotype == "CC")
            return "Curly";
        if (this.hairBodyGenotype == "Cc")
            return "Wavy";
        return "Straight";
    }
    getWidowsPeak() {
        if (this.widowsPeakGenotype == "ll")
            return "Absent";
        return "Present";
    }
    getHairLength() {
        if (this.hairLengthGenotype == "ww")
            return "Short";
        if (this.hairLengthGenotype == "Ww")
            return "Medium";
        return "Long";
    }
    getEyeColor() {
        const eyeColorGenotype = this.eyeColorGenotype1 + this.eyeColorGenotype2;
        if (eyeColorGenotype == "AABB")
            return "Brown";
        if (eyeColorGenotype == "AABb")
            return "Light Brown";
        if (eyeColorGenotype == "AaBb")
            return "Tan";
        if (eyeColorGenotype == "Aabb")
            return "Green";
        return "Blue";
    }
    getEyeSize() {
        if (this.eyeSizeGenotype == "LL")
            return "Large";
        if (this.eyeSizeGenotype == "ll")
            return "Small";
        return "Medium";
    }
    getEyeShape() {
        if (this.eyeShapeGenotype == "aa")
            return "Round";
        return "Wide";
    }
    getEyeSlant() {
        if (this.eyeShapeGenotype == "hh")
            return "Upwards";
        return "Horizontal";
    }
    getEyebrowSize() {
        if (this.eyebrowSizeGenotype == "tt")
            return "Thin";
        return "Thick";
    }
    getEyebrowPlacement() {
        if (this.eyebrowPlacementGenotype == "ee")
            return "Unibrow";
        return "Apart";
    }
    getEyelash() {
        if (this.eyelashGenotype == "mm")
            return "Short";
        return "Long";
    }
    getSkinColor() {
        const skinColorGenotype = this.skinColorGenotype1 + this.skinColorGenotype2;
        if (skinColorGenotype == "AABB")
            return "Black";
        if (skinColorGenotype == "aabb")
            return "White";
        if (skinColorGenotype == "AABb" ||
            skinColorGenotype == "AABB")
            return "Brown";
        if (skinColorGenotype == "Aabb" ||
            skinColorGenotype == "aaBb")
            return "Tan";
        return "Light Brown";
    }
    getFaceShape() {
        if (this.faceShapeGenotype == "ff")
            return "Oval";
        return "Circle";
    }
    getNoseSize() {
        if (this.noseSizeGenotype == "nn")
            return "Narrow";
        return "Wide";
    }
    getEarType() {
        if (this.earTypeGenotype == "ee")
            return "Attached";
        return "Free";
    }
    getLipType() {
        if (this.lipTypeGenotype == "ll")
            return "Thin";
        return "Full";
    }
    getFreckle() {
        if (this.freckleGenotype == "ff")
            return "Absent";
        return "Present";
    }
    getDimple() {
        if (this.freckleGenotype == "dd")
            return "Absent";
        return "Present";
    }
    getData() {
        let data = "<pre>";
        data += `<p>` + `Phenotype`.padStart(41, " ") + "Genotype".padStart(25, " ") + "</p>";
        data += `<p>    Hair Color:`.padEnd(35, " ") + `${this.getHairColor().padEnd(25, " ")} (${this.hairColorGenotype1 + this.hairColorGenotype2})</p>`;
        data += `<p>    Hair Body:`.padEnd(35, " ") + `${this.getHairBody().padEnd(25, " ")} (${this.hairBodyGenotype})</p>`;
        data += `<p>    Hair Length:`.padEnd(35, " ") + `${this.getHairLength().padEnd(25, " ")} (${this.hairLengthGenotype})</p>`;
        data += `<p>    Widow's Peak:`.padEnd(35, " ") + `${this.getWidowsPeak().padEnd(25, " ")} (${this.widowsPeakGenotype})</p>`;
        data += `<p>    Eyebrow Size:`.padEnd(35, " ") + `${this.getEyebrowSize().padEnd(25, " ")} (${this.eyebrowSizeGenotype})</p>`;
        data += `<p>    Eyebrow Placement:`.padEnd(35, " ") + `${this.getEyebrowPlacement().padEnd(25, " ")} (${this.eyebrowPlacementGenotype})</p>`;
        data += `<p>    Eye Color:`.padEnd(35, " ") + `${this.getEyeColor().padEnd(25, " ")} (${this.eyeColorGenotype1 + this.eyeColorGenotype2})</p>`;
        data += `<p>    Eye Size:`.padEnd(35, " ") + `${this.getEyeSize().padEnd(25, " ")} (${this.eyeSizeGenotype})</p>`;
        data += `<p>    Eye Shape:`.padEnd(35, " ") + `${this.getEyeShape().padEnd(25, " ")} (${this.eyeShapeGenotype})</p>`;
        data += `<p>    Eye Slant:`.padEnd(35, " ") + `${this.getEyeSlant().padEnd(25, " ")} (${this.eyeSlantGenotype})</p>`;
        data += `<p>    Eyelash:`.padEnd(35, " ") + `${this.getEyelash().padEnd(25, " ")} (${this.eyelashGenotype})</p>`;
        data += `<p>    Skin Color:`.padEnd(35, " ") + `${this.getSkinColor().padEnd(25, " ")} (${this.skinColorGenotype1 + this.skinColorGenotype2})</p>`;
        data += `<p>    Face Shape:`.padEnd(35, " ") + `${this.getFaceShape().padEnd(25, " ")} (${this.faceShapeGenotype})</p>`;
        data += `<p>    Nose Size:`.padEnd(35, " ") + `${this.getNoseSize().padEnd(25, " ")} (${this.noseSizeGenotype})</p>`;
        data += `<p>    Ear Type:`.padEnd(35, " ") + `${this.getEarType().padEnd(25, " ")} (${this.earTypeGenotype})</p>`;
        data += `<p>    Lip Type:`.padEnd(35, " ") + `${this.getLipType().padEnd(25, " ")} (${this.lipTypeGenotype})</p>`;
        data += `<p>    Freckles:`.padEnd(35, " ") + `${this.getFreckle().padEnd(25, " ")} (${this.freckleGenotype})</p>`;
        data += `<p>    Dimples:`.padEnd(35, " ") + `${this.getDimple().padEnd(25, " ")} (${this.dimpleGenotype})</p>`;
        data += `<br>`;
        return data + "</pre>";
    }
}
