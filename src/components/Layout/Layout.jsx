import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import Container from '../Container/Container';
import { Suspense } from 'react';
import Loader from '../Loader/Loader';
import Footer from '../Footer/Footer';
import s from './layout.module.css';

export default function Layout() {
  return (
    <div className={s.layout_wrapper}>
      <AppBar />
      <main className={s.layout_main}>
        <Container>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

//Зачем нужен Layout?
//Общая структура для всех страниц - позволяет избежать дублирования кода
// (например, AppBar будет одинаковым на всех страницах).
//Гибкость маршрутизации - через Outlet загружается только тот компонент,
// который соответствует текущему маршруту.
//Упрощение кода - каждая страница содержит только свой контент,
// а Layout занимается обёрткой.

// Что делает Suspense?
// Suspense — это специальный компонент React, который позволяет показывать запасной UI
// (указанный в fallback), пока загружается асинхронный контент.
// В данном случае fallback={<Loader />} означает,
// что пока загружаются дочерние маршруты (
// через Outlet), будет отображаться компонент <Loader />
// (обычно это индикатор загрузки).

//📌 Почему Layout может быть несколько?
//В разных частях приложения может быть разный лэйаут в зависимости от контекста.
// Например:

//✅ Примеры нескольких Layout
//Главный лэйаут (MainLayout) — для обычных страниц
//Админский лэйаут (AdminLayout) — с боковой панелью и другими стилями
//Личный кабинет (DashboardLayout) — отдельный макет с меню пользователя
