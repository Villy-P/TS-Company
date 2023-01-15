class Person {
    public isMale: boolean;
    public firstName: string;
    public lastName: string;

    public hairColorGenotype1: string;
    public hairColorGenotype2: string;
    public hairBodyGenotype: string;
    public hairLengthGenotype: string;
    public widowsPeakGenotype: string;
    public eyebrowSizeGenotype: string;
    public eyebrowPlacementGenotype: string;

    public eyeColorGenotype1: string;
    public eyeColorGenotype2: string;
    public eyeSizeGenotype: string;
    public eyeShapeGenotype: string;
    public eyeSlantGenotype: string;
    public eyelashGenotype: string;

    public skinColorGenotype1: string;
    public skinColorGenotype2: string;
    public faceShapeGenotype: string;
    public noseSizeGenotype: string;
    public earTypeGenotype: string;
    public lipTypeGenotype: string;
    public freckleGenotype: string;
    public dimpleGenotype: string;

    public constructor(fName: string, lName: string) {
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

    public getHairColor(): string {
        const hairColorGenotype: string = this.hairColorGenotype1 + this.hairColorGenotype2;
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

    public getHairBody(): string {
        if (this.hairBodyGenotype == "CC")
            return "Curly";
        if (this.hairBodyGenotype == "Cc")
            return "Wavy";
        return "Straight";
    }

    public getWidowsPeak(): string {
        if (this.widowsPeakGenotype == "ll")
            return "Absent";
        return "Present";
    }
    
    public getHairLength(): string {
        if (this.hairLengthGenotype == "ww")
            return "Short";
        if (this.hairLengthGenotype == "Ww")
            return "Medium";
        return "Long";
    }
    
    public getEyeColor(): string {
        const eyeColorGenotype: string = this.eyeColorGenotype1 + this.eyeColorGenotype2;
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
    
    public getEyeSize(): string {
        if (this.eyeSizeGenotype == "LL")
            return "Large";
        if (this.eyeSizeGenotype == "ll")
            return "Small";
        return "Medium";
    }
    
    public getEyeShape(): string {
        if (this.eyeShapeGenotype == "aa")
            return "Round";
        return "Wide";
    }
    
    public getEyeSlant(): string {
        if (this.eyeShapeGenotype == "hh")
            return "Upwards";
        return "Horizontal";
    }
    
    public getEyebrowSize(): string {
        if (this.eyebrowSizeGenotype == "tt")
            return "Thin";
        return "Thick";
    }
    
    public getEyebrowPlacement(): string {
        if (this.eyebrowPlacementGenotype == "ee")
            return "Unibrow";
        return "Apart";
    }
    
    public getEyelash(): string {
        if (this.eyelashGenotype == "mm")
            return "Short";
        return "Long";
    }
    
    public getSkinColor(): string {
        const skinColorGenotype: string = this.skinColorGenotype1 + this.skinColorGenotype2;
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
    
    public getFaceShape(): string {
        if (this.faceShapeGenotype == "ff")
            return "Oval";
        return "Circle";
    }
    
    public getNoseSize(): string {
        if (this.noseSizeGenotype == "nn")
            return "Narrow";
        return "Wide";
    }
    
    public getEarType(): string {
        if (this.earTypeGenotype == "ee")
            return "Attached";
        return "Free";
    }
    
    public getLipType(): string {
        if (this.lipTypeGenotype == "ll")
            return "Thin";
        return "Full";
    }
    
    public getFreckle(): string {
        if (this.freckleGenotype == "ll")
            return "Absent";
        return "Present";
    }
    
    public getDimple(): string {
        if (this.freckleGenotype == "dd")
            return "Absent";
        return "Present";
    }

    public getData(): string {
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