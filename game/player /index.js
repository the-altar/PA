module.exports = class Player {
    constructor(payload){
        this.id = payload.id;
        this.avatarId = payload.avatarId;
        this.username = payload.username;
        this.memberRank = payload.memberRank; 
        this.isTurn = false;
    }

    getId(){
        return this.id
    }
    setTurn(val){
        this.isTurn = val
    }
    isTurn(){
        return this.isTurn
    }
}