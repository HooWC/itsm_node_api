const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const authorize = require('../_middleware/authorize');
const functionService = require('./req_function.service');

router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), createSchema, create);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function getAll(req, res, next) {
    functionService.getAll()
        .then(functions => res.json(functions))
        .catch(next);
}

function getById(req, res, next) {
    functionService.getById(req.params.id)
        .then(function_ => res.json(function_))
        .catch(next);
}

function create(req, res, next) {
    functionService.create(req.body)
        .then(() => res.json({ message: 'Function created successfully' }))
        .catch(next);
}

function update(req, res, next) {
    functionService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Function updated successfully' }))
        .catch(next);
}

function _delete(req, res, next) {
    functionService.delete(req.params.id)
        .then(() => res.json({ message: 'Function deleted successfully' }))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        req_subcategory_id: Joi.number().required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        req_subcategory_id: Joi.number().required()
    });
    validateRequest(req, next, schema);
} 