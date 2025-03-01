import { useDispatch, useSelector } from 'react-redux';
import s from './UserMenu.module.css';
import { selectUser } from '../../redux/auth/selectorsAuth';
import { logoutThunk } from '../../redux/auth/operationsAuth';

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={s.userMenu_wrapper}>
      <p className={s.userMenu_username}>
        Welcome,<span className={s.userMenu_username_span}> {user.email}</span>
      </p>

      <button
        className={s.userMenu_button}
        type="button"
        onClick={() => dispatch(logoutThunk())}
      >
        Logout
      </button>
    </div>
  );
}
