import * as yup from "yup";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const errorMessage = "use uppercase , lowercase and digits";
const updateProfileSchem = yup.object().shape({
  username: yup.string().min(5).max(30).required("username is required"),
});
export default updateProfileSchem;
