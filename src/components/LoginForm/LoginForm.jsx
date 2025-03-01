import s from './LoginForm.module.css';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { CgPassword } from 'react-icons/cg';
import { HiOutlineMail } from 'react-icons/hi';
import { loginSchema } from './loginSchema';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/auth/operationsAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const dispatch = useDispatch();
  const initialValues = {
    email: '',
    password: '',
  };

  // const handleSubmit = (values, actions) => {
  //   console.log(values);
  //   dispatch(loginThunk(values));
  //   actions.resetForm();
  // };

  const navigate = useNavigate();
  const handleSubmit = (values, actions) => {
    dispatch(loginThunk(values))
      .unwrap()
      .then((res) => {
        toast.success(`Welcome, ${res.user.email}`);
        navigate('/contacts', { replace: true });
      })
      .catch(() => toast.error('Invalid data'));

    actions.resetForm();
  };

  return (
    <section className={s.loginForm_section}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={loginSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form className={s.loginForm_form}>
            <label className={s.loginForm_label}>
              <span className={s.loginForm_span}>Email</span>
              <div className={s.loginForm_inputWrapper}>
                <HiOutlineMail
                  className={s.loginForm_icon}
                  aria-hidden="true"
                />
                <Field
                  className={s.loginForm_field}
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </div>
              <ErrorMessage
                className={s.loginForm_error}
                component="span"
                name="email"
              />
            </label>

            <label className={s.loginForm_label}>
              <span className={s.loginForm_span}>Password</span>

              <div className={s.loginForm_inputWrapper}>
                <CgPassword className={s.loginForm_icon} aria-hidden="true" />
                <Field
                  className={s.loginForm_field}
                  name="password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
              <ErrorMessage
                className={s.loginForm_error}
                component="span"
                name="password"
              />
            </label>
            <button
              className={s.loginForm_button}
              disabled={!isValid || isSubmitting}
              type="submit"
            >
              Log In
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
