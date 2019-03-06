const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// initialize app
const app = express()

// Middleware
app.use(bodyParser.json())
app.use(cors())

// link to posts file
const posts = require('./routes/api/posts')
app.use('/api/posts', posts)

// create port 
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))