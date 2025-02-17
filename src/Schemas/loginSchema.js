import * as yup from "yup";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const errorMessage = "use uppercase , lowercase and digits";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid Email")
    .min(5)
    .required("Email is required"),
  password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, { message: errorMessage })
    .required("Password is required"),
});
export default loginSchema;
