/* eslint-disable react-refresh/only-export-components */
import UserForm from "../components/UserForm/UserForm";
import { privatePageHoc } from "../hoc/privatePageHoc";

const AddUser = () => {
  return (
    <>
      <h2>Add Users</h2>
      <UserForm />
    </>
  );
};
export default privatePageHoc(AddUser);
