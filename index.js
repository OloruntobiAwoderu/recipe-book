const express = require("express");
const app = express()
const port = process.env.PORT || 3000
const UserRoutes = require("./routes/userRoutes")


app.use(express.json())

app.use('/api', UserRoutes)
app.get("/", (req, res) => {
    res.send("Welcome to my API");
  });







app.listen(port, () => console.log(`server listening on port ${port}`))