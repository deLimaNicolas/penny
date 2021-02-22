const Discord = require("discord.js")
const NodeCache = require("node-cache");
const myCache = new NodeCache();

class DiscordService {
    constructor(token) {
        this.bot = DiscordService.getClient()

        this.bot.login(token)
    }

    static getClient() {
        if (this.bot) {
            return this.bot
        }
        return new Discord.Client()
    }

    static async getAllUsers(bot) {
        return new Promise(async (resolve) => {
            bot.on('ready', async () => {
                const cachedUsers = myCache.get("users")

                if (!cachedUsers) {
                    const mundialeGuild = await bot.guilds.cache.get(process.env.MUNDIALE_DISCORD_ID)
                    const users = await mundialeGuild.members.fetch()
                    const formattedUsers = users.map(elm => ({ id: elm.user.id, nickname: elm.nickname, username: elm.user.username }))

                    myCache.set('users', formattedUsers, 60 * 60) //seconds
                    resolve(formattedUsers)
                }

                resolve(cachedUsers)
            })
        })

    }

    async getUser(name) {
        const allUsers = await DiscordService.getAllUsers(this.bot)
        return allUsers.filter(({ username }) => username === name)
    }


    static getAllTeams(bot) {
        return bot.channels.cache.filter(channel => channel.type === 'category')
    }

    static async getAllnotificationChannels(bot) {
        return bot.channels.cache.filter(channel => channel.name.includes('notification'))
    }

    static getChannelsObject(teams, notificationChannels) {
        const channels = {}

        teams.forEach(({ name, id }) => {
            channels[id] = { name }
        })

        notificationChannels.forEach(({ id, parentID }) => {
            channels[parentID] = {
                ...channels[parentID],
                notificationChannel: id
            }
        })

        return channels
    }

    async getChannels() {
        return new Promise(async (resolve) => {
            this.bot.on('ready', async () => {
                const cachedChannels = myCache.get("channels")

                if (!cachedChannels) {
                    const teams = DiscordService.getAllTeams(this.bot)
                    const notificationChannels = await DiscordService.getAllnotificationChannels(this.bot)
                    const channels = DiscordService.getChannelsObject(teams, notificationChannels)

                    myCache.set('channels', channels, 60 * 60) //seconds
                    resolve(channels)
                }

                resolve(cachedChannels)
            })
        })
    }

    async sendMessageToUser({id, nickname}, phrase) {
        const mundialeGuild = await this.bot.guilds.cache.get(process.env.MUNDIALE_DISCORD_ID)
        const user = await mundialeGuild.members.cache.get(id)
        return user.send(`Olá mestre ${nickname}` + phrase)
    }

    async sendMessageTonotificationChannels(notificationChannel, phrase) {
        const channel = this.bot.channels.cache.find(channel => channel.id === notificationChannel)
        return channel.send(`Olá mestres, ` + phrase)
    }

}

module.exports = DiscordService
