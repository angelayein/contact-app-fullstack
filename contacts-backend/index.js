const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const reqLogger = (req, res, next) => {
  console.log(`Request Method: ${req.method}`)
  console.log(`Request Path: ${req.path}`)
  console.log("Request Body:", req.body)
  next();
};
app.use(reqLogger);

const port = process.env.PORT || 3001;

let contacts = [
    { id: 1, name: "John Doe", email: "john@example.com"},
    { id: 2, name: "Jane Smith", email: "jane@example.com"},
    { id: 3, name: "Bob Johnson", email: "bob@example.com"},
];

app.get("/", (req, res) => {
    res.send("Hello From Express Server!");
});

app.get("/api/contacts", (req, res) => {
    res.json(contacts);
});

app.get("/api/info", (req, res) => {
    res.send(`<h1>Contacts Web Server</h1><p>Number of contacts: ${contacts.length}</p>`);
});

app.get("/api/contacts/:id", (req, res) => {
    const id = req.params.id;
    const contact = contacts.find(c=>c.id == id);
    if (contact) {
        res.json(contact)
    } else {
        res.status(404).json({error: "Contact not found"});
    }
});

app.delete("/api/contacts/:id", (req, res) => {
    const id = req.params.id;
    const contact = contacts.find(c=>c.id == id);
    if(contact) {
        contacts = contacts.filter(c=>c.id != id);
        res.status(204).json({message: `The contact [${contact.name}] is removed`});
    } else {
        res.status(404).json({error: "Contact not found"});
    }
});

app.post("/api/contacts", (req, res)=> {
    const {name, email} = req.body;
    if (!name) {
        return res.status(400).json({error: "Name is required"});
    } else if (!email) {
        return res.status(400).json({error: "Email is required"});
    }
    if (contacts.find(c=>c.email == email)){
        return res.status(409).json({error: `The email [${email}] already exists`});
    }
    const contact = {
        id: Date.now() * Math.random(),
        name,
        email,
    }

    contacts.push(contact);
    res.status(201).json(contact);
});

app.listen(port, ()=> {
    console.log(`Server listening on port ${port}`);
});