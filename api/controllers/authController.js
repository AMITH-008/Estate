import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';

export const signup = async (request, response) => {
    console.log(request.body);
    var {username, email, password} = request.body;
    password = hashPassword(password);
    try{
        const newUser = new User({username, email, password});
        await newUser.save();
        response.status(200).json(newUser);    
    }catch (error) {
        response.status(500).json(error.message);
    }
    
}

const hashPassword = (password) => {
    const hashed = bcryptjs.hashSync(password, 10);
    return hashed;
}