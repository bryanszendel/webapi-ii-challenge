const express = require('express')

const data = require('./data/db.js')

const server = express();

server.use(express.json());
// find(), findById(), insert(), update(), remove(), findPostComments(), findCommendById(), insertComment()

server.get('/api/posts', (req, res) => {
  data.find()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(error => {
      res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

server.post('/api/posts', (req, res) => {
  const newPost = req.body
  data.insert(newPost)
    .then(post => {
      if (newPost.title && newPost.contents) {
        res.status(201).json(post)
      } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
      }
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error while saving the post to the database." })
    })
})

server.get('/api/posts/:id', (req, res) => {
  const postId = req.params.id;
  data.findById(postId)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

server.get('/api/posts/:id/comments', (req, res) => {
  const postId = req.params.id;
  data.findPostComments(postId)
    .then(comments => {
      if (comments) {
        res.status(200).json(comments)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

server.post('/api/posts/:id/comments', (req, res) => {
  const postId = req.params.id
  const newComment = req.body
  newComment.post_id = postId
  data.insertComment(newComment)
    .then(comment => {
      if (!comment) {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      } else if (!newComment.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
      } else {
        res.status(201).json(newComment)
      }
    })
    .catch(error => {
      res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})

const port = 8000;
server.listen(port, () => console.log(`\n Server running on port ${port}`))