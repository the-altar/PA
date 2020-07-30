"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const enums_1 = require("../../enums");
const skill_1 = require("../skill");
// IMPORTANT TO THIS CLASS ONLY
const buffs_1 = require("./buffs");
const debuffs_1 = require("./debuffs");
class Character {
    constructor(data, playerId) {
        this.buffs = new buffs_1.Buffs();
        this.debuffs = new debuffs_1.Debuffs();
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
    lowerCooldowns(char) {
        for (const skill of this.skills) {
            skill.lowerCooldown(0);
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
        const n = this.buffs.getCooldownReduction() + this.debuffs.getCooldownIncreasal();
        this.skills[index].startCooldown(n);
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
    setBuff(params) {
        const { buffType } = params;
        switch (buffType) {
            case enums_1.BuffTypes.Invulnerability: {
                this.buffs.setInvulnerability(params);
            }
            case enums_1.BuffTypes.CooldownReduction: {
                this.buffs.setCooldownReduction(params);
            }
        }
    }
    setDebuff(params) {
        switch (params.debuffType) {
            case enums_1.DebuffTypes.DamageReduction:
                {
                    this.debuffs.setDamageReduction(params);
                }
                break;
            case enums_1.DebuffTypes.CooldownIncreasal: {
                this.debuffs.setCooldownIncreasal(params);
            }
        }
    }
    isInvulnerable(types) {
        return this.buffs.isInvulnerable(types);
    }
    clearEnemyPhaseBuffs() {
        this.buffs.clearInvulnerability();
    }
    clearPlayerPhaseBuffs() {
        this.buffs.clearCooldownReduction();
    }
    getBuffs() {
        return this.buffs;
    }
    getDebuffs() {
        return this.debuffs;
    }
    clearDebuffs() {
        this.debuffs.clearDebuffs();
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