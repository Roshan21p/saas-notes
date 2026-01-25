import { User } from "../models/user";
import { AppError } from "../utils/AppError";
import { createJWT } from "../utils/authUtils";
import bcrypt from "bcrypt";

import { verifyToken } from "../utils/verifyToken";
import { Tenant } from "../models/tenant";

interface AcceptInviteInput {
  token: string;
  password: string;
}

export const loginService = async (data: {
  email: string;
  password: string;
  slug: string;
}) => {
  try {
    const { email, password, slug } = data;

    //1. check whether the data missing or not
    if (!email || !password || !slug) {
      throw new AppError(400, "Email, password and slug required");
    }

    const tenant = await Tenant.findOne({ slug });
    if (!tenant) throw new AppError(404, "Tenant not found");

    //2. Check if there is a registered user with the given email
    const user = await User.findOne({ email, tenantId: tenant._id });

    if (!user) {
      throw new AppError(404, "No registered user found with this email");
    }

    //3. Match the incoming password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new AppError(400, "Invalid password, please try again");
    }

    //4. Create JWT
    const token = createJWT({
      id: user._id,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
    });

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      tenantId: user.tenantId,
      token,
    };
  } catch (error) {
    console.log("Auth service error", error);
    throw error;
  }
};

export const acceptInviteService = async ({
  token,
  password,
}: AcceptInviteInput) => {
  try {
    if (!token) {
      throw new AppError(400, "Invite token is required.");
    }
    if (!password) {
      throw new AppError(400, "Password is required.");
    }

    let payload: any;

    payload = verifyToken(token);

    const user = await User.findById(payload.id);

    if (!user) {
      throw new AppError(404, "User not found.");
    }

    if (!user.isInvited) {
      throw new AppError(400, "Invite already accepted.");
    }

    user.password = password;
    user.isInvited = false; // mark as accepted
    await user.save();
  } catch (error) {
    throw error;
  }
};
