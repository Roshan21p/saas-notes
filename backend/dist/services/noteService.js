"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteByIdService = exports.updateNoteByIdService = exports.getNoteByIdService = exports.listMyNotesService = exports.listNotesService = exports.createNoteService = void 0;
const note_1 = require("../models/note");
const tenant_1 = require("../models/tenant");
const AppError_1 = require("../utils/AppError");
const createNoteService = async (data, user) => {
    try {
        const { title, content } = data || {}; // Prevent destructure error
        const { userId, tenantId } = user;
        // Check whether the required field is present or not
        if (!title || title.trim() === "") {
            throw new AppError_1.AppError(400, "Title is required and cannot be empty.");
        }
        if (!content || content.trim() === "") {
            throw new AppError_1.AppError(400, "Content is required and cannot be empty.");
        }
        // Get tenant details (plan + note limit)
        const tenant = await tenant_1.Tenant.findById(tenantId);
        if (!tenant) {
            throw new AppError_1.AppError(404, "Tenant not found.");
        }
        // Count existing notes for this tenant (company)
        const noteCount = await note_1.Note.countDocuments({ tenantId });
        // Enforce plan-based note limit
        if (tenant.plan === "free" && noteCount >= tenant.noteLimit) {
            throw new AppError_1.AppError(400, `Note limit reached for '${tenant.name}'. Upgrade your plan to create more notes.`);
        }
        // Create the note
        const note = await note_1.Note.create({
            title,
            content,
            userId,
            tenantId,
        });
        if (!note) {
            throw new AppError_1.AppError(500, "Not able to create a note");
        }
        return note;
    }
    catch (error) {
        throw error;
    }
};
exports.createNoteService = createNoteService;
const listNotesService = async (user) => {
    try {
        const { userId, tenantId, role } = user || {}; // Prevent destructure error
        if (role === "Member") {
            throw new AppError_1.AppError(403, "Member is not allowed to see all the notes");
        }
        const notes = await note_1.Note.find({ tenantId })
            .sort({ createdAt: -1 })
            .populate("userId", "-password");
        return notes;
    }
    catch (error) {
        throw error;
    }
};
exports.listNotesService = listNotesService;
const listMyNotesService = async (user) => {
    try {
        const { userId, tenantId } = user || {}; // Prevent destructure error
        const notes = await note_1.Note.find({ tenantId, userId }).sort({ createdAt: -1 });
        return notes;
    }
    catch (error) {
        throw error;
    }
};
exports.listMyNotesService = listMyNotesService;
const getNoteByIdService = async (noteId, user) => {
    try {
        const { userId, tenantId, role } = user || {}; // Prevent destructure error
        if (!noteId) {
            throw new AppError_1.AppError(400, "Note Id is required.");
        }
        const note = await note_1.Note.findOne({ _id: noteId, tenantId }).populate("userId", "-password");
        if (!note) {
            throw new AppError_1.AppError(404, "Note not found.");
        }
        if (role === "Member") {
            if (note.userId.toString() !== userId) {
                throw new AppError_1.AppError(403, "You are not allowed to access this note.");
            }
        }
        return note;
    }
    catch (error) {
        throw error;
    }
};
exports.getNoteByIdService = getNoteByIdService;
//Partial is a TypeScript utility type that makes all properties optional.
const updateNoteByIdService = async (noteId, user, payload) => {
    try {
        const { userId, tenantId, role } = user || {}; // Prevent destructure error
        const title = payload?.title;
        const content = payload?.content;
        if (!noteId) {
            throw new AppError_1.AppError(400, "Note Id is required.");
        }
        if (!title && !content) {
            throw new AppError_1.AppError(400, "At least one field (title or content) is required.");
        }
        // Fetch note with tenant isolation
        const note = await note_1.Note.findOne({ _id: noteId, tenantId });
        if (!note) {
            throw new AppError_1.AppError(404, "Note not found.");
        }
        // Apply updates
        if (role === "Member" && note.userId.toString() !== userId) {
            throw new AppError_1.AppError(403, "You are not allowed to update this note.");
        }
        // Apply updates
        if (title !== undefined)
            note.title = title;
        if (content !== undefined)
            note.content = content;
        await note.save();
        return {
            id: note._id,
            ...(title !== undefined && { title: note.title }),
            ...(content !== undefined && { content: note.content }),
            updatedAt: note.updatedAt,
        };
    }
    catch (error) {
        throw error;
    }
};
exports.updateNoteByIdService = updateNoteByIdService;
const deleteNoteByIdService = async (noteId, user) => {
    try {
        const { userId, tenantId, role } = user || {};
        if (!noteId) {
            throw new AppError_1.AppError(400, "Note ID is required.");
        }
        // Fetch note with tenant isolation
        const note = await note_1.Note.findOne({ _id: noteId, tenantId });
        if (!note) {
            throw new AppError_1.AppError(404, "Note not found.");
        }
        // Member can delete only own notes
        if (role === "Member" && note.userId.toString() !== userId) {
            throw new AppError_1.AppError(403, "You are not allowed to delete this note.");
        }
        await note.deleteOne();
        return note;
    }
    catch (error) {
        throw error;
    }
};
exports.deleteNoteByIdService = deleteNoteByIdService;
//# sourceMappingURL=noteService.js.map