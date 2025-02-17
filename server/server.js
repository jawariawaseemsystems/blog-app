import express from "express";
import cors from "cors";
import {users, posts} from "./schema.js";

const app = express();
const PORT = 3001;
app.use(express.json());
// app.use(cors({origin: "http://localhost:3000"})); 
app.use(cors("*")); 

app.get("/users", (req, res) => {
    res.json(users);
});

app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);

    if (!user) 
        return res.status(404).json({ error: "User not found" });
    
    res.json(user);
});

app.get("/users/:id/posts", (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userPosts = posts.filter(post => post.userId === userId);

    if (userPosts.length === 0)
        return res.status(404).json({ error: "No posts found for this user" });

    res.json(userPosts);
});

app.post("/users/:userId/post/:postId", (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const postId = parseInt(req.params.postId, 10);
    const { title, content } = req.body;

    const user = users.find(u => u.id === userId);
    if (!user)
        return res.status(404).json({ error: "User not found" });

    if (!title || !content)
        return res.status(400).json({ error: "Title and content are required" });

    const newPost = { id: postId, userId, title, content };
    posts.push(newPost);

    res.status(201).json({ message: "Post created successfully", post: newPost });
});

app.get("/posts", (req, res) => {
    res.json(posts);
});

app.get("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(u => u.id === postId);

    if (!post) 
        return res.status(404).json({ error: "Post not found" });
    
    res.json(post);
});

app.put("/edit/post", (req, res) => {

    const { title, content, postId } = req.body;

    const postIndex = posts.findIndex(p => p.id === postId);
    
    if (postIndex === -1)
        return res.status(404).json({ error: "Post not found" });

    if (!title || !content)
        return res.status(400).json({ error: "Title and content are required" });

    posts[postIndex].title = title;
    posts[postIndex].content = content;

    res.json({ message: "Post updated successfully", post: posts[postIndex] });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
