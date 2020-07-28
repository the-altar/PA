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
        this.allies = [];
        this.enemies = [];
        this.knockedOut = false;
        for (const skill of data.skills) {
            this.skills.push(new skill_1.Skill(skill, this.id));
        }
    }
    setAllies(allies) {
        this.allies = allies;
    }
    getAllies() {
        return this.allies;
    }
    getEnemies() {
        return this.enemies;
    }
    setEnemies(enemies) {
        this.enemies = enemies;
    }
    geHitPoints() {
        return this.hitPoints;
    }
    setHitPoints(hp) {
        this.hitPoints = hp;
        if (this.hitPoints <= 0) {
            this.hitPoints = 0;
            this.knockOut();
        }
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
            skill.enable();
            skill.validateCoolDown();
            skill.validateCost(pool);
            skill.setTargetChoices(chars, playerId, self);
        }
    }
    validateSkillsCost(pool) {
        for (const skill of this.skills) {
            skill.enable();
            skill.validateCoolDown();
            skill.validateCost(pool);
        }
    }
    getSkillByIndex(index) {
        return new skill_1.Skill(JSON.parse(JSON.stringify(this.skills[index])), this.id);
    }
    setSkillCooldownByIndex(index) {
        this.skills[index].startCooldown();
    }
    enableSkills() {
        this.skills.forEach(s => {
            s.disabled = false;
        });
    }
    knockOut() {
        this.knockedOut = true;
        this.disableSkills();
    }
    isKnockedOut() {
        return this.knockedOut;
    }
    disableSkills() {
        this.skills.forEach(s => {
            s.disabled = true;
        });
    }
    setInvulnerability(type) {
        this.buffs.invulnerability[type] = true;
    }
    isInvulnerable(types) {
        if (this.buffs.invulnerability[18])
            return true;
        for (const t of types) {
            if (this.buffs.invulnerability[t])
                return true;
        }
        return false;
    }
    clearBuffs() {
        this.buffs.invulnerability = {};
    }
    getId() {
        return this.id;
    }
    getTyping() {
        return this.type;
    }
}
exports.Character = Character;
//# sourceMappingURL=index.js.map