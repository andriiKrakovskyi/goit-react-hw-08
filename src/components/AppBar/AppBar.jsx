import Navigation from '../Navigation/Navigation';
import AuthNav from '../AuthNav/AuthNav';
import UserMenu from '../UserMenu/UserMenu';
import s from './AppBar.module.css';
import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { useSelector } from 'react-redux';

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <header className={s.appBar_header}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
