module.exports = function (app) {
    require("./nested/root")(app)
    require('./nested/game')(app)
    require('./nested/character')(app)
}