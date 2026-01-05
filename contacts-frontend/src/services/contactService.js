import axios from "axios";
const CONTACT_URL = "http://localhost:3001/contacts";

const getAllContacts = async () => {
    const response = await axios.get(CONTACT_URL);
    return response.data;
}

const addContact = async (contact) => {
    const response = await axios.post(CONTACT_URL, contact);
    return response.data;
}

const deleteContact = async (id) => {
    const response = await axios.delete(`${CONTACT_URL}/${id}`);
    return response.data;
}

const updateContact = async (id, updatedContact) => {
    const response = await axios.put(`${CONTACT_URL}/${id}`, updatedContact);
    return response.data;
}

export default { getAllContacts, addContact, deleteContact, updateContact };