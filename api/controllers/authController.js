import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (request, response, next) => {
    console.log(request.body);
    var {username, email, password} = request.body;
    password = hashPassword(password);
    try{
        const newUser = new User({username, email, password});
        await newUser.save();
        response.status(200).json(newUser);    
    }catch (error) {
        next(error);
    }
    
}

export const signin = async (request, response, next) => {

    const {email, password} = request.body;
    try{
        const user = await User.findOne({email:email});

        if(!user) {
            const error = errorHandler(404, "User does not exist");
            return next(error);
        }
        const matched = await bcryptjs.compare(password, user.password);
    
        if(!matched) {
            const error = errorHandler(401, "Password doesn't match");
            return next(error);
        } 
        const {password: hashPassword, ...rest } = user._doc;
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        response.cookie('access_token', token, {httpOnly: true, expires: new Date(Date.now() + 900000)}).status(200).json(rest);
    }catch(e) {
        next(e);
    }

}

const hashPassword = (password) => {
    const hashed = bcryptjs.hashSync(password, 10);
    return hashed;
}