import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const link = /^((http|https):\/\/)/;
export const signUpValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required.'),
  email: yup.string().email().required('Email is required.'),
  // phone: yup
  //   .string()
  //   .min(10, 'Phone number must be 10 digit.')
  //   .max(10, 'Phone number must be 10 digit.')
  //   .matches(phoneRegExp, 'Phone number is not valid'),
  password: yup
    .string()
    .min(8, 'Password must contain at least 8 characters')
    .required('Password is required.'),
  // confirmPassword: yup
  //   .string()
  //   .required('Please enter the password again.')
  //   .oneOf([yup.ref('password')], 'Passwords do not match.'),
});

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email().required('Email is required.'),
  password: yup.string().required('Password is required.'),
});

export const createArticleFormSchema = yup.object().shape({
  keyword: yup.string().required('keyword is required.'),
  title: yup.string(),
});

export const wordPressConnectSchema = yup.object().shape({
  domain: yup
    .string()
    .required('Site address is required.')
    .matches(link, 'Site address must contain http/https'),
  username: yup.string().required('Username is required.'),
  password: yup.string().required('Application Password is required.'),
});
