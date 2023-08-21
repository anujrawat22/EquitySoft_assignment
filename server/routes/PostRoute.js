const { Router } = require('express')
const { authenticate } = require('../middlewares/authenticateMiddleware')
const { authorize } = require('../middlewares/authorizeMiddleware')
const { allpost, getpostbyid, createpost, updatepost, deletepost } = require('../controllers/PostController')

const PostRouter = Router()

PostRouter.get("/getPosts", allpost)

PostRouter.get("/post/:id", getpostbyid)

PostRouter.post("/create", authenticate, authorize(['author']), createpost)

PostRouter.put("/update/:id", authenticate, authorize(['author']), updatepost)

PostRouter.delete("/delete/:id", authenticate, authorize(['author']), deletepost)

module.exports = { PostRouter }