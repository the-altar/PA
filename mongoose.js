// Mongoose connect is called once by the app.js & connection established
// No need to include it elsewhere

const mongoUri = process.env.MONGODB_URI || "mongodb://heroku_v71xlm18:7jhpcdfn01bp88mb9cp2ncq7ng@ds161018.mlab.com:61018/heroku_v71xlm18"
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
// app will start running AFTER the connection to the database has been established
module.exports = function(callback) {
    mongoose.connect(mongoUri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then(() => {
            console.log('DB Connected!')
            callback()
        })
        .catch(err => {
            console.log(`DB Connection Error: ${err.message}`);
        });
}

