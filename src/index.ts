import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.get("/", (_, res) => {
    res.json({ message: "Hello, World!" });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});