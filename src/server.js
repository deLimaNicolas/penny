
const server = require('./app')
require('dotenv').config()

const PORT = process.env.PORT || '4000'

server.listen(PORT, () => console.log(`Server Running on ${PORT}`))