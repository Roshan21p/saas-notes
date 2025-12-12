import { Router } from "express";
import { createNoteController, getNoteByIdController, listNotesController } from "../../controllers/noteController";
import { requireAuth } from "../../middlewares/authMiddleware";

const router = Router();

router.post('/', requireAuth, createNoteController);

router.get('/', requireAuth, listNotesController);

router.get('/:id', requireAuth, getNoteByIdController);



export default router;