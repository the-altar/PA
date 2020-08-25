import {Coliseum} from "./server"
const mongoUri: string = process.env.MONGODB_URI 
const port: number = Number(process.env.PORT); 
new Coliseum(port, mongoUri).run()
