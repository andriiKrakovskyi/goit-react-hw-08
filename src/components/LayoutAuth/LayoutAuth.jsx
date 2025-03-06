import { Outlet } from 'react-router-dom';
import AppBarAuth from '../AppBarAuth/AppBarAuth';
import Container from '../Container/Container';
import { Suspense } from 'react';
import Loader from '../Loader/Loader';

import Footer from '../Footer/Footer';
import s from './LayoutAuth.module.css';

export default function LayoutAuth() {
  return (
    <div className={s.layoutAuth_wrapper}>
      <div className={s.layoutAuth_sidebar}>
        <AppBarAuth />
      </div>
      <div className={s.layoutAuth_content}>
        <main className={s.layoutAuth_main}>
          <Container>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </Container>
        </main>
        <Footer />
      </div>
    </div>
  );
}
