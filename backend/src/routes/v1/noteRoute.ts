import { Router } from "express";
import { createNoteController, listNotesController } from "../../controllers/noteController";
import { requireAuth } from "../../middlewares/authMiddleware";

const router = Router();

router.post('/', requireAuth, createNoteController);

router.get('/', requireAuth, listNotesController);


export default router;