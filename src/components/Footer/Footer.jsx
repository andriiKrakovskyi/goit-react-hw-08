import s from './footer.module.css';

export default function Footer() {
  return (
    <footer className={s.footer_wrapper}>
      <p className={s.footer_title}>© 2025 My App. All rights reserved.</p>
      <nav className={s.footer_nav}>
        <ul className={s.footer_list}>
          <li className={s.footer_item}>
            <p className={s.footer_text}>Privacy Policy</p>
          </li>
          <li className={s.footer_item}>
            <p className={s.footer_text}>Terms of Use</p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
