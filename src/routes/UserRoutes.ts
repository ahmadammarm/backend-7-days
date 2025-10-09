import { Router } from "express";
import { CreateUser, DeleteAnUserById, EditAnUserById, GetAllUsers, GetAnUserById } from "../controllers/UserController";
import IsAuthenticated from "../middlewares/IsAuthenticated";

const UserRouter = Router();


UserRouter.get("/users", IsAuthenticated, GetAllUsers);
UserRouter.post("/users", CreateUser);
UserRouter.get("/user/:id", IsAuthenticated, GetAnUserById);
UserRouter.put("/user/:id", IsAuthenticated, EditAnUserById);
UserRouter.delete("/user/:id", IsAuthenticated, DeleteAnUserById);


export default UserRouter;