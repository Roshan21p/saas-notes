import { Router } from "express";
import authRouter from "./authRoute"
import noteRouter from "./noteRoute"
import tenantRouter from "./tenantRoute"


const router = Router();

router.use('/auth', authRouter);

router.use('/notes', noteRouter);

router.use('/tenants', tenantRouter);

export default router;