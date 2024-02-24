import * as yup from "yup";

const sendMailForgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Enter a valid Email")
    .min(5)
    .required("Email is required"),
});
export default sendMailForgotPasswordSchema;
