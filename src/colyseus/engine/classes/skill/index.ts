import { Character } from "../character"
import { iSkill } from "../../interfaces"
import { targetType, activationType, Types, SkillClassType, triggerClauseType } from "../../enums"
import { effectFactory } from "../effect"
import { targetSetter } from "./targetValidationFactory"
import { Effect } from "../effect/base"
import { Arena } from "../../arena"
import { SkillMods } from "./mods"

export class Skill {
    public banner: string 
    private cost: Array<number>
    public disabled?: boolean
    public skillpic: string
    public name: string
    private description: string
    private class: SkillClassType
    private cooldown: number
    private baseCooldown: number
    private type: Array<Types>
    private limit: number
    private mods: SkillMods
    private targets: Array<number>
    public uncounterable: boolean
    private targetMode: targetType
    private effects: Array<Effect>
    private targetChoices: { [x: string]: Array<number> }
    private id: number;
    constructor(data: iSkill, caster: number) {
        
        this.banner = data.banner
        this.type = data.type
        this.cooldown = 0 || data.startCooldown
        this.skillpic = data.skillpic
        this.name = data.name
        this.limit = data.limit
        this.uncounterable = data.uncounterable || false
        this.disabled = data.disabled || false
        this.description = data.description
        this.cost = data.cost
        this.class = data.class
        this.baseCooldown = data.baseCooldown
        this.targetMode = data.targetMode
        this.targetChoices = data.targetChoices || {}
        this.effects = []
        this.mods = new SkillMods(data.mods)
        this.id = Math.floor(Math.random() * (0 - 99999) + 99999);
        for (const e of data.effects) {
            const built = effectFactory(e, caster)
            this.effects.push(built)
        }
    }

    public isDisabled(): boolean {
        return this.disabled;
    }

    public validateCost(energyPool: Array<number>) {

        const totalPool = energyPool[4]
        let totalCost = this.cost.reduce((ca, cv) => ca + cv)

        for (let i = 0; i <= 4; i++) {
            if (this.cost[i] > energyPool[i]) {
                this.disabled = true
                return
            }
        }
        if (totalCost > totalPool) {
            this.disabled = true
            return
        }
    }

    public enable() {
        this.disabled = false
    }

    public disable() {
        this.disabled = true
    }

    public lowerCooldown(extra: number) {
        if (this.cooldown > 0) this.cooldown -= (1 + extra)
    }

    public startCooldown(extra: number) {
        this.cooldown = this.baseCooldown + (1 + extra)
    }

    public getValidatedTargets(choice: number): Array<number> {
        let t: Array<number> = []
        const targetMode = this.getTargetMod() || this.targetMode

        switch (targetMode) {

            case targetType.Self: {
                t.push(choice)
                return t
            }

            case targetType.OneEnemy: {
                t.push(choice)
                return t
            }

            case targetType.OneAlly: {
                t.push(choice)
                return t
            }

            case targetType.AllEnemies: {
                t.push(choice)
                for (const opt of this.targetChoices.choice) {
                    if (opt !== choice) {
                        t.push(opt)
                    }
                }
                return t
            }

            case targetType.AllAllies: {
                t.push(choice)
                for (const opt of this.targetChoices.choice) {
                    if (opt !== choice) {
                        t.push(opt)
                    }
                }
                return t
            }

            case targetType.OneEnemyAndAllAllies: {
                t.push(choice)
                t = t.concat(this.targetChoices.auto)
                return t
            }

            case targetType.OneEnemyAndSelf: {
                t.push(choice)
                t = t.concat(this.targetChoices.auto)
                return t
            }

            case targetType.OneAllyAndSelf: {
                t.push(choice)
                t = t.concat(this.targetChoices.auto)
                return t
            }

            case targetType.AllEnemiesAndSelf: {
                t.push(choice)
                for (const opt of this.targetChoices.choice) {
                    if (opt !== choice) {
                        t.push(opt)
                    }
                }
                t.concat(this.targetChoices.auto)
                return t
            }

        }
    }

    public validateCoolDown() {
        if (this.cooldown > 0) {
            this.disabled = true
            return
        }
    }

    public setTargetChoices(characters: Array<Character>, playerId: string, self?: number) {
        const targetMode = this.getTargetMod() || this.targetMode
        this.targetChoices = targetSetter(this, targetMode, characters, playerId, self)
    }

    public getTargetChoices(): { [x: string]: Array<number> } {
        return this.targetChoices
    }

    public setTargets(targets: Array<number>) {
        this.targets = targets
    }

    public getTargets(): Array<number> {
        return this.targets
    }

    public getTypes(): Array<Types> {
        return this.type
    }

    public executeEffects(world: Arena, aType: activationType, triggerClause?: triggerClauseType) {
        for (const effect of this.effects) {
            const shouldApply = effect.shouldApply(aType, triggerClause)
            effect.execute(this.targets, world, this, shouldApply)
        }
    }

    public getCost(): Array<number> {
        return this.cost
    }

    public getSkillEffectsActivation(): { [x: string]: number } {
        let checker: { [x: string]: number } = {}

        for (const effect of this.effects) {
            checker[effect.getActivationType()] = effect.getActivationType()
        }

        return checker
    }

    public tickEffectsDuration(world: Arena, origin: Skill) {
        
        for (let i = this.effects.length - 1; i >= 0; i--) {
            const effect = this.effects[i]
            const { terminate } = effect.progressTurn()

            if (terminate) {
                const e = this.effects.splice(i, 1)[0]
                
                if (!e.isVisible()) {
                    const chars = world.getCharactersByIndex(e.getTargets())
                    
                    for (const char of chars) {
                        char.addNotification({
                            id: origin.getId(),
                            msg: "An effect has ended",
                            skillName: origin.name,
                            skillpic: origin.skillpic
                        })
                    }
                }
            }
        }

        if (this.effects.length === 0) return true
        return false
    }

    public areTargetsValidated(world: Arena) {

        for (let i = this.targets.length - 1; i >= 0; i--) {
            const c = world.getCharactersByIndex([this.targets[i]])[0]
            if (c.isKnockedOut()) {
                this.targets.splice(i, 1)
            }
        }

        if (this.targets.length === 0) return false
        return true
    }

    public setTargetMod(target: targetType) {
        this.mods.setTargetMod(target)
    }

    public getTargetMod() {
        return this.mods.getTargetMod()
    }

    public clearMods() {
        this.mods.clearTargetMod()
    }

    public getId(): number {
        return this.id
    }
}