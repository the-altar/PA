const app = require("./settings").router();
const port = process.env.PORT || 3000;

require('./mongoose')(() => {
    require('./routes')(app)
    const server = app.listen(port);
    require('./socket')(server)  
})


