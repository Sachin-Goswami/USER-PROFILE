import { Routes, Route } from "react-router-dom";
import MasterLayout from "../Layouts/MasterLayout";

import routes from "./routes.json";
import ErrorPage from "../pages/ErrorPage";
import UserProfiles from "../pages/UserProfiles";
import AddUser from "../pages/AddUser";
import Login from "../pages/Login";
import Help from "../pages/Help";
import Home from "../pages/Home";
import Setting from "../pages/Setting";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path={routes.HOME} element={<MasterLayout />}>
        <Route index element={<Home />} />
        <Route path={routes.PROFILES}>
          <Route index element={<UserProfiles />} />
          <Route path={":pNo"} element={<UserProfiles />} />
        </Route>
        <Route path={routes.ADD_USER} element={<AddUser />} />
        <Route path={routes.SETTING} element={<Setting />} />
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.HELP} element={<Help />} />
      </Route>
      <Route path={"*"} element={<ErrorPage />} />
    </Routes>
  );
};
export default PageRoutes;
