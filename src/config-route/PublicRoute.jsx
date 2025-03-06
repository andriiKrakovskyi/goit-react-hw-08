import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors.js';

const PublicRoute = ({ component: Component, redirectTo = '/' }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

export default PublicRoute;

// Используется для маршрутов, доступных только НЕавторизованным пользователям
// (например, страницы регистрации и входа).
// Если пользователь уже вошел, его перенаправляют на redirectTo.

// Получает component (страницу, которую надо показать)
// и redirectTo (куда перенаправлять, если пользователь уже авторизован).
// Проверяет isLoggedIn.
// Если isLoggedIn === true → перенаправляет на redirectTo.
// Если isLoggedIn === false → рендерит component.

// const PublicRoute = ({ children }) => {
//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   return isLoggedIn ? <Navigate to="/contacts" /> : children;
// };

// export default PublicRoute;

{
  /* <Route
          path="/login"
          element={
            <PublicRoute >
              <LoginPage />
            </PublicRoute>
          }
        /> */
}

{
  /* 
        <Route
          path="/register"
          element={
            <PublicRoute >
              <RegistrationPage />
            </PublicRoute>
          }
        />
      </Route> */
}
