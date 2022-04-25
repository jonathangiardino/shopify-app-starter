import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage.jsx";
import PageGeneral from "../pages/PageGeneral.jsx";
import PageIndex from "../pages/PageIndex.jsx";
import AppProvider from "../providers/AppProvider.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppProvider />}>
          <Route index element={<HomePage />} />
          <Route path="pages/*" element={<Pages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

// const Promos = () => (
//   <Routes>
//     {/* TODO: <Route path="/" element={<LinksIndex />} /> */}
//     <Route path="new" element={<NewLink />} />
//     <Route path="dynamic" element={<DynamicLink />} />
//     <Route path=":id" element={<EditLink />} />
//   </Routes>
// );

const Pages = () => (
  <Routes>
    <Route path="/" element={<PageIndex />} />
    <Route path="general" element={<PageGeneral />} />
  </Routes>
);
