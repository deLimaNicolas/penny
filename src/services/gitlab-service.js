const DiscordService = require('./discord-service')
const AlfredPhraseGenerator = require('./alfred-phrase-generator')
const axios = require('axios')

class GitlabService {
    static async getDiscordUserFromGitlabId(assigneeId, discordClient) {
        let response = null
        const assignee = await GitlabService.getUserFromGitlab(assigneeId)

        if (assignee) {
            const { email } = assignee
            response = discordClient.getUser(email.split('@')[0])
        }

        return response
    }

    static async getUserFromGitlab(id) {
        try {
            const headers = {
                'Authorization': `Bearer ${process.env.GITLAB_TOKEN}`
            }

            const response = await axios.get(`${process.env.GITLAB_API}users?id=${id}`, { headers })
            return response.data[0]
        } catch (err) {
            return null
        }
    }

    static getMergeRequestObject(message) {
        const {
            object_kind,
            project: { id, name, web_url },
            object_attributes: { action, url, target_branch, source_branch, assignee_ids }
        } = message

        const assigneeId = assignee_ids ? assignee_ids[0] : null

        return {
            object_kind,
            project: { id, name, web_url },
            assigneeId,
            url,
            action,
            target_branch,
            source_branch
        }
    }

    static getPipelineObject(message) {
        const {
            object_kind,
            project: { id, name, web_url },
            object_attributes: { status, assignee_ids }
        } = message

        const assigneeId = assignee_ids ? assignee_ids[0] : null

        return {
            status,
            object_kind,
            project: { id, name, web_url },
            assigneeId
        }
    }

    static getCommentObject(message) {
        const {
            object_kind,
            project: { id, name, web_url },
            merge_request: { assignee_ids },
        } = message

        const assigneeId = assignee_ids ? assignee_ids[0] : null

        return {
            object_kind,
            project: { id, name, web_url },
            assigneeId
        }
    }

    static async handlePipeline({ message, notificationChannel }) {
        let response = null

        const discordClient = new DiscordService(process.env.DISCORD_TOKEN)

        const pipelineObject = GitlabService.getPipelineObject(message)

        const discordUser = await GitlabService.getDiscordUserFromGitlabId(pipelineObject.assigneeId, discordClient)

        const phrase = AlfredPhraseGenerator.genratePhraseByObject(pipelineObject)


        await discordClient.sendMessageTonotificationChannels(notificationChannel, phrase)

        if (discordUser) {
            response = discordClient.sendMessageToUser(discordUser[0], phrase)
        }

        return response
    }

    static async handleComment({ message, notificationChannel }) {

        let response = null

        const discordClient = new DiscordService(process.env.DISCORD_TOKEN)
        const commentObject = GitlabService.getCommentObject(message)

        const discordUser = await GitlabService.getDiscordUserFromGitlabId(commentObject.assigneeId, discordClient)

        const phrase = AlfredPhraseGenerator.genratePhraseByObject(commentObject)

        await discordClient.sendMessageTonotificationChannels(notificationChannel, phrase)

        if (discordUser) {
            response = discordClient.sendMessageToUser(discordUser[0], phrase)
        }

        return response
    }

    static async handleMergeRequest({ message, notificationChannel }) {
        let response = null

        const discordClient = new DiscordService(process.env.DISCORD_TOKEN)

        const mergeObject = GitlabService.getMergeRequestObject(message)

        const discordUser = await GitlabService.getDiscordUserFromGitlabId(mergeObject.assigneeId, discordClient)

        const phrase = AlfredPhraseGenerator.genratePhraseByObject(mergeObject)

        await discordClient.sendMessageTonotificationChannels(notificationChannel, phrase)

        if (discordUser) {
            response = discordClient.sendMessageToUser(discordUser[0], phrase)
        }

        return response
    }
}

module.exports = GitlabService