const express = require('express');

const router = express.Router();

const ctrl = require("../../controllers/contacts"); 

const {validateBody} = require("../../middlewares");

const schema = require("../../schemas/contacts");

router.get('/', ctrl.getAll);

// router.get("/:id", ctrl.getById)

// router.post('/', validateBody(schema.postSchema), ctrl.add)

// router.delete('/:id', ctrl.deleteDyId)

// router.put('/:id', validateBody(schema.putSchema), ctrl.updateById)

module.exports = router