module.exports = class ClientManager {
    constructor(){
        this.clientList = {}
    }
    
    addClient(id, clientData, ws=null){
        this.clientList[id] = {
            avatarId: clientData.avatarId,
            username: clientData.username,
            elo: clientData.elo,
            connection: ws
        }
    }

    getClientConnectionById(id){
        return this.clientList[id].connection
    }
    getAllClientsId(){
        return Object.keys(this.clientList)    
    }
    getClientById(id){
        return {
            username: this.clientList[id].username,
            avatarId: this.clientList[id].avatarId,
            team: this.clientList[id].team
        }
    }
    getAllClients(){
        return this.clientList
    }
    removeClientById(id){
        delete this.clientList[id]
    }
    count(){
        return Object.keys(this.clientList).length
    }
    getRankedMap(){
        const mappedHash = Object.keys(this.clientList).sort((a,b)=>{
            return this.clientList[a].elo - this.clientList[b].elo
        }).map((sortedKey)=>{
            return this.clientList[sortedKey]
        })

        return mappedHash
    }           
}