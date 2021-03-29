const request = require('supertest')
const app = require('../app')

const { comment, pipeline, mergeRequest } = require('./mockData')

describe('Testing Gitlab events handler endpoint', () => {
    it('should format comment event correclty', async () => {
        await request.agent(app).post('/gitlab/8123314041166233').send(comment)
    }, 5000000)

    it('should  aaaaa  event ', async () => {
        await request.agent(app).post('/gitlab/812331404116623360').send(pipeline)
    }, 5000000)

    it('should format comment event tgf ', async () => {
        await request.agent(app).post('/gitlab/812331404116623360').send(mergeRequest)
    }, 5000000)

    it('should format comment ', async () => {
        await request.agent(app).get('/gitlab')
    })
}, 150000)