// src/api/index.js
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' }); // <-- yaha /api add kar diya

export const getContacts   = () => API.get('/contacts');
export const addContact    = (data) => API.post('/contacts', data);
export const updateContact = (id, data) => API.patch(`/contacts/${id}`, data);
export const deleteContact = (id) => API.delete(`/contacts/${id}`);

export default API;