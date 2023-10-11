import { useEffect, useState } from "react";
import Profile from "../Profile/Profile";
import styles from "../Profiles/Profiles.module.css";
import { deleteUsers, getUsers } from "../../services/users";
import { useNavigate } from "react-router-dom";
import routes from "./../../routes/routes.json";
import PropTypes from "prop-types";
const Profiles = ({ page = "1" }) => {
  const [users, setUsers] = useState([]);
  //const [page, setPage] = useState(1);
  const [isLoading, setisLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setisLoading(true);
    getUsers(page)
      .then(({ data }) => {
        setUsers(data);
        setIsError(false);
        setisLoading(false);
      })
      .catch(() => {
        setisLoading(false);
        setIsError(true);
      });
  }, [page]);

  const deleteHandler = (userIndex) => {
    const { id: userId } = users[userIndex];
    deleteUsers(userId).then((isDeleted) => {
      if (isDeleted) {
        const usersData = [...users];
        usersData.splice(userIndex, 1);
        setUsers(usersData);
      }
    });
  };

  const profiles = users.map((user, index) => (
    <Profile
      key={index}
      fname={user.first_name}
      email={user.email}
      avatar={user.avatar}
      lname={user.last_name}
      deleteHandler={deleteHandler}
      userIndex={index}
    />
  ));

  return (
    <>
      {isLoading && <div>Loader...</div>}
      {!isLoading && (
        <>
          <div>Page: {page}</div>
          {isError && (
            <p className={styles.errorMsg}>
              There is some error, please try later
            </p>
          )}
          {!isError && <div className={styles.profiles}>{profiles}</div>}
          <div>
            <button
              onClick={() => {
                const nextPage = page === "1" ? "2" : "1";
                const path = `/${routes.PROFILES}/${nextPage}`;
                navigate(path);
              }}
            >
              Show Page {page === "1" ? "2" : "1"}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Profiles;
Profiles.propTypes = {
  page: PropTypes.string,
};
