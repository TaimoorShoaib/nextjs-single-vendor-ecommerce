import * as yup from "yup";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const errorMessage = "use uppercase , lowercase and digits";
const SignupSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required("username is required"),
  name: yup.string().max(30).required("name is required"),
  email: yup
    .string()
    .email("Enter a valid Email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, { message: errorMessage })
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "passwords must match ")
    .required("confirmPassword is required"),

  /*


    const userRegisterSchema = Joi.object({
          username: Joi.string().min(5).max(30).required(),
          name: Joi.string().max(30).required(),
          email: Joi.string().email().required(),
          password: Joi.string().pattern(passwordPattern).required(),
          confirmPassword: Joi.ref("password"),
        })
    */
});
export default SignupSchema;
