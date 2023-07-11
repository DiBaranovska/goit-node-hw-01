import contacts from "./contacts.js"
import yargs from "yargs";

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case "list":
            const listContacts = await contacts.listContacts();
            return console.table(listContacts);
        case "get":
            const contact = await contacts.getContactById(id);
            return console.log(contact);
        case "add":
            const newContact = await contacts.addContact({name, email, phone});
            return console.log(newContact);
        case "remove":
            const removedContact = await contacts.removeContact(id);
            return console.log(removedContact);
        default:
            console.warn('\x1B[31m Unknown action type!')
    }
}


const {argv} = yargs(process.argv.slice(2))
invokeAction(argv);