import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectorsAuth';

export const RestrictedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <Navigate to="/" /> : children;
};

// Используется для маршрутов, доступных только НЕавторизованным пользователям
// (например, страницы регистрации и входа).
// Если пользователь уже вошел, его перенаправляют на redirectTo.

// Получает component (страницу, которую надо показать)
// и redirectTo (куда перенаправлять, если пользователь уже авторизован).
// Проверяет isLoggedIn.
// Если isLoggedIn === true → перенаправляет на redirectTo.
// Если isLoggedIn === false → рендерит component.

/**
 * - If the route is restricted and the user is logged in,
 *  render a <Navigate> to redirectTo
 * - Otherwise render the component
 */

// export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
//   const isLoggedIn = useSelector(selectIsLoggedIn);
//   return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
// };
