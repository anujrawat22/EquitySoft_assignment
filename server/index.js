const express = require("express")
const { Connection } = require("./config/db")
require("dotenv").config()
const cors = require("cors")
const { UserRouter } = require("./routes/UserRoute")
const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

app.use("/api/users",UserRouter)


app.listen(port, async () => {
    try {
        await Connection;
        console.log('Connected to DB');
        console.log(`Listening on PORT - ${port}`);
    } catch (error) {
console.log(error);
    }
})