const express = require('express');

const router = express.Router();

const ctrl = require("../../controllers/contacts"); 

const { validateBody, isValidId } = require("../../middlewares");

const schema = require("../../schemas/contacts");

router.get('/', ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post('/', validateBody(schema.postSchema), ctrl.add);

router.delete('/:id', isValidId, ctrl.deleteDyId)

router.put('/:id', isValidId, validateBody(schema.putSchema), ctrl.updateById);

router.patch('/:id/favorite', isValidId, validateBody(schema.updateFavoriteSchema), ctrl.updateFavorite)

module.exports = router;
// 