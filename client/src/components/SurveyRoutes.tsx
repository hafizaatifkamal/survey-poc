import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Login, SurveyDetails, Surveys } from "../pages";
import Registration from "../pages/Registration";
import { ROUTES } from "../utils/routes.enum";
import PrivateRoute from "./PrivateRoute";
import SurveyAppSkeleton from "./SurveyAppSkeleton";

const SurveyRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Registration />} />
        <Route path={ROUTES.SURVEYDETAILS} element={<SurveyDetails />} />
        <Route path={ROUTES.SURVEYS} element={<SurveyAppSkeleton />}>
          <Route
            path={ROUTES.SURVEYS}
            element={
              <PrivateRoute>
                <Surveys />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
    // <AnimatePresence exitBeforeEnter>
    //   <Routes location={location} key={location.pathname}>
    //     <Route path={ROUTES.REGISTER} element={<Registration />} />
    //     <Route path={ROUTES.LOGIN} element={<Login />} />
    //     <Route path={ROUTES.SURVEYS} element={<SurveyAppSkeleton />}>
    //       <Route path={ROUTES.SURVEYS} element={<Surveys />} />
    //       <Route path={ROUTES.SURVEYDETAILS} element={<SurveyDetails />} />
    //     </Route>
    //   </Routes>
    // </AnimatePresence>
  );
};

export default SurveyRoutes;
