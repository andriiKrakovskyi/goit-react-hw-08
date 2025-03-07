import s from './Contact.module.css';
import { PiUserMinusBold } from 'react-icons/pi';
import { PiPhoneFill } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { PiUserFill } from 'react-icons/pi';
import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { contactSchema } from './contactSchema.js';
import { deleteContact, editContact } from '../../redux/contacts/operations.js';

// export default function Contact({ name, number, id }) {
//   const dispatch = useDispatch();
//   const [editMode, setEditMode] = useState(false);

//   const initialValues = {
//     name: name,
//     number: number,
//     id: id,
//   };

//   const handleDelete = () => {
//     dispatch(deleteContact(id));
//   };

//   const handleSubmit = (values) => {
//     dispatch(
//       editContact({
//         name: values.name || name,
//         number: values.number || number,
//         id: id,
//       }),
//     );
//     setEditMode(false);
//   };

//   //============

//   // useEffect(() => {
//   //   const handleKeyDown = (event) => {
//   //     if (event.key === 'Enter' && editMode) {
//   //       event.preventDefault();
//   //       document.getElementById(`contact-form-${id}`)?.requestSubmit();
//   //     }
//   //   };

//   //   document.addEventListener('keydown', handleKeyDown);
//   //   return () => document.removeEventListener('keydown', handleKeyDown);
//   // }, [editMode, id]);
//   //=============
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.key === 'Enter' && editMode) {
//         event.preventDefault();
//         document.getElementById(`contact-form-${id}`)?.requestSubmit();
//       }
//     };

//     const handleClickOutside = (event) => {
//       if (editMode && !event.target.closest(`.contact_form`)) {
//         setEditMode(false);
//         document.getElementById(`contact-form-${id}`)?.requestSubmit();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);
//     setTimeout(
//       () => document.addEventListener('click', handleClickOutside),
//       100,
//     );

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, [editMode, id]);

//   return (
//     <div className={s.contact_wrapper}>
//       <Formik
//         initialValues={initialValues}
//         onSubmit={handleSubmit}
//         validationSchema={contactSchema}
//       >
//         {({ values }) => (
//           <Form className={s.contact_form} id={`contact-form-${id}`}>
//             <div className={s.contact_item}>
//               <div className={s.contact_info}>
//                 <PiUserFill className={s.contact_icon} />
//                 {editMode ? (
//                   <label className={s.contact_label}>
//                     <span className="visually_hidden">Name</span>
//                     <Field
//                       className={s.contact_field}
//                       name="name"
//                       type="text"
//                       autoFocus
//                     />
//                     <ErrorMessage
//                       className={s.contact_error}
//                       component="span"
//                       name="name"
//                     />
//                   </label>
//                 ) : (
//                   <p
//                     className={s.contact_text}
//                     onClick={() => setEditMode(true)}
//                   >
//                     {values.name}
//                   </p>
//                 )}
//               </div>

//               <div className={s.contact_info}>
//                 <PiPhoneFill className={s.contact_icon} />
//                 {editMode ? (
//                   <label className={s.contact_label}>
//                     <span className="visually_hidden">Number</span>
//                     <Field
//                       className={s.contact_field}
//                       name="number"
//                       type="tel"
//                       autoFocus
//                     />
//                     <ErrorMessage
//                       className={s.contact_error}
//                       component="span"
//                       name="number"
//                     />
//                   </label>
//                 ) : (
//                   <p
//                     className={s.contact_text}
//                     onClick={() => setEditMode(true)}
//                   >
//                     {values.number}
//                   </p>
//                 )}
//               </div>
//             </div>

//             <div className={s.contact_wrapper_button}>
//               <button
//                 className={s.contact_button}
//                 aria-label={`Delete contact ${name}`}
//                 onClick={handleDelete}
//                 type="button"
//               >
//                 <span>Delete</span>
//                 <PiUserMinusBold className={s.contact_icon} />
//               </button>

