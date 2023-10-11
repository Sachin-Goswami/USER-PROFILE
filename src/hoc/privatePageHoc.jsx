import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import routes from "./../routes/routes.json";
export const privatePageHoc = (Component) => {
  const PrivatePageComponent = (props) => {
    const { isUserLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
      if (!isUserLogin) {
        navigate(`/${routes.LOGIN}`);
      }
    }, [isUserLogin, navigate]);

    return <Component {...props} />;
  };
  return PrivatePageComponent;
};
