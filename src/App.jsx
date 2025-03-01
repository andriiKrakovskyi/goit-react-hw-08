import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { Suspense } from 'react';
import Loader from './components/Loader/Loader';
import { useEffect } from 'react';
import { selectIsRefreshing } from './redux/auth/selectorsAuth';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUserThunk } from './redux/auth/operationsAuth';

import { PrivateRoute } from './config-route/PrivateRoute';
import { PublicRoute } from './config-route/PublicRoute';
import { RestrictedRoute } from './config-route/RestrictedRoute';

import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/Layout/Layout';

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

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <main>
      <Suspense fallback={<Loader />}>
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

            <Route
              path="/login"
              element={
                <RestrictedRoute redirectTo="/contacts">
                  <LoginPage />
                </RestrictedRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute redirectTo="/">
                  <RegistrationPage />
                </PublicRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </main>
  );
}
export default App;

//===============
// function App() {
//   const dispatch = useDispatch();
//   const isRefreshing = useSelector(selectIsRefreshing);

//   useEffect(() => {
//     dispatch(refreshUser());
//   }, [dispatch]);

//   return isRefreshing ? (
//     <b>Refreshing user...</b>
//   ) : (
//     <main>
//       <Layout />
//       {/* <Suspense fallback={<Loader />}> */}
//       <Routes>
//         <Route path="/" element={<HomePage />} />

//         <Route
//           path="/register"
//           //Если пользователь НЕ авторизован, он увидит /register.
//           //Если уже авторизован, его перебросит на /contacts.
//           element={
//             <RestrictedRoute
//               redirectTo="/contacts"
//               component={<RegistrationPage />}
//             />
//           }
//         />

//         <Route
//           path="/login"
//           element={
//             <RegistrationPage
//               redirectTo="/contacts"
//               component={<LoginPage />}
//             />
//           }
//         />

//         <Route
//           path="/contacts"
//           //Если пользователь вошел в систему, он попадет на /contacts.
//           //Если не вошел, его перебросит на /login.
//           element={
//             <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
//           }
//         />

//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//       {/* </Suspense> */}
//     </main>
//   );
// }

// export default App;

//   {
/* <Route
            path="/login"
            element={
              <RestrictedRoute
                component={<LoginPage />}
                redirectTo="/contacts"
              />
            }
          /> */
//  }
