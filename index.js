const express = require("express");
const app = express()
const port = process.env.PORT || 3000
const UserRoutes = require("./routes/userRoutes")


app.use(express.json())
app.use('/', (req, res) => {
 res.send("Welcome to my API")
})
app.use('/users', UserRoutes)








app.listen(port, () => console.log(`server listening on port ${port}`))