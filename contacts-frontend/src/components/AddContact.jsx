import { useState } from "react";

const AddContact = ({handleSubmit}) => {
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
  return (
    <div>
        <h2>Add a New Contact</h2>
        <form onSubmit={(e) => handleSubmit(e, newName, newEmail, setNewName, setNewEmail)}>
            <input type="text" placeholder="Enter contact name" value={newName} onChange={(e) => setNewName(e.target.value)}/>
            <input type="text" placeholder="Enter email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)}/>
            <button type="submit">Add Contact</button>
      </form>
    </div>
  )
}

export default AddContact