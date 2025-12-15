"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteByIdController = exports.updateNoteByIdController = exports.getNoteByIdController = exports.listMyNotesController = exports.listNotesController = exports.createNoteController = void 0;
const noteService_1 = require("../services/noteService");
const AppError_1 = require("../utils/AppError");
const createNoteController = async (req, res, next) => {
    try {
        if (!req.user) {
            return next(new AppError_1.AppError(401, "Authentication required. Please log in."));
        }
        const response = await (0, noteService_1.createNoteService)(req.body, req.user);
        return res.status(201).json({
            success: true,
            message: "Note created successfully",
            data: response,
        });
    }
    catch (error) {
        console.log("Create Note Controller error:", error);
        next(error);
    }
};
exports.createNoteController = createNoteController;
const listNotesController = async (req, res, next) => {
    try {
        if (!req.user) {
            return next(new AppError_1.AppError(401, "Authentication required. Please log in."));
        }
        const response = await (0, noteService_1.listNotesService)(req.user);
        return res.status(200).json({
            success: true,
            message: "Successfully fetch all the notes.",
            data: response,
        });
    }
    catch (error) {
        console.log("List Notes Controller error", error);
        next(error);
    }
};
exports.listNotesController = listNotesController;
const listMyNotesController = async (req, res, next) => {
    try {
        if (!req.user) {
            return next(new AppError_1.AppError(401, "Authentication required. Please log in."));
        }
        const response = await (0, noteService_1.listMyNotesService)(req.user);
        return res.status(200).json({
            success: true,
            message: "Your notes fetched successfully.",
            data: response,
        });
    }
    catch (error) {
        console.log("List my Notes Controller error", error);
        next(error);
    }
};
exports.listMyNotesController = listMyNotesController;
const getNoteByIdController = async (req, res, next) => {
    try {
        if (!req.user) {
            return next(new AppError_1.AppError(401, "Authentication is required. Please log in."));
        }
        const response = await (0, noteService_1.getNoteByIdService)(req.params.id, req.user);
        return res.status(200).json({
            success: true,
            message: "Successfully fetch the note by ID",
            data: response,
        });
    }
    catch (error) {
        console.log("Get Notes By ID Controller error", error);
        next(error);
    }
};
exports.getNoteByIdController = getNoteByIdController;
const updateNoteByIdController = async (req, res, next) => {
    try {
        if (!req.user) {
            return next(new AppError_1.AppError(401, "Authentication is required. Please log in."));
        }
        const response = await (0, noteService_1.updateNoteByIdService)(req.params.id, req.user, req.body);
        return res.status(200).json({
            success: true,
            message: "Note updated successfully.",
            data: response,
        });
    }
    catch (error) {
        console.log("Update Notes By ID Controller error", error);
        next(error);
    }
};
exports.updateNoteByIdController = updateNoteByIdController;
const deleteNoteByIdController = async (req, res, next) => {
    try {
        if (!req.user) {
            return next(new AppError_1.AppError(401, "Authentication required. Please log in."));
        }
        const response = await (0, noteService_1.deleteNoteByIdService)(req.params.id, req.user);
        return res.status(200).json({
            success: true,
            message: "Note deleted successfully",
            data: response
        });
    }
    catch (error) {
        console.error("Delete Note Controller error:", error);
        next(error);
    }
};
exports.deleteNoteByIdController = deleteNoteByIdController;
//# sourceMappingURL=noteController.js.map