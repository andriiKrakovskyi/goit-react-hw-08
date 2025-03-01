import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectorsAuth';

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  console.log(isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// Получает component (компонент, который должен быть отрендерен)
// и redirectTo (куда перенаправлять, если нет авторизации).
// Использует useSelector(selectIsLoggedIn) для проверки,
// авторизован ли пользователь.
// Если isLoggedIn === true → рендерит переданный component.
// Если isLoggedIn === false → перенаправляет на redirectTo.

/**
 * - If the route is private and the user is logged in, render the component
 * - Otherwise render <Navigate> to redirectTo
 */

// export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   return isLoggedIn ? Component : <Navigate to={redirectTo} />;
// };
