import { Link, useNavigate } from "react-router-dom";
import routes from "./../routes/routes.json";
import { useEffect, useState } from "react";

const ErrorPage = () => {
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer((preState) => preState - 1);
      }, 1000);
    }
    //two deffrint way to navigate url
    //one
    if (timer === 0) {
      navigate(routes.HOME);
    }
  }, [timer, navigate]);

  return (
    <>
      <h1>
        Error:404 <br /> page not found
      </h1>
      <p>
        The site configured at this address does not contain the requested file.
        If this is your site, make sure that the filename case matches the URL.
        For root URLs (like http://example.com/) you must provide an index.html
        file.
      </p>
      <h4>
        Please click the link ---<Link to={routes.HOME}>Home</Link>--- to
        redirect the Home page
      </h4>
      <p>You will redirect to Home Page after {timer} seconds.</p>
    </>
  );
};
export default ErrorPage;
