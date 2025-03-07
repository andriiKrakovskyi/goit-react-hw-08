import s from './ContactForm.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { PiUserPlusBold } from 'react-icons/pi';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { contactSchema } from './contactSchema';
import { selectContacts } from '../../redux/contacts/selectors.js';
import { addContact } from '../../redux/contacts/operations.js';

export default function ContactForm() {
  const initialValues = {
    name: '',
    number: '',
  };

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  // Функция-обработчик создания нового контакта.
  // addContact - имя  createAsyncThunk в HTTP-запросе.
  const handleSubmit = (values, actions) => {
    const newContact = {
      name: values.name,
      number: values.number,
    };

    // Проверка на дубликаты
    const isDuplicate = contacts?.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase(),
    );

    if (isDuplicate) {
      toast.error(
        `Duplicate Contact: ${newContact.name} is already in contacts.`,
      );
      return;
    }

    dispatch(addContact(newContact));
    actions.resetForm();
  };

  return (
    <section className={s.contactForm_section}>
      <h1 className={s.contactForm_title}>Phonebook</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={contactSchema}
      >
        <Form className={s.contactForm_form}>
          <label className={s.contactForm_label}>
            <span className={s.contactForm_span}>Name</span>

            <Field
              className={s.contactForm_field}
              name="name"
              type="text"
              placeholder="Rosie Simpson"
            />
            <ErrorMessage
              className={s.contactForm_error}
              component="span"
              name="name"
            />
          </label>

          <label className={s.contactForm_label}>
            <span className={s.contactForm_span}>Number</span>

            <Field
              className={s.contactForm_field}
              name="number"
              type="tel"
              placeholder="123-45-78"
            />
            <ErrorMessage
              className={s.contactForm_error}
              component="p"
              name="number"
            />
          </label>

          <button className={s.contactForm_button} type="submit">
            <span>Add contact</span>
            <PiUserPlusBold className={s.contactForm_icon_add} />
          </button>
        </Form>
      </Formik>
    </section>
  );
}
