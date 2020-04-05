const Effects = require('./effects');
/*
***0 One enemy
***1 One Ally
***2 All Enemies
***3 All Allies
***4 Self
***5 All
***6 Random
***7 Random Ally
***8 Random Enemy
*/

module.exports = class Skills {

    constructor(skill){
        this.effects = []
        for(const effect in skill.effects){
            this.effects.push(new Effects(skill.effects[effect]))
        } 
        this.id = skill.id
        this.skillpic = skill.skillpic
        this.name = skill.name
        this.description = skill.description
        this.target = skill.target
        this.cost = skill.cost
        this.flags = skill.flags
        this.cooldown = skill.cooldown
        this.baseCooldown = skill.baseCooldown
        this.currentTarget = false
    }

    execute(targets){
        for(const i in this.effects){
            const targetHandler = this.effects[i].appliableOn 
            this[targetHandler](this.effects[i], targets);
        }
    }

    firstTarget(effect, targets){
        const funcName = effect.type
        effect[funcName](targets[0].char, this)
    }
    
    allTargets(effect, targets){
        const funcName = effect.type
        for(let i = 0; i < targets.length; i++){
            effect[funcName](targets[i].char, this)
        }
    }

    allEnemyTargets(effect, targets){
        const funcName = effect.type
        for(const t in targets){
            if(targets[t].isEnemy){
                effect[funcName](targets[t].char)
            }
        }
    }

    allAllyTargets(effect, targets){
        const funcName = effect.type
        for(const t in targets){
            if(!targets[t].isEnemy){
                effect[funcName](targets[t].char)
            }
        }
    }
    
    otherTargets(effect, targets){
        const funcName = effect.type
        for(let i = 1; i < targets.length; i++){
            effect[funcName](targets[i].char, this)
        }
    }

    otherAllyTargets(){
        const funcName = effect.type
        for(let i = 1; i < targets.length; i++){
            if(!targets[i].isEnemy){
                effect[funcName](targets[i].char, this)
            }
        }
    }
}