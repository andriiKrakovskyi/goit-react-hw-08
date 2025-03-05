import s from './Contact.module.css';
import { PiUserMinusBold } from 'react-icons/pi';
import { PiPhoneFill } from 'react-icons/pi';
import { useDispatch } from 'react-redux';
import { PiUserFill } from 'react-icons/pi';
import { deleteContact } from '../../redux/Contacts/operationsContacts';
import { editContact } from '../../redux/Contacts/operationsContacts';
import { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { contactSchema } from './contactSchema.js';

export default function Contact({ name, number, id }) {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

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
        name: values.name.trim() || name,
        number: values.number.trim() || number,
        id: id,
      }),
    );
    setEditMode(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && editMode) {
        event.preventDefault();
        document.getElementById(`contact-form-${id}`)?.requestSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [editMode, id]);

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
                {editMode ? (
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
                    onClick={() => setEditMode(true)}
                  >
                    {values.name}
                  </p>
                )}
              </div>

              <div className={s.contact_info}>
                <PiPhoneFill className={s.contact_icon} />
                {editMode ? (
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
                    onClick={() => setEditMode(true)}
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

              {editMode && (
                <button
                  className={s.contact_button}
                  aria-label={`Save contact ${name}`}
                  onClick={handleSubmit}
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

// {
//   editMode && (
//     <button
//       className={s.contact_button}
//       aria-label={`Save contact ${name}`}
//       onClick={handleSubmit}
//       type="submit"
//     >
//       <span>Save</span>
//       <PiUserMinusBold className={s.contact_icon} />
//     </button>
//   );
// }
