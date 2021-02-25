const express = require('express')
const BlogPost = require('../models/blogpost')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/blogs', auth, async (req, res) => {
    const blog = new BlogPost({
        ...req.body,
        owner: req.user.Username
       
    })
    try {
        await blog.save()
        res.status(201).send(blog)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/blogs', async (req, res) => {
    try {
        const readBlogs = await BlogPost.find({})
        res.send(readBlogs)
    } catch (e) {
        res.status(500).send()
    }
})  

router.patch('/blogs/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'content']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const blog = await BlogPost.findOne({ _id: req.params.id, owner: req.user.Username})

        if (!blog) {
            return res.status(404).send()
        }

        updates.forEach((update) => blog[update] = req.body[update])
        await blog.save()
        res.send(blog)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/blogs/:id', auth, async (req, res) => {
    try {
        const blog = await BlogPost.findOneAndDelete({ _id: req.params.id, owner: req.user.Username})

        if (!blog) {
            res.status(404).send()
        }

        res.send(blog)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router