import { Router } from "express";
import { CreateUser, DeleteAnUserById, EditAnUserById, GetAllUsers, GetAnUserById } from "../controllers/UserController";

const UserRouter = Router();


UserRouter.get("/users", GetAllUsers);
UserRouter.post("/users", CreateUser);
UserRouter.get("/user/:id", GetAnUserById);
UserRouter.put("/user/:id", EditAnUserById);
UserRouter.delete("/user/:id", DeleteAnUserById);


export default UserRouter;