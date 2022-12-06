import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import axios from "axios";

import API from "../../utils/axiosAPI";
import { STORAGE_KEY_CONSTANT, USER_KEY_CONSTANT } from "../../utils/constants";
import { notification } from "antd";

export interface LoginState {
  status: "idle" | "loading" | "failed";
  error: string | null;
  userDetails: any;
}

const initialState: LoginState = {
  status: "idle",
  error: null,
  userDetails: {},
};

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/login", payload);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const logOutAsync = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/logout");
      return response.data;
    } catch (error: any) {
      if (error.response.status >= 400 && error.response.status <= 503) {
        notification.error({
          message: error.response.data?.message || error.response?.statusText,
        });
      }
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        localStorage.setItem(STORAGE_KEY_CONSTANT, action?.payload?.token);
        localStorage.setItem(USER_KEY_CONSTANT, JSON.stringify(action.payload));
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = String(action.payload);
      });

    builder
      .addCase(logOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = null;
        localStorage.removeItem(STORAGE_KEY_CONSTANT);
        localStorage.removeItem(USER_KEY_CONSTANT);
        window.location.reload();
      })
      .addCase(logOutAsync.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export default loginSlice.reducer;
