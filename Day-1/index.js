const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const port = 3000;

// Serve the homepage
app.get("/", (req, res) => {
    fs.readdir("files", (err, files) => {
        if (err) {
            console.error("Error reading directory:", err);
            return res.status(500).send("Error reading directory");
        }
        console.log(files);
        res.render("create", { files }); // Pass files to EJS template
    });
});

// Handle file creation
app.post("/create", (req, res) => {
    const { name, data } = req.body;

    if (!name || !data) {
        return res.status(400).send("Both name and data are required!");
    }

    const filePath = path.join(__dirname, "files", `${name}.txt`);

    fs.writeFile(filePath, data, (err) => {
        if (err) {
            console.error("Error creating file:", err);
            return res.status(500).send("Failed to create file");
        }
        console.log("File Created:", filePath);
        res.redirect("/");
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
