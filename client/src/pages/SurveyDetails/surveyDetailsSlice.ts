import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import API from "../../utils/axiosAPI";

export interface SurveysDetailsState {
  data: any;
  submitted: boolean;
  id: string;
  status: "idle" | "loading" | "failed";
  errors: string | null;
}

const initialState: SurveysDetailsState = {
  data: [],
  submitted: false,
  id: "",
  status: "idle",
  errors: null,
};

export const getSurveysDetails = createAsyncThunk(
  `surveys/details`,
  async (surveyID: any, { rejectWithValue }) => {
    try {
      const resId = await API.get(`/survey/${surveyID}/`);
      const id = resId?.data?.data?._id;
      const response = await API.get(`/survey/questionaire/${id}/`);
      return { data: response?.data, id };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const postAnswers = createAsyncThunk(
  `surveys/answer`,
  async (postData: any, { rejectWithValue }) => {
    const { surveyID, data } = postData;
    try {
      const response = await API.post(`/survey/answers/${surveyID}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

export const surveyDetailsSlice = createSlice({
  name: "survey_details",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSurveysDetails.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(getSurveysDetails.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.data = action.payload?.data?.data;
        state.id = action.payload?.id;
      })
      .addCase(getSurveysDetails.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
    builder
      .addCase(postAnswers.pending, (state: any) => {
        state.status = "loading";
      })
      .addCase(postAnswers.fulfilled, (state: any, action: any) => {
        state.status = "idle";
        state.submitted = true;
      })
      .addCase(postAnswers.rejected, (state: any, action: any) => {
        state.status = "failed";
      });
  },
});

export const selectSurveyDetails = (state: RootState) => state.survey_details;

export default surveyDetailsSlice.reducer;
