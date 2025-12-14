import { Request, Response, NextFunction } from "express"
import { acceptInviteService, loginService } from "../services/authService";

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const response = await loginService(req.body);

        return res
            .status(200)
            .json({
                success: true,
                message: "Login sucessful",
                token: response.token,
                user: {
                     id: response._id,
                    email: response.email,
                    role: response.role,
                    tenantId: response.tenantId,
                    name: response.name
                }
            })
    } catch (error) {
        console.log(" Auth controller error: ", error);
        next(error);
    }
}

export const acceptInviteController = async (req: Request, res: Response, next: NextFunction) => {
    try {
         const response = await acceptInviteService(req.body);

    res.status(200).json({
      success: true,
      message: "Invite accepted successfully. You can now log in.",
      data: response,
    });
    } catch (error) {
        console.log(" Accept invite controller error: ", error);
        next(error);
    }
}