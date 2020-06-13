import express from 'express'
import bodyparser from 'body-parser'
import mongoose from 'mongoose'
import fileupload from 'express-fileupload'

import { Application } from 'express'
import { rootRouter } from './handlers/root/root.router'
import { characterRouter } from "./handlers/character/character.router"
import  {gameRouter} from "./handlers/game/game.router"

export class App {
    private app: Application

    constructor(appInit: { mongoUri: string }) {
        this.app = express()
        this.database(appInit.mongoUri)
        this.middleware()
        this.routes()
    }

    private middleware(): void {
        this.app.use(fileupload())
        this.app.use(bodyparser.json())
        this.app.use(bodyparser.urlencoded({ extended: true }))
        this.app.use(express.static('public', { maxAge: "10d" }))
        this.app.use(express.static('public/main', {maxAge: '7d'}))
        this.app.use('/game', express.static('public/game', {maxAge: '7d'}))
    }

    private routes(): void {
        this.app.use('/game', gameRouter)
        this.app.use('/character', characterRouter)
        this.app.use("/", rootRouter)
    }

    private database(url: string): void {
        mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
            .then(() => console.log("DB CONNECTED"))
            .catch(err => console.error(err))
    }

    public run(): Application {
        return this.app
    }
}