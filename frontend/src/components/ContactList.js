import { useState } from "react";

function ContactList({ contacts, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "", phone: "" });

  const handleEditClick = (contact) => {
    setEditingId(contact._id);
    setEditData({ name: contact.name, email: contact.email, phone: contact.phone });
  };

  const handleSave = () => {
    onUpdate(editingId, editData);
    setEditingId(null); // edit mode band kar do
  };

  return (
    <div>
      <h2>All Contacts</h2>
      {contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>
              {editingId === contact._id ? (
                <>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  />
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  />
                  <button onClick={handleSave}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <strong>{contact.name}</strong> | {contact.email} | {contact.phone}
                  <button
                    onClick={() => handleEditClick(contact)}
                    style={{ marginLeft: "10px" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(contact._id)}
                    style={{ marginLeft: "5px", color: "red" }}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ContactList;
