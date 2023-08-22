const { default: mongoose } = require("mongoose");
const { Post } = require("../models/PostModel");

exports.allpost = async (req, res) => {
    let { page, limit } = req.body;
    try {
        let posts;
        if (page && limit) {
            posts = await Post.find({}).skip((page - 1) * limit).limit(limit)
        } else {

            page = 1
            posts = await Post.find({}).skip((page - 1) * 10).limit(10)

        }


        return res.status(200).send({ msg: "All posts data", data: posts })

    } catch (error) {
        console.log("Error getting data of all posts:", error);
        res.status(500).send({ err: "Server error" })
    }
}

exports.getpostbyid = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).send({ err: `Posts with id -${id} not found` })
        }
        res.status(200).send({ msg: `Data for post with id - ${id}`, data: post })
    } catch (error) {
        console.log(`Error getting post data for id - ${id} : `, error)
        res.status(500).send({ err: "Server error" })
    }
}


exports.createpost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.userId
    try {
        const newPost = new Post({ title, content, author: userId })
        await newPost.save()
        res.status(201).send({ msg: "New post created", data: newPost })
    } catch (error) {
        console.log("Error creating the post : ", error);
        res.status(500).send({ err: "Server error" })
    }
}

exports.updatepost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.userId

    try {
        const post = await Post.findOne({ _id: id, author: userId })
        if (!post) {
            return res.status(404).send({ err: `No post with id - ${id} found` })
        }
        post.title = title
        post.content = content
        await post.save()
        res.status(204).send({ msg: "Post updated" })
    } catch (error) {
        console.log(`Error updating post with  id - ${id} :`, error);
        res.status(500).send({ err: "Server error" })
    }
}


exports.deletepost = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        const post = await Post.findOne({ _id: id, author: userId })
        if (!post) {
            return res.status(404).send({ err: "No post of the author found" })
        }
        await Post.findByIdAndDelete(id)
        res.status(204).send({ msg: `Post with id - ${id} deleted successfully` })
    } catch (error) {
        console.log(`Error deleting post with id - ${id} :`, error);
        res.status(500).send({ err: "Server error" })
    }
}

exports.userPost = async (req, res) => {
    const userId = req.userId
    try {
        const posts = await Post.find({ author: userId }).sort({ createdAt: -1 })
        res.status(200).send({ msg: "All posts of data", data: posts })
    } catch (error) {
        console.log("Error getting post of the user :", error);
        res.status(500).send({ err: "Server error" })
    }
}