import express from "express";
import dotenv from "dotenv";
import db from "./db";
import { Request, Response } from "express";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.get("/", (_, res) => {
    res.json({ message: "Hello, World!" });
});


const getAllUsers = async (_: Request, response: Response) => {
    try {
        const result = await db.query("SELECT * FROM users");
        response.status(200).json(result.rows);
    } catch (error: any) {
        console.error("Error fetching users:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
}

app.get("/users", getAllUsers);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

