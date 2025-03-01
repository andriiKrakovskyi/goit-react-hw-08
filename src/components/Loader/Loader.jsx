import s from './Loader.module.css';
import { FadeLoader } from 'react-spinners';

export default function Loader() {
  return (
    <section className={s.loader_section}>
      <div className={s.loader_wrapper}>
        <div className="loader">
          <FadeLoader color={'#36e40b'} loading={true} size={350} />
        </div>
      </div>
    </section>
  );
}
3;
