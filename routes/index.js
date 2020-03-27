const rootController = require("../controllers/root")

module.exports = function(app){
    app.get("/", rootController.default)
    require('./nested/character')(app)
}