import axios from 'axios';

const URL = 'http://localhost:5000/api/posts/'

class PostService {
  // Get posts
  // Static: dont have to instantiate in order...ex: new PostService
  static getPosts() {
    // return a promise with info from backend
    return new Promise(async (resolve, reject) => {
      try {
        const RES = await axios.get(URL)
        const DATA = RES.data
        resolve(
          DATA.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
          }))
        )
      } catch (error) {
        reject(error)
      }
    })
  }
  // Create posts
  static insertPost(text) {
    return axios.post(URL, {
      text
    })
  }
  // Delete posts
  static deletePost(id) {
    return axios.delete(`${URL}${id}`)
  }
}

// Export post service
export default PostService