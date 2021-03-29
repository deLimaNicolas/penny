const ResponseService = require('../services/response-service')
const DiscordService = require('../services/discord-service')

class Discord {
    static async onGetRooms(req, res) {
        try {
            const discordClient = new DiscordService(process.env.DISCORD_TOKEN)
            
            const rooms = await discordClient.getChannels()

            ResponseService.sendResponse({ message: 'Operation Done', rooms }, res)
        } catch (err) {
            ResponseService.sendResponse(err, res)
        }
    }
}

module.exports = Discord