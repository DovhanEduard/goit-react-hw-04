import './App.css';
import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import { nanoid } from 'nanoid';

function App() {
  const contactsList = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(() => {
    const isLocalStorageHasData = Boolean(localStorage.getItem('contacts'));

    if (isLocalStorageHasData) {
      const data = localStorage.getItem('contacts');
      return JSON.parse(data);
    }

    return contactsList;
  });

  useEffect(() => {
    const isLocalStorageHasData = Boolean(localStorage.getItem('reviews'));
    if (isLocalStorageHasData) {
      const data = localStorage.getItem('reviews');
      setContacts(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [searchValue, setSearchValue] = useState('');

  const onSearch = event => {
    const searchValue = event.target.value;

    setSearchValue(searchValue);
  };

  const onAddContact = contact => {
    const finalContact = {
      id: nanoid(),
      name: contact.username,
      number: contact.phoneNumber,
    };
    setContacts([finalContact, ...contacts]);
  };

  const onDeleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />
      <SearchBox value={searchValue} onSearch={onSearch} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={onDeleteContact}
      />
    </>
  );
}

export default App;
