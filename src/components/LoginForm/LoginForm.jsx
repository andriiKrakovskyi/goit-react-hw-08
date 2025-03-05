import s from './LoginForm.module.css';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { CgPassword } from 'react-icons/cg';
import { HiOutlineMail } from 'react-icons/hi';
import { loginSchema } from './loginSchema';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/auth/operationsAuth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

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

  // const navigate = useNavigate();
  const handleSubmit = (values, actions) => {
    dispatch(loginThunk(values))
      .unwrap()
      .then((res) => {
        toast.success(`Welcome, ${res.user.email}`);
        // navigate('/contacts', { replace: true });
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

            <p className={s.loginForm_get}>
              You do not have account yet?{' '}
              <Link className={s.loginForm_get_link} to="/register">
                Get IT!
              </Link>
            </p>
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

//! 1. useNavigate()
// useNavigate — это хук из React Router,
// который позволяет программно перемещаться между страницами.
//Здесь он используется для перенаправления пользователя после
// успешного входа.

//! 2. handleSubmit (Обработчик отправки формы)
// values содержит данные, введенные пользователем в форму (например, email и пароль).
// actions — объект, содержащий вспомогательные функции
// Formik (например, resetForm()).

//! 3. Диспатч асинхронного запроса (loginThunk)
// loginThunk(values) — это асинхронное действие (thunk) из Redux Toolkit,
//  которое отправляет данные на сервер и выполняет аутентификацию.
// dispatch отправляет этот thunk в Redux-хранилище.

//!!! Этот метод делается когда нет PrivateRoute и PublicRoute маршрутов !!!
//! 4. Обработка результата запроса
// .unwrap() — это специальный метод Redux Toolkit,
// который убирает обертку вокруг Promise и позволяет
// использовать then/catch вместо try/catch.
//! Работает только для асинхронных createAsyncThunk (санкок)
// !!Он ждет пока закончится асинхронная createAsyncThunk (санка)
//! и дальше делаем промисификацию с помощю then/catch
// Если запрос успешен (then):
// Показывается уведомление toast.success() с email пользователя.
// Происходит навигация на страницу /contacts (navigate('/contacts',
// { replace: true })), заменяя текущий маршрут (то есть,
//  нельзя будет вернуться назад по кнопке "назад").
// Если запрос не удался (catch):
// Показывается уведомление об ошибке toast.error('Invalid data').
//  .unwrap()
//     .then((res) => {
//       toast.success(`Welcome, ${res.user.email}`);
//       navigate('/contacts', { replace: true });
//     })
//     .catch(() => toast.error('Invalid data'));
//!!! Этот метод делается когда нет PrivateRoute и PublicRoute маршрутов !!!
