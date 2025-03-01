import s from './Contact.module.css';
import { PiPhoneFill, PiUserFill, PiUserMinusBold } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import {
  deleteContact,
  editContact,
} from '../../redux/Contacts/operationsContacts';

export default function Contact({ name, number, id }) {
  const dispatch = useDispatch();
  // Функция-обработчик удаления.
  //  deleteContact - имя  createAsyncThunk в HTTP-запросе.
  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  const handleChange = () => {
    const EditName = prompt('Enter new name:', name);
    const EditNumber = prompt('Enter new number:', number);

    dispatch(editContact({ name: EditName, number: EditNumber, id: id }));
  };

  return (
    <div className={s.contact_item}>
      <div className={s.contact_wrapper}>
        <div className={s.contact_info}>
          <PiUserFill className={s.contact_icon} />
          <p>{name}</p>
        </div>
        <div className={s.contact_info}>
          <PiPhoneFill className={s.contact_icon} />
          <p>{number}</p>
        </div>
      </div>
      <button
        className={s.contact_button}
        aria-label={`Delete contact ${name}`}
        onClick={handleDelete}
      >
        <span>Delete</span>
        <PiUserMinusBold className={s.contact_icon} />
      </button>

      <button
        className={s.contact_button}
        aria-label={` Edit contact  ${name}`}
        onClick={handleChange}
      >
        <span>Edit</span>
        <PiUserMinusBold className={s.contact_icon} />
      </button>
    </div>
  );
}

// const handleChange = (values) => {
//   const EditContact = {
//     id,
//     name: values.name,
//     number: values.number,
//   };

//   dispatch(editContact(EditContact));
// };

// const handleChange = (values) => {
//   const editContact = {
//     id, // Передаем ID отдельно
//     name: values.name,
//     number: values.number,
//   };

//   console.log('Dispatching editContact:', editContact);

//   dispatch(editContact(editContact));
// };
