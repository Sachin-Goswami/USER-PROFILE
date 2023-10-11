import { useContext, useEffect } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import routes from "./../routes/routes.json";
const Login = () => {
  const { isUserLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (isUserLogin) {
      navigate(routes.HOME);
    }
  }, [isUserLogin, navigate]);
  return (
    <>
      <h2>Login Page </h2>
      <LoginForm />
    </>
  );
};
export default Login;
