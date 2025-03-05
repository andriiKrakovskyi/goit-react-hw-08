import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectorsAuth';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? children : <Navigate to="/login" />;
};
export default PrivateRoute;

// export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
//   const isLoggedIn = useSelector(selectIsLoggedIn);

//   return isLoggedIn ? Component : <Navigate to={redirectTo} />;
// };

// Получает component (компонент, который должен быть отрендерен)
// и redirectTo (куда перенаправлять, если нет авторизации).
// Использует useSelector(selectIsLoggedIn) для проверки,
// авторизован ли пользователь.
// Если isLoggedIn === true → рендерит переданный component.
//! Если isLoggedIn === false → перенаправляет на redirectTo.
