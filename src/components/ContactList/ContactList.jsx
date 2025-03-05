import s from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/Filters/selectorsFilters.js';
import Contact from '../Contact/Contact.jsx';

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  console.log('TEST', contacts);

  return (
    <section className={s.contactList_section}>
      <ul className={s.contactList_list}>
        {contacts.map((item) => (
          <li key={item.id}>
            <Contact {...item} />
          </li>
        ))}
      </ul>

      {/* Показываем сообщение, если нет совпадений */}
      {contacts.length === 0 && (
        <p className={s.contactList_message}>No matches found</p>
      )}
    </section>
  );
}
