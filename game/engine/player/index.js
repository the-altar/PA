module.exports = class Player {
    constructor(data){
        for(let key in data){
            this[key] = data[key]
        }
    } 
}