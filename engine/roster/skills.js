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

        this.name = skill.name
        this.description = skill.description
        this.target = skill.target
        this.flags = skill.flags
        this.cooldown = skill.startCooldown
        this.baseCooldown = skill.baseCooldown
        this.currentTarget = false
        
        if (this.cooldown > 0) {
            this.disabled=true
        } else {
            this.disabled=false
        }
    }
    
}