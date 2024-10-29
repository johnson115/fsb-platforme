require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
console.log('MongoDB URI:', uri); // Debugging line

if (!uri) {
  console.error('MONGODB_URI is not defined in the environment variables');
  process.exit(1);
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const postSchema = new mongoose.Schema({
  name: String,
  content: String,
  email: String,
  loveCount: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find({}, { email: 0 }).sort({ timestamp: -1 }); // Exclude email field
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const { name, content, email } = req.body;
    const newPost = new Post({ name, content, email, loveCount: 0 });
    const result = await newPost.save();
    res.status(201).json({ ...result.toObject(), email: undefined }); // Exclude email from response
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/api/posts/:id/love', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { loveCount: 1 } },
      { new: true, select: '-email' } // Exclude email from response
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});