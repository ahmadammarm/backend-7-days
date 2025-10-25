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

        let imageUrl = null;

        if (request.file) {
            imageUrl = `${request.protocol}://${request.get('host')}/uploads/${request.file.filename}`;
        }

        const newProduct = await db.query(
            'INSERT INTO products (name, price, user_id, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, userId, imageUrl]
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

        if (!userId) {
            return response.status(401).json({ error: "Unauthorized" });
        }

        if (isNaN(productId)) {
            return response.status(400).json({ error: "Invalid product ID" });
        }

        const { name, price } = request.body;
        let imageUrl = null;

        if (request.file) {
            imageUrl = `${request.protocol}://${request.get('host')}/uploads/${request.file.filename}`;
        }

        const existingProduct = await db.query(
            'SELECT * FROM products WHERE id = $1 AND user_id = $2',
            [productId, userId]
        );

        if (existingProduct.rows.length === 0) {
            return response.status(404).json({ error: "Product not found or not owned by user" });
        }

        const oldProduct = existingProduct.rows[0];

        const updatedName = name ?? oldProduct.name;
        const updatedPrice = price ?? oldProduct.price;
        const updatedImageUrl = imageUrl ?? oldProduct.image_url;

        const updatedProduct = await db.query(
            `UPDATE products
             SET name = $1, price = $2, image_url = $3, updated_at = NOW()
             WHERE id = $4 AND user_id = $5
             RETURNING *`,
            [updatedName, updatedPrice, updatedImageUrl, productId, userId]
        );

        response.status(200).json({
            code: 200,
            success: true,
            message: 'Product updated successfully',
            data: updatedProduct.rows[0],
        });

    } catch (error: any) {
        next(error);
    }
};

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