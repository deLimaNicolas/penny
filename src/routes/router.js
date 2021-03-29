const express = require('express')
const GitLab = require('../handlers/gitlab-handler')
const Discord = require('../handlers/discord-handler')

const router = express.Router()

router.post('/gitlab/:key', GitLab.onGitlabHandler)
router.get('/discord/getRooms', Discord.onGetRooms)

module.exports = router