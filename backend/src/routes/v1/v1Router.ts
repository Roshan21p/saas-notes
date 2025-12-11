import { Router } from "express";
import authRouter from "./authRoute"
import noteRouter from "./noteRoute"


const router = Router();

router.use('/auth', authRouter);

router.use('/note', noteRouter);

export default router;