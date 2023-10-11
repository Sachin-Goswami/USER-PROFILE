/* eslint-disable react-refresh/only-export-components */
import { useContext } from "react";
import { backgroundColorHoC } from "../../hoc/backgraundColorHoC";
import styles from "../Profile/Profile.module.css";
import PropTypes from "prop-types";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
const Profile = ({
  fname,
  email = "NA",
  avatar,
  lname,
  deleteHandler,
  userIndex,
}) => {
  const { isDark } = useContext(ThemeContext);
  const { isUserLogin } = useContext(AuthContext);
  return (
    <div className={isDark ? styles.darkTheme : ""}>
      <h5>
        {fname} {lname}
      </h5>
      <p>{email}</p>
      <img src={avatar} alt="USer-Image" width="200" height="200" />
      {isUserLogin && (
        <div>
          <Button
            variant="danger"
            className={styles.delBtn}
            onClick={() => {
              deleteHandler(userIndex);
            }}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

// export default Profile;
// eslint-disable-next-line react-refresh/only-export-components
export default backgroundColorHoC(Profile, "pink");

Profile.propTypes = {
  fname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  lname: PropTypes.string,
  deleteHandler: PropTypes.func.isRequired,
  userIndex: PropTypes.number.isRequired,
};
