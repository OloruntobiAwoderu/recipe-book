
const port = process.env.PORT || 3000
const server = require("./api/server")







server.listen(port, () => console.log(`server listening on port ${port}`))