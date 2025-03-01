import s from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { FcHome } from 'react-icons/fc';
import { FcViewDetails } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectorsAuth';

const buildLinkClass = ({ isActive }) => {
  return clsx(s.navigation_link, isActive && s.navigation_active);
};

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={s.navigation_nav}>
      <NavLink to="/" className={buildLinkClass} aria-label="Go to Home">
        <FcHome aria-hidden="true" />
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink
          to="/contacts"
          className={buildLinkClass}
          aria-label="Go to Contacts"
        >
          <FcViewDetails aria-hidden="true" />
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
