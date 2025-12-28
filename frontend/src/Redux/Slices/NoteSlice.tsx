import apiClient from "@/config/axiosConfig";
import type { Note } from "@/types/note";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface CreateNotePayload {
  title: string;
  content: string;
}

interface UpdateNotePayload {
  id: string;
  title: string;
  content: string;
}

// Redux state type
interface NoteState {
  notes: Note[];
  isLoading: boolean;
}

// API response structure
interface CreateNoteResponse {
  success: boolean;
  message: string;
  data: Note;
}

interface FetchNoteResponse {
  success: boolean;
  message: string;
  data: Note[];
}

interface UpdateNoteResponse {
  success: boolean;
  message: string;
  data: Note;
}

interface DeleteNoteResponse {
  success: boolean;
  message: string;
  data: { _id: string };
}

const initialState: NoteState = {
  notes: [],
  isLoading: false,
};

export const createNote = createAsyncThunk<
  CreateNoteResponse,
  CreateNotePayload,
  { rejectValue: string }
>("notes/create", async (noteData, { rejectWithValue }) => {
  try {
    const response = apiClient.post("/notes", noteData);

    toast.promise(response, {
      loading: "Creating note...",
      success: (resolvedPromise) => {
        return resolvedPromise?.data?.message;
      },
      error: (error) => {
        return error?.response?.data?.message || error?.message;
      },
    });

    const apiResponse = await response;
    return apiResponse.data;
  } catch (error: any) {
    console.log("Create note error", error);
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const fetchMyNotes = createAsyncThunk<
  FetchNoteResponse,
  void,
  { rejectValue: string }
>("/notes/me", async (_, { rejectWithValue }) => {
  try {
    const response = apiClient.get("/notes/me");
    toast.promise(response, {
      loading: "Fetching the notes...",
      success: (resolvedPromise) => {
        return resolvedPromise?.data?.message;
      },
      error: (error) => {
        return error?.response?.data?.messsage || error?.message;
      },
    });
    const apiResponse = await response;
    return apiResponse.data;
  } catch (error: any) {
    console.log("Failed to fetch the notes.", error);
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const updateMyNotes = createAsyncThunk<
  UpdateNoteResponse,
  UpdateNotePayload,
  { rejectValue: string }
>("/notes/id", async ({ id, title, content }, { rejectWithValue }) => {
  try {
    const response = apiClient.patch(`/notes/${id}`, { title, content });
    toast.promise(response, {
      loading: "Updating the notes...",
      success: (resolvedPromise) => {
        return resolvedPromise?.data?.message;
      },
      error: (error) => {
        return error?.response?.data?.messsage || error?.message;
      },
    });
    const apiResponse = await response;
    return apiResponse.data;
  } catch (error: any) {
    console.log("Failed to updates the notes.", error);
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const deleteNote = createAsyncThunk<
  DeleteNoteResponse,
  string,
  { rejectValue: string }
>("/notes/delete", async (id, { rejectWithValue }) => {
  try {
    const response = apiClient.delete(`/notes/${id}`);

    toast.promise(response, {
      loading: "Deleting the note...",
      success: (resolvedPromise) => {
        return resolvedPromise?.data?.message;
      },
      error: (error) => {
        return error?.response?.data?.messsage || error?.message;
      },
    });
    const apiResponse = await response;
    return apiResponse.data;
  } catch (error: any) {
    console.log("Failed to delete the note", error);
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

/*   Admin    */
export const fetchAllNotesAdmin = createAsyncThunk<
  FetchNoteResponse,
  void,
  { rejectValue: string }
>("/notes", async (_, { rejectWithValue }) => {
  try {
    const response = apiClient.get("/notes");
    toast.promise(response, {
      loading: "Fetching the notes...",
      success: (resolvedPromise) => {
        return resolvedPromise?.data?.message;
      },
      error: (error) => {
        return error?.response?.data?.messsage || error?.message;
      },
    });
    const apiResponse = await response;
    return apiResponse.data;
  } catch (error: any) {
    console.log("Failed to fetch the notes.", error);
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const NoteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    clearNotes: (state) => {
      state.notes = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create note case
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        //state.note = [action.payload.data];   // one way not recommended
        state.notes.unshift(action.payload.data);
      })
      .addCase(createNote.rejected, (state) => {
        state.isLoading = false;
      })

      // fetch My notes case
      .addCase(fetchMyNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMyNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = action.payload.data;
      })
      .addCase(fetchMyNotes.rejected, (state) => {
        state.isLoading = false;
      })

      // update note case
      .addCase(updateMyNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMyNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        // Replace existing note with updated one
        const updatedNote = action.payload.data;
        const index = state.notes.findIndex(
          (note) => note._id === updatedNote._id
        );
        if (index !== -1) {
          state.notes[index] = updatedNote;
        }
      })
      .addCase(updateMyNotes.rejected, (state) => {
        state.isLoading = false;
      })

      // delete note case
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notes = state.notes.filter(
          (note) => note._id !== action.payload.data._id
        );
      })
      .addCase(deleteNote.rejected, (state) => {
        state.isLoading = false;
      })

      // fetch All notes case
      .addCase(fetchAllNotesAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllNotesAdmin.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.notes = action.payload.data;
      })
      .addCase(fetchAllNotesAdmin.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearNotes } = NoteSlice.actions;

export default NoteSlice.reducer;
