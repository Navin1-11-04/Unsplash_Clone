const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

const PostSchema = new mongoose.Schema({
    label: String,
    imageUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', PostSchema);

// Default route
app.get('/', (req, res) => {
    res.send('Server working successfully');
});

app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200,"Posts Retrieved successfully");
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Add a new post
app.post('/addposts', async (req, res) => {
    const { label, imageUrl } = req.body;
    try {
        const newPost = new Post({ label,imageUrl });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/search', async (req, res) => {
    const { label } = req.query;
    try {
      const posts = await Post.find({ label: new RegExp(label, 'i') });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB', err);
});


// Start the server
app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
    } else {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
});
