const http = require('http')
const app=require('./app')
const { info }=require('./utils/logger')

server=http.createServer(app)

const PORT = 3003
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})