module.exports = function(app){
    app.get("/", (req, res) => {res.send("OK")})
    require('./nested/character')(app)
}