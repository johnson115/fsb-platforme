require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

const baseUri = uri.split('/').slice(0, 3).join('/');
const dbName = 'posts';

mongoose.connect(`${baseUri}/${dbName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(`Connected to MongoDB Atlas - ${dbName} database`))
.catch(err => console.error('Error connecting to MongoDB:', err));

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  email: { type: String, required: false },
  loveCount: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  lovedBy: [{ type: String }],
  comments: [commentSchema]
});

const Post = mongoose.model('Post', postSchema);

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find({}, { email: 0, lovedBy: 0 })
      .sort({ timestamp: -1 });
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    console.log('Received post data:', req.body);
    const { name, content, email } = req.body;
    
    if (!name || !content) {
      return res.status(400).json({ message: 'Name and content are required' });
    }

    const newPost = new Post({ 
      name, 
      content, 
      email: email || undefined,
      loveCount: 0,
      lovedBy: [],
      comments: []
    });

    const result = await newPost.save();
    console.log('Post saved:', result);
    res.status(201).json({ ...result.toObject(), email: undefined, lovedBy: undefined });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/posts/:id/love', async (req, res) => {
  try {
    const { action } = req.body;
    const userId = req.body.userId || req.ip;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const alreadyLoved = post.lovedBy.includes(userId);

    if (action === 'like' && !alreadyLoved) {
      post.loveCount += 1;
      post.lovedBy.push(userId);
    } else if (action === 'unlike' && alreadyLoved) {
      post.loveCount -= 1;
      post.lovedBy = post.lovedBy.filter(id => id !== userId);
    } else {
      return res.status(400).json({ message: 'Invalid action or post already liked/unliked' });
    }

    await post.save();

    res.json({ _id: post._id, loveCount: post.loveCount });
  } catch (error) {
    console.error('Error updating love count:', error);
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/posts/:id/comments', async (req, res) => {
  try {
    const { content } = req.body;
    console.log('Received comment:', content);
    
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = {
      content,
      timestamp: new Date()
    };

    post.comments.push(newComment);
    await post.save();
    console.log('Comment added:', newComment);

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});