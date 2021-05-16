const cors = require('cors');
const express = require('express');
const router = require('./routes/router');
const SwaggerConfig = require('./configs/swagger');


class Application {
    static setupApp(app) {
        app.use(express.json())
        app.use(cors())
        app.use(router)
        const swaggerModel = new SwaggerConfig(app)
        swaggerModel.configure()
    }

    static getApplication() {
        const app = express()
        Application.setupApp(app)
        return app
    }
}

module.exports = Application.getApplication()