import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { fetchContacts } from '../../redux/Contacts/operationsContacts';
import {
  selectError,
  selectLoading,
} from '../../redux/Contacts/selectorsContacts';
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';

export default function ContactsPage() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    const abortController = new AbortController();
    dispatch(fetchContacts({ signal: abortController.signal }));
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  return (
    <>
      <ContactForm />
      <SearchBox />

      {loading && !error && <div>Request in progress...</div>}

      <ContactList />
    </>
  );
}

// import ContactList from './components/ContactList/ContactList';
// import SearchBox from './components/SearchBox/SearchBox';
// import ContactForm from './components/ContactForm/ContactForm';
// import { useSelector, useDispatch } from 'react-redux';
// import s from './components/ContactList/ContactList.module.css';
// import { useEffect } from 'react';
// import { fetchContacts } from './redux/contactsOps';
// import { selectError, selectLoading } from './redux/selectors';

// function App() {
//   const dispatch = useDispatch();
//   const loading = useSelector(selectLoading);
//   const error = useSelector(selectError);

//   useEffect(() => {
//     const abortController = new AbortController();
//     dispatch(fetchContacts({ signal: abortController.signal }));
//     return () => {
//       abortController.abort();
//     };
//   }, [dispatch]);

//   return (
//     <>
//       <ContactForm />
//       <SearchBox />

//       {loading && !error && (
//         <div className={s.contactList_message}>Request in progress...</div>
//       )}

//       <ContactList />
//     </>
//   );
// }

// export default App;

// useEffect(() => {
//   dispatch(fetchContacts());
// }, [dispatch]);
