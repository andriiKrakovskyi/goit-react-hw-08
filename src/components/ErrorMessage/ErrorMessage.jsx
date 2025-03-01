import s from './ErrorMessage.module.css';
import Container from '../Container/Container.jsx';

export default function ErrorMessage() {
  return (
    <section className={s.errorMessage_section}>
      <Container className={s.errorMessage_container}>
        <h2 className={s.errorMessage_titele}>
          Something went wrong! Try again later...
        </h2>
      </Container>
    </section>
  );
}
