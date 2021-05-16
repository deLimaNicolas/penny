const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

class SwaggerConfig {
    constructor(app) {
        this.app = app
    }

    configure() {
        const options = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: process.env.NAME,
                    version: "0.1.0",
                    description:
                        "Penny JS Documentation",
                    license: {
                        name: "MIT",
                        url: "https://spdx.org/licenses/MIT.html",
                    },
                    contact: {
                        name: "mrBlue",
                        url: "Not Today",
                        email: "teixlima@gmail.com",
                    },
                },
                servers: [
                    {
                        url: `http://${process.env.URL}:${process.env.PORT}`,
                    },
                ],
            },
            apis: ["./src/routes/*.js"],
        }


        const specs = swaggerJsdoc(options)

        this.app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(specs)
        );

    }
}

module.exports = SwaggerConfig