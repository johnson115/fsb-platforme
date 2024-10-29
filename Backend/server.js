require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
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

const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    
    const database = client.db('posts');
    const postsCollection = database.collection('posts');

    app.get('/api/posts', async (req, res) => {
      try {
        const posts = await postsCollection.find().sort({ timestamp: -1 }).toArray();
        res.json(posts);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.post('/api/posts', async (req, res) => {
      try {
        const newPost = { ...req.body, timestamp: new Date() };
        const result = await postsCollection.insertOne(newPost);
        res.status(201).json({ ...newPost, _id: result.insertedId });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });

    app.listen(port, '0.0.0.0', () => {
      console.log(`Server running on http://0.0.0.0:${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();