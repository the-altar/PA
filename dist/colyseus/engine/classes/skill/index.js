"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skill = void 0;
const enums_1 = require("../../enums");
const effect_1 = require("../effect");
const targetValidationFactory_1 = require("./targetValidationFactory");
class Skill {
    constructor(data, caster) {
        this.tick = 0;
        this.type = data.type;
        this.cooldown = 0 || data.startCooldown;
        this.skillpic = data.skillpic;
        this.name = data.name;
        this.limit = data.limit;
        this.disabled = data.disabled || false;
        this.description = data.description;
        this.cost = data.cost;
        this.class = data.class;
        this.baseCooldown = data.baseCooldown;
        this.target = data.target;
        this.targetChoices = data.targetChoices || {};
        this.effects = [];
        for (const e of data.effects) {
            const built = effect_1.effectFactory(e, caster);
            this.effects.push(built);
        }
    }
    isDisabled() {
        return this.disabled;
    }
    validateCost(energyPool) {
        energyPool[4] = energyPool.slice(0, 4).reduce((ca, cv) => ca + cv);
        let totalCost = this.cost.reduce((ca, cv) => ca + cv);
        for (let i = 0; i <= 4; i++) {
            if (this.cost[i] > energyPool[i]) {
                this.disabled = true;
                return;
            }
        }
        if (totalCost > energyPool[4]) {
            this.disabled = true;
            return;
        }
    }
    enable() {
        this.disabled = false;
    }
    lowerCooldown() {
        if (this.cooldown > 0)
            this.cooldown -= 1;
    }
    startCooldown() {
        this.cooldown = this.baseCooldown;
    }
    getValidadedTargets(choice) {
        let t = [];
        switch (this.target) {
            case enums_1.targetType.Self: {
                t.push(choice);
                return t;
            }
            case enums_1.targetType.OneEnemy: {
                t.push(choice);
                return t;
            }
            case enums_1.targetType.AllEnemies: {
                t.push(choice);
                for (const opt of this.targetChoices.choice) {
                    if (opt !== choice) {
                        t.push(opt);
                    }
                }
                return t;
            }
            case enums_1.targetType.OneEnemyAndSelf: {
                t.push(choice);
                t = t.concat(this.targetChoices.auto);
                return t;
            }
        }
    }
    validateCoolDown() {
        if (this.cooldown > 0) {
            this.disabled = true;
            return;
        }
    }
    setTargetChoices(characters, playerId, self) {
        this.targetChoices = targetValidationFactory_1.targetSetter(this, this.target, characters, playerId, self);
    }
    getTargetChoices() {
        return this.targetChoices;
    }
    setTargets(targets) {
        this.targets = targets;
    }
    getTargets() {
        return this.targets;
    }
    getTypes() {
        return Object.keys(this.type);
    }
    executeEffects(world) {
        let notExecuted = 0;
        let onExpiration = 0;
        for (let i = this.effects.length - 1; i >= 0; i--) {
            const effect = this.effects[i];
            if (effect.getActivationType() !== enums_1.activationType.Immediate) {
                notExecuted++;
                if (effect.getActivationType() === enums_1.activationType.Expired) {
                    onExpiration++;
                }
                continue;
            }
            const isDone = this.effects[i].execute(this.targets, world, this.type);
            if (isDone) {
                this.effects.splice(i, 1);
            }
        }
        if (this.effects.length === onExpiration) {
            for (let i = this.effects.length - 1; i >= 0; i--) {
                const isDone = this.effects[i].execute(this.targets, world, this.type);
                if (isDone) {
                    this.effects.splice(i, 1);
                }
            }
        }
        if (this.effects.length === 0)
            return true;
        return false;
    }
    getCost() {
        return this.cost;
    }
    getSkillEffectsActivation() {
        let checker = {};
        for (const effect of this.effects) {
            checker[effect.getActivationType()] = effect.getActivationType();
        }
        return checker;
    }
    areTargetsValidated(world) {
        for (let i = this.targets.length - 1; i >= 0; i--) {
            const c = this.targets[i];
            if (c.isKnockedOut()) {
                this.targets.splice(i, 1);
            }
        }
        if (this.targets.length === 0)
            return false;
        return true;
    }
}
exports.Skill = Skill;
//# sourceMappingURL=index.js.map