import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res)=> {
    try{
        const { username, email, password } = req.body;

        if(!username || !email || !password){
            return res.status(400).json({ message: "All fields are required."});
        }

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists. "});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            userId: user._id
        });
    }
    catch (error) {
        res.status(500).json({ message: "error.message"});
    }
};
