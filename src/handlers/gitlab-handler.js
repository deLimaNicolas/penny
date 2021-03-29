const GitlabService = require('../services/gitlab-service')
const ResponseService = require('../services/response-service')

class GitLab {
    static async onGitlabHandler(req, res) {
        try {
            const message = req.body
            const { key: notificationChannel } = req.params

            const mapOptions = {
                pipeline: GitlabService.handlePipeline,
                merge_request: GitlabService.handleMergeRequest,
                note: GitlabService.handleComment
            }

            await mapOptions[message.object_kind]({ message, notificationChannel })
            ResponseService.sendResponse({ message: 'Operation Done' }, res)
        } catch (err) {
            ResponseService.sendResponse(err, res)
        }
    }
}

module.exports = GitLab
