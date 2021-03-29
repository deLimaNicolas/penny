class ResponseService {
    static sendResponse(responseObject, res) {
        const { status = 200 } = responseObject
        res.status(status)
        res.json(responseObject)
    }
}

module.exports = ResponseService