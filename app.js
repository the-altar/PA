const app = require("./settings").router()
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Express started at port: ${port}`));

