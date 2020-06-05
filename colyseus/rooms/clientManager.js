module.exports = class ClientManager {
    constructor(){
        this.clientList = {}
    }
    addClient(id, clientData){
        this.clientList[id] = {
            avatarId: clientData.avatarId,
            username: clientData.username
        }
    }
    getClientById(id){
        return {
            username: this.clientList[id].username,
            avatarId: this.clientList[id].avatarId
        }
    }
    getAllClients(){
        return this.clientList
    }
    removeClientById(id){
        delete this.clientList[id]
    }
}