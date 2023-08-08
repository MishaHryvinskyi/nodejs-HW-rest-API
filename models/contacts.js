
const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.resolve(__dirname, './contacts.json');
const { nanoid } = require('nanoid');

const updateContacta = async(contacts) => {
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

 const listContacts =  async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const  getContactById = async (id) => {
   const contacts = await listContacts();
   const result = contacts.find((item) => item.id === id);
   return result || null ;
};

const removeContact = async (id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === id);
    if (index === -1) return null;
    const [result] = contacts.splice(index, 1);
    await updateContacta(contacts);
    return result;
};
  
const addContact = async({ name, email, phone }) => {
    const contacts = await listContacts();
    const newContact = {
        id:nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await updateContacta(contacts);
    return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
 if(index === -1) {
    return null;
 }
 contacts[index]  = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index]
}

module.exports = { 
    listContacts,
    getContactById,
    addContact,
    removeContact, 
    updateContact,
};

