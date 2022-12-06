import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";

import API from "../../utils/axiosAPI";
import { RootState } from "../../redux/store";

export interface registerState {
  data: any;
  status: "idle" | "loading" | "failed";
  errors: null;
}

const initialState: registerState = {
  data: [],
  status: "idle",
  errors: null,
};

export const userRegister = createAsyncThunk(
  "user/Register",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await API.post(`auth/register`, payload);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

export const registrationSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder
      .addCase(userRegister.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(userRegister.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        notification.success({ message: "user registered successfully" });
      })
      .addCase(userRegister.rejected, (state: any, action: any) => {
        state.status = "failed";
        state.errors = action.payload;
      });
  },
});

export const registerUser = (state: RootState) => state.register;

export default registrationSlice.reducer;
