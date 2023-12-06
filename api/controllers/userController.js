import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';



export const updateUser = async (request, response, next) => {
    console.log(request.user.id);
    console.log(request.params.id);
    if (request.user.id != request.params.id) {
        return next(errorHandler(401, "You can update only your account!!"));
    }
    try{
        if (request.body.password) {
            request.body.password = bcryptjs.hashSync(request.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(request.params.id,  {
            $set: {
                username: request.body.username,
                email : request.body.email,
                password: request.body.password,
                profileImg : request.body.profileImg
            }

        }, {new:true} );
        const {password, ...rest } = updatedUser._doc;
        response.status(200).json(rest);
    }catch(error) {
        next(error);
    }
}

export const deleteUser = async (request,response, next) => {
    if (request.user.id != request.params.id) {
        return next(errorHandler(401, "You can only delete your account"));
    }
    try {
        await User.findByIdAndDelete(request.params.id);
        response.status(200).json('User has been deleted successfully');
    }catch (error) {
        next(error);
    }
}