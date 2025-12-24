import apiClient from "@/config/axiosConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface CreateNotePayload {
  title: string;
  content: string;
}

interface Note {
  _id: string;
  title: string;
  content: string;
  tenantId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

// Redux state type
interface NoteState {
  note: Note[];
  isLoading: boolean;
}

// API response structure
interface CreateNoteResponse {
  success: boolean;
  message: string;
  data: Note;
}



const initialState: NoteState = {
  note: [] ,
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

const NoteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        //state.note = [action.payload.data];   // one way not recommended
        state.note.push(action.payload.data);  

      })
      .addCase(createNote.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default NoteSlice.reducer;
