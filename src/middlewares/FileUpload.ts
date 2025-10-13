import multer from 'multer';
import path from 'path';
import GenerateCode from '../lib/GenerateCode';
import { Request } from 'express';

const storage = multer.diskStorage({
    destination: (request: Request, file: Express.Multer.File, callback) => {
        callback(null, './src/uploads');
    },
    filename: (request, file, callback) => {
        const originalName = file.originalname;
        const extension = path.extname(originalName);
        const fileName = originalName.replace(extension, '');
        const compressedFileName = fileName.split(' ').join('_');
        const lowerCaseFileName = compressedFileName.toLocaleLowerCase();
        const code = GenerateCode(12);
        const finalFile = `${lowerCaseFileName}_${code}${extension}`;

        callback(null, finalFile);
    },
});

const FileUpload = multer({
    storage,
    fileFilter: (request, file, callback) => {
        const mimetype = file.mimetype;
        if (
            mimetype === 'image/png' ||
            mimetype === 'image/jpg' ||
            mimetype === 'image/jpeg'
        ) {
            callback(null, true);
        } else {
            callback(new Error('Invalid file type. Only PNG, JPG and JPEG are allowed.'));
        }
    },
});

export default FileUpload;