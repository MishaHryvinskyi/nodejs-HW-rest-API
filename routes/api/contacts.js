const express = require('express');

const router = express.Router();

const ctrl = require("../../controllers/contacts"); 

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const schema = require("../../schemas/contacts");

router.get('/', authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(schema.postSchema), ctrl.add);

router.delete('/:id', authenticate, isValidId, ctrl.deleteDyId)

router.put('/:id', authenticate, isValidId, validateBody(schema.putSchema), ctrl.updateById);

router.patch('/:id/favorite', authenticate, isValidId, validateBody(schema.updateFavoriteSchema), ctrl.updateFavorite)

module.exports = router;