import { Router } from "express";
import { createNoteController } from "../../controllers/noteController";
import { requireAuth } from "../../middlewares/authMiddleware";

const router = Router();

router.post('/', requireAuth, createNoteController);

export default router;