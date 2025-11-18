import * as yup from "yup";

export const contactUsValidation = () => {
  return yup.object().shape({
    fullName: yup.string().required().min(2),
    email: yup.string().required().email(),
    subject: yup.string().required().min(5),
    message: yup.string().required().min(5).max(250),
  });
};
