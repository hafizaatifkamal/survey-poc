import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import API from "../../utils/axiosAPI";

export interface SurveysState {
  data: any;
  status: "idle" | "loading" | "failed";
  errors: string | null;
  surveyWithStats: any;
}

const initialState: SurveysState = {
  data: [],
  status: "idle",
  errors: null,
  surveyWithStats: [],
};

export const createSurveys = createAsyncThunk(
  `surveys`,
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await API.post(`/survey/questions/`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getSurveys = createAsyncThunk(
  `surveys/list`,
  async (surveyStatus: any, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/survey/filteredList/?status=${surveyStatus}`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const getSurveysDetails = createAsyncThunk(
  `surveys/details`,
  async (surveyID: any, { rejectWithValue }) => {
    try {
      const response = await API.get(`/survey/getData/${surveyID}/`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const updateSurveyStatus = createAsyncThunk(
  `surveys/updateStatus`,
  async (payload: any, { rejectWithValue }) => {
    try {
      const response = await API.patch(
        `/survey/updateStatus/${payload?._id}`,
        payload
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const surveysSlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSurveys.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(createSurveys.fulfilled, (state: any, action: any) => {
        state.status = "idle";
      })
      .addCase(createSurveys.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
    builder
      .addCase(getSurveys.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getSurveys.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.data = action.payload?.data;
      })
      .addCase(getSurveys.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
    builder
      .addCase(getSurveysDetails.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getSurveysDetails.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.surveyWithStats = action.payload?.data;
      })
      .addCase(getSurveysDetails.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
    builder
      .addCase(updateSurveyStatus.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(updateSurveyStatus.fulfilled, (state: any, action: any) => {
        state.status = "idle";
      })
      .addCase(updateSurveyStatus.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
  },
});

export const selectSurveys = (state: RootState) => state.surveys;

export default surveysSlice.reducer;
