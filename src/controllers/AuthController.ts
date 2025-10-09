import { NextFunction, Request, Response } from "express";
import db from "../db";
import HashPassword from "../lib/HashPassword";
import GenerateToken from "../lib/GenerateToken";
import ComparePassword from "../lib/ComparePassword";

const SignupController = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { name, email, password } = request.body;

        const isEmailExist = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (isEmailExist.rows.length > 0) {
            return response.status(400).json({ error: "Email already exists" });
        }

        const hashedaPassword = await HashPassword(password);

        const newUser = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, hashedaPassword]
        );

        return response.status(201).json(newUser.rows[0]);

    } catch (error: any) {
        next(error);
    }
}

const SigninController = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { email, password } = request.body;

        const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return response.status(400).json({ error: "Invalid email or password" });
        }

        const isPasswordValid = await ComparePassword(password, user.rows[0].password);

        if (!isPasswordValid) {
            return response.status(400).json({ error: "Invalid email or password" });
        }

        const token = GenerateToken(user.rows[0]);

        return response.status(200).json({ token });
    } catch (error: any) {
        next(error);
    }
}

export { SignupController, SigninController };