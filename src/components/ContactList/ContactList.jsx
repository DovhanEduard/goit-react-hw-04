import Contact from '../Contact/Contact';
import css from './ContactList.module.css'

function ContactList({ contacts, onDeleteContact }) {
  return (
    <>
      <ul className={css.contactList}>
        {contacts.map(contact => {
          return (
            <li className={css.contactItem} key={contact.id}>
              <Contact
                id={contact.id}
                name={contact.name}
                number={contact.number}
                onDeleteContact={onDeleteContact}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ContactList;
