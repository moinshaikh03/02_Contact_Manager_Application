import { useEffect, useState } from "react";
import axios from "axios";
import ContactList from "./components/ContactList";

function App() {
  const API = "http://localhost:5000/api/contacts";

  // states
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // fetch all contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get(API);
      setContacts(res.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  // load contacts on page load
  useEffect(() => {
    fetchContacts();
  }, []);

  // add contact
  const addContact = async () => {
    try {
      if (!name || !email) return; // basic validation
      await axios.post(API, { name, email, phone });
      setName("");
      setEmail("");
      setPhone("");
      await fetchContacts(); // refresh list instantly
    } catch (err) {
      console.error("Error adding contact:", err);
    }
  };

  // delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      await fetchContacts();
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  // update contact (for demo, just appends " (edited)" to name)
  const updateContact = async (id, data) => {
    try {
      await axios.put(`${API}/${id}`, data);
      await fetchContacts();
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contact Manager</h1>

      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={addContact}>Add Contact</button>
      </div>

      <button onClick={fetchContacts} style={{ marginBottom: "20px" }}>
        Show All Contacts
      </button>

      <ContactList
        contacts={contacts}
        onUpdate={updateContact}
        onDelete={deleteContact}
      />
    </div>
  );
}

export default App;
