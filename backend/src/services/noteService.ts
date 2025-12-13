import { log } from "console";
import { Note } from "../models/note";
import { Tenant } from "../models/tenant";
import { AppError } from "../utils/AppError";

interface noteInput {
  title: string;
  content: string;
}

interface userData {
  userId: string;
  email: string;
  role: "Admin" | "Member";
  tenantId: string;
}

export const createNoteService = async (data: noteInput, user: userData) => {
  try {
    const { title, content } = data || {}; // Prevent destructure error
    const { userId, tenantId } = user;

    // Check whether the required field is present or not
    if (!title || title.trim() === "") {
      throw new AppError(400, "Title is required and cannot be empty.");
    }

    if (!content || content.trim() === "") {
      throw new AppError(400, "Content is required and cannot be empty.");
    }

    // Get tenant details (plan + note limit)
    const tenant = await Tenant.findById(tenantId);

    if (!tenant) {
      throw new AppError(404, "Tenant not found.");
    }

    // Count existing notes for this tenant (company)
    const noteCount = await Note.countDocuments({ tenantId });

    // Enforce plan-based note limit
    if (noteCount >= tenant.noteLimit) {
      throw new AppError(
        400,
        `Note limit reached for '${tenant.name}'. Upgrade your plan to create more notes.`
      );
    }

    // Create the note
    const note = await Note.create({
      title,
      content,
      userId,
      tenantId,
    });

    if (!note) {
      throw new AppError(500, "Not able to create a note");
    }

    return note;
  } catch (error) {
    throw error;
  }
};

export const listNotesService = async (user: userData) => {
  try {
    const { userId, tenantId, role } = user || {}; // Prevent destructure error

    if (role === "Member") {
      throw new AppError(403, "Member is not allowed to see all the notes");
    }

    const notes = await Note.find({ tenantId })
      .sort({ createdAt: -1 })
      .populate("userId", "-password");

    if (!notes) {
      throw new AppError(500, "Not able to fetch all the notes");
    }

    return notes;
  } catch (error) {
    throw error;
  }
};

export const getNoteByIdService = async (
  noteId: string | undefined,
  user: userData
) => {
  try {
    const { userId, tenantId, role } = user || {}; // Prevent destructure error

    if (!noteId) {
      throw new AppError(400, "Note Id is required.");
    }

    const note = await Note.findOne({ _id: noteId, tenantId }).populate(
      "userId",
      "-password"
    );

    if (!note) {
      throw new AppError(404, "Note not found.");
    }

    if (role === "Member") {
      if (note.userId._id.toString() !== userId) {
        throw new AppError(403, "You are not allowed to access this note.");
      }
    }

    return note;
  } catch (error) {
    throw error;
  }
};

//Partial is a TypeScript utility type that makes all properties optional.
export const updateNoteByIdService = async (
  noteId: string | undefined,
  user: userData,
  payload: Partial<noteInput>
) => {
  try {
    const { userId, tenantId, role } = user || {}; // Prevent destructure error

    const title = payload?.title;
    const content = payload?.content;

    if (!noteId) {
      throw new AppError(400, "Note Id is required.");
    }

    if (!title && !content) {
      throw new AppError(
        400,
        "At least one field (title or content) is required."
      );
    }

    // Fetch note with tenant isolation
    const note = await Note.findOne({ _id: noteId, tenantId }).populate(
      "userId",
      "-password"
    );

    if (!note) {
      throw new AppError(404, "Note not found.");
    }

    // Apply updates
    if (role === "Member" && note.userId._id.toString() !== userId) {
      throw new AppError(403, "You are not allowed to update this note.");
    }

    // Apply updates
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;

    await note.save();

    return {
      id: note._id,
      ...(title !== undefined && { title: note.title }),
      ...(content !== undefined && { content: note.content }),
      updatedAt: note.updatedAt,
    };
  } catch (error) {
    throw error;
  }
};
