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

const port = 8000;
server.listen(port, () => console.log(`\n Server running on port ${port}`))