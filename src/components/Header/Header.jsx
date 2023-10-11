/* eslint-disable no-unused-vars */
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import routes from "./../../routes/routes.json";
import styles from "./Header.module.css";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";
import { UserContext } from "../../contexts/UserContext";
const Header = () => {
  const navigate = useNavigate();
  const linkStyles = ({ isActive }) =>
    isActive ? styles.activeStyle : styles.linkStyle;
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { isUserLogin, logoutHandler } = useContext(AuthContext);
  const {
    userData: { username },
  } = useContext(UserContext);
  const btnVariant = isDark ? "primary" : "dark";
  const iconClasses = isDark
    ? "bi bi-brightness-high-fill"
    : "bi bi-moon-stars-fill";
  return (
    <>
      <header className={styles.headerContainer}>
        <Navbar bg={isDark ? "primary" : "dark"} variant="dark" expand="md">
          <Container>
            <div>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Brand className="justify-content-end ms-3">
                <NavLink to={routes.HOME} className={styles.linkStyle}>
                  Users Profile
                </NavLink>
              </Navbar.Brand>
            </div>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link>
                  <NavLink to={routes.PROFILES} className={linkStyles}>
                    Profiles
                  </NavLink>
                </Nav.Link>
                {isUserLogin && (
                  <>
                    <Nav.Link>
                      <NavLink to={routes.ADD_USER} className={linkStyles}>
                        Add user
                      </NavLink>
                    </Nav.Link>
                    <Nav.Link>
                      <NavLink to={routes.SETTING} className={linkStyles}>
                        Setting
                      </NavLink>
                    </Nav.Link>
                  </>
                )}
                <Nav.Link>
                  <NavLink to={routes.HELP} className={linkStyles}>
                    Help
                  </NavLink>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Nav>
              {!isUserLogin && (
                <Button
                  variant={btnVariant}
                  className="me-2"
                  onClick={() => navigate(routes.LOGIN)}
                >
                  Login
                </Button>
              )}
              {isUserLogin && (
                <Button
                  variant={btnVariant}
                  className="me-2"
                  onClick={logoutHandler}
                >
                  Logout
                </Button>
              )}
              <div className="vr"></div>
              <Button
                variant={btnVariant}
                onClick={toggleTheme}
                className="ms-2"
              >
                <i className={iconClasses}></i>
              </Button>
              {isUserLogin && username && (
                <>
                  <div className="vr"></div>
                  <Button variant={btnVariant} className="ms-2">
                    <i className="bi bi-people"></i> {username}
                  </Button>
                </>
              )}
              <NavLink>{isDark ? "Dark" : "Light"} Theme</NavLink>
            </Nav>
          </Container>
        </Navbar>
      </header>
    </>
  );
};
export default Header;
