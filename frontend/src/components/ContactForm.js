import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactForm = ({ onContactAdded, editingContact, onUpdate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Pre-fill values when editing
  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setEmail(editingContact.email);
      setPhone(editingContact.phone);
    }
  }, [editingContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingContact) {
      // Update contact
      try {
        const res = await axios.put(
          `http://localhost:5000/api/contacts/${editingContact._id}`,
          { name, email, phone }
        );
        onUpdate(res.data); // send updated contact to App
      } catch (error) {
        console.error(error);
      }
    } else {
      // Add new contact
      try {
        const res = await axios.post("http://localhost:5000/api/contacts", {
          name,
          email,
          phone,
        });
        onContactAdded(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    // Reset form
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <button type="submit">
        {editingContact ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
};

export default ContactForm;
