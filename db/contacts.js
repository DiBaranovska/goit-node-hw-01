import fs from "fs/promises"
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db",'contacts.json');


const listContacts = async() => {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data);
};


const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    return contact || null;
}


const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const contactById = contacts.findIndex(contact => contact.id === contactId);
    if (contactById === -1) {
        return null;
    }
    const [result] = contacts.splice(contactById, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}


const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(), name, email, phone,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}


export default {
    listContacts,
    getContactById,
    addContact,
    removeContact,
}