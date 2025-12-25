import apiClient from "@/config/axiosConfig";
import type { Note } from "@/types/note";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface CreateNotePayload {
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



const initialState: NoteState = {
  notes: [] ,
  isLoading: false,
};

export const createNote = createAsyncThunk<CreateNoteResponse, CreateNotePayload, { rejectValue: string}>(
  "notes/create",
  async (noteData, { rejectWithValue }) => {
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
  }
);

export const fetchMyNotes = createAsyncThunk('/notes/me', async (_, { rejectWithValue }) => {
  try {
    const response = apiClient.get('/notes/me');
    toast.promise(response,  {
      loading : "Fetching the notes...",
      success: (resolvedPromise) => {
        return resolvedPromise?.data?.message;
      },
      error: (error) => {
        return error?.response?.data?.messsage || error?.message;
      },
    })
    const apiResponse = await response;
    return apiResponse.data;

  } catch (error: any) {
    console.log("Failed to fetch the notes.", error);
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
})

const NoteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    clearNotes : (state) => {
      state.notes = [];
    }
  },
  extraReducers: (builder) => {
    builder
    // Create note builder case
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


        // fetch notes builder case
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
  },
});

export const { clearNotes } = NoteSlice.actions;

export default NoteSlice.reducer;
