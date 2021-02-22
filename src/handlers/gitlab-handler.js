const GitlabService = require('../services/gitlab-service')

/**
 * @tag messages
 * @tagDescription Alfred.
 */

class GitLab {
    /**
     * Recebe mensagem do usuario pelo whatsapp do facebook
     *
     * @path /gitlab/{key}
     * @method post
     * @function onGitlabHandler
     * @memorySize 256
     * @timeout 10
     *
     * @required
     * @in path
     * @param {string} key
    */

    static async onGitlabHandler(event) {
        const message = JSON.parse(event.body)
        const { key: notificationChannel } = event.params

        const mapOptions = {
            pipeline: GitlabService.handlePipeline,
            merge_request: GitlabService.handleMergeRequest,
            note: GitlabService.handleComment
        }

        await mapOptions[message.object_kind]({ message, notificationChannel })
    }

    /**
     * Envia relação de salas e id's
     *
     * @path /rooms
     * @method get
     * @function onGetRooms
     * @memorySize 256
     * @timeout 10
    */

    static async onGetRooms() {
        return GitlabService.getAllRooms()
    }
}

module.exports = GitLab
