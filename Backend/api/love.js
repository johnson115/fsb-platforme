import mongoose from 'mongoose';
import { connectToDatabase } from '../utils/database.js';
import cors from 'cors';

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, enum: ["male", "female"], required: true },
  loveCount: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  lovedBy: [{ type: String }],
  comments: [{
    content: String,
    timestamp: { type: Date, default: Date.now }
  }]
});

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

// Apply CORS middleware
const corsHandler = cors({
  origin: "*",  // Allow all origins. Change to your frontend URL if needed
  methods: ["POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

export default async function handler(req, res) {
  await new Promise((resolve, reject) => {
    corsHandler(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();
    
    const { id } = req.query;
    const { action, userId } = req.body;
    
    const post = await Post.findById(id);
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
    return res.status(200).json({ _id: post._id, loveCount: post.loveCount });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: error.message });
  }
}