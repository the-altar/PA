import { Effect } from "./base"
import { targetType } from "../../enums"
import { Character } from "../character";
import { Arena } from "../../arena";
import { Skill } from "../skill";

export class SkillTargetMod extends Effect {

    private newTarget: targetType;
    private targetSpecificSkill: boolean;
    private specificSkillIndex: number;
    private affectedSkillName:string; 

    constructor(data: any, caster: any) {
        super(data, caster)
        this.tick = 0
        this.newTarget = data.newTarget
        this.targetSpecificSkill = data.targetSpecificSkill || false
        this.specificSkillIndex = data.specificSkillIndex || -1

    }

    public functionality(char: Character, origin: Skill, world?: Arena) {
        const s = char.getRealSkillById(this.specificSkillIndex)
        if (this.targetSpecificSkill) {
            s.setTargetMod(this.newTarget)
        } else {
            const skills = char.getSkills()
            for (const skill of skills) {
                skill.setTargetMod(this.newTarget)
            }
        }
        this.affectedSkillName = s.name
        /*char.addNotification({
            msg: generateMessage(this.specificSkillIndex, this.newTarget, s),
            id: origin.getId(),
            skillpic: origin.skillpic,
            skillName: origin.name
        })*/
    }

    protected generateToolTip() { 
        this.message = generateMessage(this.specificSkillIndex, this.newTarget, this.affectedSkillName)
    }
}

function generateMessage(specificIndex:number, tType:targetType, skill:string){
    let m = ''
    switch(tType) {
        case targetType.AllAllies: {
            m = "all allies"
        }break;
        case targetType.OneEnemy: {
            m = "one enemy"
        }break;
        case targetType.AllEnemies: {
            m = "all enemies"
        }
    }

    if(!specificIndex) return `This character's skills will now target ${m}'`
    else return `This character will now target ${m} with ${skill}`
}