import s from './HomePage.module.css';
import { FcBusinessman } from 'react-icons/fc';

export default function HomePage() {
  return (
    <div className={s.homePage_wrapper}>
      <h1 className={s.homePage_title}>Task manager welcome page</h1>
      <FcBusinessman className={s.homePage_icon} />
    </div>
  );
}
