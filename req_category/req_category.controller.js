const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const categoryService = require('./req_category.service');

router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    categoryService.getAll()
        .then(categories => res.json(categories))
        .catch(next);
}

function getById(req, res, next) {
    categoryService.getById(req.params.id)
        .then(category => res.json(category))
        .catch(next);
}

function create(req, res, next) {
    categoryService.create(req.body)
        .then(() => res.json({ message: 'Category created successfully' }))
        .catch(next);
}

function update(req, res, next) {
    categoryService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Category updated successfully' }))
        .catch(next);
}

function _delete(req, res, next) {
    categoryService.delete(req.params.id)
        .then(() => res.json({ message: 'Category deleted successfully' }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required()
    });
    validateRequest(req, next, schema);
} 