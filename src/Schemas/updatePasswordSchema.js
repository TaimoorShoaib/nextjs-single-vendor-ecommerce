import * as yup from "yup";

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;
const errorMessage = "use uppercase , lowercase and digits";
const updatePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, { message: errorMessage })
    .required("Password is required"),
  newPassword: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, { message: errorMessage })
    .required("new Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "passwords must match ")
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
export default updatePasswordSchema;
