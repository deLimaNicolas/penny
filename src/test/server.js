require('dotenv').config({ 'path': './env/.env' })

const log4js = require('log4js')
log4js.configure('src/configs/log4js.json')

const RestServer = require('@mundiale-private/rest-server')

const handlerFiles = {
    'gitlab-handler': require('../handlers/gitlab-handler'),
}

module.exports = new RestServer({ handlerFiles }).configure().server
