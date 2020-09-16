import { Effect } from "./base";
import { effectType, Types } from "../../enums"
import { Character } from "../character";
import { Skill } from "..";
import { Arena } from "../../arena";

export class AlterEffectValue extends Effect {
    private anyEffect: boolean
    private anySkill: boolean
    private targetSkillId: number | boolean
    private effectType: effectType | boolean
    private targetSkillName: string
    private incrementVal: number
    public applied:boolean
    private changedEffects: Array<{ 
        effect:Effect,
        originalAltValue:number,
        originalIncrement:number
    }>

    constructor(data: any, caster: number) {
        super(data, caster)
        this.targetSkillId = data.targetSkillId || false
        this.effectType = data.effectType
        this.anyEffect = data.anyEffect || false
        this.anySkill = data.anySkill || false
        this.targetSkillName = ''
        this.incrementVal = data.incrementVal || 0
        this.changedEffects = []
        this.applied = data.applied || false
    }

    public functionality(char: Character, origin: Skill, world?: Arena) {
        if (this.applied) return

        for (const skill of char.getSkills()) {
            
            if (!this.anySkill && skill.getId() !== this.targetSkillId) continue
            for (const effect of skill.effects) {
                
                if (!this.anyEffect && this.effectType !== effect.getType()) continue

                let originalIncrement = effect.mods.increment.value;
                let originalAltValue = effect.getAltValue() 

                effect.setAltValue(this.value)
                effect.mods.increment.value = this.incrementVal
                this.changedEffects.push({
                    effect, originalAltValue, originalIncrement
                })
            }

            this.targetSkillName = skill.name
        }

        this.applied = true
    }

    protected generateToolTip() {
        if (!this.anySkill) {
            this.message = `${this.targetSkillName} has been altered`
        } else {
            this.message = "This character's skills have been altered"
        }
    }

    protected effectConclusion() {
        for (const payload of this.changedEffects) {
            payload.effect.setAltValue(payload.originalAltValue)
            payload.effect.mods.increment.value = payload.originalIncrement
        }
    }
}

function reduceTargets(arr: Skill | Effect, char: Character, world: Arena) {
    const newTargetArr = arr.getTargets().filter(index => {
        const affected = world.getCharactersByIndex([index])[0]
        if (affected.getId() !== char.getId()) return true
        return false
    })

    arr.setTargets(newTargetArr)
    return newTargetArr
}


