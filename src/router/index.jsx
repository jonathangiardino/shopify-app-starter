import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import PageGeneral from "../pages/PageGeneral.jsx";
import PageIndex from "../pages/PageIndex.jsx";
import Settings from "../pages/Settings.jsx";
import AppProvider from "../providers/AppProvider.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppProvider />}>
          <Route index element={<HomePage />} />
          <Route path="pages/*" element={<Pages />} />
          <Route path="settings/*" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

const Pages = () => (
  <Routes>
    <Route path="/" element={<PageIndex />} />
    <Route path="general" element={<PageGeneral />} />
  </Routes>
);
