import s from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/filter/selectors.js';
import Contact from '../Contact/Contact.jsx';
import { selectLoading } from '../../redux/contacts/selectors.js';

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);

  const loading = useSelector(selectLoading);

  return (
    <section className={s.contactList_section}>
      <ul className={s.contactList_list}>
        {contacts.map((item) => (
          <li key={item.id}>
            <Contact {...item} />
          </li>
        ))}
      </ul>

      {contacts.length === 0 && !loading ? (
        <p className={s.contactList_message}>No matches found</p>
      ) : null}
    </section>
  );
}
