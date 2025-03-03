import s from './BackButton.module.css';
import { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FcUndo } from 'react-icons/fc';

export default function BackButton() {
  const location = useLocation();

  //useRef-Позволяет сохраньть значения между рендарами
  //часто работает в связки с location
  //При обновлении странице пропадает state и стает null
  //для этого делаем (location?.state ?? '/movies')
  // /movies' как деф значения.
  const goBackUrl = useRef(location?.state ?? '/');

  return (
    <>
      <Link to={goBackUrl.current} className={s.backButton_link}>
        <FcUndo className={s.backButton_icon} aria-hidden="true" />
        <span className={s.backButton_span}>Go back</span>
      </Link>
    </>
  );
}
