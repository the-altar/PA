const app = require("./settings").router();
const port = process.env.PORT || 3000;

require('./mongoose')(() => {
    require('./routes')(app)
    const server = app.listen(port, ()=> {console.log(`Server running on port: ${port}`)})
    require('./socket')(server)
})


