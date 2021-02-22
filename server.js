require('dotenv').config({ 'path': './env/.env' })

const log4js = require('log4js')
log4js.configure('src/configs/log4js.json')

const RestServer = require('@mundiale-private/rest-server')

const handlerFiles = {
    'gitlab-handler': require('./src/handlers/gitlab-handler'),
}

new RestServer({ handlerFiles }).start()
