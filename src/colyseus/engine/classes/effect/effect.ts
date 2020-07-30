import { iEffect } from "../../interfaces"
import { Character } from "../character"
import { Skill } from "../skill"
import { typeChart } from "../../helpers/typechart";
import { effectType, effectTargetBehavior, activationType, Types, PlayerPhase } from "../../enums"
import { Arena } from "../../arena";

export class Effect {
    protected tick: number
    protected duration: number
    protected delay?: number
    protected linked?: boolean
    protected disabled?: boolean
    protected onEnemyTurn: boolean
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
        this.onEnemyTurn = false || data.onEnemyTurn
        this.behavior = data.behavior || effectTargetBehavior.Default
        this.targets = []
        this.activationType = data.activationType || activationType.Immediate
    }

    public execute(targets: Array<Character>, world: Arena, skillType: Array<string>): boolean {
        console.log("This effect does nothing")
        return false
    }

    public functionality(char:Character, skillType?: Array<any>){
        console.log("This does nothing!")
        return
    }

    public setTargets(targets: Array<number>) {
        this.targets = targets
    }

    public shouldApply(acType:activationType):boolean {
        switch(acType){
            case activationType.Immediate: {
                return true
            }
            default: return false
        }
    } 

    public getActivationType(): activationType {
        return this.activationType
    }

    protected calculateDamageBonus(skillType: Array<string>, char: Character): number {
        let mod = 1
        for (const typing of skillType) {
            for (const type in char.getTyping()) {
                mod *= typeChart(type, Number(typing))
            }
        }
        return mod
    }

    protected tickOn(): { [x: string]: boolean } {
        this.tick++;
        
        if(this.delay > 0){
            this.delay--
            return {
                terminate:false,
                activate:false
            }
        }

        /*  An even tick means it's your opponent's turn, odd means its yours.*/
        /*  The default behavior is for your skills to activate on odd ticks*/        
        
        this.duration--
        let terminate:boolean = false   
        let activate:boolean = false

        if(this.tick % 2 === PlayerPhase.MyTurn) activate = true
        if(this.duration <= 0) terminate = true

        return {terminate, activate}
    }

    protected effectTargetApplication(skillType: Array<any>, targets: Array<Character>, world: Arena): boolean {
        const t = []

        const { activate, terminate } = this.tickOn()

        switch (this.behavior) {
            case effectTargetBehavior.Default: {
                for (const char of targets) {
                    if (activate && !char.isInvulnerable(skillType)) {
                        this.functionality(char, skillType)
                    }
                    t.push(char.getId())
                }
            } break;

            case effectTargetBehavior.OnlyOne: {
                if (activate && !targets[0].isInvulnerable(skillType)) {
                    this.functionality(targets[0], skillType)
                }
                t.push(targets[0].getId())
            } break;

            case effectTargetBehavior.AllOthers: {
                for (const char of targets.slice(1, targets.length)) {
                    if (activate && !char.isInvulnerable(skillType)) {
                        this.functionality(char, skillType)
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
                            if (activate && !char.isInvulnerable(skillType)) {
                                this.functionality(char, skillType)
                            }
                            t.push(char.getId())
                        }
                    }
                }
            } break;

            case effectTargetBehavior.ifSelf: {
                const char = world.findCharacterById(this.caster)
                if (activate && !char.isInvulnerable(skillType)) {
                    this.functionality(char, skillType)
                }
                t.push(char.getId())
            } break;
        }

        if (!terminate) this.setTargets(t)
        return terminate
    }

    public getType(): effectType {
        return this.type
    }
}