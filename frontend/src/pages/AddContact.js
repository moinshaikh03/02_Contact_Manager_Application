import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  // ✅ Fetch contacts once on app load
  useEffect(() => {
    fetchContacts();
  }, []);

  // ✅ Function to get all contacts
  const fetchContacts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/contacts");
      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // ✅ Add new contact
  const addContact = async (contact) => {
    try {
      await axios.post("http://localhost:5000/api/contacts", contact);
      fetchContacts(); // refresh list instantly
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  // ✅ Update contact
  const updateContact = async (id, updatedContact) => {
    try {
      await axios.put(`http://localhost:5000/api/contacts/${id}`, updatedContact);
      fetchContacts(); // refresh list instantly
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  // ✅ Delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      fetchContacts(); // refresh list instantly
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="App">
      <h1>Contact Manager</h1>

      {/* Pass addContact to form */}
      <ContactForm onContactAdded={addContact} />

      {/* Pass contacts + update + delete to list */}
      <ContactList
        contacts={contacts}
        onUpdate={updateContact}
        onDelete={deleteContact}
      />
    </div>
  );
}

export default App;
