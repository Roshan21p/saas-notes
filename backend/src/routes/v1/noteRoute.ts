import { Router } from "express";
import {
  createNoteController,
  deleteNoteByIdController,
  getNoteByIdController,
  listMyNotesController,
  listNotesController,
  updateNoteByIdController,
} from "../../controllers/noteController";
import { requireAuth } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/", requireAuth, createNoteController);

router.get("/", requireAuth, listNotesController);

router.get("/me", requireAuth, listMyNotesController);

router.get("/:id", requireAuth, getNoteByIdController);

router.patch("/:id", requireAuth, updateNoteByIdController);

router.delete("/:id", requireAuth, deleteNoteByIdController);


export default router;
