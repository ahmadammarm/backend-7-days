import express from "express";
import dotenv from "dotenv";
import UserRouter from "./routes/UserRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import ProductRouter from "./routes/ProductRoutes";
import GeminiRoute from "./routes/GeminiRoutes";

dotenv.config();


const app = express();

app.use(express.json());

const port = process.env.PORT;

app.get("/", (_, res) => {
    res.json({ message: "Hello, World!" });
});

// user manajemen routes
app.use("/api/v1/", UserRouter);

// auth user routes
app.use("/api/v1/auth", AuthRoutes);

// product manajemen routes
app.use("/api/v1/", ProductRouter);

app.use("/api/v1/", GeminiRoute);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

