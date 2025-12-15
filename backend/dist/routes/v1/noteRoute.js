"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const noteController_1 = require("../../controllers/noteController");
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post("/", authMiddleware_1.requireAuth, noteController_1.createNoteController);
router.get("/", authMiddleware_1.requireAuth, noteController_1.listNotesController);
router.get("/me", authMiddleware_1.requireAuth, noteController_1.listMyNotesController);
router.get("/:id", authMiddleware_1.requireAuth, noteController_1.getNoteByIdController);
router.patch("/:id", authMiddleware_1.requireAuth, noteController_1.updateNoteByIdController);
router.delete("/:id", authMiddleware_1.requireAuth, noteController_1.deleteNoteByIdController);
exports.default = router;
//# sourceMappingURL=noteRoute.js.map