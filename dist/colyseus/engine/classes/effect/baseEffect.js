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
        this.behavior = data.behavior || enums_1.effectTargetBehavior.Default;
        this.targets = [];
        this.activationType = data.activationType || enums_1.activationType.Immediate;
    }
    execute(targets, world, skillType) {
        return false;
    }
    setTargets(targets) {
        this.targets = targets;
    }
    getActivationType() {
        return this.activationType;
    }
    calculateDamageBonus(skillType, char) {
        let mod = 1;
        for (const typing in skillType) {
            for (const type in char.getTyping()) {
                mod *= typechart_1.typeChart(type, typing);
            }
        }
        return mod;
    }
    tickOn() {
        this.tick++;
        if (this.tick % 2 === 0)
            return false;
        this.delay -= 1;
        if (this.delay >= 0)
            return false;
        this.duration -= 1;
        return true;
    }
    effectTargetApplication(params, functionality, targets, world) {
        const t = [];
        const activate = this.tickOn();
        switch (this.behavior) {
            case enums_1.effectTargetBehavior.Default:
                {
                    for (const char of targets) {
                        if (activate) {
                            functionality(params, char);
                        }
                        t.push(char.getId());
                    }
                }
                break;
            case enums_1.effectTargetBehavior.OnlyOne:
                {
                    if (activate) {
                        functionality(params, targets[0]);
                    }
                    t.push(targets[0].getId());
                }
                break;
            case enums_1.effectTargetBehavior.AllOthers:
                {
                    for (const char of targets.slice(1, targets.length)) {
                        if (activate) {
                            functionality(params, char);
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
                                if (activate) {
                                    functionality(params, char);
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
                    if (activate) {
                        functionality(params, char);
                    }
                    t.push(char.getId());
                }
                break;
        }
        this.setTargets(t);
    }
    getType() {
        return this.type;
    }
}
exports.Effect = Effect;
//# sourceMappingURL=baseEffect.js.map