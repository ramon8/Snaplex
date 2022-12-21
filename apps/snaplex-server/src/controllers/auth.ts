import { Request, Response } from 'express'

import User, { IUser } from '../models/User'
import { signupValidation, signinValidation } from '../libs/joi'
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    // Validation
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).json(error.message);

    // Email Validation
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json('Email already exists');

    // Saving a new User
    try {
        const newUser: IUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        newUser.password = await newUser.encryptPassword(newUser.password);
        const savedUser = await newUser.save();

        //TODO: Apply .env
        const token: string = jwt.sign({ _id: savedUser._id }, 'snap' || '', {
        // const token: string = jwt.sign({ _id: savedUser._id }, process.env['TOKEN_SECRET'] || '', {
            expiresIn: 60 * 60 * 24
        });
        res.header('auth-token', token).json(token);
        // res.header('auth-token', token).json(savedUser);
        return
    } catch (e) {
        res.status(400).json(e);
        return 
    }
};

export const signin = async (req: Request, res: Response) => {
    const { error } = signinValidation(req.body);
    if (error) return res.status(400).json(error.message);
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json('Email or password is wrong');
    const correctPassword = await user.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).json('Invalid password');

    // Create a Token
    //TODO: Apply .env
    const token: string = jwt.sign({ _id: user._id }, 'snap' || '');

    // const token: string = jwt.sign({ _id: user._id }, process.env['TOKEN_SECRET'] || '');
    res.header('auth-token', token).json(token);
    return
};

export const profile = async (req: Request, res: Response) => {
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
        return res.status(404).json('No User found');
    }
    res.json(user);
    return
};