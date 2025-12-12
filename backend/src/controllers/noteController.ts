import { Request, Response, NextFunction } from "express";
import { createNoteService, getNoteByIdService, listNotesService } from "../services/noteService";
import { AppError } from "../utils/AppError";

export const createNoteController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.user){
            return next(
                new AppError(401, "Authentication required. Please log in.")
            );
        }
        const response = await createNoteService(req.body, req.user);

        return res
                .status(201)
                .json({
                    success: true,
                    message: "Note created successfully",
                    data: response
                })
    } catch (error) {
        console.log("Create Note Controller error:", error);
        next(error);
    }
}

export const listNotesController  = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.user){
            return next(new AppError(401, "Authentication required. Please log in."));
        }

        const response = await listNotesService(req.user);

        return res
                .status(200)
                .json({
                    success: true,
                    message: "Successfully fetch all the notes.",
                    data: response
                })
    } catch (error) {
        console.log("List Notes Controller error",error);
        next(error);
    }
}

export const getNoteByIdController = async (req: Request, res: Response, next: NextFunction) => {
   try {
     if(!req.user){
        return next(new AppError(401,"Authentication is required. Please log in."));
     }

     const response = await getNoteByIdService(req.params.id,req.user);
     
     return res
              .status(200)
              .json({
                success: true,
                message: "Successfully fetch the note by ID",
                data: response
              })
   } catch (error) {
        console.log("Get Notes By ID Controller error",error);
        next(error);
   }
}