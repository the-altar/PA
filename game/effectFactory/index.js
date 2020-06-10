module.exports = function(effectType){
    switch(effectType){
        case effectType.Damage:{
            return "Damage"
        }
        case effectType.Healing:{
            return "Healing"
        } 
    }
}