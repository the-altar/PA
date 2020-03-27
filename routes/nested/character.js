const charController = require("../../controllers/character")

module.exports = function(app){
    app.get('/character', charController.getAllChars)
    app.post('/character/new', charController.createNewChar)
    app.post('/character/update', charController.updateChar)
    app.post('/character/upload', charController.uploadCharacter)
}