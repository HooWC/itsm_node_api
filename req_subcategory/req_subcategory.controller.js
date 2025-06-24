const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const subcategoryService = require('./req_subcategory.service');

router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), create);
router.put('/:id', authorize(), update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    subcategoryService.getAll()
        .then(subcategories => res.json(subcategories))
        .catch(next);
}

function getById(req, res, next) {
    subcategoryService.getById(req.params.id)
        .then(subcategory => res.json(subcategory))
        .catch(next);
}

function create(req, res, next) {
    subcategoryService.create(req.body)
        .then(() => res.json({ message: 'Subcategory created successfully' }))
        .catch(next);
}

function update(req, res, next) {
    subcategoryService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Subcategory updated successfully' }))
        .catch(next);
}

function _delete(req, res, next) {
    subcategoryService.delete(req.params.id)
        .then(() => res.json({ message: 'Subcategory deleted successfully' }))
        .catch(next);
}