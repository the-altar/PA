import express from 'express'
import mongoose from 'mongoose'
import bodyparser from 'body-parser'
import cookieParser from 'cookie-parser'
import fileupload from 'express-fileupload'

import { Application } from 'express'
import { rootRouter } from './handlers/root/root.router'
import { characterRouter } from "./handlers/character/character.router"
import { skillRouter } from "./handlers/skill/skill.routes"
import { effectRouter } from "./handlers/effect/effect.router"
import { gameRouter } from "./handlers/game/game.router"
import { userRouter } from "./handlers/user"

export class App {
    private app: Application

    constructor(appInit: { mongoUri: string }) {
        this.app = express()
        this.database(appInit.mongoUri)
        this.middleware()
        this.routes()
    }

    private middleware(): void {
        this.app
            .use(fileupload())
            .use(cookieParser())
            .use(bodyparser.json())
            .use(bodyparser.urlencoded({ extended: true }))
            .use(express.static('public', { maxAge: "10d" }))
            .use(express.static('public/main', { maxAge: '7d' }))
            .use('/game', express.static('public/game', { maxAge: '7d' }))
    }

    private routes(): void {
        this.app.use("/user", userRouter)
        this.app.use('/game', gameRouter)
        this.app.use('/character', characterRouter)
        this.app.use("/skill", skillRouter)
        this.app.use("/effect", effectRouter)
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