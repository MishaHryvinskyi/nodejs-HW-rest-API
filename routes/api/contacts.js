const express = require('express');

const contacts = require("../../models/contacts");

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  }
  catch {
    res.status(500).json({
      message: "Server error"
    })
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
  const {id} = req.params;  
  const result = await contacts.getContactById(id);
  res.json(result);
}
catch {
  res.status(500).json({
    message: "Server error"
  })
}
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
