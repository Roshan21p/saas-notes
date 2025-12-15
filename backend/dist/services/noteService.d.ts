interface noteInput {
    title: string;
    content: string;
}
export interface userData {
    userId: string;
    email: string;
    role: "Admin" | "Member";
    tenantId: string;
}
export declare const createNoteService: (data: noteInput, user: userData) => Promise<import("mongoose").Document<unknown, {}, import("../models/note").INote, {}, import("mongoose").DefaultSchemaOptions> & import("../models/note").INote & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const listNotesService: (user: userData) => Promise<(import("mongoose").Document<unknown, {}, import("../models/note").INote, {}, import("mongoose").DefaultSchemaOptions> & import("../models/note").INote & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
})[]>;
export declare const listMyNotesService: (user: userData) => Promise<(import("mongoose").Document<unknown, {}, import("../models/note").INote, {}, import("mongoose").DefaultSchemaOptions> & import("../models/note").INote & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
})[]>;
export declare const getNoteByIdService: (noteId: string | undefined, user: userData) => Promise<import("mongoose").Document<unknown, {}, import("../models/note").INote, {}, import("mongoose").DefaultSchemaOptions> & import("../models/note").INote & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export declare const updateNoteByIdService: (noteId: string | undefined, user: userData, payload: Partial<noteInput>) => Promise<{
    updatedAt: Date;
    content?: string;
    title?: string;
    id: import("mongoose").Types.ObjectId;
}>;
export declare const deleteNoteByIdService: (noteId: string | undefined, user: userData) => Promise<import("mongoose").Document<unknown, {}, import("../models/note").INote, {}, import("mongoose").DefaultSchemaOptions> & import("../models/note").INote & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export {};
//# sourceMappingURL=noteService.d.ts.map