import { NextFunction, Response } from "express";
import db from "../db";

const GetAllProducts = async (_: any, response: Response, next: NextFunction) => {
    try {
        const products = await db.query('SELECT * FROM products');
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