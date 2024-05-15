import * as yup from "yup";

export const loginScheme = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const codeLoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  code: yup.string().min(6).max(6).required().length(6),
});
