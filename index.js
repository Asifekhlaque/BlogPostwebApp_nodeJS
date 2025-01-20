const express = require('express'); // for making server
const app = express(); // creating express app
const path = require('path'); // for getting path
const port = 3000; // port number
const { v4: uuidv4 } = require('uuid'); // for generating unique id
const methodOverride = require('method-override'); // for updating the post content the reasion is form dont support patch, put and delete. It only support get and post request.
const { title } = require('process');

app.use(methodOverride('_method')) // using method override

app.use(express.urlencoded({ extended: true })); // for parsing form data to json for post request. Because the express dont know which type of data is coming.

app.set("view engine", "ejs"); // setting view engine
app.set("views", path.join(__dirname, "views")); // setting view path
app.use(express.static(path.join(__dirname, "public"))); // setting static path of public to serve static files like css, js , images or other files

// Dummy data
let posts = [
    {
        id: uuidv4(), // generating unique id
        username: "Arjun",
        title: "Exploring Space",
        short_content: "Space is fascinating!",
        content: "Space is fascinating! I love learning about stars, planets, and galaxies. It makes me dream of being an astronaut."
    },
    {
        id: uuidv4(),
        username: "Meera",
        title: "Healthy Living",
        short_content: "Eating healthy is essential.",
        content: "Eating healthy is essential. I recently started including more vegetables and fruits in my diet, and it has been life-changing!"
    },
    {
        id: uuidv4(),
        username: "Karan",
        title: "Travel Diaries",
        short_content: "I love traveling!",
        content: "I love traveling! Exploring new places and meeting new people is an amazing way to learn and grow as a person."
    },
    {
        id: uuidv4(),
        username: "Priya",
        title: "The Joy of Reading",
        short_content: "Books are my escape.",
        content: "Books are my escape. They allow me to explore new worlds, live different lives, and gain knowledge about everything under the sun."
    },
    {
        id: uuidv4(),
        username: "Vikram",
        title: "Tech Enthusiast",
        short_content: "Technology is the future.",
        content: "Technology is the future, and I love being part of it. From coding to AI, I enjoy exploring how tech can solve real-world problems."
    }

]

// All posts view route
app.get("/posts", (req, res) => {
    res.render("index", { posts });
});
// New post view route
app.get("/posts/new", (req, res) => {
    res.render("new");
});
// Create new post
app.post("/posts", (req, res) => {
    console.log(req.body);
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, short_content, title, content }); // Adding new post
    console.log("post created");
    res.redirect("/posts");
});

// View Route for individual post
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    console.log(id);
    let post = posts.find((p) => p.id == id);
    console.log("Request for post with id " + id);
    res.render("show", { post });
})

// Update post
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newTitle = req.body.title;
    let newShortContent = req.body.short_content;
    let newContent = req.body.content;
    console.log(newContent);
    console.log(newShortContent);
    console.log(newTitle);
    console.log(id);
    let post = posts.find((p) => p.id == id); // finding the post
    post.content = newContent;
    post.short_content = newShortContent;
    post.title = newTitle;
    console.log(post);
    console.log("update post with id ");
    res.redirect("/posts");
})

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id == id);
    res.render("edit", { post });
})

// Delete post
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => p.id != id);
    console.log("deleted post with id " + id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});