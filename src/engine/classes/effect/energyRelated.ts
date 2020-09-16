import { Effect } from "./base"
import { CostTypes, triggerClauseType } from "../../enums"
import { Character } from "../character";
import { Arena } from "../../arena";
import { Skill } from "../skill";

export class EnergyGain extends Effect {
    energyType: CostTypes
    constructor(data: any, caster: number) {
        super(data, caster)
        this.energyType = data.energyType
    }

    public functionality(char: Character, origin: Skill, world?: Arena) {
        this.triggered = true
        const p = world.findPlayerByCharacterIndex(this.caster)
        let index: number
        if (this.energyType === CostTypes.Random) index = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
        else index = this.energyType
        p.increaseEnergyPool(index, this.value)
    }

    protected generateToolTip() {
        if (this.triggerClause !== triggerClauseType.None && !this.triggered) {

            switch (this.triggerClause) {
                case triggerClauseType.onKnockOut: {
                    this.message = `If Knocked out a PP gain effect will be triggered`
                }
            }

        } else {
            if (this.delay > 0) {
                this.message = `In ${this.delay} turns this character will gain ${this.value} extra PP`
            } else {
                this.message = `This character will gain ${this.value} extra PP`
            }
        }
    }
}

export class EnergyRemoval extends Effect {
    energyType: CostTypes
    constructor(data: any, caster: number) {
        super(data, caster)
        this.energyType = data.energyType
    }

    public functionality(char: Character, origin: Skill, world?: Arena) {
        const p = world.findPlayerByChar(char)
        let index: number

        if (this.energyType === CostTypes.Random) {
            do {
                index = Math.floor(Math.random() * (3 - 0 + 1)) + 0
            } while (p.getEnergyPool()[index] === 0)
        }
        else index = this.energyType
        p.decreaseEnergyPool(index, this.value)
    }

    protected generateToolTip() {
        this.message = `This character will lose ${this.value} PP`
    }
}
