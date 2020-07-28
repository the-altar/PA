import { iEffect } from "../../interfaces"
import { Character } from "../character"
import { Skill } from "../skill"
import { typeChart } from "../../helpers/typechart";
import { effectType, effectTargetBehavior, activationType, Types } from "../../enums"
import { Arena } from "../../arena";

export class Effect {
    protected tick: number
    protected duration: number
    protected delay?: number
    protected linked?: boolean
    protected disabled?: boolean
    protected behavior?: effectTargetBehavior
    protected activationType: activationType
    protected type: effectType
    protected caster: number
    protected targets: Array<number>

    constructor(data: iEffect, caster: number) {
        this.tick = 0
        this.duration = data.duration
        this.delay = data.delay || 0
        this.disabled = data.disabled || false
        this.linked = data.linked || false
        this.type = data.type
        this.caster = caster
        this.behavior = data.behavior || effectTargetBehavior.Default
        this.targets = []
        this.activationType = data.activationType || activationType.Immediate
    }

    public execute(targets: Array<Character>, world: Arena, skillType: { [key: string]: number }): boolean {
        return false
    }

    public setTargets(targets: Array<number>) {
        this.targets = targets
    }

    public getActivationType(): activationType {
        return this.activationType
    }

    protected calculateDamageBonus(skillType: { [key: string]: number }, char: Character): number {
        let mod = 1
        for (const typing in skillType) {
            for (const type in char.getTyping()) {
                mod *= typeChart(type, typing)
            }
        }
        return mod
    }

    protected tickOn(): boolean {
        this.tick++
        if (this.tick % 2 === 0) return false

        this.delay -= 1
        if (this.delay >= 0) return false

        this.duration -= 1;
        return true
    }

    protected effectTargetApplication(params: any, functionality: Function, targets: Array<Character>, world: Arena) {
        const t = []
        const activate = this.tickOn()
        switch (this.behavior) {
            case effectTargetBehavior.Default: {
                for (const char of targets) {
                    if (activate) {
                        functionality(params, char)
                    }                    
                    t.push(char.getId())
                }
            } break;

            case effectTargetBehavior.OnlyOne: {
                if (activate) {
                    functionality(params, targets[0])
                }                 
                t.push(targets[0].getId())
            } break;

            case effectTargetBehavior.AllOthers: {
                for (const char of targets.slice(1, targets.length)) {
                    if (activate) {
                        functionality(params, char)
                    } 
                    t.push(char.getId())
                }
            } break;

            case effectTargetBehavior.IfEnemy: {
                const enemies = world.findCharacterById(this.caster).getEnemies()
                const c = world.getCharactersByIndex(enemies)
                for (const target of targets) {
                    for (const char of c) {
                        if (char.getId() === target.getId()) {
                            if (activate) {
                                functionality(params, char)
                            } 
                            t.push(char.getId())
                        }
                    }
                }
            } break;

            case effectTargetBehavior.ifSelf: {
                const char = world.findCharacterById(this.caster)
                if (activate) {
                    functionality(params, char)
                } 
                t.push(char.getId())
            } break;
        }
         
        this.setTargets(t)
    }

    public getType(): effectType {
        return this.type
    }
}