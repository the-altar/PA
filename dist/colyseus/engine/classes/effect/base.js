"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
const typechart_1 = require("../../helpers/typechart");
const enums_1 = require("../../enums");
class Effect {
    constructor(data, caster) {
        this.value = data.value;
        this.tick = 1;
        this.duration = data.duration;
        this.delay = data.delay || 0;
        this.disabled = data.disabled || false;
        this.linked = data.linked || false;
        this.isInvisible = data.isInvisible || false;
        this.type = data.type;
        this.caster = caster;
        this.triggered = false;
        this.compulsory = data.compulsory || false;
        this.triggerClause = data.triggerClause || enums_1.triggerClauseType.None;
        this.behavior = data.behavior || enums_1.effectTargetBehavior.Default;
        this.targets = [];
        this.activationType = data.activationType || enums_1.activationType.Immediate;
    }
    functionality(char, origin, world) {
        console.log("This does nothing!");
        return;
    }
    setTargets(targets) {
        this.targets = targets;
    }
    shouldApply(acType, tClause) {
        if (acType === this.activationType && tClause === this.triggerClause)
            return true;
        return false;
    }
    getActivationType() {
        return this.activationType;
    }
    calculateDamageBonus(origin, char) {
        let mod = 1;
        for (const typing of origin.getTypes()) {
            for (const type of char.getTyping()) {
                mod *= typechart_1.typeChart(type, typing);
            }
        }
        return mod;
    }
    tickOn() {
        if (this.delay > 0) {
            return {
                terminate: false,
                activate: false
            };
        }
        /*  An even tick means it's your opponent's turn, odd means its yours.*/
        /*  The default behavior is for your skills to activate on odd ticks*/
        let terminate = false;
        let activate = false;
        if (this.tick % 2 === enums_1.PlayerPhase.MyTurn || this.compulsory)
            activate = true;
        if (this.duration <= 0)
            terminate = true;
        return { terminate, activate };
    }
    progressTurn() {
        this.tick++;
        if (this.delay > 0) {
            this.delay--;
            return this.tickOn();
        }
        this.duration--;
        this.generateToolTip();
        return this.tickOn();
    }
    execute(targets, world, origin, shouldApply) {
        const t = [];
        const { activate, terminate } = this.tickOn();
        switch (this.behavior) {
            case enums_1.effectTargetBehavior.Default:
                {
                    for (const i of targets) {
                        const char = world.getCharactersByIndex([i])[0];
                        if (char.isKnockedOut())
                            continue;
                        if (shouldApply && activate && !char.isInvulnerable(origin.getTypes())) {
                            this.functionality(char, origin, world);
                        }
                        t.push(i);
                    }
                }
                break;
            case enums_1.effectTargetBehavior.OnlyOne:
                {
                    const char = world.getCharactersByIndex([targets[0]])[0];
                    if (!char.isKnockedOut()) {
                        if (shouldApply && activate && !char.isInvulnerable(origin.getTypes())) {
                            this.functionality(char, origin, world);
                        }
                        t.push(targets[0]);
                    }
                }
                break;
            case enums_1.effectTargetBehavior.AllOthers:
                {
                    const slice = targets.slice(1, targets.length);
                    for (const i of slice) {
                        const char = world.getCharactersByIndex([i])[0];
                        if (char.isKnockedOut())
                            continue;
                        if (shouldApply && activate && !char.isInvulnerable(origin.getTypes())) {
                            this.functionality(char, origin, world);
                        }
                        t.push(i);
                    }
                }
                break;
            case enums_1.effectTargetBehavior.IfAlly:
                {
                    const { char } = world.findCharacterById(this.caster);
                    const allies = char.getAllies();
                    for (const i of targets) {
                        if (allies.includes(i)) {
                            const ally = world.getCharactersByIndex([i])[0];
                            if (ally.isKnockedOut())
                                continue;
                            if (shouldApply && activate && !ally.isInvulnerable(origin.getTypes())) {
                                this.functionality(ally, origin, world);
                            }
                            t.push(i);
                        }
                    }
                }
                break;
            case enums_1.effectTargetBehavior.IfEnemy:
                {
                    const { char } = world.findCharacterById(this.caster);
                    const enemies = char.getEnemies();
                    for (const i of enemies) {
                        if (targets.includes(i)) {
                            const char = world.getCharactersByIndex([i])[0];
                            if (char.isKnockedOut())
                                continue;
                            if (shouldApply && activate && !char.isInvulnerable(origin.getTypes())) {
                                this.functionality(char, origin, world);
                            }
                            t.push(i);
                        }
                    }
                }
                break;
            case enums_1.effectTargetBehavior.ifSelf:
                {
                    const { char, index } = world.findCharacterById(this.caster);
                    if (!char.isKnockedOut()) {
                        if (shouldApply && activate && !char.isInvulnerable(origin.getTypes())) {
                            this.functionality(char, origin, world);
                        }
                        t.push(index);
                    }
                }
                break;
        }
        if (!terminate)
            this.setTargets(t);
        return terminate;
    }
    getType() {
        return this.type;
    }
    generateToolTip() {
        this.message = "This character is being targeted";
    }
    getTargets() {
        return this.targets;
    }
    isVisible() {
        if (this.isInvisible)
            return false;
        return true;
    }
}
exports.Effect = Effect;
//# sourceMappingURL=base.js.map