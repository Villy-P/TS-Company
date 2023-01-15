"use strict";
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
        if (this.freckleGenotype == "ll")
            return "Absent";
        return "Present";
    }
    getDimple() {
        if (this.freckleGenotype == "dd")
            return "Absent";
        return "Present";
    }
    getData() {
        return `<pre>
        \n  Hair Color:            ${this.getHairColor()} (${this.hairColorGenotype1 + this.hairColorGenotype2})
  Hair Body:             ${this.getHairBody()} (${this.hairBodyGenotype})
  Hair Length:           ${this.getHairLength()} (${this.hairLengthGenotype})
  Widow's Peak:          ${this.getWidowsPeak()} (${this.widowsPeakGenotype})
  Eyebrow Size:          ${this.getEyebrowSize()} (${this.eyebrowSizeGenotype})
  Eyebrow Placement:     ${this.getEyebrowPlacement()} (${this.eyebrowPlacementGenotype})\n
  Eye Color:             ${this.getEyeColor()} (${this.eyeColorGenotype1 + this.eyeColorGenotype2})
  Eye Size:              ${this.getEyeSize()} (${this.eyeSizeGenotype})
  Eye Shape:             ${this.getEyeShape()} (${this.eyeShapeGenotype})
  Eye Slant:             ${this.getEyeSlant()} (${this.eyeSlantGenotype})
  Eyelash:               ${this.getEyelash()} (${this.eyelashGenotype})\n
  Skin Color:            ${this.getSkinColor()} (${this.skinColorGenotype1 + this.skinColorGenotype2})
  Face Shape:            ${this.getFaceShape()} (${this.faceShapeGenotype})
  Nose Size:             ${this.getNoseSize()} (${this.noseSizeGenotype})
  Ear Type:              ${this.getEarType()} (${this.earTypeGenotype})
  Lip Type:              ${this.getLipType()} (${this.lipTypeGenotype})
  Freckles:              ${this.getFreckle()} (${this.freckleGenotype})
  Dimples:               ${this.getDimple()} (${this.dimpleGenotype})
  </pre>`;
    }
}
