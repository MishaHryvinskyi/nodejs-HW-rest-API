const Contact = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../routes/api/helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
}

// const getById = async (req, res) => {
//   const {id} = req.params;
//   const result = await contacts.getContactById(id);
//   if(!result) {
//    throw HttpError(404, "Not found");
//   }
//   res.json(result);
// }

// const add = async (req, res) => {
//   const result = await contacts.addContact(req.body);
//   res.status(201).json(result);
// }

// const deleteDyId = async (req, res) => {
//   const {id} = req.params;
//   const result = await contacts.removeContact(id);
//   if(!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json({
//     message: "contact deleted"
//   })
// }

// const updateById = async (req, res) => {
//   const {id} = req.params;
//   const result = await contacts.updateContact(id, req.body);
//   if(!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.json(result);
// }

module.exports = {
  getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  // add: ctrlWrapper(add),
  // deleteDyId: ctrlWrapper(deleteDyId),
  // updateById: ctrlWrapper(updateById),
}; 