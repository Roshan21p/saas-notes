import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import apiClient from "@/config/axiosConfig";
import type { AxiosError, AxiosResponse } from "axios";

/* -------------------- Types -------------------- */

interface LoginCredentials {
  email: string;
  password: string;
}

// User object coming from backend
interface User {
  id: string;
  email: string;
  name: string;
  role: "Admin" | "Member";
  tenantId: string;
}

// API response structure
interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
}

// Redux state type
interface AuthState {
  isAuthenticated: boolean;
  role: string;
  userData: User | null;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true" || false,
  role: localStorage.getItem("role") || "Member",
  userData:
    localStorage.getItem("userData") != "undefined"
      ? JSON.parse(localStorage.getItem("userData") as string)
      : null,
};

export const login = createAsyncThunk<
  AxiosResponse<LoginResponse>, // return type
  LoginCredentials,             // argument type
  { rejectValue: string }      // reject type
>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = apiClient.post<LoginResponse>(
        "/auth/login",
        credentials
      );
      toast.promise(response, {
        loading: "Hold back tight, we are registering your id...",
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
      console.log("login error", err);
      return rejectWithValue(error?.response?.data?.message || error?.message);
    }
  }
);

export const acceptInvite = createAsyncThunk<
  { success: boolean; message: string },
  { token: string; password: string },
  { rejectValue: string }
>(
  "auth/acceptInvite",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = apiClient.post("/auth/accept-invite", {
        token,
        password,
      });

      toast.promise(response, {
        loading: "Setting up your account…",
        success: (resolvedPromise) =>
          resolvedPromise?.data?.message || "Your account has been activated successfully!",
        error: (error: AxiosError<any>) =>
          error?.response?.data?.message ||
          "Something went wrong while accepting the invitation.",
      });

      const apiResponse = await response;
      return apiResponse.data;
    } catch (err) {
      const error = err as AxiosError<any>;
      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to accept the invitation. Please try again."
      );
    }
  }
);


const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
      logout: (state) => {
    state.isAuthenticated = false;
    state.role = "";
    state.userData = null;

    localStorage.clear();
      }
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<AxiosResponse<LoginResponse>>) => {
        // reducer which will execute when the login thunk is fulfilled
        console.log("extraReducers", action, "state-------", state);

        state.isAuthenticated = action?.payload?.data?.success;
        state.role = action?.payload?.data?.user?.role;
        state.userData = action?.payload?.data?.user;


        localStorage.setItem(
          "isAuthenticated",
          String(action?.payload?.data?.success)
        );
        localStorage.setItem("role", action?.payload?.data?.user?.role);
        localStorage.setItem(
          "userData",
          JSON.stringify(action?.payload?.data?.user)
        );
        localStorage.setItem("token", action?.payload?.data?.token);
      }
    );
  },
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;
