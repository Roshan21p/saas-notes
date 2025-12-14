import { Router } from "express";
import { acceptInviteController, loginController } from "../../controllers/authController";

const router = Router();

router.post("/login", loginController);

router.post("/accept-invite", acceptInviteController );


export default router;
