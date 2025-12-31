import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import apiClient from "@/config/axiosConfig";
import type { AxiosError, AxiosResponse } from "axios";

/* -------------------- Types -------------------- */

interface Tenant {
  _id: string;
  slug: string;
  plan: string;
  name: string;
  noteLimit: string;
}

interface TenantState {
  data: Tenant | null;
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

interface GetTenantResponse {
  data: Tenant;
  success: boolean;
  message: string;
}

interface UpgradeTenantPlanResponse {
  data: Tenant ;
  success: boolean;
  message: string;
}

// Redux state type
const initialState: TenantState = {
  data: null,
  isLoading: false,
  inviteSuccess: false,
};

export const inviteUser = createAsyncThunk<
  AxiosResponse<InviteUserResponse>, // return type
  InviteUserCredentials, // argument type
  { rejectValue: string } // reject type
>("tenants/invite", async ({ slug, ...credentials }, { rejectWithValue }) => {
  try {
    const response = apiClient.post(`/tenants/${slug}/invite`, credentials);
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
});

export const getTenant = createAsyncThunk<
  GetTenantResponse,
  void,
  { rejectValue: string }
>("/teanats/me", async (_, { rejectWithValue }) => {
  try {
    const response = apiClient.get("/tenants/me");
    toast.promise(response, {
      loading: "Fetching the tenant(Company)...",
      success: (resolvedPromise) => {
        return resolvedPromise?.data?.message;
      },
      error: (error: AxiosError<any>) => {
        return error?.response?.data?.message || error?.message;
      },
    });
    const apiResponse = await response;
    return apiResponse.data;
  } catch (err) {
    const error = err as AxiosError<any>;
    console.log("Failed to fetch the tenant.", error);
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

export const upgradeTenantPlan = createAsyncThunk<
  UpgradeTenantPlanResponse, // return type
  {slug: string}, // argument type
  { rejectValue: string } // reject type
>("tenants/upgrade", async ({ slug }, { rejectWithValue }) => {
  try {
    const response = apiClient.post(`/tenants/${slug}/upgrade`);
    toast.promise(response, {
      loading: "Upgrading your plan, please wait…",
      success: (resolvedPromise) => {
        return resolvedPromise?.data?.message;
      },
      error: (error: AxiosError<any>) => {
        return error?.response?.data?.message || error?.message;
      },
    });
    const apiResponse = await response;
    return apiResponse.data;
  } catch (err) {
    const error = err as AxiosError<any>;
    console.log("failed to upgrade tenant plan error", err);
    return rejectWithValue(error?.response?.data?.message || error?.message);
  }
});

const TenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    clearTenant : (state) => {
      state.data = null;
    }
  },
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
      })

      // Get tenant case
      .addCase(getTenant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTenant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getTenant.rejected, (state) => {
        state.isLoading = false;
      })

      // Upgrade tenant plan case
      .addCase(upgradeTenantPlan.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(upgradeTenantPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(upgradeTenantPlan.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearTenant } = TenantSlice.actions;

export default TenantSlice.reducer;
