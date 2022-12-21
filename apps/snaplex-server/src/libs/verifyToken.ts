import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface IPayload {
    _id: string;
} 

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('token');
        if (!token) return res.status(401).json('Access Denied');

        const payload = jwt.verify(token, process.env['TOKEN_SECRET'] || '') as IPayload;
        req.userId = payload._id;
        next();
        return
    } catch (e) {
        res.status(400).send('Invalid Token');
        return
    }
}