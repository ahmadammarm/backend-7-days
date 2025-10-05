import express from "express";

const app = express();

const port = 3000;

app.get("/", (_, res) => {
    res.json({ message: "Hello, World!" });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});