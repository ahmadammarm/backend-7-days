import { NextFunction, Request, Response } from "express";
import db from "../db";

const GetAllProducts = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.user?.id;

        if (!userId) {
            return response.status(401).json({ error: "Unauthorized" });
        }

        const products = await db.query('SELECT * FROM products WHERE user_id = $1', [userId]);

        response.status(200).json({
            code: 200,
            success: true,
            message: 'Products retrieved successfully',
            data: products.rows,
        });
        
    } catch (error: any) {
        next(error);
    }
}

export { GetAllProducts };