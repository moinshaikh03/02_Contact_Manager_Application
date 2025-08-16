import api from "http://localhost:5000/api";

// Get all contacts
export const getContacts = () => api.get("http://localhost:5000/api/contacts");

// Add new contact
export const addContact = (contact) => api.post("http://localhost:5000/api/contacts", contact);

// Update contact
export const updateContact = (id, contact) => api.put(`http://localhost:5000/api/contacts/68a030e9c72030dcfc65409c${id}`, contact);

// Delete contact
export const deleteContact = (id) => api.delete(`http://localhost:5000/api/contacts/68a03070c72030dcfc65409a${id}`);
