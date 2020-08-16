import { Character } from "../character"
import { typeChart } from "../../helpers/typechart";
import { effectType, effectTargetBehavior, activationType, Types, PlayerPhase, triggerClauseType } from "../../enums"
import { Arena } from "../../arena";
import { Skill } from "../skill";

export class Effect {
    protected value: number
    protected tick: number
    protected duration: number
    protected delay?: number
    protected linked?: boolean
    protected message: string
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
        this.compulsory = data.compulsory || false
        this.triggerClause = data.triggerClause || triggerClauseType.None
        this.behavior = data.behavior || effectTargetBehavior.Default
        this.targets = []
        this.activationType = data.activationType || activationType.Immediate
    }

    public functionality(char: Character, origin?: Skill, world?: Arena) {
        console.log("This does nothing!")
        return
    }

    public setTargets(targets: Array<number>) {
        this.targets = targets
    }

    public shouldApply(acType: activationType, tClause: triggerClauseType): boolean {
        if (acType === this.activationType && tClause === this.triggerClause) return true;
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
        let terminate: boolean = false
        let activate: boolean = false

        if (this.tick % 2 === PlayerPhase.MyTurn || this.compulsory) activate = true
        if (this.duration <= 0) terminate = true

        return { terminate, activate }
    }

    public progressTurn() {
        this.tick++
        this.generateToolTip()
        
        if (this.delay > 0) {
            this.delay--            
            return this.tickOn()
        }
        this.duration--
        return this.tickOn()
    }

    public execute(targets: Array<number>, world: Arena, origin:Skill, shouldApply: boolean): boolean {
        const t = []
        const { activate, terminate } = this.tickOn()
        switch (this.behavior) {
            case effectTargetBehavior.Default: {
                for (const i of targets) {
                    const char = world.getCharactersByIndex([i])[0]             
                    if (char.isKnockedOut()) continue
                    if (shouldApply && activate && !char.isInvulnerable(origin.getTypes())) {
                        this.functionality(char, origin, world)
                    }
                    t.push(i)
                }
            } break;

            case effectTargetBehavior.OnlyOne: {
                const char = world.getCharactersByIndex([targets[0]])[0]
                if (!char.isKnockedOut()) {
                    if (shouldApply && activate && !char.isInvulnerable(origin.getTypes())) {
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
                    if (shouldApply && activate && !char.isInvulnerable(origin.getTypes())) {
                        this.functionality(char, origin, world)
                    }
                    t.push(i)
                }

            } break;

            case effectTargetBehavior.IfAlly: {
                const {char} = world.findCharacterById(this.caster)
                const allies = char.getAllies()
                for(const i of targets){
                    if(allies.includes(i)){
                        const ally = world.getCharactersByIndex([i])[0]
                        if(ally.isKnockedOut()) continue
                        if(shouldApply && activate && !ally.isInvulnerable(origin.getTypes())){
                            this.functionality(ally, origin, world)
                        }
                        t.push(i)
                    }
                }
            }break;

            case effectTargetBehavior.IfEnemy: {
                const {char} = world.findCharacterById(this.caster)
                const enemies = char.getEnemies()

                for (const i of enemies) {
                    if (targets.includes(i)) {
                        const char = world.getCharactersByIndex([i])[0]
                        if (char.isKnockedOut()) continue
                        if (shouldApply && activate && !char.isInvulnerable(origin.getTypes())) {
                            this.functionality(char, origin, world)
                        }
                        t.push(i)
                    }
                }

            } break;

            case effectTargetBehavior.ifSelf: {
                const {char, index} = world.findCharacterById(this.caster)
                if (!char.isKnockedOut()) {
                    if (shouldApply && activate && !char.isInvulnerable(origin.getTypes())) {
                        this.functionality(char, origin, world)
                    }
                    t.push(index)
                }
            } break;
        }
        if (!terminate) this.setTargets(t)
        return terminate
    }

    public getType(): effectType {
        return this.type
    }

    protected generateToolTip() {
        this.message = "This character is being targeted"
    }

    public getTargets() {
        return this.targets
    }

    public isVisible(): boolean {
        if (this.isInvisible) return false
        return true
    }
}