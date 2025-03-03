import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { useEffect } from 'react';
import { selectIsRefreshing } from './redux/auth/selectorsAuth';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUserThunk } from './redux/auth/operationsAuth';
import { PrivateRoute } from './config-route/PrivateRoute';
// import { PublicRoute } from './config-route/PublicRoute';
import { RestrictedRoute } from './config-route/RestrictedRoute';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/Layout/Layout';
import LayoutAuth from './components/LayoutAuth/LayoutAuth';

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

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   dispatch(refreshUserThunk({ signal: abortController.signal }));

  //   return () => {
  //     abortController.abort();
  //   };
  // }, [dispatch]);

  return isRefreshing ? null : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route
          path="contacts"
          element={
            <PrivateRoute redirectTo="/">
              <ContactsPage />
            </PrivateRoute>
          }
        />

        {/* <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts">
                <LoginPage />
              </RestrictedRoute>
            }
          /> */}

        {/* <Route
            path="/register"
            element={
              <PublicRoute redirectTo="/">
                <RegistrationPage />
              </PublicRoute>
            }
          /> */}

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<LayoutAuth />}>
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts">
              <LoginPage />
            </RestrictedRoute>
          }
        />

        {/* <Route
          path="/register"
          element={
            <PublicRoute redirectTo="/">
              <RegistrationPage />
            </PublicRoute>
          }
        /> */}

        <Route
          path="/register"
          element={
            <RestrictedRoute redirectTo="/contacts">
              <RegistrationPage />
            </RestrictedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
export default App;
