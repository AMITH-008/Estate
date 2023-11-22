import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

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

const hashPassword = (password) => {
    const hashed = bcryptjs.hashSync(password, 10);
    return hashed;
}