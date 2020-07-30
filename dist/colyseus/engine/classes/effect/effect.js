"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
const typechart_1 = require("../../helpers/typechart");
const enums_1 = require("../../enums");
class Effect {
    constructor(data, caster) {
        this.tick = 0;
        this.duration = data.duration;
        this.delay = data.delay || 0;
        this.disabled = data.disabled || false;
        this.linked = data.linked || false;
        this.type = data.type;
        this.caster = caster;
        this.onEnemyTurn = false || data.onEnemyTurn;
        this.behavior = data.behavior || enums_1.effectTargetBehavior.Default;
        this.targets = [];
        this.activationType = data.activationType || enums_1.activationType.Immediate;
    }
    execute(targets, world, skillType) {
        console.log("This effect does nothing");
        return false;
    }
    functionality(char, skillType) {
        console.log("This does nothing!");
        return;
    }
    setTargets(targets) {
        this.targets = targets;
    }
    shouldApply(acType) {
        switch (acType) {
            case enums_1.activationType.Immediate: {
                return true;
            }
            default: return false;
        }
    }
    getActivationType() {
        return this.activationType;
    }
    calculateDamageBonus(skillType, char) {
        let mod = 1;
        for (const typing of skillType) {
            for (const type in char.getTyping()) {
                mod *= typechart_1.typeChart(type, Number(typing));
            }
        }
        return mod;
    }
    tickOn() {
        this.tick++;
        if (this.delay > 0) {
            this.delay--;
            return {
                terminate: false,
                activate: false
            };
        }
        /*  An even tick means it's your opponent's turn, odd means its yours.*/
        /*  The default behavior is for your skills to activate on odd ticks*/
        this.duration--;
        let terminate = false;
        let activate = false;
        if (this.tick % 2 === enums_1.PlayerPhase.MyTurn)
            activate = true;
        if (this.duration <= 0)
            terminate = true;
        return { terminate, activate };
    }
    effectTargetApplication(skillType, targets, world) {
        const t = [];
        const { activate, terminate } = this.tickOn();
        switch (this.behavior) {
            case enums_1.effectTargetBehavior.Default:
                {
                    for (const char of targets) {
                        if (activate && !char.isInvulnerable(skillType)) {
                            this.functionality(char, skillType);
                        }
                        t.push(char.getId());
                    }
                }
                break;
            case enums_1.effectTargetBehavior.OnlyOne:
                {
                    if (activate && !targets[0].isInvulnerable(skillType)) {
                        this.functionality(targets[0], skillType);
                    }
                    t.push(targets[0].getId());
                }
                break;
            case enums_1.effectTargetBehavior.AllOthers:
                {
                    for (const char of targets.slice(1, targets.length)) {
                        if (activate && !char.isInvulnerable(skillType)) {
                            this.functionality(char, skillType);
                        }
                        t.push(char.getId());
                    }
                }
                break;
            case enums_1.effectTargetBehavior.IfEnemy:
                {
                    const enemies = world.findCharacterById(this.caster).getEnemies();
                    const c = world.getCharactersByIndex(enemies);
                    for (const target of targets) {
                        for (const char of c) {
                            if (char.getId() === target.getId()) {
                                if (activate && !char.isInvulnerable(skillType)) {
                                    this.functionality(char, skillType);
                                }
                                t.push(char.getId());
                            }
                        }
                    }
                }
                break;
            case enums_1.effectTargetBehavior.ifSelf:
                {
                    const char = world.findCharacterById(this.caster);
                    if (activate && !char.isInvulnerable(skillType)) {
                        this.functionality(char, skillType);
                    }
                    t.push(char.getId());
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
}
exports.Effect = Effect;
//# sourceMappingURL=effect.js.map