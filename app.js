const app = require("./settings").router();
const port = process.env.PORT || 3000;
const cleanRecords = require('./controllers/playerList').CleanAllRecords

require('./mongoose')(() => {
    cleanRecords()
    require('./routes')(app)
    const server = app.listen(port, () => { console.log(`Server running on port: ${port}`) })
    require('./socket')(server)
})


