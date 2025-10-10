import { Request, Response } from "express";
import db from "../db";

const GetAllUsers = async (_: Request, response: Response) => {
    try {
        const users = await db.query("SELECT * FROM users");
        return response.status(200).json({
            code: 200,
            success: true,
            message: "Users retrieved successfully",
            data: users.rows,
        });
    } catch (error: any) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}



const CreateUser = async (request: Request, response: Response) => {
    try {
        const { name, email, password } = request.body;
        const newUser = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, password]
        );
        return response.status(201).json(newUser.rows[0]);
    } catch (error: any) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}



const GetAnUserById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        if (user.rows.length === 0) {
            return response.status(404).json({ error: "User not found" });
        }
        return response.status(200).json(user.rows[0]);
    } catch (error: any) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}



const EditAnUserById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const { name, email } = request.body;
        const updatedUser = await db.query(
            "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
            [name, email, id]
        );
        if (updatedUser.rows.length === 0) {
            return response.status(404).json({ error: "User not found" });
        }
        return response.status(200).json(updatedUser.rows[0]);
    } catch (error: any) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}



const DeleteAnUserById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params;
        const deletedUser = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        if (deletedUser.rows.length === 0) {
            return response.status(404).json({ error: "User not found" });
        }
        return response.status(200).json({ message: "User deleted successfully" });
    } catch (error: any) {
        return response.status(500).json({ error: "Internal Server Error" });
    }
}



export { GetAllUsers, CreateUser, GetAnUserById, EditAnUserById, DeleteAnUserById };