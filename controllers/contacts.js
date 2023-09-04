const Contact = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  
  try {
    const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "name email");
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  
  try {
    const contact = await Contact.findOne({ _id: id, owner });
    if (!contact) {
      throw HttpError(404, "Not found");
    }
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  
  try {
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteDyId = async (req, res) => {
  const {id} = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if(!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted"
  })
}

const updateById = async (req, res) => {
  const {id} = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if(!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
}

const updateFavorite = async (req, res) => {
  const {id} = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if(!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
}

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteDyId: ctrlWrapper(deleteDyId),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
}; 