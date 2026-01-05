import { useState, useEffect } from "react";
import "./index.css";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import contactService from "./services/contactService";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [notification, setNotification] = useState({ message: null, type: null });

  useEffect(() => {
    // axios.get("http://localhost:3001/contacts").then(response => {
    //   console.log(response.data);
    //   setContacts(response.data);
    // })
    contactService.getAllContacts().then((contact) => setContacts(contact)).catch(e=>{
      console.log("Server is down");
      setContacts(null);
    })
  }, []);

  const handleSubmit = async (e, newName, newEmail, setNewName, setNewEmail) => {
    e.preventDefault();
    const changed = newName.trim();
    const changedEmail = newEmail.trim();

    const existing = contacts.find(c => c.name === changed);
    if (existing) {
      const confirmUpdate = window.confirm(`${changed} is already in contacts. Replace the old email with the new one?`);
      if (!confirmUpdate) {
        setNewName("");
        setNewEmail("");
        return;
      }
      
      try {
        const updatedContact = { ...existing, email: changedEmail };
        const returned = await contactService.updateContact(existing.id, updatedContact);

        setContacts(contacts.map(c => (c.id !== existing.id ? c : returned)));

        setNotification({message: `Updated ${changed}'s email`, type: "success "});
        setTimeout(() => setNotification({message: null, type: null}), 4000);
      } catch (error) {
        setNotification({message: "Error updating contact", type: "error"});
        setTimeout(() => setNotification({message: null, type: null}), 4000);
      }

      setNewName("");
      setNewEmail("");
    }

    if(changedEmail === ""){
      setNotification({message: "You need to add an email address", type: "warning"});
      setTimeout(() => setNotification({message: null, type: null}), 4000);
    }
    
    if(changed !== "" && changedEmail !== ""){
      try {
        const newContact = { name: changed, email: changedEmail };
        const created = await contactService.addContact(newContact);
        setContacts([...contacts, created]);
        setNotification({message: `Added ${changed}`, type: "success"});
        setTimeout(() => setNotification({message: null, type: null}), 4000);
      } catch (error) {
        setNotification({message: "Error adding contact", type: "error"});
        setTimeout(() => setNotification({message: null, type: null}), 4000);
      }
    }
    setNewName("");
    setNewEmail("");
  };

  const handleDelete = async (name, id) => {
    if (window.confirm(`Delete ${name}?`)){
      try {
        await contactService.deleteContact(id);  
        setContacts(contacts.filter(contact => contact.id !== id));
      } catch (error) {
        console.log("Error deleting contact", error);
        alert("Could not delete contact. Server might be down.");
        console.log("contacts:", contacts);
      }
    }
  };

  return (
    <div className="contacts-app">
      {notification.message && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <AddContact handleSubmit={handleSubmit}/>
      <ContactList contacts={contacts} deleteContact={handleDelete}/>
    </div>
  );
};

export default App;