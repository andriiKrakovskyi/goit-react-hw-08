import * as Yup from 'yup';

const onlyLetters = /^[A-Za-z\s]+$/;
const pattern = /^\d{3}-\d{2}-\d{2}$/;
export const contactSchema = Yup.object().shape({
  name: Yup.string()
    .required('This field cannot be empty!')
    .min(3, 'Minimum 3 characters!')
    .max(35, 'Maximum 35 characters!')
    .matches(onlyLetters, 'Only letters are allowed!'),

  number: Yup.string()
    .required('This field cannot be empty!')
    .min(3, 'Min 3')
    .max(17, 'Max 17')
    .matches(pattern, 'Phone number must be in format 123-45-78'),
});
