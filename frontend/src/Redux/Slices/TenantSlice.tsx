import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import apiClient from "@/config/axiosConfig";
import type { AxiosError, AxiosResponse } from "axios";

/* -------------------- Types -------------------- */
interface TenantState {
  isLoading: boolean;
  inviteSuccess: boolean;
}

interface InviteUserCredentials {
  name: string;
  email: string;
  role: "Member";
  slug: string;
}


// API response structure
interface InviteUserResponse {
  success: boolean;
  message: string;
}


// Redux state type
const initialState: TenantState = {
  isLoading: false,
  inviteSuccess: false,
}


export const inviteUser = createAsyncThunk<
  AxiosResponse<InviteUserResponse>, // return type
  InviteUserCredentials,             // argument type
  { rejectValue: string }      // reject type
>(
  "tenants/invite",
  async ({slug, ...credentials}, { rejectWithValue }) => {
    try {
      const response = apiClient.post(
        `/tenants/${slug}/invite`,
        credentials
      );
      toast.promise(response, {
        loading: "Sending invitation...",
        success: (resolvedPromise) => {
          return resolvedPromise?.data?.message;
        },
        error: (error: AxiosError<any>) => {
          return error?.response?.data?.message || error?.message;
        },
      });
      const apiResponse = await response;
      return apiResponse;
    } catch (err) {
      const error = err as AxiosError<any>;
      console.log("Invite user failed error", err);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

const TenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {},
 extraReducers: (builder) => {
    builder
      .addCase(inviteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(inviteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.inviteSuccess = true;
      })
      .addCase(inviteUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});


export default TenantSlice.reducer;
