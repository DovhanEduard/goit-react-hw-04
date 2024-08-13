function Contact({ name, number, id, onDeleteContact }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{number}</p>
      <button type="button" onClick={() => onDeleteContact(id)}>
        Delete
      </button>
    </div>
  );
}

export default Contact;
