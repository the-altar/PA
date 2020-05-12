const charController = require("../../controllers/character")

module.exports = function(app){
    app.get('/character', charController.getAll)
    app.post('/character/new', charController.create)
    app.post('/character/update', charController.update)
    app.post('/character/upload', charController.upload)
    app.post('/character/delete', charController.delete)
}