const app = require("./settings").router()
//const pg = require("./engine/game")
const port = process.env.PORT || 3000;

require('./mongoose')(() => {
    require('./routes')(app)
    app.listen(port, () => console.log(`Express started at port: ${port}`));
})


