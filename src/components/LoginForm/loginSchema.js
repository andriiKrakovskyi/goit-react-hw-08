import * as Yup from 'yup';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('This field cannot be empty!')
    .matches(emailPattern, 'Invalid email!'),

  password: Yup.string()
    .required('This field cannot be empty!')
    .matches(
      passwordPattern,
      'At least 6 characters, with a letter & a number!',
    ),
});
