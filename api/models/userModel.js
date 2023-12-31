import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true,
    },
    email: {
        type:String,
        required: true,
        unique: true,
    },
    password: {
        type:String,
        required: true,
    },
    profileImg:{
        type:String,
        default:"https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg "
    }
}, 
{
    timestamps: true
} 
);

const User = mongoose.model('User', userSchema);

export default User;