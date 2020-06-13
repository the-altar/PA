"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const skills_1 = require("./skills");
class Character extends skills_1.Skills {
    constructor(data, playerId) {
        super(data.skills);
        this.name = data.name;
        this.facepic = data.facepic;
        this.description = data.description;
        this.hitPoints = data.hitPoints;
        this.type = data.type;
        this.energyGain = data.energyGain;
        this.belongs = {};
        this.belongs[playerId] = true;
    }
    belongsTo(id) {
        return this.belongs[id];
    }
    generateEnergy() {
        let index = this.energyGain[Math.floor(Math.random() * this.energyGain.length)];
        if (index === 4) {
            index = Math.floor(Math.random() * 3);
        }
        return index;
    }
    getEnergyGain() {
        return this.energyGain;
    }
}
exports.Character = Character;
//# sourceMappingURL=character.js.map