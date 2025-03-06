import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './config-route/PrivateRoute';
import PublicRoute from './config-route/PublicRoute';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/Layout/Layout';
import LayoutAuth from './components/LayoutAuth/LayoutAuth';
import { refreshUserThunk } from './redux/auth/operations';
import { selectIsRefreshing } from './redux/auth/selectors';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegistrationPage = lazy(() =>
  import('./pages/RegistrationPage/RegistrationPage'),
);
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return isRefreshing ? null : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <ContactsPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<LayoutAuth />}>
        <Route
          path="/login"
          element={
            <PublicRoute component={<LoginPage />} redirectTo="/contacts" />
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute
              component={<RegistrationPage />}
              redirectTo="/contacts"
            />
          }
        />
      </Route>
    </Routes>
  );
}
export default App;
