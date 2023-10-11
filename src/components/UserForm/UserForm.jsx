/* eslint-disable no-undef */
/* eslint-disable react-refresh/only-export-components */
import { useRef, useState } from "react";
import styles from "./UserForm.module.css";
import { setUser } from "../../services/users";
import { useNavigate } from "react-router-dom";
import routes from "./../../routes/routes.json";
import { backgroundColorHoC } from "../../hoc/backgraundColorHoC";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components, react/prop-types
const UserForm = ({ children }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fnameRef = useRef();
  const lnameRef = useRef();
  const emailRef = useRef();
  const mobileRef = useRef();

  const reRenderCount = useRef(0);
  const navigate = useNavigate();
  //Consume the context data
  const { isDark } = useContext(ThemeContext);
  console.log(isDark);

  const resetField = () => {
    setFname("");
    setLname("");
    setEmail("");
    setMobile("");
    setSuccessMsg("");
    setErrorMsg("");
  };
  const showSuccessMsg = (Msg) => {
    setSuccessMsg(Msg);
    setTimeout(() => {
      setSuccessMsg("");
    }, 10000);
  };
  const showErrorMsg = (Msg) => {
    setErrorMsg(Msg);
    setTimeout(() => {
      setErrorMsg("");
    }, 10000);
  };
  const isValidate = () => {
    //specific fo rm validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validations = [
      {
        isvalid: !fname,
        errorMsg: "Please enter the first name",
        refElem: fnameRef,
      },
      {
        isvalid: fname.length < 3,
        errorMsg: "Please enter atleast 3 characters the first name",
      },
      {
        isvalid: !lname,
        errorMsg: "Please enter the last name",
        refElem: lnameRef,
      },
      {
        isvalid: lname.length < 3,
        errorMsg: "Please enter atleast 3 characters the last name",
      },
      {
        isvalid: !email,
        errorMsg: "Please enter the email id",
        refElem: emailRef,
      },
      {
        isvalid: !emailRegex.test(email),
        errorMsg: "Please enter valid  email id",
      },
      {
        isvalid: !mobile,
        errorMsg: "Please enter the mobile number",
        refElem: mobileRef,
      },
      {
        isvalid: mobile.length !== 10,
        errorMsg: "Please enter valid  mobile number",
      },
    ];
    for (const validate of validations) {
      if (validate.isvalid) {
        showErrorMsg(validate.errorMsg);
        // focus code for error field
        validate.refElem.current.focus();
        return false;
      }
    }
    /*   if (!fname) {
      showErrorMsg("Please enter the first name");
      return false;
    } else if (fname.length < 3) {
      showErrorMsg("Please enter atleast 3 characters the first name");
      return false;
    } else if (!lname) {
      showErrorMsg("Please enter the last name");
      return false;
    } else if (lname.length < 3) {
      showErrorMsg("Please enter atleast 3 characters the last name");
      return false;
    } else if (!email) {
      showErrorMsg("Please enter the email id");
      return false;
    } else if (!emailRegex.test(email)) {
      showErrorMsg("Please enter valid  email id");
      return false;
    } else if (!mobile) {
      showErrorMsg("Please enter the mobile number");
      return false;
    } else if (mobile.length !== 10) {
      showErrorMsg("Please enter valid  mobile number");
      return false;
    }
    */
    return true;
  };

  const createUserHandler = () => {
    // //generic form validation
    // if (!(fname && lname && email && mobile)) {
    //   showErrorMsg("Please enter all required fields!!");
    //   return;
    // }
    if (!isValidate()) {
      return;
    }
    const user = {
      fname,
      lname,
      email,
      mobile,
    };
    setIsLoading(true);
    setUser(user)
      .then((data) => {
        resetField();
        setIsLoading(false);
        showSuccessMsg(
          `user has been created with user id : ${data.id},you will be redirected to Home Page`
        );
        setTimeout(() => navigate(routes.HOME), 5000);
      })
      .catch(() => {
        setIsLoading("");
        showErrorMsg("There is an error, Please try agian!!!");
      });
  };
  return (
    <div className="m-5">
      <Row className="mt-3 md-3">
        <Col>
          <label htmlFor="fname">First name</label>
        </Col>
        <Col>
          <input
            ref={fnameRef}
            className={styles.inputFields}
            type="text"
            id="fname"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mt-3 md-3">
        <Col>
          <label htmlFor="lname">Last name</label>
        </Col>
        <Col>
          <input
            ref={lnameRef}
            className={styles.inputFields}
            type="text"
            id="lname"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mt-3 md-3">
        <Col>
          <label htmlFor="email">Email id </label>
        </Col>
        <Col>
          <input
            ref={emailRef}
            className={styles.inputFields}
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mt-3 md-3">
        <Col>
          <label htmlFor="number">Mobile No.</label>
        </Col>
        <Col>
          <input
            ref={mobileRef}
            className={styles.inputFields}
            type="number"
            id="number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Col>
      </Row>

      <Row className="mt-3 md-3">
        <Col>
          <Button
            disabled={isLoading}
            variant="primary"
            onClick={createUserHandler}
          >
            Create User
          </Button>
        </Col>
        <Col>
          <Button onClick={resetField} variant="secondary">
            Reset Form
          </Button>
        </Col>
      </Row>
      {isLoading && (
        <Row className="mt-3 md-3">
          <div>Loading...</div>
        </Row>
      )}
      {errorMsg && (
        <Row className="mt-3 md-3">
          <div className={styles.errorMsg}>{errorMsg}</div>
        </Row>
      )}
      {successMsg && (
        <Row className="mt-3 md-3">
          <div className={styles.successMsg}>{successMsg}</div>
        </Row>
      )}
      <Row className="mt-3 md-3">
        <div>Re-rendering count: {++reRenderCount.current}</div>
      </Row>
      <Row className="mt-3 md-3">
        <div>External Massage: {children}</div>
      </Row>
    </div>
  );
};
export default backgroundColorHoC(UserForm);
UserForm.propTypes = {
  children: PropTypes.node,
};
