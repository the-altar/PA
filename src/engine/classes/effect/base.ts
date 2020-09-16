import { Character } from "../character"
import { typeChart } from "../../helpers/typechart";
import { effectType, effectTargetBehavior, activationType, Types, PlayerPhase, triggerClauseType } from "../../enums"
import { Arena } from "../../arena";
import { Skill } from "../skill";

export class Effect {
    protected value: number
    protected altValue: number | null
    protected tick: number
    protected duration: number
    protected delay?: number
    public mods: {
        increment: {
            value: number,
            isMultiplier: boolean
        }
    }
    protected linked?: boolean
    protected message: string
    protected triggerRate: number
    protected disabled?: boolean
    protected triggered: boolean
    protected isInvisible: boolean
    protected behavior?: effectTargetBehavior
    protected activationType: activationType
    protected triggerClause: triggerClauseType
    protected compulsory: boolean
    protected type: effectType
    protected caster: number
    protected targets: Array<number>
    protected terminate: boolean
    public activate:boolean

    constructor(data: any, caster: number) {
        this.value = data.value
        this.tick = 1
        this.duration = data.duration
        this.delay = data.delay || 0
        this.disabled = data.disabled || false
        this.linked = data.linked || false
        this.isInvisible = data.isInvisible || false
        this.type = data.type
        this.caster = caster
        this.triggered = false
        this.triggerRate = data.triggerRate || 100
        this.compulsory = data.compulsory || false
        this.triggerClause = data.triggerClause || triggerClauseType.None
        this.behavior = data.behavior || effectTargetBehavior.Default
        this.targets = []
        this.activate = data.activate || true
        this.activationType = data.activationType || activationType.Immediate
        this.altValue = data.altValue || null
        this.mods = data.mods || {
            increment: {
                value: data.increment || 0,
                isMultiplier: data.isMultiplier || false
            }
        }
    }

    public functionality(char: Character, origin?: Skill, world?: Arena) {
        console.log("This does nothing!")
        return
    }

    public setAltValue(value: number) {
        this.altValue = value
    }

    public setIncrement(value:number){
        this.mods.increment.value = value
    }

    public getAltValue(): number {
        return this.altValue
    }

    public setTargets(targets: Array<number>) {
        this.targets = targets
    }

    public shouldApply(acType: activationType, tClause: triggerClauseType): boolean {
        const triggerRate = Math.floor(Math.random() * 101);

        if (acType === this.activationType &&
            tClause === this.triggerClause &&
            triggerRate <= this.triggerRate) return true;
        return false
    }

    public getActivationType(): activationType {
        return this.activationType
    }

    protected calculateDamageBonus(origin: Skill, char: Character): number {
        let mod = 1
        for (const typing of origin.getTypes()) {
            for (const type of char.getTyping()) {
                mod *= typeChart(type, typing)
            }
        }
        return mod
    }

    protected tickOn(): { [x: string]: boolean } {
        if (this.delay > 0) {
            return {
                terminate: false,
                activate: false
            }
        }

        /*  An even tick means it's your opponent's turn, odd means its yours.*/
        /*  The default behavior is for your skills to activate on odd ticks*/
        this.terminate = false
        this.activate = false

        if (this.tick % 2 === PlayerPhase.MyTurn || this.compulsory) {
            this.activate = true
        }

        if (this.duration <= 0) this.terminate = true

        return { terminate: this.terminate, activate: this.activate }
    }

    public progressTurn() {
        this.tick++
        this.generateToolTip()

        if (this.delay > 0) {
            this.delay--
            return this.tickOn()
        }
        this.duration--
        const {terminate, activate} = this.tickOn()
        if(terminate) this.effectConclusion()
        return {terminate, activate}
    }

    public execute(targets: Array<number>, world: Arena, origin: Skill, shouldApply: boolean) {
        const t = []
        
        switch (this.behavior) {
            case effectTargetBehavior.Default: {
                for (const i of targets) {
                    const char = world.getCharactersByIndex([i])[0]
                    if (char.isKnockedOut()) continue
                    if (shouldApply && this.activate && !char.isInvulnerable(origin.getTypes(), this.type)) {
                        this.functionality(char, origin, world)
                    }
                    t.push(i)
                }
            } break;

            case effectTargetBehavior.OnlyOne: {
                const char = world.getCharactersByIndex([targets[0]])[0]
                if (!char.isKnockedOut()) {
                    if (shouldApply && this.activate && !char.isInvulnerable(origin.getTypes(), this.type)) {
                        this.functionality(char, origin, world)
                    }
                    t.push(targets[0])
                }
            } break;

            case effectTargetBehavior.AllOthers: {
                const slice = targets.slice(1, targets.length)

                for (const i of slice) {
                    const char = world.getCharactersByIndex([i])[0]

                    if (char.isKnockedOut()) continue
                    if (shouldApply && this.activate && !char.isInvulnerable(origin.getTypes(), this.type)) {
                        this.functionality(char, origin, world)
                    }
                    t.push(i)
                }

            } break;

            case effectTargetBehavior.IfAlly: {
                const { char } = world.findCharacterById(this.caster)
                const allies = char.getAllies()
                for (const i of targets) {
                    if (allies.includes(i)) {
                        const ally = world.getCharactersByIndex([i])[0]
                        if (ally.isKnockedOut()) continue
                        if (shouldApply && this.activate && !ally.isInvulnerable(origin.getTypes(), this.type)) {
                            this.functionality(ally, origin, world)
                        }
                        t.push(i)
                    }
                }
            } break;

            case effectTargetBehavior.IfEnemy: {
                const { char } = world.findCharacterById(this.caster)
                const enemies = char.getEnemies()

                for (const i of enemies) {
                    if (targets.includes(i)) {
                        const char = world.getCharactersByIndex([i])[0]
                        if (char.isKnockedOut()) continue
                        if (shouldApply && this.activate && !char.isInvulnerable(origin.getTypes(), this.type)) {
                            this.functionality(char, origin, world)
                        }
                        t.push(i)
                    }
                }

            } break;

            case effectTargetBehavior.ifSelf: {
                const { char, index } = world.findCharacterById(this.caster)
                if (!char.isKnockedOut()) {
                    if (shouldApply && this.activate && !char.isInvulnerable(origin.getTypes(), this.type)) {
                        this.functionality(char, origin, world)
                    }
                    t.push(index)
                }
            } break;
        }

        if(this.activate && shouldApply) {
            if (this.mods.increment.isMultiplier) this.value *= this.mods.increment.value
            else this.value += this.mods.increment.value
        }
        
        this.setTargets(t)
    }

    public getType(): effectType {
        return this.type
    }

    protected generateToolTip() {
        this.message = "This character is being targeted"
    }

    protected effectConclusion() { 
        
    }

    public getTargets() {
        return this.targets
    }

    public isVisible(): boolean {
        if (this.isInvisible) return false
        return true
    }
}