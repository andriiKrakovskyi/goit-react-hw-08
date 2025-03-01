import s from './RegistrationForm.module.css';

import { Field, Form, Formik, ErrorMessage } from 'formik';
import { CgPassword } from 'react-icons/cg';
import { HiOutlineMail } from 'react-icons/hi';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { registrationSchema } from './registrationSchema';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/operationsAuth';

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(registerThunk(values));
    actions.resetForm();
  };

  return (
    <section className={s.registrationForm_section}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={registrationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form className={s.registrationForm_form}>
            <label className={s.registrationForm_label}>
              <span className={s.registrationForm_span}> Name</span>

              <div className={s.registrationForm_inputWrapper}>
                <MdDriveFileRenameOutline
                  className={s.registrationForm_icon}
                  aria-hidden="true"
                />

                <Field
                  className={s.registrationForm_field}
                  name="name"
                  type="text"
                  autoComplete="name"
                />
              </div>
              <ErrorMessage
                className={s.registrationForm_error}
                component="span"
                name="name"
              />
            </label>

            <label className={s.registrationForm_label}>
              <span className={s.registrationForm_span}>Email</span>

              <div className={s.registrationForm_inputWrapper}>
                <HiOutlineMail
                  className={s.registrationForm_icon}
                  aria-hidden="true"
                />
                <Field
                  className={s.registrationForm_field}
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </div>
              <ErrorMessage
                className={s.registrationForm_error}
                component="span"
                name="email"
              />
            </label>

            <label className={s.registrationForm_label}>
              <span className={s.registrationForm_span}>Password</span>
              <div className={s.registrationForm_inputWrapper}>
                <CgPassword
                  className={s.registrationForm_icon}
                  aria-hidden="true"
                />
                <Field
                  className={s.registrationForm_field}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <ErrorMessage
                className={s.registrationForm_error}
                component="span"
                name="password"
              />
            </label>

            <button
              className={s.registrationForm_button}
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Register
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
}

//  Откуда берутся isValid и isSubmitting?
// Formik передаёт функции объект с множеством свойств формы:
// {
//   values,        // Текущие значения полей
//   errors,        // Объект с ошибками валидации
//   touched,       // Объект, отслеживающий, какие поля уже трогал пользователь
//   isValid,       // true, если форма полностью валидна
//   isSubmitting,  // true, если форма отправляется (пока идет обработка handleSubmit)
//   handleChange,  // Функция для обновления полей формы
//   handleBlur,    // Функция, вызываемая при потере фокуса полем
//   handleSubmit,  // Функция отправки формы
//   resetForm,     // Функция для очистки формы
//   ...другие свойства
// }

// {({ isValid, isSubmitting }) => (  это render-prop (функция-потомок),
// которая получает состояния формы от Formik.
//*  isValid блокирует кнопку, если в форме есть ошибки.
//* isSubmitting блокирует кнопку, пока форма отправляется.
//*  Это делает форму более удобной и безопасной для пользователя.
