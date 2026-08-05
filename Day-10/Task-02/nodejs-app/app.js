const express = require("express");

const app = express();

const PORT = 3000;


app.get("/", (req, res) => {
    res.send("Node.js app running using Docker CI");
});


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});