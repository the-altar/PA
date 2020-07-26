"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const skill_1 = require("../skill");
class Character {
    constructor(data, playerId) {
        this.buffs = {
            invulnerability: {}
        };
        this.isTarget = false;
        this.name = data.name;
        this.id = Math.floor(Math.random() * (0 - 99999) + 99999);
        this.facepic = data.facepic;
        this.description = data.description;
        this.hitPoints = data.hitPoints;
        this.type = data.type;
        this.energyGain = data.energyGain;
        this.belongs = {};
        this.belongs[playerId] = true;
        this.skills = [];
        for (const skill of data.skills) {
            this.skills.push(new skill_1.Skill(skill));
        }
    }
    geHitPoints() {
        return this.hitPoints;
    }
    setHitPoints(hp) {
        this.hitPoints = hp;
    }
    belongsTo(id) {
        return this.belongs[id];
    }
    lowerCooldowns() {
        for (const skill of this.skills) {
            skill.lowerCooldown();
        }
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
    getOwner() {
        return Object.keys(this.belongs)[0];
    }
    validadeSkillsCompletely(pool, chars, playerId, self) {
        for (const skill of this.skills) {
            skill.validateCost(pool);
            skill.setTargetChoices(chars, playerId, self);
        }
    }
    validateSkillsCost(pool) {
        for (const skill of this.skills) {
            skill.validateCost(pool);
        }
    }
    getSkillByIndex(index) {
        return new skill_1.Skill(JSON.parse(JSON.stringify(this.skills[index])));
    }
    setSkillCooldownByIndex(index) {
        this.skills[index].startCooldown();
    }
    enableSkills() {
        this.skills.forEach(s => {
            s.disabled = false;
        });
    }
    disableSkills() {
        this.skills.forEach(s => {
            s.disabled = true;
        });
    }
    setInvulnerability(type) {
        console.log(type);
        this.buffs.invulnerability[type] = true;
        console.log(this.buffs);
    }
    isInvulnerable(type) {
        return this.buffs.invulnerability[type];
    }
    clearBuffs() {
        this.buffs.invulnerability = {};
    }
}
exports.Character = Character;
//# sourceMappingURL=index.js.map