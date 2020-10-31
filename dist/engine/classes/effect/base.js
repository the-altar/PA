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
        this.triggerRate = data.triggerRate || 100;
        this.compulsory = data.compulsory || false;
        this.triggerClause = data.triggerClause || enums_1.triggerClauseType.None;
        this.behavior = data.behavior || enums_1.effectTargetBehavior.Default;
        this.targets = [];
        this.activate = data.activate || true;
        this.activationType = data.activationType || enums_1.activationType.Immediate;
        this.altValue = data.altValue || null;
        this.terminateSkill = data.terminateSkill || null;
        this.mods = data.mods || {
            increment: {
                value: data.increment || 0,
                isMultiplier: data.isMultiplier || false
            }
        };
    }
    functionality(char, origin, world) {
        console.log("This does nothing!");
        return;
    }
    setAltValue(value) {
        this.altValue = value;
    }
    setIncrement(value) {
        this.mods.increment.value = value;
    }
    getAltValue() {
        return this.altValue;
    }
    setTargets(targets) {
        this.targets = targets;
    }
    shouldApply(acType, tClause) {
        const triggerRate = Math.floor(Math.random() * 101);
        if (acType === this.activationType &&
            tClause === this.triggerClause &&
            triggerRate <= this.triggerRate &&
            this.delay <= 0)
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
        this.terminate = false;
        this.activate = false;
        if (this.tick % 2 === enums_1.PlayerPhase.MyTurn || this.compulsory) {
            this.activate = true;
        }
        if (this.duration <= 0)
            this.terminate = true;
        return { terminate: this.terminate, activate: this.activate };
    }
    progressTurn() {
        this.tick++;
        this.generateToolTip();
        if (this.delay > 0) {
            this.delay--;
            return this.tickOn();
        }
        this.duration--;
        const { terminate, activate } = this.tickOn();
        if (terminate)
            this.effectConclusion();
        return { terminate, activate };
    }
    execute(targets, world, origin, shouldApply) {
        const t = [];
        switch (this.behavior) {
            case enums_1.effectTargetBehavior.Default:
                {
                    for (const i of targets) {
                        const char = world.getCharactersByIndex([i])[0];
                        if (char.isKnockedOut())
                            continue;
                        if (shouldApply && this.activate && !char.isInvulnerable(origin.getTypes(), this.type)) {
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
                        if (shouldApply && this.activate && !char.isInvulnerable(origin.getTypes(), this.type)) {
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
                        if (shouldApply && this.activate && !char.isInvulnerable(origin.getTypes(), this.type)) {
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
                            if (shouldApply && this.activate && !ally.isInvulnerable(origin.getTypes(), this.type)) {
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
                            if (shouldApply && this.activate && !char.isInvulnerable(origin.getTypes(), this.type)) {
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
                        if (shouldApply && this.activate && !char.isInvulnerable(origin.getTypes(), this.type)) {
                            this.functionality(char, origin, world);
                        }
                        t.push(index);
                    }
                }
                break;
            case enums_1.effectTargetBehavior.First:
                {
                    const char = world.getCharactersByIndex([targets[0]])[0];
                    if (char !== undefined && !char.isKnockedOut()) {
                        if (shouldApply && this.activate && !char.isInvulnerable(origin.getTypes(), this.type)) {
                            this.functionality(char, origin, world);
                        }
                        t.push(targets[0]);
                    }
                }
                break;
            case enums_1.effectTargetBehavior.Second:
                {
                    if (targets.length < 2)
                        break;
                    const char = world.getCharactersByIndex([targets[1]])[0];
                    if (!char.isKnockedOut()) {
                        if (shouldApply && this.activate && !char.isInvulnerable(origin.getTypes(), this.type)) {
                            this.functionality(char, origin, world);
                        }
                        t.push(targets[1]);
                    }
                }
                break;
            case enums_1.effectTargetBehavior.Third:
                {
                    if (targets.length < 3)
                        break;
                    const char = world.getCharactersByIndex([targets[2]])[0];
                    if (!char.isKnockedOut()) {
                        if (shouldApply && this.activate && !char.isInvulnerable(origin.getTypes(), this.type)) {
                            this.functionality(char, origin, world);
                        }
                        t.push(targets[2]);
                    }
                }
                break;
        }
        if (this.activate && shouldApply) {
            if (this.mods.increment.isMultiplier)
                this.value *= this.mods.increment.value;
            else
                this.value += this.mods.increment.value;
        }
        this.setTargets(t);
    }
    getType() {
        return this.type;
    }
    generateToolTip() {
        this.message = "This character is being targeted";
    }
    effectConclusion() {
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