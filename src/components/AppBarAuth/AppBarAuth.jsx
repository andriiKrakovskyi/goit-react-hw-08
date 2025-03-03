import { NavLink } from 'react-router-dom';
import s from './AppBarAuth.module.css';
import BackButton from '../BackButton/BackButton';
import Navigation from '../Navigation/Navigation';

export default function AppBarAuth() {
  return (
    <header className={s.appBarAuth_header}>
      <div className={s.appBarAuth_nav}>
        <BackButton />
        <Navigation />
      </div>
      <p className={s.appBarAuth_info}>
        New here? Learn more about our platform
        <NavLink to="/about">here</NavLink>
      </p>

      <div className={s.appBarAuth_social}>
        <button className={s.appBarAuth_google}>Sign in with Google</button>
        <button className={s.appBarAuth_facebook}>Sign in with Facebook</button>
      </div>

      <button className={s.appBarAuth_themeSwitch}>🌙 / ☀️</button>

      <NavLink to="/help" className={s.appBarAuth_help}>
        Help
      </NavLink>

      <select className={s.appBarAuth_lang}>
        <option value="en">English</option>
        <option value="uk">Українська</option>
      </select>
    </header>
  );
}
