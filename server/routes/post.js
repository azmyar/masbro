const router = require('express').Router();
const {Post} = require('../models/post');

router.post("/", async (req,res) => {
    await new Post(req.body).save();
    res.send()
})

router.get("/", async (req,res) => {
    const posts = await Post.find();
    res.send(posts)
})

router.get("/bros", async (req,res) => {
    const users = await Post.find(req.query);
    res.send(users)
})

module.exports = router;