//               {editMode && (
//                 <button
//                   className={s.contact_button}
//                   aria-label={`Save contact ${name}`}
//                   type="submit"
//                 >
//                   <span>Save</span>
//                   <PiUserMinusBold className={s.contact_icon} />
//                 </button>
//               )}
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

export default function Contact({ name, number, id }) {
  const dispatch = useDispatch();
  const [isNameEditMode, setIsNameEditMode] = useState(false);
  const [isNumberEditMode, setIsNumberEditMode] = useState(false);

  const initialValues = {
    name: name,
    number: number,
    id: id,
  };

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  const handleSubmit = (values) => {
    dispatch(
      editContact({
        name: values.name || name,
        number: values.number || number,
        id: id,
      }),
    );
    setIsNameEditMode(false);
    setIsNumberEditMode(false);
  };

  // useEffect для обработки клавиш и кликов за пределами формы
  useEffect(() => {
    const handleKeyDown = (event) => {
      console.log('keydown');
      // Если нажата клавиша Enter и одно из полей в режиме редактирования
      if ((isNameEditMode || isNumberEditMode) && event.key === 'Enter') {
        event.preventDefault();
        document.getElementById(`contact-form-${id}`)?.requestSubmit();
      }
    };

    const handleClickOutside = (event) => {
      console.log('outside');
      // Если одно из полей в режиме редактирования и клик за пределами формы
      if (
        (isNameEditMode || isNumberEditMode) &&
        !event.target.closest(`.contact_form`)
      ) {
        setIsNameEditMode(false); // Отключить редактирование имени
        setIsNumberEditMode(false); // Отключить редактирование номера
        document.getElementById(`contact-form-${id}`)?.requestSubmit();
      }
    };

    // Добавляем обработчики событий
    document.addEventListener('keydown', handleKeyDown);
    setTimeout(
      () => document.addEventListener('click', handleClickOutside),
      100,
    );

    // Очищаем обработчики при размонтировании компонента
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isNameEditMode, isNumberEditMode, id]); // Зависимости изменены

  return (
    <div className={s.contact_wrapper}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={contactSchema}
      >
        {({ values }) => (
          <Form className={s.contact_form} id={`contact-form-${id}`}>
            <div className={s.contact_item}>
              <div className={s.contact_info}>
                <PiUserFill className={s.contact_icon} />
                {isNameEditMode ? (
                  <label className={s.contact_label}>
                    <span className="visually_hidden">Name</span>
                    <Field
                      className={s.contact_field}
                      name="name"
                      type="text"
                      autoFocus
                    />
                    <ErrorMessage
                      className={s.contact_error}
                      component="span"
                      name="name"
                    />
                  </label>
                ) : (
                  <p
                    className={s.contact_text}
                    onClick={() => setIsNameEditMode(true)}
                  >
                    {values.name}
                  </p>
                )}
              </div>

              <div className={s.contact_info}>
                <PiPhoneFill className={s.contact_icon} />
                {isNumberEditMode ? (
                  <label className={s.contact_label}>
                    <span className="visually_hidden">Number</span>
                    <Field
                      className={s.contact_field}
                      name="number"
                      type="tel"
                      autoFocus
                    />
                    <ErrorMessage
                      className={s.contact_error}
                      component="span"
                      name="number"
                    />
                  </label>
                ) : (
                  <p
                    className={s.contact_text}
                    onClick={() => setIsNumberEditMode(true)}
                  >
                    {values.number}
                  </p>
                )}
              </div>
            </div>

            <div className={s.contact_wrapper_button}>
              <button
                className={s.contact_button}
                aria-label={`Delete contact ${name}`}
                onClick={handleDelete}
                type="button"
              >
                <span>Delete</span>
                <PiUserMinusBold className={s.contact_icon} />
              </button>

              {(isNameEditMode || isNumberEditMode) && (
                <button
                  className={s.contact_button}
                  aria-label={`Save contact ${name}`}
                  type="submit"
                >
                  <span>Save</span>
                  <PiUserMinusBold className={s.contact_icon} />
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
//====
