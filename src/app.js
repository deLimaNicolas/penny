const cors = require('cors')
const express = require('express')
const router = require('./routes/router')

class Application {
    static setupApp(app) {
        app.use(express.json())
        app.use(cors())
        app.use(router)
    }

    static getApplication() {
        const app = express()
        Application.setupApp(app)
        return app
    }
}

module.exports = Application.getApplication()