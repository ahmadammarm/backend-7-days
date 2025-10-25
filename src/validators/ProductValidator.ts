import { check } from "express-validator";

export const CreateProductValidator = [
    check('name').notEmpty().withMessage('Product name is required'),
    check('price').isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    check('image_url').optional().custom(async (value, { req }) => {
        if (req.file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(req.file.mimetype)) {
                throw new Error('Invalid image format. Allowed formats: JPEG, PNG, GIF');
            }
        }
        return true;
    }),
];


export const EditProductValidator = [
    check('name').optional().notEmpty().withMessage('Product name cannot be empty'),
    check('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a number greater than 0'),
    check('image_url').optional().custom(async (value, { req }) => {
        if (req.file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(req.file.mimetype)) {
                throw new Error('Invalid image format. Allowed formats: JPEG, PNG, GIF');
            }
        }
        return true;
    }),
];