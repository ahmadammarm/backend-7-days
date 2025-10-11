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

const CreateProduct = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.user?.id;

        if (!userId) {
            return response.status(401).json({ error: "Unauthorized" });
        }

        const { name, price } = request.body;

        if (!name || !price) {
            return response.status(400).json({ error: "Name and price are required" });
        }

        const newProduct = await db.query(
            'INSERT INTO products (name, price, user_id) VALUES ($1, $2, $3) RETURNING *',
            [name, price, userId]
        );

        response.status(201).json({
            code: 201,
            success: true,
            message: 'Product created successfully',
            data: newProduct.rows[0],
        });
    } catch (error: any) {
        next(error);
    }
}

const GetProductById = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.user?.id;
        const productId = parseInt(request.params.id, 10);

        if (!userId) {
            return response.status(401).json({ error: "Unauthorized" });
        }

        if (isNaN(productId)) {
            return response.status(400).json({ error: "Invalid product ID" });
        }

        const product = await db.query(
            'SELECT * FROM products WHERE id = $1 AND user_id = $2',
            [productId, userId]
        );

        if (product.rows.length === 0) {
            return response.status(404).json({ error: "Product not found" });
        }

        response.status(200).json({
            code: 200,
            success: true,
            message: 'Product retrieved successfully',
            data: product.rows[0],
        });
    } catch (error: any) {
        next(error);
    }
}

const EditProductById = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.user?.id;
        const productId = parseInt(request.params.id, 10);
        const { name, price } = request.body;

        if (!userId) {
            return response.status(401).json({ error: "Unauthorized" });
        }

        if (isNaN(productId)) {
            return response.status(400).json({ error: "Invalid product ID" });
        }

        if (!name || !price) {
            return response.status(400).json({ error: "Name and price are required" });
        }
        const updatedProduct = await db.query(
            'UPDATE products SET name = $1, price = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
            [name, price, productId, userId]
        );

        if (updatedProduct.rows.length === 0) {
            return response.status(404).json({ error: "Product not found or not owned by user" });
        }

        response.status(200).json({
            code: 200,
            success: true,
            message: 'Product updated successfully',
            data: updatedProduct.rows[0],
        });
    } catch (error: any) {
        next(error);
    }
}

const DeleteProductById = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.user?.id;
        const productId = parseInt(request.params.id, 10);

        if (!userId) {
            return response.status(401).json({ error: "Unauthorized" });
        }

        if (isNaN(productId)) {
            return response.status(400).json({ error: "Invalid product ID" });
        }

        const deletedProduct = await db.query(
            'DELETE FROM products WHERE id = $1 AND user_id = $2 RETURNING *',
            [productId, userId]
        );

        if (deletedProduct.rows.length === 0) {
            return response.status(404).json({ error: "Product not found or not owned by user" });
        }

        response.status(200).json({
            code: 200,
            success: true,
            message: 'Product deleted successfully',
            data: deletedProduct.rows[0],
        });
    } catch (error: any) {
        next(error);
    }
}

export { GetAllProducts, CreateProduct, GetProductById, EditProductById, DeleteProductById };