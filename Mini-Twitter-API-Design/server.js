
const express = require("express");

const app = express();
app.use(express.json());

let posts = [];
let nextPostId = 1;
let nextCommentId = 1;

// Create a post
app.post("/posts", (req, res) => {
    const post = {
        id: nextPostId++,
        title: req.body.title,
        content: req.body.content,
        comments: []
    };

    posts.push(post);

    res.status(201).json(post);
});

// Get all posts
app.get("/posts", (req, res) => {
    res.json(posts);
});

// Edit a post
app.put("/posts/:id", (req, res) => {
    const id = Number(req.params.id);

    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    post.title = req.body.title;
    post.content = req.body.content;

    res.json(post);
});

// Delete a post
app.delete("/posts/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = posts.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Post not found" });
    }

    posts.splice(index, 1);

    res.json({ message: "Post deleted successfully" });
});

// Add a comment to a post
app.post("/posts/:id/comments", (req, res) => {
    const id = Number(req.params.id);

    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    const comment = {
        id: nextCommentId++,
        content: req.body.content
    };

    post.comments.push(comment);

    res.status(201).json(comment);
});

// Get comments of a post
app.get("/posts/:id/comments", (req, res) => {
    const id = Number(req.params.id);

    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    res.json(post.comments);
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
