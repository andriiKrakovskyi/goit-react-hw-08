import s from './RegistrationForm.module.css';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { CgPassword } from 'react-icons/cg';
import { HiOutlineMail } from 'react-icons/hi';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { registrationSchema } from './registrationSchema';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../../redux/auth/operationsAuth';
// import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  // const handleSubmit = (values, actions) => {
  //   dispatch(registerThunk(values));
  //   actions.resetForm();
  // };

  // const navigate = useNavigate();
  const handleSubmit = (values, actions) => {
    dispatch(registerThunk(values))
      .unwrap()
      .then((res) => {
        toast.success(`Welcome, ${res.user.email}`);
        // navigate('/contacts', { replace: true });
      })
      .catch(() => toast.error('Invalid data'));

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

            <p className={s.registrationForm_get}>
              You already have account?
              <Link className={s.registrationForm_get_link} to="/login">
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
