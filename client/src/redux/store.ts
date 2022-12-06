import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import survey_details from "../pages/SurveyDetails/surveyDetailsSlice";
import surveys from "../pages/Surveys/surveysSlice";
import login from "../pages/Login/loginSlice";
import register from "../pages/Registration/registrationSlice";

export const store = configureStore({
  reducer: {
    auth: login,
    surveys,
    register,
    survey_details,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
