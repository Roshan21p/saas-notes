import { User } from "../models/user";
import { AppError } from "../utils/AppError";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/authUtils";

export const loginService = async (data: {email: string; password: string }) => {
   try {
     const { email, password } = data;

    //1. check whether the data missing or not
    if(!email || !password){
         throw new AppError(400, "Email and password required");
    }

    //2. Check if there is a registered user with the given email
    const user = await User.findOne({ email });

    if(!user) {
        throw new AppError(404, "No registered user found with this email");
    }

    //3. Match the incoming password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new AppError(400,"Invalid password, please try again")
    }

    //4. Create JWT
    const token = createJWT({
        id: user._id, 
        email: user.email,

    });

    return {
        _id: user._id,
        name : user.name,
        email: user.email,
        role: user.role,
        tenantId: user.tenantId,
        token
    }
   } catch (error) {
    console.log("Auth service error", error);
    throw error;
   }

} 