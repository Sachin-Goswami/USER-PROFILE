import { useNavigate, useParams } from "react-router-dom";
import Profiles from "../components/Profiles/Profiles";
import { useEffect } from "react";

const UserProfiles = () => {
  const { pNo = "1" } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!(pNo === "1" || pNo === "2")) {
      navigate("/error");
    }
  }, [pNo, navigate]);
  return (
    <>
      <h2>Users Profiles</h2>
      <Profiles page={pNo} />
    </>
  );
};
export default UserProfiles;
