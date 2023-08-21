const { Router } = require("express")
const { authorize } = require("../middlewares/authorizeMiddleware")
const { authenticate } = require("../middlewares/authenticateMiddleware")
const { commentsofPost, getCommentbyId, createComment, updateComment, deleteComment } = require("../controllers/CommentController")

const CommentRouter = Router()

CommentRouter.get("/all/:postId", commentsofPost)

CommentRouter.get("/getComment/:id", getCommentbyId)

CommentRouter.post("/create", authenticate, createComment)

CommentRouter.put("/edit/:id", authenticate, updateComment)

CommentRouter.delete("/delete/:id", authenticate, deleteComment)



module.exports = { CommentRouter }