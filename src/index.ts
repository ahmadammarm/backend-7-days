import express from "express";
import dotenv from "dotenv";
import UserRouter from "./routes/UserRoutes";

dotenv.config();


const app = express();

app.use(express.json());

const port = process.env.PORT;

app.get("/", (_, res) => {
    res.json({ message: "Hello, World!" });
});

// user routes
app.use("/api/v1/", UserRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

