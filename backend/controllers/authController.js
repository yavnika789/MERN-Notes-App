import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signupUser=async(req,res)=>{
    try{
        const{name,email,password}=req.body;
        //Check if user already exists
        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({msg:"User already exists"});
        }
        //Hash password
        const hashPassword=await bcrypt.hash(password,10);
        //Create new user
        const newUser=await User.create({
            name,
            email,
            password:hashPassword
        });
        res.status(201).json({msg:"User created successfully",user:newUser});
    }catch(error){
        res.status(500).json({msg:"Internal Server Error",error});
    }
}
