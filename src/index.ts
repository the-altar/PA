import {Coliseum} from "./server"
const mongoUri: string = process.env.MONGODB_URI || "mongodb://heroku_v71xlm18:7jhpcdfn01bp88mb9cp2ncq7ng@ds161018.mlab.com:61018/heroku_v71xlm18"
const port: number = Number(process.env.PORT) || 3000;
new Coliseum(port, mongoUri).run()
