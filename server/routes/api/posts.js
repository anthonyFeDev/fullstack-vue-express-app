// set up router
const EXPRESS = require('express')
const MONGODB = require('mongodb')

// create router
const ROUTER = EXPRESS.Router()

/**
 *  Async and Await: 
 *  Async functions return a Promise
 *  Await executes when promise is returned
 */

// Get posts 
ROUTER.get('/', async (req, res) => {
  const POSTS = await loadPostCollection()
  res.send(await POSTS.find({}).toArray())
})

// Add posts 
ROUTER.post('/', async (req, res) => {
  const POSTS = await loadPostCollection()

  // insert one record
  await POSTS.insertOne({
    text: req.body.text,
    createAt: new Date()
  })

  res.status(201).send()
})

// Delete posts
ROUTER.delete('/:id', async (req, res) => {
  const POSTS = await loadPostCollection()
  await POSTS.deleteOne({_id: new MONGODB.ObjectID(req.params.id)})
  res.status(200).send()
})

// function to connect to post collection 
async function loadPostCollection() {
  // connect to mLab
  const CLIENT = await MONGODB.MongoClient.connect('mongodb://firstUser:helloworld@vue-express-shard-00-00-jpzrd.mongodb.net:27017,vue-express-shard-00-01-jpzrd.mongodb.net:27017,vue-express-shard-00-02-jpzrd.mongodb.net:27017/test?ssl=true&replicaSet=vue-express-shard-0&authSource=admin&retryWrites=true', {
    useNewUrlParser: true
  })

  // return the posts from the mLab database
  return CLIENT.db('vue-express').collection('post')
}

// export router
module.exports = ROUTER