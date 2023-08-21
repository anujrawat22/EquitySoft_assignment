const express = require("express")
const { Connection } = require("./config/db")
require("dotenv").config()
const cors = require("cors")
const { UserRouter } = require("./routes/UserRoute")
const { PostRouter } = require("./routes/PostRoute")
const { CommentRouter } = require("./routes/CommentRoute")
const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

app.use("/api/users", UserRouter)
app.use("/api/posts", PostRouter)
app.use("/api/comments", CommentRouter)

app.listen(port, async () => {
    try {
        await Connection;
        console.log('Connected to DB');
        console.log(`Listening on PORT - ${port}`);
    } catch (error) {
        console.log(error);
    }
})