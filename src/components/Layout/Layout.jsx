import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import Container from '../Container/Container';

export default function Layout() {
  return (
    <section>
      <Container>
        <AppBar />
        <Outlet />
      </Container>
    </section>
  );
}

//Зачем нужен Layout?
//Общая структура для всех страниц - позволяет избежать дублирования кода
// (например, AppBar будет одинаковым на всех страницах).
//Гибкость маршрутизации - через Outlet загружается только тот компонент,
// который соответствует текущему маршруту.
//Упрощение кода - каждая страница содержит только свой контент,
// а Layout занимается обёрткой.
