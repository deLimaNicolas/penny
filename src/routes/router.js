const express = require('express')
const GitLab = require('../handlers/gitlab-handler')
const Discord = require('../handlers/discord-handler')

const router = express.Router()


/**
 * @swagger
 * /gitlab/{key}:
 *  post:
 *    tags:
 *      - gitlab
 *    description: Treats a GitLab payload and send it to your Discord server
 *    produces:
 *      - application/json
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *    parameters:
 *        - name: key
 *          in: path
 *          schema:
 *            type: string
 *          description: >
 *            The channel id of the squad you want to configure the repo's webhook ont GitLab. You can get it
 *            by calling /discord/getRooms
 */
router.post('/gitlab/:key', GitLab.onGitlabHandler)

/**
 * @swagger
 * /discord/getRooms:
 *  get:
 *    tags:
 *      - discord
 *    description: Use to get all rooms from your Discord Server
 */
router.get('/discord/getRooms', Discord.onGetRooms)

module.exports = router