
require('dotenv').config()
const server = require('./app')

const {PORT, URL} = process.env

server.listen(PORT, () => console.log(`Server Running on http://${URL}:${PORT}`))