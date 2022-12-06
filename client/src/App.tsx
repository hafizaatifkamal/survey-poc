import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

import SurveyRoutes from "./components/SurveyRoutes";
import { theme } from "./utils/theme";

function App() {
  ConfigProvider.config({
    theme: {
      primaryColor: theme.primary,
      infoColor: theme.info,
    },
  });

  return (
    <ConfigProvider>
      <BrowserRouter>
        <SurveyRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
