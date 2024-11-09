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
  methods: ["GET", "POST", "OPTIONS"],
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

  if (req.method === 'GET') {
    try {
      await connectToDatabase();
      const posts = await Post.find({}).select("-email").sort({ timestamp: -1 });
      return res.status(200).json(posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      return res.status(500).json({ message: 'Error fetching posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, content, email, gender } = req.body;

      // Validate the required fields
      if (!name || !content || !email || !gender) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      await connectToDatabase();

      // Create a new post
      const newPost = new Post({
        name,
        content,
        email,
        gender
      });

      await newPost.save();
      return res.status(201).json(newPost); // Return the newly created post
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}