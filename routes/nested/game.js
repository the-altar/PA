const gameController = require('../../controllers/game')

module.exports = function(app){
    app.get('/game', gameController.increaseGame)
}