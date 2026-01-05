import { useState } from "react";

const ContactList = ({contacts, deleteContact}) => {
    const[newSearch, setNewSearch] = useState("");
    const filteredContacts = contacts.filter((c) => c.name.toLowerCase().includes(newSearch.toLowerCase()));

  return (
    <div>
        <h2>Contact List</h2>
      <input type="text" placeholder="Search" value={newSearch} onChange={(e) => setNewSearch(e.target.value)}/>
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length > 0 ? 
            filteredContacts.map(c => (
              <tr key={c.id} className={c.index % 2 === 0 ? "green-row" : "green-dark-row"}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>
                  <button onClick={() => deleteContact(c.name, c.id)}>Remove</button>
                </td>
              </tr>
            )) : 
            <tr>
              <td>No contacts found.</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

export default ContactList